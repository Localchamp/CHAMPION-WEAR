'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { toggleWishlistItem } from '@/services/auth';

const WISHLIST_KEY = 'champion_wear_wishlist';

export function useWishlist() {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) setWishlistIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggle = useCallback(async (productId: string) => {
    const isInWishlist = wishlistIds.includes(productId);
    setWishlistIds(prev =>
      isInWishlist ? prev.filter(id => id !== productId) : [...prev, productId]
    );
    if (user) {
      await toggleWishlistItem(user.id, productId).catch(console.error);
    }
  }, [user, wishlistIds]);

  const isWishlisted = useCallback((productId: string) => wishlistIds.includes(productId), [wishlistIds]);

  return { wishlistIds, toggle, isWishlisted, count: wishlistIds.length };
}
