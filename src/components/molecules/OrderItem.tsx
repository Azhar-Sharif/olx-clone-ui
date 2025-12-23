import React, { HTMLAttributes } from 'react';

import type * as Types from '@types';

interface IOrderItemProps extends HTMLAttributes<HTMLDivElement> {
  product: Types.IOrderProductResponse;
}

export const OrderItem: React.FC<IOrderItemProps> = ({
  product,
  className = '',
  ...props
}) => (
  <div
    className={`flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 ${className}`}
    {...props}
  >
    <div className="flex-1">
      <p className="font-semibold text-gray-900">{product.product_name}</p>
      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">
        ₨{Number(product.unit_price).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">
        Subtotal: ₨
        {(Number(product.unit_price) * product.quantity).toLocaleString()}
      </p>
    </div>
  </div>
);
