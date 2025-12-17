import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import {
  FormInput,
  FormSelect,
  FormTextarea,
  ImageUpload,
} from '@components/atoms';
import { Header } from '@components/compounds';
import {
  getInitialFormData,
  getResultMessage,
  hasFormErrors,
  IFormErrors,
  IProductFormData,
  prepareProductSubmitData,
  readFileAsDataURL,
  validateImageFile,
  validateProductForm,
} from '@utils';
import {
  createNewProduct,
  fetchCategories,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const PostProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { categories, isLoading: categoriesLoading } = useAppSelector(
    (state) => state.categories,
  );
  const { isLoading: productLoading } = useAppSelector(
    (state) => state.products,
  );

  const [formData, setFormData] =
    useState<IProductFormData>(getInitialFormData());
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    console.log('Fetching categories...');
    dispatch(fetchCategories() as any);
  }, [isAuthenticated, user, navigate, dispatch]);

  useEffect(() => {
    console.log('Categories state:', {
      categories,
      isLoading: categoriesLoading,
    });
  }, [categories, categoriesLoading]);

  const validateForm = (): boolean => {
    const newErrors = validateProductForm(formData);
    setErrors(newErrors);
    return !hasFormErrors(newErrors);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageError = validateImageFile(file);
      if (imageError) {
        setErrors((prev) => ({
          ...prev,
          product_img: imageError,
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        product_img: file,
      }));

      try {
        const dataUrl = await readFileAsDataURL(file);
        setPreviewImg(dataUrl);
        setErrors((prev) => ({
          ...prev,
          product_img: '',
        }));
      } catch (_error) {
        setErrors((prev) => ({
          ...prev,
          product_img: 'Failed to load image preview',
        }));
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      product_img: null,
    }));
    setPreviewImg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = prepareProductSubmitData(formData);
      const result = await dispatch(createNewProduct(submitData) as any);

      if (result.payload?.success && result.payload?.data) {
        const resultMessage = getResultMessage(result.payload);
        toast.success(resultMessage);
        setFormData(getInitialFormData());
        setPreviewImg(null);
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      } else if (result.payload?.message) {
        toast.error(result.payload?.message);
      } else if (result.error?.message) {
        toast.error(result.error?.message || 'Failed to create product');
      } else {
        toast.error('Failed to create product');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Plus size={32} className="text-white" />
            </div>
            Post Your Product
          </h1>
          <p className="text-gray-600 text-lg">
            Share your product with thousands of buyers on OLX
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-blue-500 rounded"></div>
              Product Information
            </h2>

            <div className="space-y-5">
              <FormInput
                label="Product Name"
                id="product_name"
                name="product_name"
                type="text"
                value={formData.product_name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                error={errors.product_name}
                required
              />

              <FormTextarea
                label="Description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Price (RS)"
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  error={errors.price}
                  step="0.01"
                  min="0"
                  required
                />

                <FormSelect
                  label="Category"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categories.map((cat: any) => ({
                    id: cat.id,
                    label: cat.category_name || cat.name,
                  }))}
                  error={errors.category}
                  placeholder={
                    categoriesLoading
                      ? 'Loading categories...'
                      : 'Select a category'
                  }
                  isLoading={categoriesLoading}
                  required
                />
              </div>

              <FormInput
                label="Quantity (Optional)"
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Available stock"
                min="0"
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-blue-500 rounded"></div>
              Product Image
            </h2>

            <ImageUpload
              previewImg={previewImg}
              error={errors.product_img}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || productLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting || productLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Post Product
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              disabled={isSubmitting}
              className="px-8 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-800 font-bold py-4 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
