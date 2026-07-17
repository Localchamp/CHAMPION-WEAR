'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from '@/services/auth';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back, Champion!');
      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-champion-black px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-champion-black via-champion-black to-champion-blue/10" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-champion-gold/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champion-gold to-gold-600 flex items-center justify-center">
              <span className="text-black font-black">CW</span>
            </div>
            <span className="font-poppins font-bold text-xl text-white">
              <span className="gold-text">Champion</span> Wear
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white font-poppins">Welcome Back</h1>
          <p className="text-white/50 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Email</label>
              <Input {...register('email')} type="email" placeholder="you@example.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50" />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Password</label>
              <div className="relative">
                <Input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-champion-gold hover:text-gold-400 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" variant="gold" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-champion-gold hover:text-gold-400 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
