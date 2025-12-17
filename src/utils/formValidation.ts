export interface IFormErrors {
  [key: string]: string;
}

export interface IProductFormData {
  product_name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  product_img: File | null;
}
export const validateProductForm = (
  formData: IProductFormData,
): IFormErrors => {
  const errors: IFormErrors = {};

  if (!formData.product_name.trim()) {
    errors.product_name = 'Product name is required';
  }

  if (!formData.price || parseFloat(formData.price) <= 0) {
    errors.price = 'Valid price is required';
  }

  if (!formData.category) {
    errors.category = 'Category is required';
  }

  if (formData.quantity && parseInt(formData.quantity) < 0) {
    errors.quantity = 'Quantity cannot be negative';
  }

  return errors;
};

export const validateImageFile = (file: File): string => {
  if (!file.type.startsWith('image/')) {
    return 'Please select a valid image file';
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'Image size must be less than 5MB';
  }

  return '';
};

export const hasFormErrors = (errors: IFormErrors): boolean =>
  Object.keys(errors).length > 0;
