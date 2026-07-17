export type UserRole = 'customer' | 'admin';
export type GenderType = 'men' | 'women' | 'kids' | 'unisex';
export type OrderStatus = 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'cash_on_delivery' | 'credit_card' | 'mobile_money';
export type ShippingMethod = 'standard' | 'express' | 'pickup';
export type ProductStatus = 'active' | 'inactive' | 'draft' | 'out_of_stock';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Size {
  id: string;
  name: string;
  code: string;
  sort_order: number;
}

export interface Color {
  id: string;
  name: string;
  hex_code: string;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size_id?: string;
  color_id?: string;
  sku?: string;
  price_modifier: number;
  stock: number;
  size?: Size;
  color?: Color;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category_id?: string;
  description?: string;
  short_description?: string;
  price: number;
  compare_price?: number;
  discount_percent: number;
  sku?: string;
  gender: GenderType;
  status: ProductStatus;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  tags?: string[];
  rating: number;
  review_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface Cart {
  id: string;
  user_id?: string;
  items: CartItem[];
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  added_at: string;
  product?: Product;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  product_image?: string;
  size?: string;
  color?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  status: OrderStatus;
  subtotal: number;
  discount_amount: number;
  shipping_amount: number;
  tax_amount: number;
  total: number;
  shipping_method: ShippingMethod;
  shipping_address: Address;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  payment?: Payment;
}

export interface Payment {
  id: string;
  order_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transaction_id?: string;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title?: string;
  body?: string;
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
  profile?: Profile;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_uses?: number;
  used_count: number;
  is_active: boolean;
  expires_at?: string;
}

// UI Types
export interface ProductFilters {
  category?: string;
  gender?: GenderType;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  brands?: string[];
  inStock?: boolean;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating';
  search?: string;
  page?: number;
  limit?: number;
}

export interface CheckoutFormData {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  shipping_method: ShippingMethod;
  payment_method: PaymentMethod;
  notes?: string;
  coupon_code?: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueThisMonth: number;
  ordersThisMonth: number;
}
