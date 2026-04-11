import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import { PokemonNFT, getRarityClass, getTypeGradient } from '@/lib/pokemon-data';
import { useState } from 'react';

interface Props {
  pokemon: PokemonNFT;
  index: number;
}

export const PokemonCard = ({ pokemon, index }: Props) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-neon-purple"
    >
      {/* Image area */}
      <div className={`relative h-48 bg-gradient-to-br ${getTypeGradient(pokemon.type)} p-4 flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-10 w-32 h-32 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getRarityClass(pokemon.rarity)}`}>
          {pokemon.rarity}
        </span>
        <span className="absolute top-3 right-3 text-xs font-mono text-primary-foreground/70">
          #{String(pokemon.id).padStart(4, '0')}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-sm text-foreground">{pokemon.name}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-medium">{pokemon.type}</span>
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

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-pink transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-neon-pink text-neon-pink' : ''}`} />
            {pokemon.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gradient-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
            Buy Now <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
