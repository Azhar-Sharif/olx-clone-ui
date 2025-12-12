import type * as Types from '@types';

import {
  apiClient,
  getApiResponseData,
  getApiResponseMessage,
  handleApiError,
  isApiResponseSuccess,
} from '@services';

export const authApi = {
  login: async (
    credentials: Types.ILoginRequest,
  ): Promise<Types.IAuthResponse> => {
    try {
      const response = await apiClient.post<Types.IApiResponse>(
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

  register: async (
    userData: Types.IRegisterRequest,
  ): Promise<Types.IAuthResponse> => {
    try {
      const response = await apiClient.post<Types.IApiResponse>(
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
      const response =
        await apiClient.post<Types.IApiResponse>('/user/logout/');
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
