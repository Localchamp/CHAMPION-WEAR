export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: 'customer' | 'admin';
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          brand: string;
          category_id: string | null;
          description: string | null;
          short_description: string | null;
          price: number;
          compare_price: number | null;
          discount_percent: number;
          sku: string | null;
          gender: 'men' | 'women' | 'kids' | 'unisex';
          status: 'active' | 'inactive' | 'draft' | 'out_of_stock';
          is_featured: boolean;
          is_new_arrival: boolean;
          is_best_seller: boolean;
          tags: string[] | null;
          rating: number;
          review_count: number;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          brand: string;
          category_id?: string | null;
          description?: string | null;
          short_description?: string | null;
          price: number;
          compare_price?: number | null;
          discount_percent?: number;
          sku?: string | null;
          gender?: 'men' | 'women' | 'kids' | 'unisex';
          status?: 'active' | 'inactive' | 'draft' | 'out_of_stock';
          is_featured?: boolean;
          is_new_arrival?: boolean;
          is_best_seller?: boolean;
          tags?: string[] | null;
          rating?: number;
          review_count?: number;
          view_count?: number;
        };
        Update: {
          name?: string;
          slug?: string;
          brand?: string;
          category_id?: string | null;
          description?: string | null;
          short_description?: string | null;
          price?: number;
          compare_price?: number | null;
          discount_percent?: number;
          sku?: string | null;
          gender?: 'men' | 'women' | 'kids' | 'unisex';
          status?: 'active' | 'inactive' | 'draft' | 'out_of_stock';
          is_featured?: boolean;
          is_new_arrival?: boolean;
          is_best_seller?: boolean;
          tags?: string[] | null;
          rating?: number;
          review_count?: number;
          view_count?: number;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_text: string | null;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          product_id: string;
          url: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
        Update: {
          product_id?: string;
          url?: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          subtotal: number;
          discount_amount: number;
          shipping_amount: number;
          tax_amount: number;
          total: number;
          coupon_id: string | null;
          shipping_method: 'standard' | 'express' | 'pickup';
          shipping_address: Json;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          status?: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          subtotal: number;
          discount_amount?: number;
          shipping_amount?: number;
          tax_amount?: number;
          total: number;
          coupon_id?: string | null;
          shipping_method?: 'standard' | 'express' | 'pickup';
          shipping_address: Json;
          notes?: string | null;
        };
        Update: {
          user_id?: string | null;
          status?: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          subtotal?: number;
          discount_amount?: number;
          shipping_amount?: number;
          tax_amount?: number;
          total?: number;
          coupon_id?: string | null;
          shipping_method?: 'standard' | 'express' | 'pickup';
          shipping_address?: Json;
          notes?: string | null;
        };
      };
    };
  };
}
