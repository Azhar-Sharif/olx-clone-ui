import { FC } from 'react';

import { ProductCard } from '@components/atoms';
import type * as Types from '@types';

interface IProductGridProps {
  products: Types.IProduct[];
}

export const ProductGrid: FC<IProductGridProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
