import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import { orderService } from '@services';

interface OrderState {
  orders: Types.IOrder[];
  selectedOrder: Types.IOrder | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  success: false,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (request: Types.ICreateOrderRequest, { rejectWithValue }) => {
    try {
      return await orderService.createOrder(request);
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  },
);

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderSuccess: (state) => {
      state.success = false;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.orders.unshift(action.payload);
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrderSuccess, clearOrderError, clearSelectedOrder } =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
