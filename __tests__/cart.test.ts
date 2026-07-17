import { calculateCartSummary } from '@/services/cart';
import type { CartItem } from '@/types';

const mockItems: CartItem[] = [
  {
    id: '1',
    cart_id: 'cart-1',
    product_id: 'prod-1',
    quantity: 2,
    product: {
      id: 'prod-1',
      name: 'Test Product',
      slug: 'test-product',
      brand: 'Test Brand',
      price: 50,
      gender: 'unisex',
      status: 'active',
      is_featured: false,
      is_new_arrival: false,
      is_best_seller: false,
      discount_percent: 0,
      rating: 4.5,
      review_count: 10,
      view_count: 100,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: '2',
    cart_id: 'cart-1',
    product_id: 'prod-2',
    quantity: 1,
    product: {
      id: 'prod-2',
      name: 'Test Product 2',
      slug: 'test-product-2',
      brand: 'Test Brand',
      price: 100,
      gender: 'men',
      status: 'active',
      is_featured: false,
      is_new_arrival: false,
      is_best_seller: false,
      discount_percent: 0,
      rating: 4.0,
      review_count: 5,
      view_count: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
];

describe('calculateCartSummary', () => {
  it('calculates subtotal correctly', () => {
    const summary = calculateCartSummary(mockItems);
    expect(summary.subtotal).toBe(200); // 2*50 + 1*100
  });

  it('calculates item count correctly', () => {
    const summary = calculateCartSummary(mockItems);
    expect(summary.itemCount).toBe(3); // 2 + 1
  });

  it('applies discount correctly', () => {
    const summary = calculateCartSummary(mockItems, 'standard', 20);
    expect(summary.discount).toBe(20);
  });

  it('uses free shipping for pickup', () => {
    const summary = calculateCartSummary(mockItems, 'pickup');
    expect(summary.shipping).toBe(0);
  });

  it('uses express shipping rate', () => {
    const summary = calculateCartSummary(mockItems, 'express');
    expect(summary.shipping).toBe(35);
  });

  it('calculates tax at 12.5%', () => {
    const summary = calculateCartSummary(mockItems, 'pickup', 0);
    expect(summary.tax).toBeCloseTo(200 * 0.125);
  });

  it('calculates total correctly', () => {
    const summary = calculateCartSummary(mockItems, 'pickup', 0);
    const expected = 200 + 0 + 200 * 0.125;
    expect(summary.total).toBeCloseTo(expected);
  });
});
