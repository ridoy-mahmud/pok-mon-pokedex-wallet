import { useWallet } from '@/hooks/useWallet';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WalletButton = () => {
  const { wallet, isConnecting, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (wallet.isConnected && wallet.address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-all duration-300"
        >
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
          <span className="text-sm font-medium text-foreground">{formatAddress(wallet.address)}</span>
          <span className="text-xs text-muted-foreground">{wallet.balance} ETH</span>
        </button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-56 bg-card border border-border rounded-lg p-3 z-50 shadow-neon-purple"
            >
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <button
                onClick={() => { disconnect(); setShowMenu(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-secondary rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all duration-300 shadow-neon-purple disabled:opacity-50"
    >
      <Wallet className="w-4 h-4" />
      {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
    </button>
  );
};
