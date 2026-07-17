'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUp } from '@/services/auth';
import { toast } from 'sonner';

const schema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
  agree_terms: z.boolean().refine(v => v, 'You must agree to the terms'),
}).refine(d => d.password === d.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { needsConfirmation } = await signUp(data.email, data.password, data.full_name);
      if (needsConfirmation) {
        toast.success('Check your email to confirm your account!');
      } else {
        toast.success('Account created! Welcome to Champion Wear!');
        router.push('/');
        router.refresh();
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-champion-black px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-champion-black via-champion-black to-champion-blue/10" />

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
          <h1 className="text-3xl font-bold text-white font-poppins">Join the Champions</h1>
          <p className="text-white/50 mt-2">Create your account today</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Full Name</label>
              <Input {...register('full_name')} placeholder="John Doe"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50" />
              {errors.full_name && <p className="text-xs text-red-400 mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Email</label>
              <Input {...register('email')} type="email" placeholder="you@example.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50" />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Password</label>
              <div className="relative">
                <Input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Confirm Password</label>
              <Input {...register('confirm_password')} type="password" placeholder="Repeat password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50" />
              {errors.confirm_password && <p className="text-xs text-red-400 mt-1">{errors.confirm_password.message}</p>}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input type="checkbox" {...register('agree_terms')} className="sr-only peer" />
                <div className="w-5 h-5 rounded border-2 border-white/20 peer-checked:bg-champion-gold peer-checked:border-champion-gold transition-all flex items-center justify-center">
                  <Check className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100" />
                </div>
              </div>
              <span className="text-sm text-white/60">
                I agree to the{' '}
                <Link href="/terms" className="text-champion-gold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-champion-gold hover:underline">Privacy Policy</Link>
              </span>
            </label>
            {errors.agree_terms && <p className="text-xs text-red-400">{errors.agree_terms.message}</p>}

            <Button type="submit" size="lg" variant="gold" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-champion-gold hover:text-gold-400 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
