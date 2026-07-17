# TODO - Fix Supabase profiles 500

## Step 1: Implement code-side resilience
- [x] Update `hooks/useAuth.ts` to tolerate missing `profiles` row (single row may be absent) and avoid throwing when `error` indicates no row.
- [x] Update `lib/supabase/middleware.ts` to handle missing `profiles` row during `/admin/*` checks (treat as non-admin or redirect safely instead of failing).

## Step 2: Verify DB behavior
- [ ] Verify Supabase trigger `handle_new_user()` actually creates `profiles` rows (and `wishlists`/`carts`) for newly signed-up users.
- [ ] If still failing, adjust migrations/policies (RLS/trigger/security definer/search_path).

## Step 3: Validate
- [ ] Reproduce failing request path and confirm `/rest/v1/profiles?...` no longer returns 500.
- [ ] Run Next.js app build/tests.

