import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { pokemonNFTs, getTypeGradient, getRarityClass, generateBidHistory, generateTraits } from '@/lib/pokemon-data';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Heart, Share2, ExternalLink, Clock, TrendingUp, Shield, Eye, ShoppingCart } from 'lucide-react';
import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/hooks/useWallet';
import { toast } from 'sonner';

const priceHistoryMock = [
  { date: 'W1', price: 0 }, { date: 'W2', price: 0 }, { date: 'W3', price: 0 },
  { date: 'W4', price: 0 }, { date: 'W5', price: 0 }, { date: 'W6', price: 0 },
  { date: 'W7', price: 0 }, { date: 'W8', price: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xs font-semibold text-foreground">{payload[0]?.value?.toFixed(2)} ETH</p>
    </div>
  );
};

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { add, has } = useCart();
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [showBidSuccess, setShowBidSuccess] = useState(false);

  const pokemon = useMemo(() => pokemonNFTs.find((p) => p.id === Number(id)), [id]);

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-muted-foreground font-display text-xl">Pokémon not found</p>
          <Link to="/" className="text-primary underline mt-4 inline-block">Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const liked = isFavorite(pokemon.id);
  const inCart = has(pokemon.id);
  const bids = generateBidHistory(pokemon.price);
  const traits = generateTraits(pokemon);
  const priceData = priceHistoryMock.map((d, i) => ({
    ...d,
    price: pokemon.floor * (0.6 + Math.random() * 0.5 + i * 0.05),
  }));

  const handlePlaceBid = async () => {
    const amt = parseFloat(bidAmount);
    if (!amt || amt <= 0) return;
    if (!wallet.isConnected) { toast.error('Connect your wallet first'); return; }
    const { error } = await supabase.from('bids').insert({
      nft_id: crypto.randomUUID(),
      bidder_wallet: wallet.address || '0xYou',
      amount: amt,
    });
    if (error) { toast.error('Bid failed'); return; }
    setShowBidSuccess(true);
    toast.success(`Bid of ${amt} ETH placed on ${pokemon.name}`);
    setTimeout(() => setShowBidSuccess(false), 3000);
    setBidAmount('');
  };

  const handleBuyNow = async () => {
    if (!wallet.isConnected) { toast.error('Connect your wallet first'); return; }
    const { error } = await supabase.from('transactions').insert({
      nft_id: crypto.randomUUID(),
      nft_name: pokemon.name,
      nft_image: pokemon.image,
      price: pokemon.price,
      seller_wallet: pokemon.owner,
      buyer_wallet: wallet.address || '0xYou',
      tx_type: 'sale',
    });
    if (error) { toast.error('Purchase failed'); return; }
    toast.success(`You bought ${pokemon.name} for ${pokemon.price} ETH!`);
    setTimeout(() => navigate('/profile'), 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${getTypeGradient(pokemon.type)} p-8 flex items-center justify-center aspect-square max-h-[500px]`}>
              <div className="absolute inset-0 bg-black/10" />
              <motion.img
                src={pokemon.image}
                alt={pokemon.name}
                className="relative z-10 w-3/4 h-3/4 object-contain drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getRarityClass(pokemon.rarity)}`}>
                {pokemon.rarity}
              </span>
              <span className="absolute top-4 right-4 font-mono text-sm text-white/70">#{String(pokemon.id).padStart(4, '0')}</span>
            </div>

            <div className="mt-6">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Traits
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {traits.map((t) => (
                  <div key={t.trait} className="bg-card border border-border rounded-lg p-3 hover:border-primary/30 transition-colors">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.trait}</p>
                    <p className="text-sm font-semibold text-foreground capitalize">{t.value}</p>
                    <p className="text-[10px] text-neon-cyan">{t.rarity}% have this</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-medium">{pokemon.type}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" /> 2.4k views</span>
              </div>
              <h1 className="font-display font-black text-3xl md:text-4xl text-foreground">{pokemon.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <button onClick={() => toggleFavorite(pokemon.id)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                  <Heart className={`w-4 h-4 transition-all ${liked ? 'fill-neon-pink text-neon-pink' : ''}`} /> {pokemon.likes + (liked ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Current Owner</p>
              <p className="font-mono text-sm text-foreground">{pokemon.owner}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Price</p>
                  <p className="font-display font-black text-3xl text-foreground">{pokemon.price} <span className="text-lg text-muted-foreground">{pokemon.currency}</span></p>
                </div>
                <p className="text-xs text-muted-foreground">Floor: {pokemon.floor} ETH</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-lg bg-gradient-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity shadow-neon-purple flex items-center justify-center gap-2">
                  Buy Now <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button className="py-3 rounded-lg border border-primary text-primary font-display font-semibold text-sm hover:bg-primary/10 transition-colors">
                  Make Offer
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Place a Bid</h3>
              {showBidSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 p-3 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm">
                  Bid placed successfully!
                </motion.div>
              )}
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter bid amount (ETH)"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <button onClick={handlePlaceBid} className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">Bid</button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon-green" /> Price History
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id="gPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(270,100%,65%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(270,100%,65%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230,15%,18%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="price" stroke="hsl(270,100%,65%)" fill="url(#gPrice)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-cyan" /> Bid History
              </h3>
              <div className="space-y-2">
                {bids.map((bid, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</div>
                      <div>
                        <p className="font-mono text-xs text-foreground">{bid.bidder}</p>
                        <p className="text-[10px] text-muted-foreground">{bid.time}</p>
                      </div>
                    </div>
                    <p className="font-display font-semibold text-sm text-foreground">{bid.amount.toFixed(2)} ETH</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
