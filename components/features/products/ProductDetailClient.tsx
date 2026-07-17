'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Star, Share2, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const images = product.images || [];
  const sizes = [...new Set(product.variants?.map(v => v.size?.code).filter(Boolean))];
  const colors = product.variants?.reduce((acc, v) => {
    if (v.color && !acc.find(c => c.id === v.color!.id)) acc.push(v.color);
    return acc;
  }, [] as NonNullable<typeof product.variants>[0]['color'][]);

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) { toast.error('Please select a size'); return; }
    const variant = product.variants?.find(v =>
      (!selectedSize || v.size?.code === selectedSize) &&
      (!selectedColor || v.color?.name === selectedColor)
    );
    addItem({
      id: crypto.randomUUID(),
      cart_id: '',
      product_id: product.id,
      variant_id: variant?.id,
      quantity,
      product,
      variant,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted group">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].alt_text || product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button onClick={() => setSelectedImage(i => Math.max(0, i - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setSelectedImage(i => Math.min(images.length - 1, i + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {product.discount_percent > 0 && (
            <div className="absolute top-4 left-4">
              <Badge variant="destructive" className="text-sm px-3 py-1">-{product.discount_percent}%</Badge>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all',
                  selectedImage === i ? 'border-champion-gold' : 'border-transparent hover:border-border'
                )}
              >
                <Image src={img.url} alt={img.alt_text || ''} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">{product.brand}</p>
          <h1 className="text-3xl font-bold font-poppins mb-3">{product.name}</h1>

          {/* Rating */}
          {product.review_count > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={cn('w-4 h-4', s <= Math.round(product.rating) ? 'fill-champion-gold text-champion-gold' : 'text-muted-foreground')} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.review_count} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-xl text-muted-foreground line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>
        </div>

        {/* Colors */}
        {colors && colors.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-3">Color: <span className="text-muted-foreground font-normal">{selectedColor || 'Select'}</span></p>
            <div className="flex gap-2">
              {colors.map(color => color && (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all',
                    selectedColor === color.name ? 'border-champion-gold scale-110' : 'border-transparent hover:border-border'
                  )}
                  style={{ backgroundColor: color.hex_code }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-3">Size: <span className="text-muted-foreground font-normal">{selectedSize || 'Select'}</span></p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => size && (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                    selectedSize === size
                      ? 'bg-champion-gold text-black border-champion-gold'
                      : 'border-border hover:border-champion-gold/50'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <p className="text-sm font-semibold mb-3">Quantity</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2.5 hover:bg-muted transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-2.5 font-semibold min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2.5 hover:bg-muted transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleAddToCart} size="lg" variant="gold" className="flex-1 gap-2">
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </Button>
          <Button
            onClick={() => { toggle(product.id); toast.success(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
            size="lg"
            variant="outline"
            className={cn('gap-2', isWishlisted(product.id) && 'border-red-500 text-red-500')}
          >
            <Heart className={cn('w-5 h-5', isWishlisted(product.id) && 'fill-current')} />
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          {[
            { icon: Truck, label: 'Free Shipping', sub: 'Orders over GHS 200' },
            { icon: RotateCcw, label: 'Easy Returns', sub: '30-day policy' },
            { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
          ].map(badge => (
            <div key={badge.label} className="flex flex-col items-center text-center gap-1">
              <badge.icon className="w-5 h-5 text-champion-gold" />
              <p className="text-xs font-semibold">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-t border-border pt-6">
          <div className="flex gap-4 border-b border-border mb-4">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px',
                  activeTab === tab ? 'border-champion-gold text-champion-gold' : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === 'description' && (
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          )}
          {activeTab === 'specifications' && (
            <div className="space-y-2 text-sm">
              {[
                { label: 'Brand', value: product.brand },
                { label: 'SKU', value: product.sku || 'N/A' },
                { label: 'Gender', value: product.gender },
                { label: 'Category', value: product.category?.name || 'N/A' },
              ].map(spec => (
                <div key={spec.label} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium capitalize">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-muted-foreground">
              <Star className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
