
-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  username TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- NFTs table
CREATE TABLE public.nfts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  price NUMERIC(20,8) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'ETH',
  category TEXT NOT NULL DEFAULT 'Collectibles',
  rarity TEXT NOT NULL DEFAULT 'common',
  pokemon_type TEXT,
  traits JSONB DEFAULT '[]'::jsonb,
  creator_wallet TEXT NOT NULL,
  owner_wallet TEXT NOT NULL,
  collection_name TEXT,
  royalty_percent NUMERIC(5,2) DEFAULT 5,
  is_auction BOOLEAN NOT NULL DEFAULT false,
  auction_end TIMESTAMPTZ,
  likes_count INT NOT NULL DEFAULT 0,
  views_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_nfts_category ON public.nfts(category);
CREATE INDEX idx_nfts_creator ON public.nfts(creator_wallet);
CREATE INDEX idx_nfts_owner ON public.nfts(owner_wallet);
CREATE INDEX idx_nfts_price ON public.nfts(price);
CREATE INDEX idx_nfts_created ON public.nfts(created_at DESC);

-- Bids table
CREATE TABLE public.bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nft_id UUID NOT NULL REFERENCES public.nfts(id) ON DELETE CASCADE,
  bidder_wallet TEXT NOT NULL,
  amount NUMERIC(20,8) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bids_nft ON public.bids(nft_id, created_at DESC);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nft_id UUID NOT NULL REFERENCES public.nfts(id) ON DELETE CASCADE,
  nft_name TEXT NOT NULL,
  nft_image TEXT,
  buyer_wallet TEXT NOT NULL,
  seller_wallet TEXT NOT NULL,
  price NUMERIC(20,8) NOT NULL,
  tx_type TEXT NOT NULL DEFAULT 'sale',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tx_created ON public.transactions(created_at DESC);
CREATE INDEX idx_tx_buyer ON public.transactions(buyer_wallet);
CREATE INDEX idx_tx_seller ON public.transactions(seller_wallet);

-- Likes table
CREATE TABLE public.likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nft_id UUID NOT NULL REFERENCES public.nfts(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(nft_id, wallet_address)
);

CREATE INDEX idx_likes_wallet ON public.likes(wallet_address);

-- Likes counter trigger
CREATE OR REPLACE FUNCTION public.update_nft_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.nfts SET likes_count = likes_count + 1 WHERE id = NEW.nft_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.nfts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.nft_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_likes_count
AFTER INSERT OR DELETE ON public.likes
FOR EACH ROW EXECUTE FUNCTION public.update_nft_likes_count();

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_nfts_touch BEFORE UPDATE ON public.nfts
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_profiles_touch BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Profiles policies (wallet-based, public read)
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can create a profile" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update profiles" ON public.profiles FOR UPDATE USING (true);

-- NFTs policies
CREATE POLICY "NFTs are viewable by everyone" ON public.nfts FOR SELECT USING (true);
CREATE POLICY "Anyone can mint NFTs" ON public.nfts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update NFTs" ON public.nfts FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete NFTs" ON public.nfts FOR DELETE USING (true);

-- Bids policies
CREATE POLICY "Bids are viewable by everyone" ON public.bids FOR SELECT USING (true);
CREATE POLICY "Anyone can place bids" ON public.bids FOR INSERT WITH CHECK (true);

-- Transactions policies
CREATE POLICY "Transactions are viewable by everyone" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Anyone can record transactions" ON public.transactions FOR INSERT WITH CHECK (true);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Anyone can like" ON public.likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can unlike" ON public.likes FOR DELETE USING (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.nfts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;
