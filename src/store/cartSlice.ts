import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type * as Types from '@types';

const initialState: Types.ICart = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const calculateTotals = (items: Types.ICartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Types.IAddToCartPayload>) => {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product_id: product.id,
          quantity,
          product,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product_id !== action.payload,
      );
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<Types.IUpdateCartQuantityPayload>,
    ) => {
      const { productId, quantity } = action.payload;

      const item = state.items.find((item) => item.product_id === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product_id !== productId,
          );
        } else {
          item.quantity = quantity;
        }

        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
