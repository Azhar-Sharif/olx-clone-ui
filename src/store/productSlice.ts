import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import { productService } from '@services';

interface IProductState {
  products: Types.IProduct[] | any;
  isLoading: boolean;
  error: string | null | any;
}

const initialState: IProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.listProducts();
    } catch (error: string | any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await productService.getProduct(id);
    } catch (error: string | any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  },
);

export const createNewProduct = createAsyncThunk(
  'products/createNewProduct',
  async (data: Record<string, any>, { rejectWithValue }) => {
    try {
      return await productService.createProduct(data);
    } catch (error: string | any) {
      return rejectWithValue(error.message || 'Failed to create product');
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (
    { id, data }: { id: number; data: Record<string, any> },
    { rejectWithValue },
  ) => {
    try {
      return await productService.updateProduct(id, data);
    } catch (error: string | any) {
      return rejectWithValue(error.message || 'Failed to update product');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch products';
      })

      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && !Array.isArray(action.payload)) {
          state.products = [action.payload];
        }
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch product';
      })

      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && !Array.isArray(action.payload)) {
          state.products.unshift(action.payload);
        }
        state.error = null;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create product';
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && !Array.isArray(action.payload)) {
          const idx = state.products.findIndex(
            (p: any) => p.id === action.payload.id,
          );
          if (idx !== -1) {
            state.products[idx] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update product';
      });
  },
});

export const productReducer = productSlice.reducer;
