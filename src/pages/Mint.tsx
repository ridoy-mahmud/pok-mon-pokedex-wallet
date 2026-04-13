import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useWallet } from '@/hooks/useWallet';
import { ParticleEffect } from '@/components/ParticleEffect';
import { MetaMaskIcon } from '@/components/MetaMaskIcon';
import { Sparkles, Zap, Check, AlertCircle, Loader2 } from 'lucide-react';

const pokemonMintOptions = [
  { id: 10, name: "Caterpie", type: "Bug", rarity: "common", cost: 0.01 },
  { id: 16, name: "Pidgey", type: "Flying", rarity: "common", cost: 0.01 },
  { id: 19, name: "Rattata", type: "Normal", rarity: "common", cost: 0.01 },
  { id: 35, name: "Clefairy", type: "Fairy", rarity: "uncommon", cost: 0.03 },
  { id: 37, name: "Vulpix", type: "Fire", rarity: "uncommon", cost: 0.03 },
  { id: 39, name: "Jigglypuff", type: "Fairy", rarity: "uncommon", cost: 0.03 },
  { id: 58, name: "Growlithe", type: "Fire", rarity: "uncommon", cost: 0.03 },
  { id: 63, name: "Abra", type: "Psychic", rarity: "rare", cost: 0.08 },
  { id: 66, name: "Machop", type: "Fighting", rarity: "rare", cost: 0.08 },
  { id: 92, name: "Gastly", type: "Ghost", rarity: "rare", cost: 0.08 },
  { id: 147, name: "Dratini", type: "Dragon", rarity: "epic", cost: 0.15 },
  { id: 246, name: "Larvitar", type: "Rock", rarity: "epic", cost: 0.15 },
  { id: 443, name: "Gible", type: "Dragon", rarity: "epic", cost: 0.15 },
];

const rarityTiers = [
  { tier: "Common", cost: "0.01 ETH", chance: "40%", color: "text-muted-foreground" },
  { tier: "Uncommon", cost: "0.03 ETH", chance: "30%", color: "text-neon-green" },
  { tier: "Rare", cost: "0.08 ETH", chance: "20%", color: "text-neon-blue" },
  { tier: "Epic", cost: "0.15 ETH", chance: "8%", color: "text-neon-purple" },
  { tier: "Legendary", cost: "0.50 ETH", chance: "2%", color: "text-neon-orange" },
];

type MintStep = 'select' | 'confirm' | 'minting' | 'success';

