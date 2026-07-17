-- ============================================================
-- COMPLETE SIGNUP FIX
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- 1. Fix RLS: add INSERT policies for carts and wishlists
DROP POLICY IF EXISTS "Users manage own cart" ON carts;
CREATE POLICY "Users manage own cart" ON carts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own cart" ON carts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own cart" ON carts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own cart" ON carts
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own wishlist" ON wishlists;
CREATE POLICY "Users manage own wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own wishlist" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own wishlist" ON wishlists
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own wishlist" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- 2. Fix profiles INSERT policy
DROP POLICY IF EXISTS "Service can insert profiles" ON profiles;
CREATE POLICY "Service can insert profiles" ON profiles
  FOR INSERT WITH CHECK (TRUE);

-- 3. Add UNIQUE constraint on carts.user_id to prevent duplicate inserts
ALTER TABLE carts DROP CONSTRAINT IF EXISTS carts_user_id_key;
ALTER TABLE carts ADD CONSTRAINT carts_user_id_key UNIQUE (user_id);

-- 4. Recreate trigger function: SECURITY DEFINER + safe ON CONFLICT on all inserts
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.wishlists (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.carts (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
