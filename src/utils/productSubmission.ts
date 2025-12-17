import { IProductFormData } from './formValidation';

export const prepareProductSubmitData = (formData: IProductFormData) => ({
  product_name: formData.product_name,
  description: formData.description || '',
  price: formData.price,
  quantity: formData.quantity ? parseInt(formData.quantity) : 0,
  category: parseInt(formData.category),
  product_img: formData.product_img,
});

export const getInitialFormData = (): IProductFormData => ({
  product_name: '',
  description: '',
  price: '',
  quantity: '',
  category: '',
  product_img: null,
});

export const readFileAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const getResultMessage = (result: any): string | null => {
  if (result.payload?.success && result.payload?.data) {
    return null;
  }

  if (result.payload?.message) {
    return result.payload.message;
  }

  if (result.error?.message) {
    return result.error.message || 'Failed to create product';
  }

  return 'Failed to create product';
};
