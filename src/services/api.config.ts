import axios, { AxiosInstance, AxiosError } from 'axios';

import { IApiResponse, IApiError } from '@types';

import { getApiConfig } from '@configurations';

const { baseUrl, timeout } = getApiConfig();
export const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withXSRFToken: true,
});

export const handleApiError = (error: unknown): IApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IApiResponse>;

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

export const getApiResponseData = (response: IApiResponse) => {
  return response.data || null;
};

export const isApiResponseSuccess = (response: IApiResponse): boolean => {
  return response.success === true;
};

export const getApiResponseMessage = (response: IApiResponse): string => {
  return response.message || '';
};
