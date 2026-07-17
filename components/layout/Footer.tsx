'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Men', href: '/shop?category=men' },
    { label: 'Women', href: '/shop?category=women' },
    { label: 'Kids', href: '/shop?category=kids' },
    { label: 'Shoes', href: '/shop?category=shoes' },
    { label: 'Accessories', href: '/shop?category=accessories' },
    { label: 'New Arrivals', href: '/shop?new=true' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Track Order', href: '/orders' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-champion-black text-white border-t border-white/10">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins mb-1">
                Join the <span className="gold-text">Champion</span> Circle
              </h3>
              <p className="text-white/60 text-sm">Get exclusive deals, new arrivals & style inspiration.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm placeholder:text-white/40 focus:outline-none focus:border-champion-gold transition-colors"
              />
              <button type="submit" className="px-6 py-3 btn-gold rounded-xl text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-champion-gold to-gold-600 flex items-center justify-center">
                <span className="text-black font-black text-sm">CW</span>
              </div>
              <span className="font-poppins font-bold text-xl">
                <span className="gold-text">Champion</span> Wear
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Dress Like a Champion. Live Like a Champion. Premium fashion for those who demand excellence in every aspect of life.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-champion-gold" /> Kigali, Rwanda</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-champion-gold" /> +250 788 000 000</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-champion-gold" /> hello@championwear.rw</div>
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Shop', links: footerLinks.shop },
            { title: 'Company', links: footerLinks.company },
            { title: 'Support', links: footerLinks.support },
          ].map(section => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4 font-poppins">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/50 hover:text-champion-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Champion Wear. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Youtube, href: '#', label: 'YouTube' },
            ].map(social => (
              <a key={social.label} href={social.href} aria-label={social.label}
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-champion-gold hover:text-black transition-all duration-200">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
