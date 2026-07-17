import { createClient } from '@/lib/supabase/client';
import type { Order, CheckoutFormData, CartItem } from '@/types';
import { calculateCartSummary } from './cart';

export async function createOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[],
  userId: string,
  couponId?: string,
  discountAmount = 0
): Promise<Order> {
  const supabase = createClient();
  const summary = calculateCartSummary(cartItems, formData.shipping_method, discountAmount);

  const shippingAddress = {
    full_name: formData.full_name,
    phone: formData.phone,
    address_line1: formData.address_line1,
    address_line2: formData.address_line2,
    city: formData.city,
    state: formData.state,
    postal_code: formData.postal_code,
    country: formData.country,
  };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'pending',
      subtotal: summary.subtotal,
      discount_amount: summary.discount,
      shipping_amount: summary.shipping,
      tax_amount: summary.tax,
      total: summary.total,
      coupon_id: couponId,
      shipping_method: formData.shipping_method,
      shipping_address: shippingAddress,
      notes: formData.notes,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    variant_id: item.variant_id,
    product_name: item.product?.name || '',
    product_image: item.product?.images?.[0]?.url,
    size: item.variant?.size?.code,
    color: item.variant?.color?.name,
    quantity: item.quantity,
    unit_price: item.product?.price || 0,
    total_price: (item.product?.price || 0) * item.quantity,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  await supabase.from('payments').insert({
    order_id: order.id,
    method: formData.payment_method,
    status: formData.payment_method === 'cash_on_delivery' ? 'pending' : 'pending',
    amount: summary.total,
  });

  return order as Order;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*), payment:payments(*)')
    .eq('id', orderId)
    .single();
  if (error) return null;
  return data as Order;
}

export async function getAllOrders(): Promise<Order[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*), profile:profiles(full_name, email)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const supabase = createClient();
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
  if (error) throw error;
}
