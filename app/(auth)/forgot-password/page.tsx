'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resetPassword } from '@/services/auth';
import { toast } from 'sonner';

const schema = z.object({ email: z.string().email('Valid email required') });
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await resetPassword(data.email);
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-champion-black px-4">
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
          <h1 className="text-3xl font-bold text-white font-poppins">Reset Password</h1>
          <p className="text-white/50 mt-2">We&apos;ll send you a reset link</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Check your email</h3>
              <p className="text-white/50 text-sm mb-6">We sent a password reset link to your email address.</p>
              <Link href="/login" className="text-champion-gold hover:text-gold-400 text-sm font-medium transition-colors">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80 mb-1.5 block">Email Address</label>
                <Input {...register('email')} type="email" placeholder="you@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-champion-gold/50" />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>

              <Button type="submit" size="lg" variant="gold" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mt-2">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
