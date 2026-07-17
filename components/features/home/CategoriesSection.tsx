'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Men', slug: 'men', description: 'Sharp & Sophisticated', count: '120+ styles',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop',
    color: 'from-blue-900/70 to-blue-800/50',
  },
  {
    name: 'Women', slug: 'women', description: 'Elegant & Bold', count: '200+ styles',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop',
    color: 'from-rose-900/70 to-rose-800/50',
  },
  {
    name: 'Shoes', slug: 'shoes', description: 'Step in Style', count: '80+ pairs',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop',
    color: 'from-amber-900/70 to-amber-800/50',
  },
  {
    name: 'Accessories', slug: 'accessories', description: 'Complete the Look', count: '60+ items',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop',
    color: 'from-purple-900/70 to-purple-800/50',
  },
  {
    name: 'Sportswear', slug: 'sportswear', description: 'Perform & Conquer', count: '90+ pieces',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop',
    color: 'from-green-900/70 to-green-800/50',
  },
  {
    name: 'Luxury', slug: 'luxury', description: 'Exclusive Collection', count: '40+ pieces',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop',
    color: 'from-yellow-900/70 to-yellow-800/50',
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-champion-gold text-sm font-semibold uppercase tracking-widest mb-3">Browse By</p>
          <h2 className="section-title">Shop Categories</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group block relative overflow-hidden rounded-2xl aspect-square border border-border hover:border-champion-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-champion-gold/10"
              >
                {/* Background image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
                {/* Text */}
                <div className="relative z-10 flex flex-col items-center justify-end h-full p-4 text-center">
                  <h3 className="font-bold text-sm font-poppins text-white">{cat.name}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{cat.count}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
