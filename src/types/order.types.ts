export interface IOrderProductInput {
  product_id: number;
  quantity: number;
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
  shipping_address: string;
  products_data: IOrderProductInput[];
  owner: string;
  created_at?: string;
  updated_at?: string;
}

export interface IOrderListResponse {
  data: IOrder[];
}
