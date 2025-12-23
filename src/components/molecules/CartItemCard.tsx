import React, { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

import { QuantitySelector } from '@components/atoms';
import type { ICartItem } from '@types';

interface ICartItemCardProps extends HTMLAttributes<HTMLDivElement> {
  cartItem: ICartItem;
  onRemove: (_productId: number) => void;
  onQuantityChange: (_productId: number, _quantity: number) => void;
}

export const CartItemCard: React.FC<ICartItemCardProps> = ({
  cartItem,
  onRemove,
  onQuantityChange,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();
  const { product, quantity } = cartItem;
  const itemTotal = Number(product.price) * quantity;

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className={`flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      <div
        onClick={handleViewDetails}
        className="cursor-pointer flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        {product.product_img_url ? (
          <img
            src={product.product_img_url}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-xs">No Image</span>
          </div>
        )}
      </div>

      <div
        className="cursor-pointer flex-1 flex flex-col justify-between hover:opacity-80 transition-opacity"
        onClick={handleViewDetails}
        role="button"
        tabIndex={0}
      >
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:underline">
            {product.product_name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{product.category_name}</p>
        </div>
        <p className="text-sm font-medium text-gray-700">
          PKR {product.price?.toLocaleString('en-PK')}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(product.id, newQuantity)
          }
          min={1}
          max={Math.min(product.quantity || 999, 999)}
          size="sm"
        />
      </div>

      <div className="flex flex-col items-end justify-between min-w-fit">
        <button
          onClick={() => onRemove(product.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove from cart"
        >
          <Trash2 size={20} />
        </button>

        <div className="text-right">
          <p className="text-xs text-gray-600">Subtotal</p>
          <p className="text-lg font-bold text-gray-900">
            PKR{' '}
            {itemTotal?.toLocaleString('en-PK', { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};
