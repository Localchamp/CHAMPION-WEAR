import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts } from '@/services/products.server';
import { ProductDetailClient } from '@/components/features/products/ProductDetailClient';
import { ProductCard } from '@/components/features/products/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.short_description || product.description,
    openGraph: {
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = product.category_id
    ? await getRelatedProducts(product.id, product.category_id)
    : [];

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-10">
        <ProductDetailClient product={product} />

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold font-poppins mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
