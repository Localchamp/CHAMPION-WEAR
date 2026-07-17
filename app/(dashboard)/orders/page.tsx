'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUserOrders } from '@/services/orders';
import { formatPrice, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/types';
import Link from 'next/link';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'gold', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'success', icon: CheckCircle },
  packed: { label: 'Packed', color: 'success', icon: Package },
  shipped: { label: 'Shipped', color: 'success', icon: Truck },
  delivered: { label: 'Delivered', color: 'success', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'destructive', icon: XCircle },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    getUserOrders(user.id).then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-champion-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-muted/20">
      <div className="container-custom py-10 max-w-4xl">
        <h1 className="text-3xl font-bold font-poppins mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-champion-gold text-black font-semibold rounded-xl hover:bg-gold-400 transition-colors">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-champion-gold/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-lg">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                    <Badge variant={status.color as 'gold' | 'success' | 'destructive'} className="flex items-center gap-1">
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Order Timeline */}
                  <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide">
                    {['pending', 'confirmed', 'packed', 'shipped', 'delivered'].map((s, idx) => {
                      const statuses = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];
                      const currentIdx = statuses.indexOf(order.status);
                      const isCompleted = idx <= currentIdx;
                      const isCancelled = order.status === 'cancelled';
                      return (
                        <div key={s} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${isCancelled ? 'bg-red-500' : isCompleted ? 'bg-champion-gold' : 'bg-muted-foreground/30'}`} />
                          {idx < 4 && <div className={`w-8 h-0.5 ${isCompleted && !isCancelled ? 'bg-champion-gold' : 'bg-muted-foreground/20'}`} />}
                        </div>
                      );
                    })}
                    <span className="text-xs text-muted-foreground ml-2 capitalize whitespace-nowrap">{order.status}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{order.items?.length || 0} item(s)</p>
                      <p className="font-bold text-champion-gold">{formatPrice(order.total)}</p>
                    </div>
                    <Link href={`/orders/${order.id}`}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
