-- Enable RLS and add public read policies for product-related tables
-- Run this in your Supabase SQL editor

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (TRUE);
CREATE POLICY "Public read product_variants" ON product_variants FOR SELECT USING (TRUE);
CREATE POLICY "Public read sizes" ON sizes FOR SELECT USING (TRUE);
CREATE POLICY "Public read colors" ON colors FOR SELECT USING (TRUE);
