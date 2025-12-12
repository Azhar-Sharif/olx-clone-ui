import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type * as Types from '@types';

import { authApi } from '@services';

interface RegisterState {
  user: Types.IUser | null | any;
  isLoading: boolean;
  error: string | null | any;
}

const initialState: RegisterState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: Types.IRegisterRequest, { rejectWithValue }) => {
    try {
      const registerUser = await authApi.register(userData);
      return registerUser;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Registration failed',
      );
    }
  },
);

const registerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { clearError } = registerSlice.actions;
export const authReducer = registerSlice.reducer;
