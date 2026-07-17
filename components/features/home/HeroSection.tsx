'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-champion-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-champion-black via-champion-black/95 to-champion-blue/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-champion-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-champion-blue/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champion-gold/10 border border-champion-gold/30 text-champion-gold text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                New Collection 2025
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-poppins text-white leading-tight mb-6">
                Dress Like a{' '}
                <span className="gold-text block">Champion.</span>
                <span className="text-white/80 text-4xl md:text-5xl font-bold">Live Like a Champion.</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                Discover premium fashion that defines excellence. From streetwear to luxury — every piece tells your story.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="xl" variant="gold" className="group">
                  <Link href="/shop">
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/shop?new=true">New Arrivals</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                {[
                  { value: '10K+', label: 'Happy Customers' },
                  { value: '500+', label: 'Products' },
                  { value: '50+', label: 'Brands' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white font-poppins">{stat.value}</p>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-champion-gold/20 to-champion-blue/20 border border-champion-gold/20" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-champion-gold/10 to-transparent border border-white/10" />

              {/* Fashion image placeholder */}
              <div className="absolute inset-8 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👑</div>
                  <p className="text-white/60 text-sm font-medium">Champion Wear</p>
                  <p className="text-champion-gold text-xs">Premium Collection</p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 right-8 glass-card-dark px-4 py-2 rounded-2xl"
              >
                <p className="text-white text-xs font-semibold">✨ New Arrivals</p>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 left-8 glass-card-dark px-4 py-2 rounded-2xl"
              >
                <p className="text-champion-gold text-xs font-semibold">🏆 Premium Quality</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-champion-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
