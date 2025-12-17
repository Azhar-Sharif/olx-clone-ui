export interface IOrderProductInput {
  product_id: number;
  quantity: number;
}

export interface IOrderProductResponse {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: string;
}

export interface ICreateOrderRequest {
  shipping_address: string;
  products_data: IOrderProductInput[];
}

export interface IUpdateOrderRequest {
  shipping_address?: string;
  products_data?: IOrderProductInput[];
}

export interface IOrder {
  id: number;
  user: string;
  order_date?: string;
  products: IOrderProductResponse[];
  total_amount: string;
  shipping_address: string;
  order_status: string;
  created_at?: string;
  updated_at?: string;
}

export interface IOrderListResponse {
  data: IOrder[];
}
