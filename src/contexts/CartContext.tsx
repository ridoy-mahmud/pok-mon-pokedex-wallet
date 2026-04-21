import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import type { PokemonNFT } from '@/lib/pokemon-data';

interface CartContextType {
  items: PokemonNFT[];
  add: (p: PokemonNFT) => void;
  remove: (id: number) => void;
  clear: () => void;
  total: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  has: (id: number) => boolean;
}

const CartContext = createContext<CartContextType>({} as CartContextType);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<PokemonNFT[]>(() => {
    try { return JSON.parse(localStorage.getItem('pokenft-cart') || '[]'); } catch { return []; }
  });
  const [isOpen, setOpen] = useState(false);

  const persist = (next: PokemonNFT[]) => {
    localStorage.setItem('pokenft-cart', JSON.stringify(next));
    return next;
  };

  const add = useCallback((p: PokemonNFT) => {
    setItems((prev) => prev.find((i) => i.id === p.id) ? prev : persist([...prev, p]));
    setOpen(true);
  }, []);
  const remove = useCallback((id: number) => setItems((prev) => persist(prev.filter((i) => i.id !== id))), []);
  const clear = useCallback(() => setItems(persist([])), []);
  const has = useCallback((id: number) => items.some((i) => i.id === id), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total, isOpen, setOpen, has }}>
      {children}
    </CartContext.Provider>
  );
};
