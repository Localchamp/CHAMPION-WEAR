'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, ChevronRight, Loader2, Package, CreditCard, Truck, ClipboardList, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { createOrder } from '@/services/orders';
import { formatPrice, SHIPPING_RATES } from '@/lib/utils';
import { toast } from 'sonner';
import type { CheckoutFormData } from '@/types';
import Image from 'next/image';

const checkoutSchema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  address_line1: z.string().min(5, 'Address required'),
  address_line2: z.string().optional(),
  city: z.string().min(2, 'City required'),
  state: z.string().optional(),
  postal_code: z.string().min(2, 'Postal code required'),
  country: z.string().min(2, 'Country required'),
  shipping_method: z.enum(['standard', 'express', 'pickup']),
  payment_method: z.enum(['cash_on_delivery', 'credit_card', 'mobile_money']),
  notes: z.string().optional(),
});

const steps = [
  { id: 1, label: 'Information', icon: Package },
  { id: 2, label: 'Shipping', icon: Truck },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: ClipboardList },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ order_number: string } | null>(null);
  const router = useRouter();
  const { items, summary, clearCart } = useCart();
  const { user, profile } = useAuth();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      email: user?.email || '',
      shipping_method: 'standard',
      payment_method: 'cash_on_delivery',
      country: 'Rwanda',
    },
  });

  const formValues = watch();

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) { router.push('/login'); return; }
    setLoading(true);
    try {
      const order = await createOrder(data, items, user.id);
      setCompletedOrder(order);
      clearCart();
      setStep(5);
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (items.length === 0 && !completedOrder) {
      router.push('/cart');
    }
  }, [items.length, completedOrder, router]);

  if (items.length === 0 && !completedOrder) return null;

  // Success Screen
  if (step === 5 && completedOrder) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </motion.div>
          <h2 className="text-3xl font-bold font-poppins mb-2">Order Placed! 🎉</h2>
          <p className="text-muted-foreground mb-4">Thank you for shopping with Champion Wear!</p>
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="text-2xl font-bold text-champion-gold">{completedOrder.order_number}</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="gold" className="flex-1">
              <a href={`/orders`}>Track Order</a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href="/shop">Continue Shopping</a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-10 max-w-5xl">
        {/* Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  step === s.id ? 'text-champion-gold' : step > s.id ? 'text-green-500 cursor-pointer' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  step > s.id ? 'bg-green-500 border-green-500 text-white' :
                  step === s.id ? 'border-champion-gold text-champion-gold' : 'border-border'
                }`}>
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className="hidden md:block text-sm font-medium">{s.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Steps */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Information */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-bold font-poppins">Customer Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                        <Input {...register('full_name')} placeholder="John Doe" />
                        {errors.full_name && <p className="text-xs text-destructive mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                        <Input {...register('phone')} placeholder="+250 788 000 000" />
                        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-1.5 block">Email *</label>
                        <Input {...register('email')} type="email" placeholder="john@example.com" />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-1.5 block">Address *</label>
                        <Input {...register('address_line1')} placeholder="Street address" />
                        {errors.address_line1 && <p className="text-xs text-destructive mt-1">{errors.address_line1.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">City *</label>
                        <Input {...register('city')} placeholder="Kigali" />
                        {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Postal Code *</label>
                        <Input {...register('postal_code')} placeholder="00000" />
                        {errors.postal_code && <p className="text-xs text-destructive mt-1">{errors.postal_code.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Country *</label>
                        <Input {...register('country')} placeholder="Rwanda" />
                      </div>
                    </div>
                    <Button type="button" onClick={() => setStep(2)} size="lg" variant="gold" className="w-full gap-2">
                      Continue to Shipping <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Shipping */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-bold font-poppins">Shipping Method</h2>
                    <div className="space-y-3">
                      {Object.entries(SHIPPING_RATES).map(([key, rate]) => (
                        <label key={key} className="flex items-center justify-between p-4 rounded-xl border border-border cursor-pointer hover:border-champion-gold/50 transition-colors has-[:checked]:border-champion-gold has-[:checked]:bg-champion-gold/5">
                          <div className="flex items-center gap-3">
                            <input type="radio" value={key} {...register('shipping_method')} className="accent-champion-gold" />
                            <div>
                              <p className="font-medium text-sm">{rate.label}</p>
                            </div>
                          </div>
                          <span className="font-bold text-sm">{rate.price === 0 ? 'Free' : formatPrice(rate.price)}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">Back</Button>
                      <Button type="button" onClick={() => setStep(3)} size="lg" variant="gold" className="flex-1 gap-2">
                        Continue to Payment <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-bold font-poppins">Payment Method</h2>
                    <div className="space-y-3">
                      {[
                        { value: 'cash_on_delivery', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: '💵' },
                        { value: 'credit_card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, etc. (Demo)', icon: '💳' },
                        { value: 'mobile_money', label: 'Mobile Money', desc: 'MTN, Airtel Money (Demo)', icon: '📱' },
                      ].map(method => (
                        <label key={method.value} className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-champion-gold/50 transition-colors has-[:checked]:border-champion-gold has-[:checked]:bg-champion-gold/5">
                          <input type="radio" value={method.value} {...register('payment_method')} className="accent-champion-gold" />
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Order Notes (Optional)</label>
                      <textarea {...register('notes')} rows={3} placeholder="Any special instructions..."
                        className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">Back</Button>
                      <Button type="button" onClick={() => setStep(4)} size="lg" variant="gold" className="flex-1 gap-2">
                        Review Order <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-2xl p-6 space-y-6">
                    <h2 className="text-xl font-bold font-poppins">Review Your Order</h2>

                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                            {item.product?.images?.[0] && (
                              <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.product?.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold">{formatPrice((item.product?.price || 0) * item.quantity)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-muted/50 rounded-xl p-4">
                        <p className="font-semibold mb-2">Delivery Address</p>
                        <p className="text-muted-foreground">{formValues.full_name}</p>
                        <p className="text-muted-foreground">{formValues.address_line1}, {formValues.city}</p>
                        <p className="text-muted-foreground">{formValues.country}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4">
                        <p className="font-semibold mb-2">Payment & Shipping</p>
                        <p className="text-muted-foreground capitalize">{formValues.payment_method?.replace(/_/g, ' ')}</p>
                        <p className="text-muted-foreground capitalize">{formValues.shipping_method} delivery</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" onClick={() => setStep(3)} variant="outline" size="lg" className="flex-1">Back</Button>
                      <Button type="submit" size="lg" variant="gold" className="flex-1 gap-2" disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {loading ? 'Placing Order...' : 'Place Order'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-card border border-border rounded-2xl p-5 h-fit sticky top-24">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {[
                  { label: `Subtotal (${summary.itemCount} items)`, value: formatPrice(summary.subtotal) },
                  { label: 'Shipping', value: summary.shipping === 0 ? 'Free' : formatPrice(summary.shipping) },
                  ...(summary.discount > 0 ? [{ label: 'Discount', value: `-${formatPrice(summary.discount)}` }] : []),
                  { label: 'Tax (18% VAT)', value: formatPrice(summary.tax) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-border font-bold text-base">
                  <span>Total</span>
                  <span className="text-champion-gold">{formatPrice(summary.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
