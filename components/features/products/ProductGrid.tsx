'use client';
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({ products, loading, skeletonCount = 8 }: ProductGridProps) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <div>
      {/* Layout Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Loading...' : `${products.length} products`}
        </p>
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
          <button
            onClick={() => setLayout('grid')}
            className={cn('p-2 rounded-lg transition-colors', layout === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50')}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={cn('p-2 rounded-lg transition-colors', layout === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50')}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className={cn(
          'grid gap-4 md:gap-6',
          layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
        )}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🛍️</p>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className={cn(
          'grid gap-4 md:gap-6',
          layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
        )}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
