import type * as Types from '@types';
import {
  apiClient,
  getApiResponseData,
  handleApiError,
  isApiResponseSuccess,
} from '@services';

export const orderService = {
  createOrder: async (
    request: Types.ICreateOrderRequest,
  ): Promise<Types.IOrder> => {
    try {
      const response = await apiClient.post<Types.IApiResponse>(
        '/orders/',
        request,
      );
      if (isApiResponseSuccess(response.data)) {
        const orderData = getApiResponseData(response.data);
        if (orderData) {
          return orderData;
        }
      }
      throw new Error(response.data.message || 'Order creation failed');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getOrders: async (params?: Record<string, any>): Promise<Types.IOrder[]> => {
    try {
      const response = await apiClient.get<Types.IApiResponse>('/orders/', {
        params,
      });
      if (isApiResponseSuccess(response.data)) {
        const ordersData = getApiResponseData(response.data);
        if (Array.isArray(ordersData)) {
          return ordersData;
        } else if (ordersData?.data && Array.isArray(ordersData.data)) {
          return ordersData.data;
        }
      }
      throw new Error(response.data.message || 'Failed to fetch orders');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getOrderById: async (id: number): Promise<Types.IOrder> => {
    try {
      const response = await apiClient.get<Types.IApiResponse>(
        `/orders/${id}/`,
      );
      if (isApiResponseSuccess(response.data)) {
        const orderData = getApiResponseData(response.data);
        if (orderData) {
          return orderData;
        }
      }
      throw new Error(response.data.message || 'Order not found');
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
