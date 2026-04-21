import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/hooks/useWallet';

export const CartDrawer = () => {
  const { items, isOpen, setOpen, remove, clear, total } = useCart();
  const { push } = useNotifications();
  const { wallet } = useWallet();
  const { address, isConnected } = wallet;

  const checkout = async () => {
    if (!isConnected) { toast.error('Connect your wallet first'); return; }
    if (items.length === 0) return;
    const rows = items.map((i) => ({
      nft_id: crypto.randomUUID(),
      nft_name: i.name,
      nft_image: i.image,
      price: i.price,
      seller_wallet: i.owner,
      buyer_wallet: address || '0xYou',
      tx_type: 'sale',
    }));
    const { error } = await supabase.from('transactions').insert(rows);
    if (error) { toast.error('Checkout failed'); return; }
    toast.success(`Purchased ${items.length} NFT${items.length > 1 ? 's' : ''} for ${total.toFixed(2)} ETH`);
    push({ type: 'sale', title: 'Cart checkout complete', description: `${items.length} items · ${total.toFixed(2)} ETH` });
    clear();
    setOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" /> Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          <AnimatePresence>
            {items.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-12">Your cart is empty.</p>
            )}
            {items.map((i) => (
              <motion.div
                key={i.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary border border-border"
              >
                <img src={i.image} alt={i.name} className="w-14 h-14 object-contain" />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground truncate">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.type} · #{i.id}</p>
                  <p className="text-sm font-bold text-foreground mt-1">{i.price} ETH</p>
                </div>
                <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display font-bold text-xl text-foreground">{total.toFixed(2)} ETH</span>
            </div>
            <button
              onClick={checkout}
              className="w-full py-3 rounded-lg bg-gradient-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity shadow-neon-purple"
            >
              Checkout
            </button>
            <button onClick={clear} className="w-full py-2 text-xs text-muted-foreground hover:text-destructive transition-colors">
              Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
