import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@components/compounds';
import { CategoryFilter, ProductGrid } from '@components/molecules';
import { fetchProducts, useAppDispatch, useAppSelector } from '@store';

export const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [activeCategory, setActiveCategory] = useState('all');
  const categories = Array.from(
    new Map(
      products.map((p) => [
        p.category,
        { id: p.category, name: p.category_name },
      ]),
    ).values(),
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(fetchProducts() as any);
  }, [dispatch, isAuthenticated, navigate]);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === parseInt(activeCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <p className="text-gray-600 mt-4">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};
