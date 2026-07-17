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
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string | null;
          product_name: string;
          product_image: string | null;
          size: string | null;
          color: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Insert: {
          order_id: string;
          product_id: string;
          variant_id?: string | null;
          product_name: string;
          product_image?: string | null;
          size?: string | null;
          color?: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          method: 'cash_on_delivery' | 'credit_card' | 'mobile_money';
          status: 'pending' | 'paid' | 'failed' | 'refunded';
          amount: number;
          transaction_id: string | null;
          created_at: string;
        };
        Insert: {
          order_id: string;
          method: 'cash_on_delivery' | 'credit_card' | 'mobile_money';
          status?: 'pending' | 'paid' | 'failed' | 'refunded';
          amount: number;
          transaction_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['payments']['Insert']>;
      };
      carts: {
        Row: { id: string; user_id: string | null; created_at: string; updated_at: string };
        Insert: { user_id?: string | null };
        Update: { user_id?: string | null };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          variant_id: string | null;
          quantity: number;
        };
        Insert: {
          cart_id: string;
          product_id: string;
          variant_id?: string | null;
          quantity?: number;
        };
        Update: { quantity?: number };
      };
      wishlists: {
        Row: { id: string; user_id: string; created_at: string };
        Insert: { user_id: string };
        Update: { user_id?: string };
      };
      wishlist_items: {
        Row: { id: string; wishlist_id: string; product_id: string; added_at: string };
        Insert: { wishlist_id: string; product_id: string };
        Update: { wishlist_id?: string; product_id?: string };
      };
      sizes: {
        Row: { id: string; name: string; code: string; sort_order: number };
        Insert: { name: string; code: string; sort_order?: number };
        Update: { name?: string; code?: string; sort_order?: number };
      };
      colors: {
        Row: { id: string; name: string; hex_code: string; sort_order: number };
        Insert: { name: string; hex_code: string; sort_order?: number };
        Update: { name?: string; hex_code?: string; sort_order?: number };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          size_id: string | null;
          color_id: string | null;
          sku: string | null;
          price_modifier: number;
          stock: number;
        };
        Insert: {
          product_id: string;
          size_id?: string | null;
          color_id?: string | null;
          sku?: string | null;
          price_modifier?: number;
          stock?: number;
        };
        Update: Partial<Database['public']['Tables']['product_variants']['Insert']>;
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          min_order_amount: number;
          max_uses: number | null;
          used_count: number;
          is_active: boolean;
          expires_at: string | null;
        };
        Insert: {
          code: string;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          min_order_amount?: number;
          max_uses?: number | null;
          is_active?: boolean;
          expires_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['coupons']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          is_read: boolean;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          title: string;
          message: string;
          is_read?: boolean;
          metadata?: Json | null;
        };
        Update: { is_read?: boolean };
      };
      newsletter: {
        Row: { id: string; email: string; created_at: string };
        Insert: { email: string };
        Update: { email?: string };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: { name: string; email: string; subject: string; message: string };
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
    };
  };
}
