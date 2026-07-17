'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createProduct } from '@/services/products';
import { createClient } from '@/lib/supabase/client';
import type { Product, GenderType, ProductStatus } from '@/types';
import { Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-react';

const selectClass =
  'w-full h-10 rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200';

const sectionClass = 'bg-card border border-border rounded-2xl p-6 space-y-4';

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [sku, setSku] = useState('');
  const [gender, setGender] = useState<GenderType>('unisex');
  const [status, setStatus] = useState<ProductStatus>('active');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from name
  useEffect(() => {
    setSlug(name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  }, [name]);

  // Fetch categories
  useEffect(() => {
    const supabase = createClient();
    supabase.from('categories').select('id, name').order('name').then(({ data }) => {
      if (data) setCategories(data as { id: string; name: string }[]);
    });
  }, []);

  const handleImageChange = (index: number, value: string) =>
    setImages(prev => prev.map((v, i) => (i === index ? value : v)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand || !price) {
      toast.error('Please provide name, brand and price');
      return;
    }
    setLoading(true);
    try {
      const p = Number(price);
      const cp = comparePrice ? Number(comparePrice) : undefined;
      const discount_percent = cp && cp > p ? Math.round(((cp - p) / cp) * 100) : 0;

      const payload: Partial<Product> = {
        name,
        slug: slug || undefined,
        brand,
        category_id: categoryId || undefined,
        description: description || undefined,
        short_description: shortDescription || undefined,
        price: p,
        compare_price: cp,
        discount_percent,
        sku: sku || undefined,
        gender,
        status,
        is_featured: isFeatured,
        is_new_arrival: isNewArrival,
        is_best_seller: isBestSeller,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
        rating: 0,
        review_count: 0,
        view_count: 0,
      };

      const created = await createProduct(payload);

      const imageUrls = images.map(u => u.trim()).filter(Boolean);
      if (imageUrls.length) {
        const supabase = createClient();
        const rows = imageUrls.map((url, i) => ({
          product_id: created.id,
          url,
          alt_text: name,
          sort_order: i,
          is_primary: i === 0,
        }));
        const { error: imgErr } = await supabase.from('product_images').insert(rows as never[]);
        if (imgErr) {
          toast.error('Product saved but images failed: ' + imgErr.message);
          router.push('/admin/products');
          return;
        }
      }

      toast.success('Product created successfully!');
      router.push('/admin/products');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/products')}
          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold font-poppins">Add Product</h1>
          <p className="text-muted-foreground text-sm">Fill in the details to create a new product</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className={sectionClass}>
          <h2 className="text-lg font-semibold font-poppins">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Product Name *</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Champion Classic Tee" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Slug</label>
              <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="auto-generated" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Brand *</label>
              <Input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Champion" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Category</label>
              <select className={selectClass} value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                <option value="">— Select category —</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">SKU</label>
              <Input value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. CW-001" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Gender</label>
              <select className={selectClass} value={gender} onChange={e => setGender(e.target.value as GenderType)}>
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Short Description</label>
            <Input value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="One-line summary shown on product cards" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Full Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder="Detailed product description..."
              className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className={sectionClass}>
          <h2 className="text-lg font-semibold font-poppins">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Price (RWF) *</label>
              <Input value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" placeholder="0" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Compare Price (RWF)</label>
              <Input value={comparePrice} onChange={e => setComparePrice(e.target.value)} type="number" min="0" placeholder="Original price" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Discount</label>
              <div className="h-10 flex items-center px-4 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground">
                {price && comparePrice && Number(comparePrice) > Number(price)
                  ? `${Math.round(((Number(comparePrice) - Number(price)) / Number(comparePrice)) * 100)}% off`
                  : 'No discount'}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className={sectionClass}>
          <h2 className="text-lg font-semibold font-poppins">Product Images</h2>
          <p className="text-sm text-muted-foreground -mt-2">Enter image URLs. The first image will be the primary/cover image.</p>
          <div className="space-y-2">
            {images.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-xs font-bold text-muted-foreground shrink-0">
                  {i === 0 ? '★' : i + 1}
                </div>
                <Input
                  value={img}
                  onChange={e => handleImageChange(i, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setImages(prev => [...prev, ''])}
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Add Image URL
          </Button>
        </div>

        {/* Status & Flags */}
        <div className={sectionClass}>
          <h2 className="text-lg font-semibold font-poppins">Status & Labels</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Status</label>
              <select className={selectClass} value={status} onChange={e => setStatus(e.target.value as ProductStatus)}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Tags (comma separated)</label>
              <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. summer, casual, new" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { label: 'Featured', value: isFeatured, set: setIsFeatured },
              { label: 'New Arrival', value: isNewArrival, set: setIsNewArrival },
              { label: 'Best Seller', value: isBestSeller, set: setIsBestSeller },
            ].map(({ label, value, set }) => (
              <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => set(!value)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    value ? 'bg-champion-gold border-champion-gold' : 'border-border group-hover:border-champion-gold/50'
                  }`}
                >
                  {value && <span className="text-black text-xs font-black">✓</span>}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pb-8">
          <Button type="submit" variant="gold" size="lg" disabled={loading} className="gap-2 min-w-[140px]">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : 'Create Product'}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.push('/admin/products')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
