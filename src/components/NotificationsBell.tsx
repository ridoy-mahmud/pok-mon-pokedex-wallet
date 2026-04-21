import { Bell, Check } from 'lucide-react';
import { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';

export const NotificationsBell = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unread, markAllRead, clear } = useNotifications();

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (v) markAllRead(); }}>
      <PopoverTrigger asChild>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-neon-pink text-[10px] font-bold text-white flex items-center justify-center"
            >
              {unread}
            </motion.span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <p className="font-display font-semibold text-sm text-foreground">Activity</p>
          {notifications.length > 0 && (
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          <AnimatePresence>
            {notifications.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-8">No activity yet.</p>
            )}
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-3 border-b border-border last:border-0 hover:bg-secondary/50"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                  {n.description && <p className="text-xs text-muted-foreground truncate">{n.description}</p>}
                  <p className="text-[10px] text-muted-foreground mt-0.5">{formatDistanceToNow(n.time, { addSuffix: true })}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  );
};
