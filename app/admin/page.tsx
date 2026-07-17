'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { AdminStats } from '@/types';

const mockChartData = [
  { month: 'Jan', sales: 4200, orders: 42 },
  { month: 'Feb', sales: 5800, orders: 58 },
  { month: 'Mar', sales: 4900, orders: 49 },
  { month: 'Apr', sales: 7200, orders: 72 },
  { month: 'May', sales: 6100, orders: 61 },
  { month: 'Jun', sales: 8900, orders: 89 },
  { month: 'Jul', sales: 9400, orders: 94 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalSales: 0, totalOrders: 0, totalCustomers: 0, totalProducts: 0,
    revenueThisMonth: 0, ordersThisMonth: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Array<{ id: string; order_number: string; total: number; status: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('id, order_number, total, status, created_at').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'customer'),
        supabase.from('products').select('id', { count: 'exact' }),
      ]);

      const orders = (ordersRes.data || []) as Array<{ id: string; order_number: string; total: number; status: string; created_at: string }>;
      const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const monthOrders = orders.filter(o => new Date(o.created_at) >= thisMonth);

      setStats({
        totalSales,
        totalOrders: orders.length,
        totalCustomers: customersRes.count || 0,
        totalProducts: productsRes.count || 0,
        revenueThisMonth: monthOrders.reduce((sum, o) => sum + (o.total || 0), 0),
        ordersThisMonth: monthOrders.length,
      });
      setRecentOrders(orders.slice(0, 5));
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.totalSales), icon: DollarSign, change: '+12.5%', up: true, color: 'text-champion-gold' },
    { label: 'Total Orders', value: stats.totalOrders.toString(), icon: ShoppingBag, change: '+8.2%', up: true, color: 'text-blue-400' },
    { label: 'Customers', value: stats.totalCustomers.toString(), icon: Users, change: '+15.3%', up: true, color: 'text-green-400' },
    { label: 'Products', value: stats.totalProducts.toString(), icon: Package, change: '+3.1%', up: true, color: 'text-purple-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-champion-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${card.up ? 'text-green-500' : 'text-red-500'}`}>
                {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-poppins">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold font-poppins">Revenue Overview</h3>
            <span className="text-xs text-muted-foreground">Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="sales" stroke="#d4af37" strokeWidth={2} fill="url(#salesGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold font-poppins mb-6">Orders by Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Bar dataKey="orders" fill="#1e40af" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold font-poppins">Recent Orders</h3>
          <a href="/admin/orders" className="text-sm text-champion-gold hover:text-gold-400 transition-colors flex items-center gap-1">
            View All <TrendingUp className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Order #', 'Total', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left py-3 px-2 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-medium">{order.order_number}</td>
                  <td className="py-3 px-2 font-semibold text-champion-gold">{formatPrice(order.total)}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                      order.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
                      'bg-champion-gold/20 text-champion-gold'
                    }`}>{order.status}</span>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
