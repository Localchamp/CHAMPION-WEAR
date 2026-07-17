'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/features/products/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface FeaturedProductsProps {
  featured: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

const tabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'best', label: 'Best Sellers' },
];

export function FeaturedProducts({ featured, newArrivals, bestSellers }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState('featured');

  const products = activeTab === 'featured' ? featured : activeTab === 'new' ? newArrivals : bestSellers;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-champion-gold text-sm font-semibold uppercase tracking-widest mb-2">Our Collection</p>
            <h2 className="section-title">Trending Now</h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-background rounded-2xl p-1 border border-border">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-champion-gold text-black shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.length === 0
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" variant="gold-outline">
            <Link href="/shop" className="group">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
