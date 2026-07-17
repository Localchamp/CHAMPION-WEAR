'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice, formatDate } from '@/lib/utils';
import { updateOrderStatus } from '@/services/orders';
import { toast } from 'sonner';
import type { Order } from '@/types';

const statusOptions = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<(Order & { profile?: { full_name: string; email: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('orders')
      .select('*, items:order_items(*), profile:profiles(full_name, email)' as string)
      .order('created_at', { ascending: false });
    setOrders((data as typeof orders) || []);
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    await updateOrderStatus(orderId, status);
    toast.success('Order status updated');
    fetchOrders();
  };

  const filtered = orders.filter(o =>
    o.order_number.toLowerCase().includes(search.toLowerCase()) ||
    o.profile?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Orders</h1>
        <p className="text-muted-foreground">{orders.length} total orders</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                {['Order #', 'Customer', 'Items', 'Total', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left py-4 px-4 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="py-4 px-4"><div className="h-4 bg-muted rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-4 font-bold">{order.order_number}</td>
                  <td className="py-4 px-4">
                    <p className="font-medium">{order.profile?.full_name || 'Guest'}</p>
                    <p className="text-xs text-muted-foreground">{order.profile?.email}</p>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{order.items?.length || 0} items</td>
                  <td className="py-4 px-4 font-bold text-champion-gold">{formatPrice(order.total)}</td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className="appearance-none pl-3 pr-8 py-1.5 bg-muted border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-champion-gold/50 cursor-pointer capitalize"
                      >
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-muted-foreground" />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{formatDate(order.created_at)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
