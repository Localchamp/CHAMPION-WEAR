import type { Metadata } from 'next';
import { Award, Users, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Champion Wear — our story, mission, and values.',
};

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Customers' },
  { icon: Globe, value: '15+', label: 'Countries Served' },
  { icon: Award, value: '500+', label: 'Premium Products' },
  { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-champion-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champion-black via-champion-black to-champion-blue/20" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-champion-gold/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <p className="text-champion-gold text-sm font-semibold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-black font-poppins text-white mb-6">
            Born to <span className="gold-text">Champion</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Champion Wear was founded with a simple belief: everyone deserves to dress like a champion.
            We curate premium fashion that empowers you to live your best life.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-champion-gold/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-champion-gold" />
                </div>
                <p className="text-3xl font-black font-poppins mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-champion-gold text-sm font-semibold uppercase tracking-widest mb-4">Our Mission</p>
          <h2 className="text-4xl font-bold font-poppins mb-6">Dress Like a Champion. Live Like a Champion.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We believe fashion is more than clothing — it&apos;s a statement of who you are and who you aspire to be.
            Every piece in our collection is carefully selected to help you express your inner champion.
            From premium streetwear to luxury fashion, we bring you the best of both worlds.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-poppins">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', desc: 'Every product meets our rigorous quality standards before reaching you.', emoji: '✨' },
              { title: 'Sustainability', desc: 'We are committed to ethical sourcing and sustainable fashion practices.', emoji: '🌿' },
              { title: 'Community', desc: 'We celebrate diversity and build a community of champions worldwide.', emoji: '🤝' },
            ].map(value => (
              <div key={value.title} className="bg-card border border-border rounded-2xl p-8 text-center hover:border-champion-gold/30 transition-colors">
                <div className="text-4xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-bold font-poppins mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
