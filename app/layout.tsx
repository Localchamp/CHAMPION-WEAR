import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { CartProvider } from '@/contexts/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Champion Wear | Dress Like a Champion', template: '%s | Champion Wear' },
  description: 'Dress Like a Champion. Live Like a Champion. Shop the latest fashion collections at Champion Wear.',
  keywords: ['fashion', 'clothing', 'champion wear', 'online store', 'Rwanda fashion'],
  authors: [{ name: 'Champion Wear' }],
  creator: 'Champion Wear',
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Champion Wear',
    title: 'Champion Wear | Dress Like a Champion',
    description: 'Shop the latest fashion collections at Champion Wear.',
  },
  twitter: { card: 'summary_large_image', title: 'Champion Wear', description: 'Dress Like a Champion. Live Like a Champion.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-inter`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
