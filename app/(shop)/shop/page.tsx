'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/services/products';
import type { Product, ProductFilters } from '@/types';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
];

const categories = ['men', 'women', 'kids', 'shoes', 'accessories', 'sportswear', 'luxury', 'streetwear'];
const priceRanges = [
  { label: 'Under GHS 50', min: 0, max: 50 },
  { label: 'GHS 50 - 100', min: 50, max: 100 },
  { label: 'GHS 100 - 200', min: 100, max: 200 },
  { label: 'GHS 200+', min: 200, max: 9999 },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || undefined,
    sortBy: (searchParams.get('sort') as ProductFilters['sortBy']) || 'newest',
    page: 1,
    limit: 12,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { products: data } = await getProducts(filters);
      setProducts(data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const updateFilter = (key: keyof ProductFilters, value: unknown) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'newest', page: 1, limit: 12 });
    router.push('/shop');
  };

  const activeFilterCount = [filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold font-poppins mb-1">Shop All</h1>
          <p className="text-muted-foreground text-sm">Discover our complete collection</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-champion-gold text-black text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                <X className="w-3 h-3" /> Clear
              </Button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-champion-gold/50 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {filtersOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 shrink-0 space-y-6"
            >
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Category</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => updateFilter('category', filters.category === cat ? undefined : cat)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-sm capitalize transition-colors',
                        filters.category === cat
                          ? 'bg-champion-gold/20 text-champion-gold font-medium'
                          : 'hover:bg-muted text-muted-foreground'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Price Range</h3>
                <div className="space-y-1">
                  {priceRanges.map(range => (
                    <button
                      key={range.label}
                      onClick={() => {
                        updateFilter('minPrice', range.min);
                        updateFilter('maxPrice', range.max);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                        filters.minPrice === range.min && filters.maxPrice === range.max
                          ? 'bg-champion-gold/20 text-champion-gold font-medium'
                          : 'hover:bg-muted text-muted-foreground'
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Gender</h3>
                <div className="space-y-1">
                  {['men', 'women', 'kids', 'unisex'].map(g => (
                    <button
                      key={g}
                      onClick={() => updateFilter('gender', filters.gender === g ? undefined : g)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-sm capitalize transition-colors',
                        filters.gender === g
                          ? 'bg-champion-gold/20 text-champion-gold font-medium'
                          : 'hover:bg-muted text-muted-foreground'
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}

          {/* Products */}
          <div className="flex-1">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
