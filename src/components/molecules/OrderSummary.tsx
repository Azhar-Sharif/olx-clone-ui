import React, { HTMLAttributes } from 'react';

interface IOrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
  subtotal: number;
  tax?: number;
  shippingCost?: number;
  itemCount: number;
}

export const OrderSummary: React.FC<IOrderSummaryProps> = ({
  subtotal,
  tax = 0,
  shippingCost = 0,
  itemCount,
  className = '',
  ...props
}) => {
  const total = subtotal + tax + shippingCost;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}
      {...props}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>

      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-600">Items ({itemCount})</span>
        <span className="font-medium text-gray-900">
          PKR {subtotal?.toLocaleString('en-PK', { maximumFractionDigits: 2 })}
        </span>
      </div>
      {tax > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">
            PKR {tax?.toLocaleString('en-PK', { maximumFractionDigits: 2 })}
          </span>
        </div>
      )}

      {shippingCost > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            PKR{' '}
            {shippingCost?.toLocaleString('en-PK', {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center py-3 mt-2">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-blue-600">
          PKR {total?.toLocaleString('en-PK', { maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};
