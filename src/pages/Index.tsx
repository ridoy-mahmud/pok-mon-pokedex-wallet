import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PokemonCard } from '@/components/PokemonCard';
import { pokemonNFTs } from '@/lib/pokemon-data';

const rarityFilters = ['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'] as const;
const typeFilters = ['All', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Dragon', 'Ghost', 'Fighting', 'Normal', 'Rock'] as const;

const Index = () => {
  const [search, setSearch] = useState('');
  const [rarity, setRarity] = useState<string>('all');
  const [type, setType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-desc');
  const [compact, setCompact] = useState(false);

  const filtered = useMemo(() => {
    let result = pokemonNFTs.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (rarity !== 'all' && p.rarity !== rarity) return false;
      if (type !== 'All' && p.type !== type) return false;
      return true;
    });
    result.sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });
    return result;
  }, [search, rarity, type, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Filters */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">Explore Pokémon</h2>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} NFTs available</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-56"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="name">Name</option>
            </select>

            <button
              onClick={() => setCompact(!compact)}
              className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              {compact ? <LayoutGrid className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Rarity filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rarityFilters.map((r) => (
            <button
              key={r}
              onClick={() => setRarity(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                rarity === r
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                type === t
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`grid gap-5 ${compact ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {filtered.map((pokemon, i) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-display">No Pokémon found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
