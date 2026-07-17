'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import type { Product } from '@/types';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    const query = supabase
      .from('products')
      .select('*, images:product_images(*), category:categories(name)')
      .order('created_at', { ascending: false });

    (search ? query.ilike('name', `%${search}%`) : query).then(({ data }) => {
      if (!cancelled) {
        setProducts((data as Product[]) || []);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [search]);

  const refetch = async () => {
    const supabase = createClient();
    const query = supabase
      .from('products')
      .select('*, images:product_images(*), category:categories(name)')
      .order('created_at', { ascending: false });
    const { data } = search ? await query.ilike('name', `%${search}%`) : await query;
    setProducts((data as Product[]) || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) { toast.error(error.message || 'Unable to delete product'); return; }
    toast.success('Product deleted');
    refetch();
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await supabase.from('products').update({ status: newStatus }).eq('id', id);
    toast.success(`Product ${newStatus}`);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Products</h1>
          <p className="text-muted-foreground">{products.length} total products</p>
        </div>
        <Link href="/admin/products/create">
          <Button variant="gold" className="gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                {['Product', 'Category', 'Price', 'Status', 'Rating', 'Actions'].map(h => (
                  <th key={h} className="text-left py-4 px-4 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="py-4 px-4"><div className="h-4 bg-muted rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : products.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                        {product.images?.[0] && (
                          <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{(product.category as { name: string } | undefined)?.name || '—'}</td>
                  <td className="py-4 px-4 font-semibold">{formatPrice(product.price)}</td>
                  <td className="py-4 px-4">
                    <button onClick={() => handleToggleStatus(product.id, product.status)}>
                      <Badge variant={product.status === 'active' ? 'success' : 'secondary'} className="cursor-pointer">
                        {product.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-champion-gold font-semibold">★ {product.rating}</span>
                    <span className="text-muted-foreground text-xs ml-1">({product.review_count})</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
