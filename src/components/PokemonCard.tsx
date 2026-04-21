import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { PokemonNFT, getRarityClass, getTypeGradient } from '@/lib/pokemon-data';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Props {
  pokemon: PokemonNFT;
  index: number;
}

const typeGlow: Record<string, string> = {
  Fire: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]',
  Water: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
  Electric: 'shadow-[0_0_30px_rgba(234,179,8,0.3)]',
  Grass: 'shadow-[0_0_30px_rgba(34,197,94,0.3)]',
  Psychic: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
  Dragon: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]',
  Ghost: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  Fighting: 'shadow-[0_0_30px_rgba(220,38,38,0.3)]',
  Ice: 'shadow-[0_0_30px_rgba(56,189,248,0.3)]',
  Dark: 'shadow-[0_0_30px_rgba(120,113,108,0.3)]',
  Fairy: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
  Steel: 'shadow-[0_0_30px_rgba(148,163,184,0.3)]',
};

export const PokemonCard = ({ pokemon, index }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { add, has } = useCart();
  const liked = isFavorite(pokemon.id);
  const inCart = has(pokemon.id);
  const glow = typeGlow[pokemon.type] || '';

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart) return;
    add(pokemon);
    toast.success(`${pokemon.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:${glow}
        bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl
        hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-2xl`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Liquid glass refraction overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.06) 0%, transparent 40%)',
        }}
      />

      <Link to={`/pokemon/${pokemon.id}`}>
        <div className={`relative h-48 bg-gradient-to-br ${getTypeGradient(pokemon.type)} p-4 flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/15" />
          {/* Animated type aura */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-60"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.15) 25%, transparent 50%, rgba(255,255,255,0.1) 75%, transparent 100%)',
            }}
          />
          <motion.img
            src={pokemon.image}
            alt={pokemon.name}
            className="relative z-10 w-32 h-32 object-contain drop-shadow-2xl"
            loading="lazy"
            whileHover={{ scale: 1.15, rotate: [0, -3, 3, 0] }}
            transition={{ duration: 0.5 }}
          />
          <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getRarityClass(pokemon.rarity)}`}>
            {pokemon.rarity}
          </span>
          <span className="absolute top-3 right-3 text-xs font-mono text-white/60">
            #{String(pokemon.id).padStart(4, '0')}
          </span>
        </div>
      </Link>

      <div className="p-4 space-y-3 relative">
        <div className="flex items-center justify-between">
          <Link to={`/pokemon/${pokemon.id}`}>
            <h3 className="font-display font-semibold text-sm text-foreground hover:text-primary transition-colors">{pokemon.name}</h3>
          </Link>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-secondary-foreground font-medium backdrop-blur-sm">{pokemon.type}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Price</p>
            <p className="font-display font-bold text-foreground">{pokemon.price} <span className="text-xs text-muted-foreground">{pokemon.currency}</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Floor</p>
            <p className="text-sm font-semibold text-foreground">{pokemon.floor} ETH</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(pokemon.id); }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-pink transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 transition-all duration-300 ${liked ? 'fill-neon-pink text-neon-pink scale-110' : ''}`} />
            {pokemon.likes + (liked ? 1 : 0)}
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddCart}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                inCart
                  ? 'bg-neon-green/15 border-neon-green/30 text-neon-green'
                  : 'bg-white/[0.08] border-white/[0.1] text-foreground hover:bg-white/[0.15]'
              }`}
              aria-label="Add to cart"
            >
              {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            </button>
            <Link
              to={`/pokemon/${pokemon.id}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm text-foreground text-xs font-medium hover:bg-white/[0.15] transition-all"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
