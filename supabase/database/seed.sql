-- ============================================================
-- CHAMPION WEAR - Seed Data
-- ============================================================

-- Categories
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
  ('a1b2c3d4-0001-0001-0001-000000000001', 'Men', 'men', 'Men''s fashion collection', 1),
  ('a1b2c3d4-0001-0001-0001-000000000002', 'Women', 'women', 'Women''s fashion collection', 2),
  ('a1b2c3d4-0001-0001-0001-000000000003', 'Kids', 'kids', 'Kids'' fashion collection', 3),
  ('a1b2c3d4-0001-0001-0001-000000000004', 'Shoes', 'shoes', 'Footwear collection', 4),
  ('a1b2c3d4-0001-0001-0001-000000000005', 'Accessories', 'accessories', 'Fashion accessories', 5),
  ('a1b2c3d4-0001-0001-0001-000000000006', 'Sportswear', 'sportswear', 'Athletic & sportswear', 6),
  ('a1b2c3d4-0001-0001-0001-000000000007', 'Luxury', 'luxury', 'Premium luxury collection', 7),
  ('a1b2c3d4-0001-0001-0001-000000000008', 'Streetwear', 'streetwear', 'Urban streetwear', 8);

-- Sizes
INSERT INTO sizes (id, name, code, sort_order) VALUES
  ('b1b2c3d4-0002-0002-0002-000000000001', 'Extra Small', 'XS', 1),
  ('b1b2c3d4-0002-0002-0002-000000000002', 'Small', 'S', 2),
  ('b1b2c3d4-0002-0002-0002-000000000003', 'Medium', 'M', 3),
  ('b1b2c3d4-0002-0002-0002-000000000004', 'Large', 'L', 4),
  ('b1b2c3d4-0002-0002-0002-000000000005', 'Extra Large', 'XL', 5),
  ('b1b2c3d4-0002-0002-0002-000000000006', '2X Large', 'XXL', 6),
  ('b1b2c3d4-0002-0002-0002-000000000007', '3X Large', 'XXXL', 7),
  ('b1b2c3d4-0002-0002-0002-000000000008', 'UK 6', '6', 8),
  ('b1b2c3d4-0002-0002-0002-000000000009', 'UK 7', '7', 9),
  ('b1b2c3d4-0002-0002-0002-000000000010', 'UK 8', '8', 10),
  ('b1b2c3d4-0002-0002-0002-000000000011', 'UK 9', '9', 11),
  ('b1b2c3d4-0002-0002-0002-000000000012', 'UK 10', '10', 12),
  ('b1b2c3d4-0002-0002-0002-000000000013', 'UK 11', '11', 13);

-- Colors
INSERT INTO colors (id, name, hex_code, sort_order) VALUES
  ('c1b2c3d4-0003-0003-0003-000000000001', 'Black', '#000000', 1),
  ('c1b2c3d4-0003-0003-0003-000000000002', 'White', '#FFFFFF', 2),
  ('c1b2c3d4-0003-0003-0003-000000000003', 'Gold', '#D4AF37', 3),
  ('c1b2c3d4-0003-0003-0003-000000000004', 'Navy Blue', '#1E3A5F', 4),
  ('c1b2c3d4-0003-0003-0003-000000000005', 'Royal Blue', '#1E40AF', 5),
  ('c1b2c3d4-0003-0003-0003-000000000006', 'Red', '#DC2626', 6),
  ('c1b2c3d4-0003-0003-0003-000000000007', 'Grey', '#6B7280', 7),
  ('c1b2c3d4-0003-0003-0003-000000000008', 'Beige', '#D4C5A9', 8),
  ('c1b2c3d4-0003-0003-0003-000000000009', 'Green', '#16A34A', 9),
  ('c1b2c3d4-0003-0003-0003-000000000010', 'Brown', '#92400E', 10),
  ('c1b2c3d4-0003-0003-0003-000000000011', 'Pink', '#EC4899', 11),
  ('c1b2c3d4-0003-0003-0003-000000000012', 'Purple', '#7C3AED', 12);

