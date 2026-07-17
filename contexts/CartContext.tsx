'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { CartItem, CartSummary } from '@/types';
import { calculateCartSummary } from '@/services/cart';

const CART_KEY = 'champion_wear_cart';

interface CartContextValue {
  items: CartItem[];
  summary: CartSummary;
  shippingMethod: string;
  setShippingMethod: (method: string) => void;
  discount: number;
  setDiscount: (d: number) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [discount, setDiscount] = useState(0);
  const [summary, setSummary] = useState<CartSummary>({ subtotal: 0, discount: 0, shipping: 15, tax: 0, total: 0, itemCount: 0 });

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    setSummary(calculateCartSummary(items, shippingMethod, discount));
  }, [items, shippingMethod, discount]);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === item.product_id && i.variant_id === item.variant_id);
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id: crypto.randomUUID() }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== itemId));
    } else {
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(0);
  }, []);

  return (
    <CartContext.Provider value={{ items, summary, shippingMethod, setShippingMethod, discount, setDiscount, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