const Mint = () => {
  const { wallet, connect } = useWallet();
  const [step, setStep] = useState<MintStep>('select');
  const [selectedPokemon, setSelectedPokemon] = useState<typeof pokemonMintOptions[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mintedResult, setMintedResult] = useState<{ name: string; id: number; rarity: string } | null>(null);

  const handleMint = () => {
    if (!selectedPokemon) return;
    setStep('confirm');
  };

  const confirmMint = () => {
    setStep('minting');
    setTimeout(() => {
      const roll = Math.random();
      const rarity = roll < 0.02 ? 'legendary' : roll < 0.1 ? 'epic' : roll < 0.3 ? 'rare' : roll < 0.6 ? 'uncommon' : 'common';
      setMintedResult({ name: selectedPokemon!.name, id: selectedPokemon!.id, rarity });
      setStep('success');
    }, 3000);
  };

  const reset = () => {
    setStep('select');
    setSelectedPokemon(null);
    setMintedResult(null);
    setQuantity(1);
  };

  const img = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Mint Your Pokémon NFT
          </div>
          <h1 className="font-display font-black text-3xl md:text-5xl text-foreground mb-3">
            Mint <span className="text-gradient-primary">Unique</span> Pokémon
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Choose a Pokémon, pay the gas fee, and receive a randomly rarified NFT minted directly to your wallet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {!wallet.isConnected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 rounded-xl bg-card border border-primary/20 flex items-center gap-4">
                      <MetaMaskIcon className="w-10 h-10" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Connect your wallet to mint</p>
                        <p className="text-xs text-muted-foreground">MetaMask required for minting</p>
                      </div>
                      <button onClick={connect} className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium shadow-neon-purple hover:opacity-90 transition-opacity flex items-center gap-2">
                        <MetaMaskIcon className="w-4 h-4" /> Connect
                      </button>
                    </motion.div>
                  )}
                  <h3 className="font-display font-semibold text-foreground mb-4">Choose a Pokémon to Mint</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {pokemonMintOptions.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPokemon(p)}
                        className={`bg-white/[0.04] border backdrop-blur-xl rounded-xl p-4 text-center transition-all hover:bg-white/[0.08] hover:border-primary/50 ${
                          selectedPokemon?.id === p.id ? 'border-primary shadow-neon-purple bg-white/[0.08]' : 'border-white/[0.08]'
                        }`}
                        style={{ boxShadow: selectedPokemon?.id === p.id ? undefined : 'inset 0 1px 1px rgba(255,255,255,0.06)' }}
                      >
                        <img src={img(p.id)} alt={p.name} className="w-16 h-16 mx-auto object-contain mb-2" loading="lazy" />
                        <p className="font-display font-semibold text-sm text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.type} · <span className="capitalize">{p.rarity}</span></p>
                        <p className="text-xs font-semibold text-primary mt-1">{p.cost} ETH</p>
                      </button>
                    ))}
                  </div>

                  {selectedPokemon && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={img(selectedPokemon.id)} alt={selectedPokemon.name} className="w-20 h-20 object-contain" />
                        <div>
                          <h4 className="font-display font-bold text-lg text-foreground">{selectedPokemon.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{selectedPokemon.rarity} · {selectedPokemon.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <label className="text-sm text-muted-foreground">Quantity:</label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded bg-secondary text-foreground flex items-center justify-center hover:bg-primary/20 transition-colors">-</button>
                          <span className="font-display font-bold text-foreground w-8 text-center">{quantity}</span>
                          <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 rounded bg-secondary text-foreground flex items-center justify-center hover:bg-primary/20 transition-colors">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4 py-3 border-t border-border">
                        <span className="text-sm text-muted-foreground">Total Cost</span>
                        <span className="font-display font-bold text-xl text-foreground">{(selectedPokemon.cost * quantity).toFixed(2)} ETH</span>
                      </div>
                      <button onClick={handleMint} className="w-full py-3 rounded-lg bg-gradient-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity shadow-neon-purple flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" /> Proceed to Mint
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 'confirm' && selectedPokemon && (
                <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-card border border-border rounded-xl p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-neon-orange mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Confirm Mint</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    You are about to mint {quantity}x <strong>{selectedPokemon.name}</strong> for{' '}
                    <strong>{(selectedPokemon.cost * quantity).toFixed(2)} ETH</strong>.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => setStep('select')} className="px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">Cancel</button>
                    <button onClick={confirmMint} className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-neon-purple">Confirm & Mint</button>
                  </div>
                </motion.div>
              )}

              {step === 'minting' && (
                <motion.div key="minting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-card border border-border rounded-xl p-10 text-center">
                  <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Minting in Progress...</h3>
                  <p className="text-muted-foreground text-sm">Interacting with smart contract. Please wait...</p>
                  <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                    <p>✓ Wallet connected</p>
                    <p>✓ Transaction submitted</p>
                    <p className="text-primary animate-pulse">⟳ Awaiting confirmation...</p>
                  </div>
                </motion.div>
              )}

              {step === 'success' && mintedResult && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-card border border-border rounded-xl p-8 text-center overflow-hidden">
                  <ParticleEffect count={60} active={true} />
                  
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                    <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                      <Check className="w-10 h-10 text-neon-green" />
                    </div>
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2 relative z-10">Mint Successful!</h3>
                  <p className="text-muted-foreground text-sm mb-6 relative z-10">Your Pokémon has been minted to your wallet.</p>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative z-10">
                    <motion.img
                      src={img(mintedResult.id)}
                      alt={mintedResult.name}
                      className="w-40 h-40 mx-auto object-contain mb-4 drop-shadow-2xl"
                      animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <p className="font-display font-bold text-xl text-foreground">{mintedResult.name}</p>
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className={`text-lg font-bold capitalize mt-1 ${
                        mintedResult.rarity === 'legendary' ? 'text-neon-orange' :
                        mintedResult.rarity === 'epic' ? 'text-neon-purple' :
                        mintedResult.rarity === 'rare' ? 'text-neon-blue' :
                        mintedResult.rarity === 'uncommon' ? 'text-neon-green' :
                        'text-muted-foreground'
                      }`}>
                      ✦ {mintedResult.rarity} Rarity! ✦
                    </motion.p>
                  </motion.div>
                  <div className="flex gap-3 justify-center mt-8 relative z-10">
                    <button onClick={reset} className="px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">Mint Another</button>
                    <button onClick={() => window.location.href = '/profile'} className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">View Collection</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Minting Info</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Contract</span><span className="font-mono text-foreground">0x7a25...e4f8</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Network</span><span className="text-foreground">Ethereum</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Token Standard</span><span className="text-foreground">ERC-721</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Supply</span><span className="text-foreground">10,000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Minted</span><span className="text-foreground">8,234</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Remaining</span><span className="text-neon-green font-semibold">1,766</span></div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Mint Progress</span>
                  <span className="text-foreground font-semibold">82.3%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '82.3%' }} />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Rarity Tiers</h3>
              <div className="space-y-3">
                {rarityTiers.map((r) => (
                  <div key={r.tier} className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${r.color}`}>{r.tier}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-foreground">{r.cost}</span>
                      <span className="text-muted-foreground">{r.chance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-primary/20 rounded-xl p-5 bg-gradient-to-br from-primary/5 to-transparent">
              <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Smart Contract
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our ERC-721 smart contract is verified on Etherscan. Each NFT has unique on-chain metadata including rarity, traits, and provenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
