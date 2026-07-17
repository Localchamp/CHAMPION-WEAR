'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Kwame Asante', role: 'Fashion Blogger', rating: 5, text: 'Champion Wear has completely transformed my wardrobe. The quality is unmatched and the styles are always on point. I get compliments everywhere I go!', avatar: 'KA' },
  { name: 'Abena Mensah', role: 'Business Executive', rating: 5, text: 'I\'ve been shopping here for 2 years and the quality never disappoints. Fast delivery, excellent customer service, and premium products.', avatar: 'AM' },
  { name: 'Kofi Boateng', role: 'Athlete', rating: 5, text: 'The sportswear collection is incredible. Perfect fit, breathable fabric, and stylish enough to wear beyond the gym. Champion Wear is my go-to!', avatar: 'KB' },
  { name: 'Ama Owusu', role: 'Stylist', rating: 5, text: 'As a professional stylist, I recommend Champion Wear to all my clients. The luxury collection is genuinely premium and worth every penny.', avatar: 'AO' },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-champion-gold text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="section-title">What Champions Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-champion-gold/30 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-champion-gold/40 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-champion-gold/20 border border-champion-gold/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-champion-gold">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-champion-gold text-champion-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
