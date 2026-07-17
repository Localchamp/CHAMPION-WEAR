import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/types';

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    },
  });
  if (error) throw error;
  // data.user exists but session is null when email confirmation is required
  return { user: data.user, needsConfirmation: !data.session };
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });
  if (error) throw error;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return null;
  return data as Profile;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .update(updates as never)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split('.').pop();
  const path = `avatars/${userId}.${ext}`;

  const { error: uploadError } = await supabase.storage.from('profile-images').upload(path, file, { upsert: true });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('profile-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function getWishlist(userId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('wishlists')
    .select('*, items:wishlist_items(*, product:products(*, images:product_images(*)))')
    .eq('user_id', userId)
    .single();
  return data;
}

export async function toggleWishlistItem(userId: string, productId: string) {
  const supabase = createClient();
  const { data: wishlist } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (!wishlist) return;

  const { data: existing } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('wishlist_id', wishlist.id)
    .eq('product_id', productId)
    .single();

  if (existing) {
    await supabase.from('wishlist_items').delete().eq('id', existing.id);
    return false;
  } else {
    await supabase.from('wishlist_items').insert({ wishlist_id: wishlist.id, product_id: productId });
    return true;
  }
}
