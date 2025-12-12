export interface IProduct {
  id: number;
  product_name: string;
  description: string;
  price: string;
  quantity: number;
  category: number;
  category_name: string;
  user_name: string;
  product_img?: string | File;
  product_img_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICreateProductRequest {
  product_name: string;
  description: string;
  price: string;
  quantity: number;
  product_img?: File;
  category: number;
}

export interface IUpdateProductRequest extends Partial<ICreateProductRequest> {}

export interface IProductListResponse {
  data: IProduct[];
}
