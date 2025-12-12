import axios, { AxiosInstance, AxiosError } from 'axios';

import type * as Types from '@types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleApiError = (error: unknown): Types.IApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<Types.IApiResponse>;

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

export const getApiResponseData = (
  response: Types.IApiResponse,
): any | null => {
  return response.data || null;
};

export const isApiResponseSuccess = (response: Types.IApiResponse): boolean => {
  return response.success === true;
};

export const getApiResponseMessage = (
  response: Types.IApiResponse,
): string | null => {
  return response.message || null;
};
