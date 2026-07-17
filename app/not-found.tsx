import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-champion-black">
      <div className="text-center px-4">
        <div className="text-8xl font-black font-poppins mb-4">
          <span className="gold-text">404</span>
        </div>
        <h1 className="text-3xl font-bold text-white font-poppins mb-3">Page Not Found</h1>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="gold" size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
