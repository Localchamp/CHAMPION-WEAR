'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-champion-black">
      <div className="text-center px-4">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-white font-poppins mb-3">Something went wrong</h2>
        <p className="text-white/50 mb-8">An unexpected error occurred. Please try again.</p>
        <Button onClick={reset} variant="gold" size="lg">Try Again</Button>
      </div>
    </div>
  );
}
