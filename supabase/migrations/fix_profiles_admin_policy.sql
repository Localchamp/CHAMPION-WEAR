-- Fix profile admin select policy to avoid RLS recursion
-- Run this in Supabase SQL Editor or deployment pipeline.

CREATE OR REPLACE FUNCTION public.is_admin_user(uid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM profiles WHERE id = uid AND role = 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR is_admin_user(auth.uid())
  );
