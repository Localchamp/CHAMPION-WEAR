import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings, ArrowLeft } from 'lucide-react';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-card border-r border-border fixed top-16 bottom-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-champion-gold/20 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-champion-gold" />
            </div>
            <span className="font-bold font-poppins text-sm">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            {adminNav.map(item => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
