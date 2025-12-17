import { IApiResponse, IProductResponse } from '@types';
import {
  apiClient,
  getApiResponseData,
  handleApiError,
  isApiResponseSuccess,
} from '@services';

export const productService = {
  listProducts: async (
    params?: Record<string, any>,
  ): Promise<IProductResponse> => {
    try {
      const response = await apiClient.get<IApiResponse>('/products/', {
        params,
      });
      if (isApiResponseSuccess(response.data)) {
        const productData = getApiResponseData(response.data);
        if (productData) {
          return productData;
        }
      }
      throw new Error(response.data.message || 'Product retrieval failed');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getProduct: async (id: number): Promise<IProductResponse> => {
    try {
      const response = await apiClient.get<IApiResponse>(`/products/${id}/`);
      if (isApiResponseSuccess(response.data)) {
        const productData = getApiResponseData(response.data);
        if (productData) {
          return productData;
        }
      }
      throw new Error(response.data.message || 'Product not found');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createProduct: async (data: Record<string, any>): Promise<IApiResponse> => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const response = await apiClient.post<IApiResponse>(
        '/products/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
