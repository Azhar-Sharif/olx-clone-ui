import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@custom_types/';

import {
  apiClient,
  getApiResponseData,
  getApiResponseMessage,
  handleApiError,
  isApiResponseSuccess,
} from '@services/api.config';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/user/login/',
        credentials,
      );
      if (isApiResponseSuccess(response.data)) {
        const authData = getApiResponseData(response.data);
        if (authData) {
          return authData;
        }
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/user/register/',
        userData,
      );
      if (isApiResponseSuccess(response.data)) {
        const authData = getApiResponseData(response.data);
        if (authData) {
          return authData;
        }
      }
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: async (): Promise<string | null> => {
    try {
      const response = await apiClient.post<ApiResponse>('/user/logout/');
      if (isApiResponseSuccess(response.data)) {
        const message = getApiResponseMessage(response.data);
        return message;
      }
      throw new Error(response.data.message || 'Logout failed');
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
