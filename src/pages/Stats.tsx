import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Trophy } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Tx { id: string; nft_name: string; nft_image: string | null; price: number; buyer_wallet: string; seller_wallet: string; created_at: string; tx_type: string; }

const collections = [
  { rank: 1, name: 'Legendary Beasts', floor: 8.2, vol: 1240, change: 12.4 },
  { rank: 2, name: 'Starter Squad', floor: 0.8, vol: 890, change: -3.2 },
  { rank: 3, name: 'Dragon Order', floor: 5.5, vol: 720, change: 8.1 },
  { rank: 4, name: 'Psychic Council', floor: 4.1, vol: 615, change: 15.6 },
  { rank: 5, name: 'Ghost Clan', floor: 3.4, vol: 480, change: -1.8 },
  { rank: 6, name: 'Fire Wardens', floor: 2.9, vol: 410, change: 5.3 },
];

const StatsPage = () => {
  const [activity, setActivity] = useState<Tx[]>([]);
  const [range, setRange] = useState<7 | 30 | 90>(30);

  useEffect(() => {
    supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(15)
      .then(({ data }) => { if (data) setActivity(data as Tx[]); });
    const ch = supabase.channel('stats-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (p: any) => {
        setActivity((prev) => [p.new as Tx, ...prev].slice(0, 15));
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const volumeData = Array.from({ length: range }, (_, i) => ({
    day: `D${i + 1}`,
    volume: 80 + Math.sin(i / 3) * 40 + Math.random() * 60 + i * 1.2,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-foreground">Marketplace Stats</h1>
            <p className="text-sm text-muted-foreground mt-1">Live data across all collections</p>
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-secondary border border-border">
            {[7, 30, 90].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r as 7 | 30 | 90)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  range === r ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r}D
              </button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-5 mb-8">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-cyan" /> Total Volume — last {range}d
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="gVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="volume" stroke="hsl(var(--primary))" fill="url(#gVol)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-neon-orange" /> Top Collections
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[10px] uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
                <div className="col-span-1">#</div><div className="col-span-5">Name</div>
                <div className="col-span-2 text-right">Floor</div><div className="col-span-2 text-right">24h Vol</div>
                <div className="col-span-2 text-right">Change</div>
              </div>
              {collections.map((c) => (
                <div key={c.rank} className="grid grid-cols-12 items-center py-2 text-sm hover:bg-secondary/50 rounded transition-colors">
                  <div className="col-span-1 text-muted-foreground">{c.rank}</div>
                  <div className="col-span-5 font-medium text-foreground">{c.name}</div>
                  <div className="col-span-2 text-right text-foreground">{c.floor} ETH</div>
                  <div className="col-span-2 text-right text-foreground">{c.vol}</div>
                  <div className={`col-span-2 text-right text-xs font-semibold flex items-center justify-end gap-1 ${c.change >= 0 ? 'text-neon-green' : 'text-destructive'}`}>
                    {c.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(c.change)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-neon-green" /> Live Activity
            </h3>
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {activity.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No transactions yet — buy or bid to populate.</p>}
              {activity.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50"
                >
                  {tx.nft_image && <img src={tx.nft_image} alt="" className="w-9 h-9 object-contain" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      <span className="capitalize text-neon-cyan">{tx.tx_type}</span> · {tx.nft_name}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono truncate">
                      {tx.buyer_wallet?.slice(0, 8)}…
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-display font-semibold text-foreground">{Number(tx.price).toFixed(2)} ETH</p>
                    <p className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
