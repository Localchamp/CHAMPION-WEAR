-- Update existing product image URLs to include proper Unsplash parameters
-- and add secondary images for products that are missing them

-- Update primary image URLs
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000001' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000002' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000003' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000004' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000005' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000006' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000007' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000008' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000009' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000010' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000011' AND is_primary = TRUE;
UPDATE product_images SET url = 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop' WHERE product_id = 'd1b2c3d4-0004-0004-0004-000000000012' AND is_primary = TRUE;

-- Delete old secondary images to avoid duplicates before re-inserting
DELETE FROM product_images WHERE is_primary = FALSE AND product_id IN (
  'd1b2c3d4-0004-0004-0004-000000000001',
  'd1b2c3d4-0004-0004-0004-000000000002',
  'd1b2c3d4-0004-0004-0004-000000000003',
  'd1b2c3d4-0004-0004-0004-000000000004',
  'd1b2c3d4-0004-0004-0004-000000000005',
  'd1b2c3d4-0004-0004-0004-000000000006',
  'd1b2c3d4-0004-0004-0004-000000000007',
  'd1b2c3d4-0004-0004-0004-000000000008',
  'd1b2c3d4-0004-0004-0004-000000000009',
  'd1b2c3d4-0004-0004-0004-000000000010',
  'd1b2c3d4-0004-0004-0004-000000000011',
  'd1b2c3d4-0004-0004-0004-000000000012'
);

-- Insert secondary images for all products
INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary) VALUES
  ('d1b2c3d4-0004-0004-0004-000000000001', 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&auto=format&fit=crop', 'Champion Elite Hoodie Back', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000002', 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&auto=format&fit=crop', 'Luxury Gold Bomber Jacket Side', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000003', 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop', 'Women Power Leggings Side', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000004', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop', 'Urban Streetwear Tee Back', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000005', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop', 'Champion Runner Sneakers Top', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000006', 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&auto=format&fit=crop', 'Classic Polo Shirt Back', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000007', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop', 'Women Floral Maxi Dress Side', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000008', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop', 'Sport Performance Cap Side', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000009', 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&auto=format&fit=crop', 'Kids Champion Tracksuit Back', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000010', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop', 'Premium Leather Belt Detail', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000011', 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop', 'Compression Training Shorts Side', 1, FALSE),
  ('d1b2c3d4-0004-0004-0004-000000000012', 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&auto=format&fit=crop', 'Luxury Cashmere Scarf Draped', 1, FALSE);
