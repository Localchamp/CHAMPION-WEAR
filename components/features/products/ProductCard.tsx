'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const primaryImage = product.images?.find(i => i.is_primary) || product.images?.[0];
  const secondaryImage = product.images?.[1];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: crypto.randomUUID(),
      cart_id: '',
      product_id: product.id,
      quantity: 1,
      product,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn('product-card group', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text || product.name}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.alt_text || product.name}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_new_arrival && <Badge variant="gold">New</Badge>}
            {product.discount_percent > 0 && (
              <Badge variant="destructive">-{product.discount_percent}%</Badge>
            )}
            {product.is_best_seller && <Badge variant="success">Best Seller</Badge>}
          </div>

          {/* Action Buttons */}
          <div className={cn(
            'absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300',
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          )}>
            <button
              onClick={handleWishlist}
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg',
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-background/90 backdrop-blur-sm hover:bg-red-500 hover:text-white'
              )}
              aria-label="Add to wishlist"
            >
              <Heart className={cn('w-4 h-4', wishlisted && 'fill-current')} />
            </button>
            <button
              onClick={() => window.location.href = `/product/${product.slug}`}
              className="w-9 h-9 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-champion-gold hover:text-black transition-all duration-200 shadow-lg"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Overlay */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 p-3 transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-champion-black/90 backdrop-blur-sm text-white text-sm font-semibold rounded-xl hover:bg-champion-gold hover:text-black transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">{product.brand}</p>
          <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-champion-gold transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.review_count > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={cn(
                      'w-3 h-3',
                      star <= Math.round(product.rating) ? 'fill-champion-gold text-champion-gold' : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.review_count})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-base">{formatPrice(product.price)}</span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
