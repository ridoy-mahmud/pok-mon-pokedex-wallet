import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: 'Total Volume', value: '12,450 ETH', icon: TrendingUp },
  { label: 'NFTs Minted', value: '8,234', icon: Sparkles },
  { label: 'Active Trainers', value: '5,678', icon: Users },
];

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The #1 Pokémon NFT Marketplace
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="text-foreground">Collect </span>
            <span className="text-gradient-primary">Legendary</span>
            <br />
            <span className="text-foreground">Pokémon NFTs</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Discover, collect and trade unique Pokémon digital collectibles on the blockchain. Own your favorites forever.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <button className="px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-all shadow-neon-purple">
              Explore Collection
            </button>
            <button className="px-8 py-3.5 rounded-lg border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary transition-all">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
