import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  const supabase = await createClient();
  let dbQuery = supabase
    .from('products')
    .select('*, images:product_images(*), category:categories(*)', { count: 'exact' })
    .eq('status', 'active');

  if (query) dbQuery = dbQuery.or(`name.ilike.%${query}%,brand.ilike.%${query}%`);
  if (category) dbQuery = dbQuery.eq('categories.slug', category);

  dbQuery = dbQuery.range((page - 1) * limit, page * limit - 1).order('created_at', { ascending: false });

  const { data, error, count } = await dbQuery;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ products: data, count, page, limit });
}
