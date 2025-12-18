import { useEffect, useState } from 'react';

import { fetchProducts, useAppDispatch, useAppSelector } from '@store';

export const useProductsWithCategory = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = Array.from(
    new Map(
      products.map((p: any) => [
        p.category,
        { id: p.category, name: p.category_name },
      ]),
    ).values(),
  );

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p: any) => p.category === parseInt(activeCategory));

  return {
    products,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    categories,
    filteredProducts,
  };
};
