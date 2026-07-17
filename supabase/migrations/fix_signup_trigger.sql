-- Fix: handle_new_user trigger fails with 500 on signup due to RLS blocking inserts

-- 1. Add missing INSERT policy on profiles (drop first to avoid duplicate error)
DROP POLICY IF EXISTS "Service can insert profiles" ON profiles;
CREATE POLICY "Service can insert profiles" ON profiles
  FOR INSERT WITH CHECK (TRUE);

-- 2. Recreate the trigger function with SECURITY DEFINER so it bypasses RLS
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO wishlists (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO carts (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Recreate the trigger (drop first to avoid duplicate)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
