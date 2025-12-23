import React, { HTMLAttributes } from 'react';

import type * as Types from '@types';

interface IOrderCardProps extends HTMLAttributes<HTMLDivElement> {
  order: Types.IOrder;
  onViewDetails: (_orderId: number) => void;
}

export const OrderCard: React.FC<IOrderCardProps> = ({
  order,
  onViewDetails,
  className = '',
  ...props
}) => {
  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden p-6 ${className}`}
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {order.order_date
              ? new Date(order.order_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Date not available'}
          </p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full font-semibold text-sm mt-4 sm:mt-0 ${getStatusColor(
            order.order_status,
          )}`}
        >
          {order.order_status.charAt(0).toUpperCase() +
            order.order_status.slice(1)}
        </span>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Items ({order.products.length})
            </p>
            <div className="space-y-1">
              {order.products.slice(0, 2).map((product: any, idx: number) => (
                <p
                  key={idx}
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  {product.product_name}
                </p>
              ))}
              {order.products.length > 2 && (
                <p className="text-sm text-gray-500">
                  +{order.products.length - 2} more
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-lg font-bold text-blue-600">
              ₨{Number(order.total_amount).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
            <p className="text-sm text-gray-900 truncate">
              {order.shipping_address}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(order.id)}
        className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
      >
        View Details
      </button>
    </div>
  );
};
