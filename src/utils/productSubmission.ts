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

export const getResultMessage = (
  result: any,
  isEditMode: boolean = false,
): { message: string; isSuccess: boolean } => {
  const failureDefault = isEditMode
    ? 'Failed to update product'
    : 'Failed to create product';
  const successDefault = isEditMode
    ? 'Product updated successfully'
    : 'Product posted successfully';

  if (result.payload?.success) {
    return {
      message: result.payload?.message || successDefault,
      isSuccess: true,
    };
  }

  if (result.payload?.message) {
    return { message: result.payload.message, isSuccess: false };
  }

  if (result.error?.message) {
    return {
      message: result.error?.message || failureDefault,
      isSuccess: false,
    };
  }

  return { message: failureDefault, isSuccess: false };
};
