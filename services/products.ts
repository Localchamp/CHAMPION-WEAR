import { createClient } from '@/lib/supabase/client';
import type { Product, ProductFilters } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabase = any;

export async function getProducts(filters: ProductFilters = {}) {
  const supabase = createClient() as AnySupabase;
  let query = supabase
    .from('products')
    .select(`*, category:categories(*), images:product_images(*)`)
    .eq('status', 'active');

  if (filters.category) {
    const supabaseInner = createClient() as AnySupabase;
    const { data: catData } = await supabaseInner.from('categories').select('id').eq('slug', filters.category).single();
    if (catData) query = query.eq('category_id', catData.id);
  }
  if (filters.gender) query = query.eq('gender', filters.gender);
  if (filters.minPrice) query = query.gte('price', filters.minPrice);
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
  if (filters.search) query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
  if (filters.inStock) query = query.gt('view_count', 0);

  switch (filters.sortBy) {
    case 'price_asc': query = query.order('price', { ascending: true }); break;
    case 'price_desc': query = query.order('price', { ascending: false }); break;
    case 'rating': query = query.order('rating', { ascending: false }); break;
    case 'popular': query = query.order('view_count', { ascending: false }); break;
    default: query = query.order('created_at', { ascending: false });
  }

  const page = filters.page || 1;
  const limit = filters.limit || 12;
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { products: data as Product[], count };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient() as AnySupabase;
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*), images:product_images(*), variants:product_variants(*, size:sizes(*), color:colors(*))`)
    .eq('slug', slug)
    .single();

  if (error) return null;

  supabase.from('products').update({ view_count: (data.view_count || 0) + 1 }).eq('id', data.id).then(() => {});

  return data as Product;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient() as AnySupabase;
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(8);
  return (data as Product[]) || [];
}

export async function getNewArrivals(): Promise<Product[]> {
  const supabase = createClient() as AnySupabase;
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .eq('is_new_arrival', true)
    .order('created_at', { ascending: false })
    .limit(8);
  return (data as Product[]) || [];
}

export async function getBestSellers(): Promise<Product[]> {
  const supabase = createClient() as AnySupabase;
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .eq('is_best_seller', true)
    .order('view_count', { ascending: false })
    .limit(8);
  return (data as Product[]) || [];
}

export async function getRelatedProducts(productId: string, categoryId: string): Promise<Product[]> {
  const supabase = createClient() as AnySupabase;
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .eq('category_id', categoryId)
    .neq('id', productId)
    .limit(4);
  return (data as Product[]) || [];
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = createClient() as AnySupabase;
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%,short_description.ilike.%${query}%`)
    .limit(10);
  return (data as Product[]) || [];
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const supabase = createClient() as AnySupabase;
  const { data, error } = await supabase.from('products').insert(product).select().single();
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const supabase = createClient() as AnySupabase;
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string) {
  const supabase = createClient() as AnySupabase;
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}
