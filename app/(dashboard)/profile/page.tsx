'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Bell, Shield, LogOut, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { updateProfile, signOut } from '@/services/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const schema = z.object({
  full_name: z.string().min(2),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const navItems = [
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'orders', label: 'My Orders', icon: Package, href: '/orders' },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, href: '/wishlist' },
  { id: 'addresses', label: 'Addresses', icon: MapPin, href: '/profile/addresses' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/profile/notifications' },
  { id: 'security', label: 'Security', icon: Shield, href: '/profile/security' },
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { user, profile } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: profile?.full_name || '', phone: profile?.phone || '' },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user.id, data);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen pt-20 bg-muted/20">
      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-champion-gold/20 border-2 border-champion-gold/40 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-champion-gold">
                      {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-champion-gold text-black flex items-center justify-center hover:bg-gold-400 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-semibold mt-3">{profile?.full_name || 'Champion'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>

              <nav className="space-y-1">
                {navItems.map(item => (
                  <Link key={item.id} href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                      item.id === 'profile' ? 'bg-champion-gold/10 text-champion-gold font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <button onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold font-poppins mb-6">Personal Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                  <Input {...register('full_name')} placeholder="Your full name" />
                  {errors.full_name && <p className="text-xs text-destructive mt-1">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input value={user?.email || ''} disabled className="opacity-60" />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <Input {...register('phone')} placeholder="+233 20 000 0000" />
                </div>
                <Button type="submit" variant="gold" disabled={loading} className="gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
