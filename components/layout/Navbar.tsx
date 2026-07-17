'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, Sun, Moon, User, ChevronDown, LogOut, Settings, Package } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useSearch } from '@/hooks/useSearch';
import { signOut } from '@/services/auth';
import { cn } from '@/lib/utils';
import { NotificationBell } from '@/components/features/notifications/NotificationBell';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=men', label: 'Men' },
  { href: '/shop?category=women', label: 'Women' },
  { href: '/shop?category=new-arrivals', label: 'New Arrivals' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, profile } = useAuth();
  const { summary } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { query, setQuery, results, loading, isOpen, setIsOpen } = useSearch();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    setUserMenuOpen(false);
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-transparent'
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champion-gold to-gold-600 flex items-center justify-center">
              <span className="text-black font-black text-sm">CW</span>
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight">
              <span className="gold-text">Champion</span>
              <span className="text-foreground"> Wear</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-champion-gold bg-champion-gold/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-3">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-champion-gold/50"
                      />
                    </div>
                    {loading && (
                      <div className="px-4 py-3 text-sm text-muted-foreground">Searching...</div>
                    )}
                    {isOpen && results.length > 0 && (
                      <div className="max-h-64 overflow-y-auto">
                        {results.map(product => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => { setSearchOpen(false); setQuery(''); setIsOpen(false); }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          >
                            {product.images?.[0] && (
                              <Image src={product.images[0].url} alt={product.name} width={40} height={40} className="rounded-lg object-cover" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">GHS {product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {isOpen && results.length === 0 && !loading && (
                      <div className="px-4 py-3 text-sm text-muted-foreground">No results found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </button>

            {/* Notifications */}
            {user && <NotificationBell userId={user.id} />}

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {summary.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-champion-gold text-black text-xs rounded-full flex items-center justify-center font-bold">
                  {summary.itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-champion-gold/20 border border-champion-gold/40 flex items-center justify-center">
                    <span className="text-xs font-bold text-champion-gold">
                      {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 hidden md:block" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 w-48 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden py-1"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold truncate">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      {[
                        { href: '/profile', icon: User, label: 'Profile' },
                        { href: '/orders', icon: Package, label: 'My Orders' },
                        ...(profile?.role === 'admin' ? [{ href: '/admin', icon: Settings, label: 'Admin Dashboard' }] : []),
                      ].map(item => (
                        <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                      <button onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-champion-gold transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-semibold bg-champion-gold text-black rounded-xl hover:bg-gold-400 transition-colors">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    pathname === link.href ? 'text-champion-gold bg-champion-gold/10' : 'hover:bg-muted'
                  )}>
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="flex gap-2 pt-2">
                  <Link href="/login" className="flex-1 text-center px-4 py-2.5 text-sm font-medium border border-border rounded-xl hover:bg-muted transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="flex-1 text-center px-4 py-2.5 text-sm font-semibold bg-champion-gold text-black rounded-xl hover:bg-gold-400 transition-colors">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
