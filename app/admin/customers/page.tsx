'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { Profile } from '@/types';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const supabase = createClient();
      const query = supabase.from('profiles').select('*').eq('role', 'customer').order('created_at', { ascending: false });
      const { data } = search
        ? await query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
        : await query;
      setCustomers((data as Profile[]) || []);
      setLoading(false);
    };
    fetchCustomers();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Customers</h1>
          <p className="text-muted-foreground">{customers.length} registered customers</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-champion-gold/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-champion-gold" />
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                {['Customer', 'Email', 'Phone', 'Role', 'Joined'].map(h => (
                  <th key={h} className="text-left py-4 px-4 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="py-4 px-4"><div className="h-4 bg-muted rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : customers.map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-champion-gold/20 border border-champion-gold/30 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-champion-gold">
                          {customer.full_name?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="font-medium">{customer.full_name || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{customer.email}</td>
                  <td className="py-4 px-4 text-muted-foreground">{customer.phone || '—'}</td>
                  <td className="py-4 px-4">
                    <Badge variant={customer.role === 'admin' ? 'gold' : 'secondary'} className="capitalize">
                      {customer.role}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{formatDate(customer.created_at)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
