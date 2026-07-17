import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types';

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .eq('is_best_seller', true)
    .order('view_count', { ascending: false })
    .limit(8);
  return (data as Product[]) || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*, size:sizes(*), color:colors(*))
    `)
    .eq('slug', slug)
    .single();
  if (error) return null;
  supabase.from('products').update({ view_count: (data.view_count || 0) + 1 }).eq('id', data.id).then(() => {});
  return data as Product;
}

export async function getRelatedProducts(productId: string, categoryId: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('status', 'active')
    .eq('category_id', categoryId)
    .neq('id', productId)
    .limit(4);
  return (data as Product[]) || [];
}
