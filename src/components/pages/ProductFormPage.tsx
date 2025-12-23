import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';

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
  fetchProductById,
  updateProduct,
  useAppDispatch,
  useAppSelector,
} from '@store';

type FormMode = 'create' | 'edit';

interface IProductFormPageProps {
  mode: FormMode;
}

export const ProductFormPage: React.FC<IProductFormPageProps> = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { categories, isLoading: categoriesLoading } = useAppSelector(
    (state) => state.categories,
  );
  const { products, isLoading: productLoading } = useAppSelector(
    (state) => state.products,
  );

  const [formData, setFormData] =
    useState<IProductFormData>(getInitialFormData());
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = mode === 'edit';
  const product = isEditMode
    ? products.find((p: any) => p.id === parseInt(id || '0'))
    : null;

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    if (isEditMode && !product && id) {
      dispatch(fetchProductById(parseInt(id)) as any);
    }
    dispatch(fetchCategories() as any);
  }, [isAuthenticated, user, navigate, dispatch, id, product, isEditMode]);

  useEffect(() => {
    if (isEditMode && product) {
      if (product.user_name !== user?.username) {
        toast.error('You can only edit your own products');
        navigate('/my-products');
        return;
      }

      setFormData({
        product_name: product.product_name,
        description: product.description,
        price: String(product.price),
        quantity: String(product.quantity || ''),
        category: String(product.category),
        product_img: null,
      });

      if (product.product_img_url) {
        setPreviewImg(product.product_img_url);
      }
    }
  }, [product, user?.username, navigate, isEditMode]);

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
      const result = isEditMode
        ? await dispatch(
            updateProduct({ id: parseInt(id!), data: submitData }) as any,
          )
        : await dispatch(createNewProduct(submitData) as any);

      const { message, isSuccess } = getResultMessage(result, isEditMode);

      if (isSuccess) {
        toast.success(message);
        setFormData(getInitialFormData());
        setPreviewImg(null);
        setTimeout(() => {
          navigate(isEditMode ? '/my-products' : '/');
        }, 1500);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMsg = isEditMode
        ? 'Failed to update product'
        : 'Failed to create product';
      toast.error(error.message || errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const isLoading = productLoading;
  const pageTitle = isEditMode ? 'Edit Product' : 'Post Your Product';
  const pageSubtitle = isEditMode
    ? 'Update your product details'
    : 'Share your product with thousands of buyers on OLX';
  const buttonLabel = isEditMode ? 'Update Product' : 'Post Product';
  const cancelNavigation = isEditMode ? '/my-products' : '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isEditMode && (
          <button
            onClick={() => navigate('/my-products')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft size={20} />
            Back to My Products
          </button>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            {!isEditMode && (
              <div className="p-3 bg-blue-500 rounded-xl">
                <Plus size={32} className="text-white" />
              </div>
            )}
            {pageTitle}
          </h1>
          <p className="text-gray-600 text-lg">{pageSubtitle}</p>
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
              disabled={isSubmitting || isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {isEditMode ? 'Updating...' : 'Posting...'}
                </>
              ) : (
                <>
                  {!isEditMode && <Plus size={20} />}
                  {buttonLabel}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(cancelNavigation)}
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
