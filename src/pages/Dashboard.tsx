import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import {
  TrendingUp, TrendingDown, DollarSign, Package, Users, Activity,
  ArrowUpRight, ArrowDownRight, Eye, Heart, Clock, Flame
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';
import { pokemonNFTs } from '@/lib/pokemon-data';

// Mock data
const volumeData = [
  { name: 'Jan', volume: 420, sales: 230 }, { name: 'Feb', volume: 580, sales: 310 },
  { name: 'Mar', volume: 340, sales: 180 }, { name: 'Apr', volume: 780, sales: 420 },
  { name: 'May', volume: 920, sales: 510 }, { name: 'Jun', volume: 650, sales: 350 },
  { name: 'Jul', volume: 1100, sales: 590 }, { name: 'Aug', volume: 890, sales: 470 },
  { name: 'Sep', volume: 1350, sales: 720 }, { name: 'Oct', volume: 1020, sales: 540 },
  { name: 'Nov', volume: 1480, sales: 810 }, { name: 'Dec', volume: 1720, sales: 920 },
];

const priceHistory = [
  { day: 'Mon', pikachu: 2.1, charizard: 5.2, mewtwo: 7.5 },
  { day: 'Tue', pikachu: 2.3, charizard: 5.5, mewtwo: 7.8 },
  { day: 'Wed', pikachu: 2.0, charizard: 5.1, mewtwo: 8.0 },
  { day: 'Thu', pikachu: 2.5, charizard: 5.8, mewtwo: 8.2 },
  { day: 'Fri', pikachu: 2.4, charizard: 6.0, mewtwo: 7.9 },
  { day: 'Sat', pikachu: 2.6, charizard: 5.7, mewtwo: 8.4 },
  { day: 'Sun', pikachu: 2.5, charizard: 5.8, mewtwo: 8.2 },
];

const typeDistribution = [
  { name: 'Fire', value: 25, color: '#ef4444' },
  { name: 'Water', value: 30, color: '#3b82f6' },
  { name: 'Electric', value: 15, color: '#eab308' },
  { name: 'Psychic', value: 12, color: '#a855f7' },
  { name: 'Dragon', value: 18, color: '#6366f1' },
];

const activityFeed = [
  { type: 'sale', user: '0x1a2b...3c4d', pokemon: 'Pikachu', price: 2.5, time: '2m ago' },
  { type: 'mint', user: '0x5e6f...7g8h', pokemon: 'Charizard', price: 5.8, time: '5m ago' },
  { type: 'bid', user: '0x9i0j...1k2l', pokemon: 'Mewtwo', price: 7.9, time: '8m ago' },
  { type: 'sale', user: '0x3m4n...5o6p', pokemon: 'Rayquaza', price: 9.5, time: '12m ago' },
  { type: 'list', user: '0x7q8r...9s0t', pokemon: 'Lugia', price: 7.6, time: '15m ago' },
  { type: 'sale', user: '0xa1b2...c3d4', pokemon: 'Gengar', price: 4.1, time: '20m ago' },
  { type: 'mint', user: '0xe5f6...g7h8', pokemon: 'Lucario', price: 4.5, time: '25m ago' },
];

const radialData = [
  { name: 'Portfolio', value: 78, fill: 'hsl(270, 100%, 65%)' },
  { name: 'Floor Avg', value: 62, fill: 'hsl(170, 100%, 50%)' },
  { name: 'Rarity Score', value: 91, fill: 'hsl(330, 100%, 60%)' },
];

const topCollectors = [
  { rank: 1, address: '0x9i0j...1k2l', nfts: 47, value: 156.3 },
  { rank: 2, address: '0x5e6f...7g8h', nfts: 38, value: 124.8 },
  { rank: 3, address: '0x1a2b...3c4d', nfts: 31, value: 98.5 },
  { rank: 4, address: '0xe5f6...g7h8', nfts: 28, value: 87.2 },
  { rank: 5, address: '0xa1b2...c3d4', nfts: 24, value: 72.6 },
];

const statCards = [
  { label: 'Total Volume', value: '12,450 ETH', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'NFTs Listed', value: '8,234', change: '+8.3%', up: true, icon: Package },
  { label: 'Active Trainers', value: '5,678', change: '+15.2%', up: true, icon: Users },
  { label: 'Floor Price', value: '0.3 ETH', change: '-2.1%', up: false, icon: Activity },
];

const timeRanges = ['24H', '7D', '30D', 'ALL'] as const;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value} {typeof p.value === 'number' && p.value < 100 ? 'ETH' : ''}
        </p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<string>('7D');

  const trendingNFTs = [...pokemonNFTs].sort((a, b) => b.volume24h - a.volume24h).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Real-time Pokémon NFT market insights</p>
          </div>
          <div className="flex items-center gap-1 mt-4 md:mt-0 bg-secondary rounded-lg p-1">
            {timeRanges.map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  timeRange === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-neon-green' : 'text-destructive'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Volume Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Trading Volume</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Volume</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neon-cyan" /> Sales</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="gVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(270,100%,65%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(270,100%,65%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(170,100%,50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(170,100%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230,15%,18%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(215,15%,55%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(215,15%,55%)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="volume" stroke="hsl(270,100%,65%)" fill="url(#gVol)" strokeWidth={2} />
                <Area type="monotone" dataKey="sales" stroke="hsl(170,100%,50%)" fill="url(#gSales)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Type Distribution */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Type Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={typeDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {typeDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {typeDistribution.map((t) => (
                <div key={t.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-muted-foreground">{t.name}</span>
                  <span className="text-foreground font-medium ml-auto">{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Price History */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Price Trends (Top 3)</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Pikachu</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Charizard</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Mewtwo</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230,15%,18%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(215,15%,55%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(215,15%,55%)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="pikachu" stroke="#eab308" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="charizard" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="mewtwo" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radial Score */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Portfolio Score</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" barSize={12} data={radialData} startAngle={180} endAngle={0}>
                <RadialBar background dataKey="value" cornerRadius={6} />
                <Tooltip content={<CustomTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {radialData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </span>
                  <span className="font-semibold text-foreground">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Trending */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-neon-orange" />
              <h3 className="font-display font-semibold text-foreground">Trending</h3>
            </div>
            <div className="space-y-3">
              {trendingNFTs.map((nft, i) => (
                <div key={nft.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <img src={nft.image} alt={nft.name} className="w-10 h-10 rounded-lg object-contain bg-secondary p-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{nft.name}</p>
                    <p className="text-xs text-muted-foreground">{nft.volume24h} ETH vol</p>
                  </div>
                  <span className="text-xs font-semibold text-neon-green flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />{((nft.volume24h / 100) * 12).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-neon-cyan" />
              <h3 className="font-display font-semibold text-foreground">Live Activity</h3>
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow ml-auto" />
            </div>
            <div className="space-y-3">
              {activityFeed.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-xs"
                >
                  <span className={`px-2 py-0.5 rounded-full font-medium capitalize ${
                    item.type === 'sale' ? 'bg-neon-green/10 text-neon-green' :
                    item.type === 'mint' ? 'bg-neon-purple/10 text-neon-purple' :
                    item.type === 'bid' ? 'bg-neon-orange/10 text-neon-orange' :
                    'bg-neon-blue/10 text-neon-blue'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-foreground font-medium">{item.pokemon}</span>
                  <span className="text-muted-foreground">{item.price} ETH</span>
                  <span className="text-muted-foreground ml-auto flex items-center gap-1">
                    <Clock className="w-3 h-3" />{item.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Collectors */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Top Collectors</h3>
            </div>
            <div className="space-y-3">
              {topCollectors.map((c) => (
                <div key={c.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    c.rank === 1 ? 'bg-neon-orange/20 text-neon-orange' :
                    c.rank === 2 ? 'bg-muted text-muted-foreground' :
                    c.rank === 3 ? 'bg-neon-orange/10 text-neon-orange/70' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {c.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono text-foreground">{c.address}</p>
                    <p className="text-xs text-muted-foreground">{c.nfts} NFTs</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{c.value} ETH</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
