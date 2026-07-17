'use client';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlistIds, toggle } = useWishlist();
  const { addItem } = useCart();

  if (wishlistIds.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
          <h2 className="text-2xl font-bold font-poppins mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">Save items you love to your wishlist.</p>
          <Button asChild size="lg" variant="gold">
            <Link href="/shop">Explore Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-10">
        <h1 className="text-3xl font-bold font-poppins mb-8">My Wishlist ({wishlistIds.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistIds.map((productId, i) => (
            <motion.div
              key={productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl overflow-hidden group"
            >
              <div className="relative aspect-square bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                  <Heart className="w-12 h-12" />
                </div>
                <button
                  onClick={() => { toggle(productId); toast.success('Removed from wishlist'); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Product ID: {productId.slice(0, 8)}...</p>
                <Button
                  onClick={() => toast.info('Add to cart from product page')}
                  size="sm"
                  variant="gold"
                  className="w-full gap-2 mt-2"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
