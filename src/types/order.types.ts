export interface OrderProductInput {
  product_id: number;
  quantity: number;
}

export interface CreateOrderRequest {
  shipping_address: string;
  products_data: OrderProductInput[];
}

export interface UpdateOrderRequest {
  shipping_address?: string;
  products_data?: OrderProductInput[];
}

export interface Order {
  id: number;
  shipping_address: string;
  products_data: OrderProductInput[];
  owner: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderListResponse {
  data: Order[];
}
