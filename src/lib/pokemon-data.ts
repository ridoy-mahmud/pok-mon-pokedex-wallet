export interface PokemonNFT {
  id: number;
  name: string;
  image: string;
  price: number;
  currency: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  type: string;
  owner: string;
  likes: number;
  floor: number;
  volume24h: number;
}

const rarityColors: Record<string, string> = {
  common: 'bg-muted text-muted-foreground',
  uncommon: 'bg-neon-green/20 text-neon-green',
  rare: 'bg-neon-blue/20 text-neon-blue',
  epic: 'bg-neon-purple/20 text-neon-purple',
  legendary: 'bg-neon-orange/20 text-neon-orange',
};

export const getRarityClass = (rarity: string) => rarityColors[rarity] || rarityColors.common;

export const pokemonNFTs: PokemonNFT[] = [
  { id: 25, name: "Pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", price: 2.5, currency: "ETH", rarity: "legendary", type: "Electric", owner: "0x1a2b...3c4d", likes: 1248, floor: 2.1, volume24h: 45.2 },
  { id: 6, name: "Charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", price: 5.8, currency: "ETH", rarity: "legendary", type: "Fire", owner: "0x5e6f...7g8h", likes: 2156, floor: 5.0, volume24h: 89.3 },
  { id: 150, name: "Mewtwo", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png", price: 8.2, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0x9i0j...1k2l", likes: 3421, floor: 7.5, volume24h: 120.5 },
  { id: 1, name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", price: 0.8, currency: "ETH", rarity: "uncommon", type: "Grass", owner: "0x3m4n...5o6p", likes: 542, floor: 0.6, volume24h: 12.1 },
  { id: 9, name: "Blastoise", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png", price: 3.2, currency: "ETH", rarity: "epic", type: "Water", owner: "0x7q8r...9s0t", likes: 987, floor: 2.8, volume24h: 34.7 },
  { id: 94, name: "Gengar", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png", price: 4.1, currency: "ETH", rarity: "epic", type: "Ghost", owner: "0xa1b2...c3d4", likes: 1567, floor: 3.5, volume24h: 56.8 },
  { id: 149, name: "Dragonite", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png", price: 6.3, currency: "ETH", rarity: "legendary", type: "Dragon", owner: "0xe5f6...g7h8", likes: 2034, floor: 5.5, volume24h: 78.2 },
  { id: 130, name: "Gyarados", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png", price: 3.7, currency: "ETH", rarity: "epic", type: "Water", owner: "0xi9j0...k1l2", likes: 1123, floor: 3.0, volume24h: 41.5 },
  { id: 143, name: "Snorlax", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png", price: 1.9, currency: "ETH", rarity: "rare", type: "Normal", owner: "0xm3n4...o5p6", likes: 876, floor: 1.5, volume24h: 23.4 },
  { id: 131, name: "Lapras", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png", price: 2.8, currency: "ETH", rarity: "rare", type: "Water", owner: "0xq7r8...s9t0", likes: 934, floor: 2.3, volume24h: 29.8 },
  { id: 448, name: "Lucario", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png", price: 4.5, currency: "ETH", rarity: "epic", type: "Fighting", owner: "0xu1v2...w3x4", likes: 1789, floor: 3.8, volume24h: 62.1 },
  { id: 384, name: "Rayquaza", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png", price: 9.5, currency: "ETH", rarity: "legendary", type: "Dragon", owner: "0xy5z6...a7b8", likes: 4012, floor: 8.8, volume24h: 156.3 },
  { id: 133, name: "Eevee", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png", price: 1.2, currency: "ETH", rarity: "uncommon", type: "Normal", owner: "0xc9d0...e1f2", likes: 2345, floor: 0.9, volume24h: 18.6 },
  { id: 282, name: "Gardevoir", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png", price: 3.9, currency: "ETH", rarity: "epic", type: "Psychic", owner: "0xg3h4...i5j6", likes: 1456, floor: 3.2, volume24h: 48.9 },
  { id: 445, name: "Garchomp", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png", price: 5.1, currency: "ETH", rarity: "epic", type: "Dragon", owner: "0xk7l8...m9n0", likes: 1678, floor: 4.5, volume24h: 67.4 },
  { id: 658, name: "Greninja", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png", price: 3.4, currency: "ETH", rarity: "rare", type: "Water", owner: "0xo1p2...q3r4", likes: 1234, floor: 2.9, volume24h: 38.2 },
  { id: 248, name: "Tyranitar", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png", price: 4.8, currency: "ETH", rarity: "epic", type: "Rock", owner: "0xs5t6...u7v8", likes: 1345, floor: 4.1, volume24h: 55.6 },
  { id: 249, name: "Lugia", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png", price: 7.6, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0xw9x0...y1z2", likes: 2890, floor: 6.8, volume24h: 98.7 },
  { id: 4, name: "Charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png", price: 0.5, currency: "ETH", rarity: "common", type: "Fire", owner: "0xa3b4...c5d6", likes: 678, floor: 0.3, volume24h: 8.9 },
  { id: 7, name: "Squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", price: 0.6, currency: "ETH", rarity: "common", type: "Water", owner: "0xe7f8...g9h0", likes: 589, floor: 0.4, volume24h: 7.2 },
];

export const typeColors: Record<string, string> = {
  Electric: "from-yellow-400 to-yellow-600",
  Fire: "from-orange-400 to-red-600",
  Water: "from-blue-400 to-blue-600",
  Grass: "from-green-400 to-green-600",
  Psychic: "from-pink-400 to-purple-600",
  Ghost: "from-purple-400 to-indigo-600",
  Dragon: "from-indigo-400 to-blue-800",
  Normal: "from-gray-400 to-gray-600",
  Fighting: "from-red-400 to-red-700",
  Rock: "from-yellow-600 to-amber-800",
};

export const getTypeGradient = (type: string) => typeColors[type] || typeColors.Normal;
