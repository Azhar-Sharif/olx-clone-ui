import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@components/atoms';
import { Header } from '@components/compounds';
import {
  addToCart,
  fetchProductById,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  const product = products.find((p: any) => p.id === parseInt(id || '0'));

  useEffect(() => {
    if (!product && id) {
      dispatch(fetchProductById(parseInt(id)) as any);
    }
  }, [dispatch, id, product]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-700 font-semibold mb-4">Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center bg-gray-200 rounded-lg h-96">
              <img
                src={
                  product.product_img_url ||
                  'https://via.placeholder.com/500x400'
                }
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  {product.category_name || 'Product'}
                </span>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.product_name}
                </h1>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-2">Price</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ₨{product.price}
                  </p>
                </div>

                <div className="border-t border-b border-gray-200 py-6 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        Available Quantity
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {product.quantity || 'N/A'} units
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Seller</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {product.user_name || 'Unknown'}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-1">Posted On</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {product.created_at
                          ? new Date(product.created_at).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-1">Category</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {product.category_name || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
