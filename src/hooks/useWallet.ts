import { useState, useCallback, useEffect } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const checkConnection = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
        if (accounts.length > 0) {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          }) as string;
          const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
          setWallet({
            isConnected: true,
            address: accounts[0],
            balance: (parseInt(balance, 16) / 1e18).toFixed(4),
            chainId: parseInt(chainId, 16),
          });
        }
      } catch (err) {
        console.error('Failed to check wallet connection:', err);
      }
    }
  }, []);

  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }) as string;
      const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
      setWallet({
        isConnected: true,
        address: accounts[0],
        balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        chainId: parseInt(chainId, 16),
      });
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ isConnected: false, address: null, balance: null, chainId: null });
  }, []);

  useEffect(() => {
    checkConnection();
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on?.('accountsChanged', checkConnection);
      window.ethereum.on?.('chainChanged', () => window.location.reload());
    }
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener?.('accountsChanged', checkConnection);
      }
    };
  }, [checkConnection]);

  return { wallet, isConnecting, connect, disconnect };
};

// Augment window for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on?: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}
