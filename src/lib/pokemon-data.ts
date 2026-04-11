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

const img = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const pokemonNFTs: PokemonNFT[] = [
  // Original 20
  { id: 25, name: "Pikachu", image: img(25), price: 2.5, currency: "ETH", rarity: "legendary", type: "Electric", owner: "0x1a2b...3c4d", likes: 1248, floor: 2.1, volume24h: 45.2 },
  { id: 6, name: "Charizard", image: img(6), price: 5.8, currency: "ETH", rarity: "legendary", type: "Fire", owner: "0x5e6f...7g8h", likes: 2156, floor: 5.0, volume24h: 89.3 },
  { id: 150, name: "Mewtwo", image: img(150), price: 8.2, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0x9i0j...1k2l", likes: 3421, floor: 7.5, volume24h: 120.5 },
  { id: 1, name: "Bulbasaur", image: img(1), price: 0.8, currency: "ETH", rarity: "uncommon", type: "Grass", owner: "0x3m4n...5o6p", likes: 542, floor: 0.6, volume24h: 12.1 },
  { id: 9, name: "Blastoise", image: img(9), price: 3.2, currency: "ETH", rarity: "epic", type: "Water", owner: "0x7q8r...9s0t", likes: 987, floor: 2.8, volume24h: 34.7 },
  { id: 94, name: "Gengar", image: img(94), price: 4.1, currency: "ETH", rarity: "epic", type: "Ghost", owner: "0xa1b2...c3d4", likes: 1567, floor: 3.5, volume24h: 56.8 },
  { id: 149, name: "Dragonite", image: img(149), price: 6.3, currency: "ETH", rarity: "legendary", type: "Dragon", owner: "0xe5f6...g7h8", likes: 2034, floor: 5.5, volume24h: 78.2 },
  { id: 130, name: "Gyarados", image: img(130), price: 3.7, currency: "ETH", rarity: "epic", type: "Water", owner: "0xi9j0...k1l2", likes: 1123, floor: 3.0, volume24h: 41.5 },
  { id: 143, name: "Snorlax", image: img(143), price: 1.9, currency: "ETH", rarity: "rare", type: "Normal", owner: "0xm3n4...o5p6", likes: 876, floor: 1.5, volume24h: 23.4 },
  { id: 131, name: "Lapras", image: img(131), price: 2.8, currency: "ETH", rarity: "rare", type: "Water", owner: "0xq7r8...s9t0", likes: 934, floor: 2.3, volume24h: 29.8 },
  { id: 448, name: "Lucario", image: img(448), price: 4.5, currency: "ETH", rarity: "epic", type: "Fighting", owner: "0xu1v2...w3x4", likes: 1789, floor: 3.8, volume24h: 62.1 },
  { id: 384, name: "Rayquaza", image: img(384), price: 9.5, currency: "ETH", rarity: "legendary", type: "Dragon", owner: "0xy5z6...a7b8", likes: 4012, floor: 8.8, volume24h: 156.3 },
  { id: 133, name: "Eevee", image: img(133), price: 1.2, currency: "ETH", rarity: "uncommon", type: "Normal", owner: "0xc9d0...e1f2", likes: 2345, floor: 0.9, volume24h: 18.6 },
  { id: 282, name: "Gardevoir", image: img(282), price: 3.9, currency: "ETH", rarity: "epic", type: "Psychic", owner: "0xg3h4...i5j6", likes: 1456, floor: 3.2, volume24h: 48.9 },
  { id: 445, name: "Garchomp", image: img(445), price: 5.1, currency: "ETH", rarity: "epic", type: "Dragon", owner: "0xk7l8...m9n0", likes: 1678, floor: 4.5, volume24h: 67.4 },
  { id: 658, name: "Greninja", image: img(658), price: 3.4, currency: "ETH", rarity: "rare", type: "Water", owner: "0xo1p2...q3r4", likes: 1234, floor: 2.9, volume24h: 38.2 },
  { id: 248, name: "Tyranitar", image: img(248), price: 4.8, currency: "ETH", rarity: "epic", type: "Rock", owner: "0xs5t6...u7v8", likes: 1345, floor: 4.1, volume24h: 55.6 },
  { id: 249, name: "Lugia", image: img(249), price: 7.6, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0xw9x0...y1z2", likes: 2890, floor: 6.8, volume24h: 98.7 },
  { id: 4, name: "Charmander", image: img(4), price: 0.5, currency: "ETH", rarity: "common", type: "Fire", owner: "0xa3b4...c5d6", likes: 678, floor: 0.3, volume24h: 8.9 },
  { id: 7, name: "Squirtle", image: img(7), price: 0.6, currency: "ETH", rarity: "common", type: "Water", owner: "0xe7f8...g9h0", likes: 589, floor: 0.4, volume24h: 7.2 },
  // 50 new Pokémon
  { id: 3, name: "Venusaur", image: img(3), price: 3.0, currency: "ETH", rarity: "epic", type: "Grass", owner: "0xf1a2...b3c4", likes: 1102, floor: 2.5, volume24h: 33.1 },
  { id: 5, name: "Charmeleon", image: img(5), price: 1.1, currency: "ETH", rarity: "uncommon", type: "Fire", owner: "0xd5e6...f7g8", likes: 412, floor: 0.8, volume24h: 10.3 },
  { id: 8, name: "Wartortle", image: img(8), price: 1.0, currency: "ETH", rarity: "uncommon", type: "Water", owner: "0xh9i0...j1k2", likes: 398, floor: 0.7, volume24h: 9.5 },
  { id: 2, name: "Ivysaur", image: img(2), price: 0.9, currency: "ETH", rarity: "uncommon", type: "Grass", owner: "0xl3m4...n5o6", likes: 367, floor: 0.6, volume24h: 8.1 },
  { id: 10, name: "Caterpie", image: img(10), price: 0.1, currency: "ETH", rarity: "common", type: "Bug", owner: "0xp7q8...r9s0", likes: 89, floor: 0.05, volume24h: 1.2 },
  { id: 12, name: "Butterfree", image: img(12), price: 0.7, currency: "ETH", rarity: "common", type: "Bug", owner: "0xt1u2...v3w4", likes: 234, floor: 0.5, volume24h: 5.6 },
  { id: 18, name: "Pidgeot", image: img(18), price: 0.8, currency: "ETH", rarity: "uncommon", type: "Flying", owner: "0xx5y6...z7a8", likes: 312, floor: 0.6, volume24h: 7.8 },
  { id: 26, name: "Raichu", image: img(26), price: 1.8, currency: "ETH", rarity: "rare", type: "Electric", owner: "0xb9c0...d1e2", likes: 756, floor: 1.4, volume24h: 19.2 },
  { id: 31, name: "Nidoqueen", image: img(31), price: 1.5, currency: "ETH", rarity: "rare", type: "Poison", owner: "0xf3g4...h5i6", likes: 534, floor: 1.2, volume24h: 14.5 },
  { id: 34, name: "Nidoking", image: img(34), price: 1.6, currency: "ETH", rarity: "rare", type: "Poison", owner: "0xj7k8...l9m0", likes: 567, floor: 1.3, volume24h: 15.8 },
  { id: 36, name: "Clefable", image: img(36), price: 0.9, currency: "ETH", rarity: "uncommon", type: "Fairy", owner: "0xn1o2...p3q4", likes: 456, floor: 0.7, volume24h: 8.9 },
  { id: 38, name: "Ninetales", image: img(38), price: 2.2, currency: "ETH", rarity: "rare", type: "Fire", owner: "0xr5s6...t7u8", likes: 1023, floor: 1.8, volume24h: 26.3 },
  { id: 45, name: "Vileplume", image: img(45), price: 0.6, currency: "ETH", rarity: "common", type: "Grass", owner: "0xv9w0...x1y2", likes: 198, floor: 0.4, volume24h: 4.2 },
  { id: 59, name: "Arcanine", image: img(59), price: 2.9, currency: "ETH", rarity: "rare", type: "Fire", owner: "0xz3a4...b5c6", likes: 1345, floor: 2.4, volume24h: 31.5 },
  { id: 65, name: "Alakazam", image: img(65), price: 3.3, currency: "ETH", rarity: "epic", type: "Psychic", owner: "0xd7e8...f9g0", likes: 1234, floor: 2.8, volume24h: 37.8 },
  { id: 68, name: "Machamp", image: img(68), price: 2.1, currency: "ETH", rarity: "rare", type: "Fighting", owner: "0xh1i2...j3k4", likes: 789, floor: 1.7, volume24h: 22.1 },
  { id: 76, name: "Golem", image: img(76), price: 1.3, currency: "ETH", rarity: "uncommon", type: "Rock", owner: "0xl5m6...n7o8", likes: 423, floor: 1.0, volume24h: 11.4 },
  { id: 78, name: "Rapidash", image: img(78), price: 1.7, currency: "ETH", rarity: "rare", type: "Fire", owner: "0xp9q0...r1s2", likes: 678, floor: 1.3, volume24h: 17.6 },
  { id: 89, name: "Muk", image: img(89), price: 0.4, currency: "ETH", rarity: "common", type: "Poison", owner: "0xt3u4...v5w6", likes: 134, floor: 0.2, volume24h: 2.8 },
  { id: 103, name: "Exeggutor", image: img(103), price: 0.7, currency: "ETH", rarity: "common", type: "Grass", owner: "0xx7y8...z9a0", likes: 267, floor: 0.5, volume24h: 5.3 },
  { id: 112, name: "Rhydon", image: img(112), price: 1.4, currency: "ETH", rarity: "uncommon", type: "Rock", owner: "0xb1c2...d3e4", likes: 478, floor: 1.1, volume24h: 12.7 },
  { id: 115, name: "Kangaskhan", image: img(115), price: 1.6, currency: "ETH", rarity: "rare", type: "Normal", owner: "0xf5g6...h7i8", likes: 534, floor: 1.2, volume24h: 14.9 },
  { id: 121, name: "Starmie", image: img(121), price: 1.1, currency: "ETH", rarity: "uncommon", type: "Water", owner: "0xj9k0...l1m2", likes: 389, floor: 0.8, volume24h: 9.8 },
  { id: 123, name: "Scyther", image: img(123), price: 2.0, currency: "ETH", rarity: "rare", type: "Bug", owner: "0xn3o4...p5q6", likes: 812, floor: 1.6, volume24h: 21.3 },
  { id: 126, name: "Magmar", image: img(126), price: 1.3, currency: "ETH", rarity: "uncommon", type: "Fire", owner: "0xr7s8...t9u0", likes: 456, floor: 1.0, volume24h: 11.6 },
  { id: 134, name: "Vaporeon", image: img(134), price: 2.0, currency: "ETH", rarity: "rare", type: "Water", owner: "0xv1w2...x3y4", likes: 1123, floor: 1.6, volume24h: 20.4 },
  { id: 135, name: "Jolteon", image: img(135), price: 1.9, currency: "ETH", rarity: "rare", type: "Electric", owner: "0xz5a6...b7c8", likes: 1045, floor: 1.5, volume24h: 19.7 },
  { id: 136, name: "Flareon", image: img(136), price: 1.8, currency: "ETH", rarity: "rare", type: "Fire", owner: "0xd9e0...f1g2", likes: 978, floor: 1.4, volume24h: 18.3 },
  { id: 141, name: "Kabutops", image: img(141), price: 2.3, currency: "ETH", rarity: "rare", type: "Rock", owner: "0xh3i4...j5k6", likes: 678, floor: 1.9, volume24h: 24.1 },
  { id: 142, name: "Aerodactyl", image: img(142), price: 3.5, currency: "ETH", rarity: "epic", type: "Rock", owner: "0xl7m8...n9o0", likes: 1234, floor: 3.0, volume24h: 39.5 },
  { id: 144, name: "Articuno", image: img(144), price: 6.8, currency: "ETH", rarity: "legendary", type: "Ice", owner: "0xp1q2...r3s4", likes: 2567, floor: 6.0, volume24h: 85.2 },
  { id: 145, name: "Zapdos", image: img(145), price: 7.1, currency: "ETH", rarity: "legendary", type: "Electric", owner: "0xt5u6...v7w8", likes: 2678, floor: 6.3, volume24h: 91.4 },
  { id: 146, name: "Moltres", image: img(146), price: 6.9, currency: "ETH", rarity: "legendary", type: "Fire", owner: "0xx9y0...z1a2", likes: 2456, floor: 6.1, volume24h: 87.6 },
  { id: 151, name: "Mew", image: img(151), price: 10.5, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0xb3c4...d5e6", likes: 4567, floor: 9.8, volume24h: 178.9 },
  { id: 157, name: "Typhlosion", image: img(157), price: 3.1, currency: "ETH", rarity: "epic", type: "Fire", owner: "0xf7g8...h9i0", likes: 1123, floor: 2.6, volume24h: 35.4 },
  { id: 160, name: "Feraligatr", image: img(160), price: 2.8, currency: "ETH", rarity: "epic", type: "Water", owner: "0xj1k2...l3m4", likes: 987, floor: 2.3, volume24h: 30.2 },
  { id: 154, name: "Meganium", image: img(154), price: 2.4, currency: "ETH", rarity: "rare", type: "Grass", owner: "0xn5o6...p7q8", likes: 756, floor: 2.0, volume24h: 25.8 },
  { id: 169, name: "Crobat", image: img(169), price: 1.2, currency: "ETH", rarity: "uncommon", type: "Poison", owner: "0xr9s0...t1u2", likes: 389, floor: 0.9, volume24h: 10.1 },
  { id: 181, name: "Ampharos", image: img(181), price: 2.3, currency: "ETH", rarity: "rare", type: "Electric", owner: "0xv3w4...x5y6", likes: 823, floor: 1.9, volume24h: 24.7 },
  { id: 196, name: "Espeon", image: img(196), price: 2.6, currency: "ETH", rarity: "rare", type: "Psychic", owner: "0xz7a8...b9c0", likes: 1156, floor: 2.1, volume24h: 28.3 },
  { id: 197, name: "Umbreon", image: img(197), price: 2.7, currency: "ETH", rarity: "rare", type: "Dark", owner: "0xd1e2...f3g4", likes: 1289, floor: 2.2, volume24h: 29.1 },
  { id: 212, name: "Scizor", image: img(212), price: 3.6, currency: "ETH", rarity: "epic", type: "Bug", owner: "0xh5i6...j7k8", likes: 1345, floor: 3.1, volume24h: 42.3 },
  { id: 214, name: "Heracross", image: img(214), price: 1.8, currency: "ETH", rarity: "rare", type: "Bug", owner: "0xl9m0...n1o2", likes: 678, floor: 1.4, volume24h: 18.9 },
  { id: 229, name: "Houndoom", image: img(229), price: 2.1, currency: "ETH", rarity: "rare", type: "Dark", owner: "0xp3q4...r5s6", likes: 789, floor: 1.7, volume24h: 22.6 },
  { id: 230, name: "Kingdra", image: img(230), price: 2.5, currency: "ETH", rarity: "rare", type: "Water", owner: "0xt7u8...v9w0", likes: 912, floor: 2.0, volume24h: 26.8 },
  { id: 243, name: "Raikou", image: img(243), price: 7.3, currency: "ETH", rarity: "legendary", type: "Electric", owner: "0xx1y2...z3a4", likes: 2345, floor: 6.5, volume24h: 93.1 },
  { id: 244, name: "Entei", image: img(244), price: 7.0, currency: "ETH", rarity: "legendary", type: "Fire", owner: "0xb5c6...d7e8", likes: 2234, floor: 6.2, volume24h: 88.4 },
  { id: 245, name: "Suicune", image: img(245), price: 7.5, currency: "ETH", rarity: "legendary", type: "Water", owner: "0xf9g0...h1i2", likes: 2567, floor: 6.7, volume24h: 96.2 },
  { id: 250, name: "Ho-Oh", image: img(250), price: 8.8, currency: "ETH", rarity: "legendary", type: "Fire", owner: "0xj3k4...l5m6", likes: 3123, floor: 8.0, volume24h: 134.5 },
  { id: 251, name: "Celebi", image: img(251), price: 6.5, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0xn7o8...p9q0", likes: 2123, floor: 5.8, volume24h: 82.1 },
  { id: 257, name: "Blaziken", image: img(257), price: 3.8, currency: "ETH", rarity: "epic", type: "Fire", owner: "0xr1s2...t3u4", likes: 1456, floor: 3.3, volume24h: 46.7 },
  { id: 260, name: "Swampert", image: img(260), price: 3.5, currency: "ETH", rarity: "epic", type: "Water", owner: "0xv5w6...x7y8", likes: 1234, floor: 3.0, volume24h: 40.2 },
  { id: 254, name: "Sceptile", image: img(254), price: 3.3, currency: "ETH", rarity: "epic", type: "Grass", owner: "0xz9a0...b1c2", likes: 1123, floor: 2.8, volume24h: 36.9 },
  { id: 289, name: "Slaking", image: img(289), price: 1.5, currency: "ETH", rarity: "rare", type: "Normal", owner: "0xd3e4...f5g6", likes: 534, floor: 1.2, volume24h: 14.2 },
  { id: 306, name: "Aggron", image: img(306), price: 2.4, currency: "ETH", rarity: "rare", type: "Steel", owner: "0xh7i8...j9k0", likes: 823, floor: 2.0, volume24h: 25.3 },
  { id: 330, name: "Flygon", image: img(330), price: 2.2, currency: "ETH", rarity: "rare", type: "Dragon", owner: "0xl1m2...n3o4", likes: 756, floor: 1.8, volume24h: 23.1 },
  { id: 350, name: "Milotic", image: img(350), price: 4.2, currency: "ETH", rarity: "epic", type: "Water", owner: "0xp5q6...r7s8", likes: 1567, floor: 3.6, volume24h: 51.2 },
  { id: 373, name: "Salamence", image: img(373), price: 5.5, currency: "ETH", rarity: "epic", type: "Dragon", owner: "0xt9u0...v1w2", likes: 1789, floor: 4.8, volume24h: 72.3 },
  { id: 376, name: "Metagross", image: img(376), price: 5.2, currency: "ETH", rarity: "epic", type: "Steel", owner: "0xx3y4...z5a6", likes: 1678, floor: 4.5, volume24h: 68.9 },
  { id: 380, name: "Latias", image: img(380), price: 6.1, currency: "ETH", rarity: "legendary", type: "Dragon", owner: "0xb7c8...d9e0", likes: 2012, floor: 5.4, volume24h: 79.5 },
  { id: 381, name: "Latios", image: img(381), price: 6.3, currency: "ETH", rarity: "legendary", type: "Dragon", owner: "0xf1g2...h3i4", likes: 2089, floor: 5.6, volume24h: 81.3 },
  { id: 383, name: "Groudon", image: img(383), price: 9.0, currency: "ETH", rarity: "legendary", type: "Fire", owner: "0xj5k6...l7m8", likes: 3456, floor: 8.2, volume24h: 142.1 },
  { id: 382, name: "Kyogre", image: img(382), price: 9.2, currency: "ETH", rarity: "legendary", type: "Water", owner: "0xn9o0...p1q2", likes: 3567, floor: 8.4, volume24h: 148.7 },
  { id: 386, name: "Deoxys", image: img(386), price: 7.8, currency: "ETH", rarity: "legendary", type: "Psychic", owner: "0xr3s4...t5u6", likes: 2678, floor: 7.0, volume24h: 102.4 },
  { id: 405, name: "Luxray", image: img(405), price: 1.7, currency: "ETH", rarity: "rare", type: "Electric", owner: "0xv7w8...x9y0", likes: 789, floor: 1.3, volume24h: 17.3 },
  { id: 392, name: "Infernape", image: img(392), price: 3.0, currency: "ETH", rarity: "epic", type: "Fire", owner: "0xz1a2...b3c4", likes: 1089, floor: 2.5, volume24h: 33.8 },
  { id: 395, name: "Empoleon", image: img(395), price: 2.8, currency: "ETH", rarity: "epic", type: "Water", owner: "0xd5e6...f7g8", likes: 978, floor: 2.3, volume24h: 30.1 },
  { id: 389, name: "Torterra", image: img(389), price: 2.6, currency: "ETH", rarity: "rare", type: "Grass", owner: "0xh9i0...j1k2", likes: 856, floor: 2.1, volume24h: 27.4 },
  { id: 461, name: "Weavile", image: img(461), price: 2.0, currency: "ETH", rarity: "rare", type: "Dark", owner: "0xl3m4...n5o6", likes: 712, floor: 1.6, volume24h: 20.8 },
  { id: 475, name: "Gallade", image: img(475), price: 3.1, currency: "ETH", rarity: "epic", type: "Fighting", owner: "0xp7q8...r9s0", likes: 1045, floor: 2.6, volume24h: 34.5 },
  { id: 493, name: "Arceus", image: img(493), price: 12.0, currency: "ETH", rarity: "legendary", type: "Normal", owner: "0xt1u2...v3w4", likes: 5678, floor: 11.0, volume24h: 210.3 },
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
  Bug: "from-lime-400 to-green-700",
  Poison: "from-purple-500 to-fuchsia-700",
  Flying: "from-sky-300 to-blue-500",
  Ice: "from-cyan-300 to-blue-400",
  Dark: "from-gray-700 to-gray-900",
  Steel: "from-slate-400 to-slate-600",
  Fairy: "from-pink-300 to-pink-500",
};

export const getTypeGradient = (type: string) => typeColors[type] || typeColors.Normal;

export interface BidHistory {
  bidder: string;
  amount: number;
  time: string;
}

export interface TraitInfo {
  trait: string;
  value: string;
  rarity: number;
}

export const generateBidHistory = (basePrice: number): BidHistory[] => [
  { bidder: "0xfa92...cd21", amount: basePrice * 0.85, time: "2h ago" },
  { bidder: "0x3b7e...a198", amount: basePrice * 0.78, time: "5h ago" },
  { bidder: "0xc4d1...f3e2", amount: basePrice * 0.72, time: "8h ago" },
  { bidder: "0x91a8...b5c7", amount: basePrice * 0.65, time: "12h ago" },
  { bidder: "0xe2f3...d4c5", amount: basePrice * 0.60, time: "1d ago" },
  { bidder: "0x7d8e...9f0a", amount: basePrice * 0.55, time: "2d ago" },
];

export const generateTraits = (pokemon: PokemonNFT): TraitInfo[] => [
  { trait: "Type", value: pokemon.type, rarity: Math.floor(Math.random() * 30) + 5 },
  { trait: "Rarity", value: pokemon.rarity, rarity: pokemon.rarity === 'legendary' ? 2 : pokemon.rarity === 'epic' ? 8 : pokemon.rarity === 'rare' ? 15 : 30 },
  { trait: "Generation", value: pokemon.id <= 151 ? "Gen I" : pokemon.id <= 251 ? "Gen II" : pokemon.id <= 386 ? "Gen III" : "Gen IV", rarity: 25 },
  { trait: "Background", value: ["Cosmic", "Neon", "Mystic", "Inferno", "Ocean"][pokemon.id % 5], rarity: 20 },
  { trait: "Aura", value: ["Golden", "Silver", "Diamond", "Emerald", "Ruby"][pokemon.id % 5], rarity: 12 },
  { trait: "Frame", value: ["Holographic", "Standard", "Premium", "Ultra"][pokemon.id % 4], rarity: pokemon.id % 4 === 0 ? 5 : 25 },
];

export interface Transaction {
  type: 'buy' | 'sell' | 'mint' | 'bid';
  pokemon: string;
  pokemonId: number;
  price: number;
  from: string;
  to: string;
  time: string;
  txHash: string;
}

export const mockTransactions: Transaction[] = [
  { type: 'buy', pokemon: 'Pikachu', pokemonId: 25, price: 2.5, from: '0xfa92...cd21', to: '0x1a2b...3c4d', time: '1h ago', txHash: '0xabc...123' },
  { type: 'sell', pokemon: 'Gengar', pokemonId: 94, price: 4.1, from: '0x1a2b...3c4d', to: '0x3b7e...a198', time: '3h ago', txHash: '0xdef...456' },
  { type: 'mint', pokemon: 'Eevee', pokemonId: 133, price: 0.05, from: 'Contract', to: '0x1a2b...3c4d', time: '6h ago', txHash: '0xghi...789' },
  { type: 'buy', pokemon: 'Charizard', pokemonId: 6, price: 5.8, from: '0xc4d1...f3e2', to: '0x1a2b...3c4d', time: '12h ago', txHash: '0xjkl...012' },
  { type: 'bid', pokemon: 'Mewtwo', pokemonId: 150, price: 7.9, from: '0x1a2b...3c4d', to: '0x9i0j...1k2l', time: '1d ago', txHash: '0xmno...345' },
  { type: 'sell', pokemon: 'Lucario', pokemonId: 448, price: 4.5, from: '0x1a2b...3c4d', to: '0x91a8...b5c7', time: '2d ago', txHash: '0xpqr...678' },
  { type: 'mint', pokemon: 'Mew', pokemonId: 151, price: 0.05, from: 'Contract', to: '0x1a2b...3c4d', time: '3d ago', txHash: '0xstu...901' },
  { type: 'buy', pokemon: 'Rayquaza', pokemonId: 384, price: 9.5, from: '0xe2f3...d4c5', to: '0x1a2b...3c4d', time: '5d ago', txHash: '0xvwx...234' },
];
