import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { CartDrawer } from "@/components/CartDrawer";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PokemonDetail from "./pages/PokemonDetail.tsx";
import Profile from "./pages/Profile.tsx";
import Mint from "./pages/Mint.tsx";
import Stats from "./pages/Stats.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <FavoritesProvider>
        <CartProvider>
          <NotificationsProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner position="bottom-right" />
              <BrowserRouter>
                <AnimatedRoutes />
                <CartDrawer />
              </BrowserRouter>
            </TooltipProvider>
          </NotificationsProvider>
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
