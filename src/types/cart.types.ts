import type { IProduct } from './product.types';

export interface ICartItem {
  product_id: number;
  quantity: number;
  product: IProduct;
}

export interface ICart {
  items: ICartItem[];
  totalPrice: number | string;
  totalQuantity: number;
}

export interface ICartItemRequest {
  product_id: number;
  quantity: number;
}

export interface IAddToCartPayload {
  product: IProduct;
  quantity: number;
}

export interface IUpdateCartQuantityPayload {
  productId: number;
  quantity: number;
}