-- Products
INSERT INTO products (id, name, slug, brand, category_id, description, short_description, price, compare_price, discount_percent, sku, gender, is_featured, is_new_arrival, is_best_seller, rating, review_count) VALUES
  ('d1b2c3d4-0004-0004-0004-000000000001', 'Champion Elite Hoodie', 'champion-elite-hoodie', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000001', 'Premium heavyweight hoodie crafted from 100% organic cotton. Features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for casual wear or light workouts.', 'Premium heavyweight organic cotton hoodie', 89000, 120000, 25, 'CW-HOD-001', 'men', TRUE, TRUE, FALSE, 4.8, 124),
  ('d1b2c3d4-0004-0004-0004-000000000002', 'Luxury Gold Bomber Jacket', 'luxury-gold-bomber-jacket', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000007', 'Exclusive bomber jacket with gold embroidery details. Made from premium satin fabric with a quilted lining for warmth and style.', 'Exclusive satin bomber with gold embroidery', 249000, 320000, 22, 'CW-BJK-001', 'unisex', TRUE, FALSE, TRUE, 4.9, 89),
  ('d1b2c3d4-0004-0004-0004-000000000003', 'Women''s Power Leggings', 'womens-power-leggings', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000002', 'High-waist compression leggings with moisture-wicking technology. Four-way stretch fabric provides maximum comfort during workouts.', 'High-waist compression workout leggings', 59000, 80000, 25, 'CW-LEG-001', 'women', TRUE, TRUE, TRUE, 4.7, 203),
  ('d1b2c3d4-0004-0004-0004-000000000004', 'Urban Streetwear Tee', 'urban-streetwear-tee', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000008', 'Oversized graphic tee with Champion Wear signature print. Made from soft cotton blend for all-day comfort.', 'Oversized signature graphic tee', 34000, 45000, 22, 'CW-TEE-001', 'unisex', FALSE, TRUE, FALSE, 4.5, 67),
  ('d1b2c3d4-0004-0004-0004-000000000005', 'Champion Runner Sneakers', 'champion-runner-sneakers', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000004', 'Lightweight performance running shoes with responsive cushioning. Breathable mesh upper and durable rubber outsole.', 'Lightweight performance running shoes', 129000, 160000, 19, 'CW-SNK-001', 'unisex', TRUE, FALSE, TRUE, 4.6, 156),
  ('d1b2c3d4-0004-0004-0004-000000000006', 'Classic Polo Shirt', 'classic-polo-shirt', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000001', 'Timeless polo shirt in premium pique cotton. Features a two-button placket and embroidered Champion Wear logo.', 'Premium pique cotton polo shirt', 49000, 65000, 23, 'CW-POL-001', 'men', FALSE, FALSE, TRUE, 4.4, 98),
  ('d1b2c3d4-0004-0004-0004-000000000007', 'Women''s Floral Maxi Dress', 'womens-floral-maxi-dress', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000002', 'Elegant floral print maxi dress with adjustable straps and a flowing silhouette. Perfect for summer occasions.', 'Elegant floral print maxi dress', 79000, 110000, 27, 'CW-DRS-001', 'women', TRUE, TRUE, FALSE, 4.7, 145),
  ('d1b2c3d4-0004-0004-0004-000000000008', 'Sport Performance Cap', 'sport-performance-cap', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000005', 'Moisture-wicking performance cap with UV protection. Adjustable strap for perfect fit.', 'UV protection performance cap', 24000, 35000, 29, 'CW-CAP-001', 'unisex', FALSE, FALSE, TRUE, 4.3, 78),
  ('d1b2c3d4-0004-0004-0004-000000000009', 'Kids Champion Tracksuit', 'kids-champion-tracksuit', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000003', 'Comfortable two-piece tracksuit for active kids. Elastic waistband and cuffs for easy movement.', 'Comfortable two-piece kids tracksuit', 44000, 60000, 25, 'CW-KID-001', 'kids', FALSE, TRUE, FALSE, 4.6, 52),
  ('d1b2c3d4-0004-0004-0004-000000000010', 'Premium Leather Belt', 'premium-leather-belt', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000005', 'Genuine leather belt with gold-tone Champion Wear buckle. Available in multiple sizes.', 'Genuine leather belt with gold buckle', 39000, 55000, 27, 'CW-BLT-001', 'unisex', FALSE, FALSE, FALSE, 4.5, 43),
  ('d1b2c3d4-0004-0004-0004-000000000011', 'Compression Training Shorts', 'compression-training-shorts', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000006', 'High-performance compression shorts with moisture management. Built-in liner for added support.', 'High-performance compression shorts', 39000, 55000, 27, 'CW-SHT-001', 'men', FALSE, FALSE, TRUE, 4.4, 87),
  ('d1b2c3d4-0004-0004-0004-000000000012', 'Luxury Cashmere Scarf', 'luxury-cashmere-scarf', 'Champion Wear', 'a1b2c3d4-0001-0001-0001-000000000007', 'Ultra-soft 100% cashmere scarf with Champion Wear monogram. A timeless luxury accessory.', '100% cashmere luxury scarf', 149000, 200000, 25, 'CW-SCF-001', 'unisex', TRUE, FALSE, FALSE, 4.9, 34);

-- Product Images
INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary) VALUES
  -- Champion Elite Hoodie
  ('d1b2c3d4-0004-0004-0004-000000000001', 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&auto=format&fit=crop', 'Champion Elite Hoodie Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000001', 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&auto=format&fit=crop', 'Champion Elite Hoodie Back', 1, FALSE),
  -- Luxury Gold Bomber Jacket
  ('d1b2c3d4-0004-0004-0004-000000000002', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop', 'Luxury Gold Bomber Jacket Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000002', 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&auto=format&fit=crop', 'Luxury Gold Bomber Jacket Side', 1, FALSE),
  -- Women Power Leggings
  ('d1b2c3d4-0004-0004-0004-000000000003', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop', 'Women Power Leggings Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000003', 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop', 'Women Power Leggings Side', 1, FALSE),
  -- Urban Streetwear Tee
  ('d1b2c3d4-0004-0004-0004-000000000004', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop', 'Urban Streetwear Tee Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000004', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop', 'Urban Streetwear Tee Back', 1, FALSE),
  -- Champion Runner Sneakers
  ('d1b2c3d4-0004-0004-0004-000000000005', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop', 'Champion Runner Sneakers Side', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000005', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop', 'Champion Runner Sneakers Top', 1, FALSE),
  -- Classic Polo Shirt
  ('d1b2c3d4-0004-0004-0004-000000000006', 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop', 'Classic Polo Shirt Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000006', 'https://images.unsplash.com/photo-1625910513462-e8e0e8e0e0e0?w=800&auto=format&fit=crop', 'Classic Polo Shirt Back', 1, FALSE),
  -- Women Floral Maxi Dress
  ('d1b2c3d4-0004-0004-0004-000000000007', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop', 'Women Floral Maxi Dress Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000007', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop', 'Women Floral Maxi Dress Side', 1, FALSE),
  -- Sport Performance Cap
  ('d1b2c3d4-0004-0004-0004-000000000008', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop', 'Sport Performance Cap Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000008', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop', 'Sport Performance Cap Side', 1, FALSE),
  -- Kids Champion Tracksuit
  ('d1b2c3d4-0004-0004-0004-000000000009', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop', 'Kids Champion Tracksuit Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000009', 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&auto=format&fit=crop', 'Kids Champion Tracksuit Back', 1, FALSE),
  -- Premium Leather Belt
  ('d1b2c3d4-0004-0004-0004-000000000010', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop', 'Premium Leather Belt', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000010', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop', 'Premium Leather Belt Detail', 1, FALSE),
  -- Compression Training Shorts
  ('d1b2c3d4-0004-0004-0004-000000000011', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop', 'Compression Training Shorts Front', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000011', 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop', 'Compression Training Shorts Side', 1, FALSE),
  -- Luxury Cashmere Scarf
  ('d1b2c3d4-0004-0004-0004-000000000012', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop', 'Luxury Cashmere Scarf', 0, TRUE),
  ('d1b2c3d4-0004-0004-0004-000000000012', 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&auto=format&fit=crop', 'Luxury Cashmere Scarf Draped', 1, FALSE);

-- Product Variants
INSERT INTO product_variants (product_id, size_id, color_id, sku, stock) VALUES
  -- Hoodie (S, M, L, XL) x (Black, White)
  ('d1b2c3d4-0004-0004-0004-000000000001', 'b1b2c3d4-0002-0002-0002-000000000002', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-HOD-001-S-BLK', 15),
  ('d1b2c3d4-0004-0004-0004-000000000001', 'b1b2c3d4-0002-0002-0002-000000000003', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-HOD-001-M-BLK', 20),
  ('d1b2c3d4-0004-0004-0004-000000000001', 'b1b2c3d4-0002-0002-0002-000000000004', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-HOD-001-L-BLK', 18),
  ('d1b2c3d4-0004-0004-0004-000000000001', 'b1b2c3d4-0002-0002-0002-000000000005', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-HOD-001-XL-BLK', 10),
  ('d1b2c3d4-0004-0004-0004-000000000001', 'b1b2c3d4-0002-0002-0002-000000000003', 'c1b2c3d4-0003-0003-0003-000000000002', 'CW-HOD-001-M-WHT', 12),
  -- Bomber Jacket (S, M, L) x (Black, Gold)
  ('d1b2c3d4-0004-0004-0004-000000000002', 'b1b2c3d4-0002-0002-0002-000000000002', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-BJK-001-S-BLK', 8),
  ('d1b2c3d4-0004-0004-0004-000000000002', 'b1b2c3d4-0002-0002-0002-000000000003', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-BJK-001-M-BLK', 10),
  ('d1b2c3d4-0004-0004-0004-000000000002', 'b1b2c3d4-0002-0002-0002-000000000004', 'c1b2c3d4-0003-0003-0003-000000000003', 'CW-BJK-001-L-GLD', 6),
  -- Leggings (XS, S, M, L) x (Black)
  ('d1b2c3d4-0004-0004-0004-000000000003', 'b1b2c3d4-0002-0002-0002-000000000001', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-LEG-001-XS-BLK', 20),
  ('d1b2c3d4-0004-0004-0004-000000000003', 'b1b2c3d4-0002-0002-0002-000000000002', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-LEG-001-S-BLK', 25),
  ('d1b2c3d4-0004-0004-0004-000000000003', 'b1b2c3d4-0002-0002-0002-000000000003', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-LEG-001-M-BLK', 30),
  ('d1b2c3d4-0004-0004-0004-000000000003', 'b1b2c3d4-0002-0002-0002-000000000004', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-LEG-001-L-BLK', 22),
  -- Tee (S, M, L, XL) x (Black, White)
  ('d1b2c3d4-0004-0004-0004-000000000004', 'b1b2c3d4-0002-0002-0002-000000000002', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-TEE-001-S-BLK', 30),
  ('d1b2c3d4-0004-0004-0004-000000000004', 'b1b2c3d4-0002-0002-0002-000000000003', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-TEE-001-M-BLK', 35),
  ('d1b2c3d4-0004-0004-0004-000000000004', 'b1b2c3d4-0002-0002-0002-000000000004', 'c1b2c3d4-0003-0003-0003-000000000002', 'CW-TEE-001-L-WHT', 28),
  -- Sneakers (UK 7-11) x (Black, White)
  ('d1b2c3d4-0004-0004-0004-000000000005', 'b1b2c3d4-0002-0002-0002-000000000009', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-SNK-001-7-BLK', 12),
  ('d1b2c3d4-0004-0004-0004-000000000005', 'b1b2c3d4-0002-0002-0002-000000000010', 'c1b2c3d4-0003-0003-0003-000000000001', 'CW-SNK-001-8-BLK', 15),
  ('d1b2c3d4-0004-0004-0004-000000000005', 'b1b2c3d4-0002-0002-0002-000000000011', 'c1b2c3d4-0003-0003-0003-000000000002', 'CW-SNK-001-9-WHT', 10),
  ('d1b2c3d4-0004-0004-0004-000000000005', 'b1b2c3d4-0002-0002-0002-000000000012', 'c1b2c3d4-0003-0003-0003-000000000002', 'CW-SNK-001-10-WHT', 8),
  -- Polo (S, M, L, XL) x (White, Navy)
  ('d1b2c3d4-0004-0004-0004-000000000006', 'b1b2c3d4-0002-0002-0002-000000000002', 'c1b2c3d4-0003-0003-0003-000000000002', 'CW-POL-001-S-WHT', 20),
  ('d1b2c3d4-0004-0004-0004-000000000006', 'b1b2c3d4-0002-0002-0002-000000000003', 'c1b2c3d4-0003-0003-0003-000000000002', 'CW-POL-001-M-WHT', 25),
  ('d1b2c3d4-0004-0004-0004-000000000006', 'b1b2c3d4-0002-0002-0002-000000000004', 'c1b2c3d4-0003-0003-0003-000000000004', 'CW-POL-001-L-NVY', 18);

-- Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
  ('CHAMPION10', '10% off your order', 'percentage', 10, 50000, 1000, TRUE),
  ('WELCOME20', '20% off for new customers', 'percentage', 20, 0, 500, TRUE),
  ('SAVE5000', 'RWF 5,000 off orders over RWF 50,000', 'fixed', 5000, 50000, 200, TRUE);
