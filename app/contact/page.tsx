'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from('contact_messages').insert(data);
      toast.success('Message sent! We\'ll get back to you soon.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-champion-black py-20">
        <div className="container-custom text-center">
          <p className="text-champion-gold text-sm font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="text-5xl font-black font-poppins text-white mb-4">Contact Us</h1>
          <p className="text-white/60 max-w-xl mx-auto">Have a question or need help? We&apos;re here for you.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold font-poppins mb-8">Let&apos;s Talk</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Visit Us', info: 'Accra Mall, Accra, Ghana' },
                  { icon: Phone, title: 'Call Us', info: '+233 20 000 0000' },
                  { icon: Mail, title: 'Email Us', info: 'hello@championwear.com' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-champion-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-champion-gold" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-muted/50 rounded-2xl">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="text-xl font-bold font-poppins mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name *</label>
                    <Input {...register('name')} placeholder="Your name" />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input {...register('email')} type="email" placeholder="your@email.com" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subject *</label>
                  <Input {...register('subject')} placeholder="How can we help?" />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full gap-2" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
