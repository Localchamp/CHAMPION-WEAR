'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { validateCoupon } from '@/services/cart';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { SHIPPING_RATES } from '@/lib/utils';

export default function CartPage() {
  const { items, summary, shippingMethod, setShippingMethod, setDiscount, updateQuantity, removeItem, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const { coupon, discount } = await validateCoupon(couponCode, summary.subtotal);
      setDiscount(discount);
      setAppliedCoupon((coupon as { code: string }).code);
      toast.success(`Coupon applied! You saved ${formatPrice(discount)}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Invalid coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
          <h2 className="text-2xl font-bold font-poppins mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some champion pieces to get started.</p>
          <Button asChild size="lg" variant="gold">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-poppins">Shopping Cart</h1>
          <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 p-4 bg-card border border-border rounded-2xl"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
                    {item.product?.images?.[0] && (
                      <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{item.product?.brand}</p>
                    <h3 className="font-semibold text-sm leading-tight mb-1 truncate">{item.product?.name}</h3>
                    {(item.variant?.size || item.variant?.color) && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.variant.size?.code && `Size: ${item.variant.size.code}`}
                        {item.variant.size && item.variant.color && ' · '}
                        {item.variant.color?.name && `Color: ${item.variant.color.name}`}
                      </p>
                    )}
                    <p className="font-bold text-sm">{formatPrice((item.product?.price || 0) * item.quantity)}</p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-muted transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-muted transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Shipping Method */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Shipping Method</h3>
              <div className="space-y-2">
                {Object.entries(SHIPPING_RATES).map(([key, rate]) => (
                  <label key={key} className="flex items-center justify-between p-3 rounded-xl border border-border cursor-pointer hover:border-champion-gold/50 transition-colors has-[:checked]:border-champion-gold has-[:checked]:bg-champion-gold/5">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value={key} checked={shippingMethod === key} onChange={() => setShippingMethod(key)} className="accent-champion-gold" />
                      <span className="text-sm">{rate.label}</span>
                    </div>
                    <span className="text-sm font-semibold">{rate.price === 0 ? 'Free' : formatPrice(rate.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Tag className="w-4 h-4" /> Promo Code</h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <span className="text-sm font-semibold text-green-500">{appliedCoupon} applied!</span>
                  <button onClick={() => { setAppliedCoupon(''); setDiscount(0); setCouponCode(''); }} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input placeholder="Enter code" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} className="flex-1" />
                  <Button onClick={handleApplyCoupon} disabled={couponLoading} variant="outline" size="default">Apply</Button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: `Subtotal (${summary.itemCount} items)`, value: formatPrice(summary.subtotal) },
                  { label: 'Shipping', value: summary.shipping === 0 ? 'Free' : formatPrice(summary.shipping) },
                  ...(summary.discount > 0 ? [{ label: 'Discount', value: `-${formatPrice(summary.discount)}`, className: 'text-green-500' }] : []),
                  { label: 'Tax (12.5%)', value: formatPrice(summary.tax) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className={`font-medium ${'className' in row ? row.className : ''}`}>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-border text-base font-bold">
                  <span>Total</span>
                  <span className="text-champion-gold">{formatPrice(summary.total)}</span>
                </div>
              </div>

              <Button asChild size="lg" variant="gold" className="w-full mt-5 gap-2">
                <Link href="/checkout">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="w-full mt-2">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
