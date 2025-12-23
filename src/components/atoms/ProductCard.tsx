import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IProduct } from '@types';

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="w-full h-64 bg-gray-200 overflow-hidden">
        <img
          src={product.product_img_url || 'https://via.placeholder.com/300x200'}
          alt={product.product_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {product.product_name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <span className="text-2xl font-bold text-blue-500">
          RS {product.price}
        </span>
      </div>
    </div>
  );
};
