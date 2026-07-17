-- Fix missing INSERT policies for order_items and payments
-- Run this in your Supabase SQL editor

-- Allow users to insert order items for their own orders
CREATE POLICY "Users create own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

-- Allow users to insert payments for their own orders
CREATE POLICY "Users create own payments" ON payments
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

-- Allow users to view their own payments
CREATE POLICY "Users view own payments" ON payments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

-- Admins manage all order items and payments
CREATE POLICY "Admins manage all order items" ON order_items
  FOR ALL USING (is_admin_user(auth.uid()));

CREATE POLICY "Admins manage all payments" ON payments
  FOR ALL USING (is_admin_user(auth.uid()));
