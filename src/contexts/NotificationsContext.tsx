import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  time: number;
  read: boolean;
  type: 'sale' | 'bid' | 'mint' | 'like' | 'system';
}

interface Ctx {
  notifications: AppNotification[];
  unread: number;
  push: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;
  markAllRead: () => void;
  clear: () => void;
}

const NotificationsContext = createContext<Ctx>({} as Ctx);
export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const push: Ctx['push'] = useCallback((n) => {
    setNotifications((prev) => [{ ...n, id: crypto.randomUUID(), time: Date.now(), read: false }, ...prev].slice(0, 20));
  }, []);

  const markAllRead = useCallback(() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))), []);
  const clear = useCallback(() => setNotifications([]), []);

  // Subscribe to realtime transactions for global notifications
  useEffect(() => {
    const channel = supabase
      .channel('global-tx-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload: any) => {
        const tx = payload.new;
        push({
          type: 'sale',
          title: `${tx.nft_name} sold`,
          description: `${Number(tx.price).toFixed(2)} ETH`,
        });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bids' }, (payload: any) => {
        const b = payload.new;
        push({
          type: 'bid',
          title: 'New bid placed',
          description: `${Number(b.amount).toFixed(2)} ETH`,
        });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [push]);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, unread, push, markAllRead, clear }}>
      {children}
    </NotificationsContext.Provider>
  );
};
