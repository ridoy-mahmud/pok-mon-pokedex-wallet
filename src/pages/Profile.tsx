import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useWallet } from '@/hooks/useWallet';
import { useFavorites } from '@/contexts/FavoritesContext';
import { pokemonNFTs, mockTransactions, getTypeGradient, getRarityClass } from '@/lib/pokemon-data';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink, Copy, Check, Image, Heart, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MetaMaskIcon } from '@/components/MetaMaskIcon';

const ownedIds = [25, 6, 150, 133, 94, 448, 384, 249, 151, 493, 282, 131];

const Profile = () => {
  const { wallet, connect } = useWallet();
  const { favorites, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<'owned' | 'activity' | 'watchlist'>('owned');
  const [copied, setCopied] = useState(false);

  const ownedNFTs = useMemo(() => pokemonNFTs.filter((p) => ownedIds.includes(p.id)), []);
  const watchlistNFTs = useMemo(() => pokemonNFTs.filter((p) => favorites.includes(p.id)), [favorites]);
  const portfolioValue = useMemo(() => ownedNFTs.reduce((sum, p) => sum + p.price, 0), [ownedNFTs]);
  const avgPrice = portfolioValue / ownedNFTs.length;

  const rarityBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    ownedNFTs.forEach((p) => { counts[p.rarity] = (counts[p.rarity] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [ownedNFTs]);

  const rarityPieColors: Record<string, string> = {
    legendary: '#f97316', epic: '#a855f7', rare: '#3b82f6', uncommon: '#22c55e', common: '#6b7280',
  };

  const address = wallet.address || '0x1a2b...3c4d';
  const copyAddr = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { key: 'owned' as const, label: `Owned (${ownedNFTs.length})`, icon: Image },
    { key: 'watchlist' as const, label: `Watchlist (${watchlistNFTs.length})`, icon: Heart },
    { key: 'activity' as const, label: 'Activity', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon-purple">
              <Wallet className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="font-display font-black text-2xl text-foreground mb-1">Trainer Profile</h1>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">{address}</span>
                <button onClick={copyAddr} className="text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-neon-green" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              {!wallet.isConnected && (
                <button onClick={connect} className="mt-3 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-neon-purple flex items-center gap-2">
                  <MetaMaskIcon className="w-4 h-4" /> Connect MetaMask
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Portfolio Value', value: `${portfolioValue.toFixed(1)} ETH`, change: '+14.2%', up: true },
              { label: 'NFTs Owned', value: ownedNFTs.length.toString(), change: '+3', up: true },
              { label: 'Avg. Price', value: `${avgPrice.toFixed(2)} ETH`, change: '+5.8%', up: true },
              { label: 'Watchlist', value: watchlistNFTs.length.toString(), change: `${watchlistNFTs.length}`, up: true },
            ].map((s) => (
              <div key={s.label} className="bg-secondary/50 rounded-xl p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="font-display font-bold text-xl text-foreground mt-1">{s.value}</p>
                <span className={`text-[10px] font-semibold flex items-center gap-0.5 mt-1 ${s.up ? 'text-neon-green' : 'text-destructive'}`}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} {s.change}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-4">Rarity Breakdown</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={rarityBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {rarityBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={rarityPieColors[entry.name] || '#6b7280'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {rarityBreakdown.map((r) => (
                  <div key={r.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 capitalize">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rarityPieColors[r.name] }} />
                      {r.name}
                    </span>
                    <span className="font-semibold text-foreground">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Quick Stats</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Most Valuable</span><span className="text-foreground font-semibold">Arceus</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rarest</span><span className="text-foreground font-semibold">Mew</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Member Since</span><span className="text-foreground font-semibold">Jan 2024</span></div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>

            {(activeTab === 'owned' || activeTab === 'watchlist') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {(activeTab === 'owned' ? ownedNFTs : watchlistNFTs).map((nft, i) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="relative bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-neon-purple"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)' }}
                  >
                    {activeTab === 'watchlist' && (
                      <button
                        onClick={() => toggleFavorite(nft.id)}
                        className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-neon-pink hover:bg-black/70 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <Link to={`/pokemon/${nft.id}`}>
                      <div className={`h-36 bg-gradient-to-br ${getTypeGradient(nft.type)} p-4 flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <img src={nft.image} alt={nft.name} className="relative z-10 w-24 h-24 object-contain drop-shadow-xl" loading="lazy" />
                        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${getRarityClass(nft.rarity)}`}>{nft.rarity}</span>
                      </div>
                      <div className="p-3">
                        <p className="font-display font-semibold text-sm text-foreground">{nft.name}</p>
                        <p className="font-display font-bold text-foreground mt-1">{nft.price} <span className="text-xs text-muted-foreground">ETH</span></p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                {activeTab === 'watchlist' && watchlistNFTs.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No favorites yet. Click the heart on any Pokémon to add it!</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Pokémon</th>
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Price</th>
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium hidden md:table-cell">From</th>
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium hidden md:table-cell">To</th>
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Time</th>
                        <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Tx</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((tx, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                              tx.type === 'buy' ? 'bg-neon-green/10 text-neon-green' :
                              tx.type === 'sell' ? 'bg-neon-pink/10 text-neon-pink' :
                              tx.type === 'mint' ? 'bg-neon-purple/10 text-neon-purple' :
                              'bg-neon-orange/10 text-neon-orange'
                            }`}>{tx.type}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Link to={`/pokemon/${tx.pokemonId}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${tx.pokemonId}.png`} alt={tx.pokemon} className="w-7 h-7 object-contain" />
                              <span className="font-medium text-foreground">{tx.pokemon}</span>
                            </Link>
                          </td>
                          <td className="py-3 px-4 font-display font-semibold text-foreground">{tx.price} ETH</td>
                          <td className="py-3 px-4 font-mono text-xs text-muted-foreground hidden md:table-cell">{tx.from}</td>
                          <td className="py-3 px-4 font-mono text-xs text-muted-foreground hidden md:table-cell">{tx.to}</td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">{tx.time}</td>
                          <td className="py-3 px-4"><button className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink className="w-3.5 h-3.5" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
