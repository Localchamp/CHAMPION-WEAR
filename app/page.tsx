import { HeroSection } from '@/components/features/home/HeroSection';
import { CategoriesSection } from '@/components/features/home/CategoriesSection';
import { FeaturedProducts } from '@/components/features/home/FeaturedProducts';
import { PromoBanner } from '@/components/features/home/PromoBanner';
import { TestimonialsSection } from '@/components/features/home/TestimonialsSection';
import { getFeaturedProducts, getNewArrivals, getBestSellers } from '@/services/products.server';

export default async function HomePage() {
  const [featured, newArrivals, bestSellers] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getBestSellers(),
  ]);

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts featured={featured} newArrivals={newArrivals} bestSellers={bestSellers} />
      <PromoBanner />
      <TestimonialsSection />
    </>
  );
}
