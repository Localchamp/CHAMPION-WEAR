'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-champion-black p-10 md:p-14 flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-champion-gold/20 via-transparent to-champion-blue/20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-champion-gold/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-champion-gold/20 text-champion-gold text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
                Limited Time
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white font-poppins mb-3">
                Up to <span className="gold-text">50% OFF</span>
                <br />Summer Sale
              </h3>
              <p className="text-white/60 text-sm mb-6">Don't miss out on our biggest sale of the season.</p>
              <Link href="/shop?sale=true"
                className="inline-flex items-center gap-2 px-6 py-3 bg-champion-gold text-black font-semibold rounded-xl hover:bg-gold-400 transition-colors group">
                Shop Sale <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Side Banners */}
          <div className="flex flex-col gap-6">
            {[
              { title: 'New Arrivals', subtitle: 'Fresh styles just dropped', tag: 'Just In', href: '/shop?new=true', color: 'from-blue-900/80 to-blue-800/40' },
              { title: 'Luxury Collection', subtitle: 'Premium pieces for the elite', tag: 'Exclusive', href: '/shop?category=luxury', color: 'from-yellow-900/80 to-yellow-800/40' },
            ].map((banner, i) => (
              <motion.div
                key={banner.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.color} p-8 flex items-center justify-between group cursor-pointer`}
              >
                <div>
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{banner.tag}</span>
                  <h4 className="text-xl font-bold text-white font-poppins mt-1">{banner.title}</h4>
                  <p className="text-white/60 text-sm mt-1">{banner.subtitle}</p>
                </div>
                <Link href={banner.href}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-champion-gold group-hover:text-black transition-all duration-200">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-black" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
