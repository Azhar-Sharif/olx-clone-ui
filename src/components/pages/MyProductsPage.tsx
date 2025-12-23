import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2 } from 'lucide-react';

import {
  EmptyState,
  ErrorMessage,
  LoadingState,
  ProductCard,
} from '@components/atoms';
import { Header } from '@components/compounds';
import { RootState } from '@store';
import { useProductsWithCategory } from '@hooks';

export const MyProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const { products, isLoading, error } = useProductsWithCategory();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const userProducts = (products || []).filter(
    (product: any) => product.user_name === user?.username,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
          <p className="text-gray-600">
            {userProducts.length === 0
              ? 'You have not posted any products yet.'
              : `You have posted ${userProducts.length} product${userProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        {isLoading && <LoadingState message="Loading your products..." />}

        {!isLoading && userProducts.length === 0 && !error && (
          <EmptyState
            title="No Products Yet"
            description="You haven't posted any products. Start selling by posting your first product!"
            actionLabel="Post Product"
            onAction={() => navigate('/post-product')}
          />
        )}

        {!isLoading && userProducts.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userProducts.map((product: any) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-product/${product.id}`);
                    }}
                    className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:bg-blue-700"
                    title="Edit product"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
