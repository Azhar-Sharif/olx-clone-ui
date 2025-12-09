import axios, { AxiosInstance, AxiosError } from 'axios';

import { ApiResponse, ApiError } from '@custom_types/';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

const getCsrfToken = (): string | null => {
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1] ?? null
  );
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();

  if (
    csrfToken &&
    config.method &&
    ['post', 'put', 'patch', 'delete'].includes(config.method)
  ) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
});

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>;

    if (axiosError.response?.data) {
      const apiResponse = axiosError.response.data;
      return {
        message: apiResponse.message || 'An error occurred',
        status: axiosError.response.status,
        ...(apiResponse.errors && { errors: apiResponse.errors }),
      };
    }

    if (axiosError.request && !axiosError.response) {
      return {
        message: 'No response from server. Please check your connection.',
        status: 0,
      };
    }
    return {
      message: axiosError.message || 'An error occurred',
      status: axiosError.response?.status || 500,
    };
  }
  return {
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred',
    status: 500,
  };
};

export const getApiResponseData = <T>(response: ApiResponse<T>): T | null => {
  return response.data || null;
};

export const isApiResponseSuccess = (response: ApiResponse): boolean => {
  return response.success === true;
};
