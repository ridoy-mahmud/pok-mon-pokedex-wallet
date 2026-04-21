import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp } from 'lucide-react';

interface Tx { id: string; nft_name: string; price: number; created_at: string; }

export const SalesTicker = () => {
  const [items, setItems] = useState<Tx[]>([]);

  useEffect(() => {
    supabase.from('transactions').select('id, nft_name, price, created_at').order('created_at', { ascending: false }).limit(20)
      .then(({ data }) => { if (data) setItems(data as Tx[]); });
    const ch = supabase.channel('ticker-tx')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (p: any) => {
        setItems((prev) => [p.new as Tx, ...prev].slice(0, 20));
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const display = items.length > 0 ? items : [
    { id: '1', nft_name: 'Pikachu', price: 2.5, created_at: '' },
    { id: '2', nft_name: 'Charizard', price: 5.8, created_at: '' },
    { id: '3', nft_name: 'Mewtwo', price: 8.2, created_at: '' },
    { id: '4', nft_name: 'Rayquaza', price: 9.5, created_at: '' },
    { id: '5', nft_name: 'Lugia', price: 7.6, created_at: '' },
  ];
  const loop = [...display, ...display];

  return (
    <div className="relative overflow-hidden border-y border-border bg-card/50 backdrop-blur-sm py-2">
      <div className="flex gap-8 animate-[ticker_40s_linear_infinite] whitespace-nowrap">
        {loop.map((t, i) => (
          <div key={`${t.id}-${i}`} className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3 text-neon-green" />
            <span className="text-foreground font-medium">{t.nft_name}</span>
            <span>sold for</span>
            <span className="text-primary font-bold">{Number(t.price).toFixed(2)} ETH</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
};
