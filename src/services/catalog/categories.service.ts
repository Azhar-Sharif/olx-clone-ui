import { IApiResponse, ICategory } from '@types';
import {
  apiClient,
  getApiResponseData,
  handleApiError,
  isApiResponseSuccess,
} from '@services';

export const categoryService = {
  listCategories: async (): Promise<ICategory[]> => {
    try {
      const response = await apiClient.get<IApiResponse>('/categories/');

      if (isApiResponseSuccess(response.data)) {
        const categoriesData = getApiResponseData(response.data);
        if (categoriesData) {
          return categoriesData;
        }
      }
      throw new Error(response.data.message || 'Product retrieval failed');
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
