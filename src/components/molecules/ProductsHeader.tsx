import React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@components/atoms';
import { CategoryFilter, ProductGrid } from '@components/molecules';
import type * as Types from '@types';

interface IProductsSectionProps {
  title?: string;
  categories: any[];
  activeCategory: string;
  onCategoryChange: (_category: string) => void;
  filteredProducts: Types.IProduct[];
  showPostButton?: boolean;
  onPostProductClick?: () => void;
}

export const ProductsSection: React.FC<IProductsSectionProps> = ({
  title,
  categories,
  activeCategory,
  onCategoryChange,
  filteredProducts,
  showPostButton = false,
  onPostProductClick,
}) => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      {title && (
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <CategoryFilter
            categories={categories as any}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {showPostButton && (
          <Button
            onClick={onPostProductClick}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
          >
            <Plus size={20} />
            Post Product
          </Button>
        )}
      </div>

      <p className="text-gray-600 mt-4">
        Showing {filteredProducts.length} products
      </p>
    </div>

    <ProductGrid products={filteredProducts} />
  </main>
);
