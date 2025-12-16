export interface IProduct {
  id: number;
  product_name?: string;
  quantity: number;
  description?: string;
  price?: number;
  product_img?: File | null;
  product_img_url?: string | null;
  created_at?: string;
  user_name: string;
  category: number;
  category_name: string;
}

export interface IProductRequest {
  product_name?: string;
  quantity?: number;
  description?: string;
  price?: number;
  product_img?: File;
  category?: number;
}

export interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct | IProduct[] | null;
  errors?: Record<string, string[]>;
  status_code: number;
}
