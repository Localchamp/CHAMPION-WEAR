import { createClient } from '@/lib/supabase/client';
import type { Cart, CartItem, CartSummary } from '@/types';
import { SHIPPING_RATES, TAX_RATE } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabase = any;

export async function getOrCreateCart(userId?: string): Promise<Cart> {
  const supabase = createClient() as AnySupabase;

  if (userId) {
    const { data } = await supabase
      .from('carts')
      .select('*, items:cart_items(*, product:products(*, images:product_images(*)), variant:product_variants(*, size:sizes(*), color:colors(*)))')
      .eq('user_id', userId)
      .single();
    if (data) return data as unknown as Cart;

    const { data: newCart } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single();
    return { ...(newCart as object), items: [] } as unknown as Cart;
  }

  return { id: 'guest', items: [] };
}

export async function addToCart(cartId: string, productId: string, variantId?: string, quantity = 1) {
  const supabase = createClient() as AnySupabase;
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId)
    .eq('product_id', productId)
    .eq('variant_id', variantId ?? '')
    .single();

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ cart_id: cartId, product_id: productId, variant_id: variantId ?? null, quantity });
    if (error) throw error;
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  const supabase = createClient() as AnySupabase;
  if (quantity <= 0) {
    const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
    if (error) throw error;
  }
}

export async function removeFromCart(itemId: string) {
  const supabase = createClient() as AnySupabase;
  const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
  if (error) throw error;
}

export async function clearCart(cartId: string) {
  const supabase = createClient() as AnySupabase;
  const { error } = await supabase.from('cart_items').delete().eq('cart_id', cartId);
  if (error) throw error;
}

export function calculateCartSummary(items: CartItem[], shippingMethod = 'standard', discountAmount = 0): CartSummary {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const shipping = SHIPPING_RATES[shippingMethod as keyof typeof SHIPPING_RATES]?.price || 15;
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, discount: discountAmount, shipping, tax, total, itemCount };
}

export async function validateCoupon(code: string, subtotal: number) {
  const supabase = createClient() as AnySupabase;
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single();

  if (error || !data) throw new Error('Invalid coupon code');
  if (data.expires_at && new Date(data.expires_at) < new Date()) throw new Error('Coupon has expired');
  if (subtotal < data.min_order_amount) throw new Error(`Minimum order amount is GHS ${data.min_order_amount}`);
  if (data.max_uses && data.used_count >= data.max_uses) throw new Error('Coupon usage limit reached');

  const discount = data.discount_type === 'percentage'
    ? (subtotal * data.discount_value) / 100
    : data.discount_value;

  return { coupon: data, discount };
}
