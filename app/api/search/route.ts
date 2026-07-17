import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) return NextResponse.json({ results: [] });

  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('id, name, slug, price, brand, images:product_images(url, is_primary)')
    .eq('status', 'active')
    .or(`name.ilike.%${q}%,brand.ilike.%${q}%`)
    .limit(8);

  return NextResponse.json({ results: data || [] });
}
