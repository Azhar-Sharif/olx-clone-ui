import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductsSection } from '@components/molecules';
import { useProductsWithCategory } from '@hooks';

interface IProductsListingCompoundProps {
  title?: string;
  showPostButton?: boolean;
}
export const ProductsListingCompound: React.FC<
  IProductsListingCompoundProps
> = ({ title = 'Explore Products', showPostButton = false }) => {
  const navigate = useNavigate();
  const {
    filteredProducts,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    categories,
  } = useProductsWithCategory();

  const handlePostProductClick = () => {
    navigate('/post-product');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-semibold">Error loading products</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsSection
        title={title}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        filteredProducts={filteredProducts}
        showPostButton={showPostButton}
        onPostProductClick={handlePostProductClick}
      />
    </div>
  );
};
