import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Button, EmptyState, LoadingState } from '@components/atoms';
import { Header } from '@components/compounds';
import { OrderItem, StatusBadge } from '@components/molecules';
import type * as Types from '@types';
import { fetchOrderById, useAppDispatch, useAppSelector } from '@store';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedOrder, isLoading, error } = useAppSelector(
    (state) => state.order,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(parseInt(id)) as any);
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState message="Loading order details..." />
        </main>
      </div>
    );
  }

  if (error || !selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            title="Order not found"
            description={error || 'Unable to load order details'}
            actionLabel="View All Orders"
            onAction={() => navigate('/orders')}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{selectedOrder.id}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {selectedOrder.order_date
                  ? new Date(selectedOrder.order_date).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )
                  : 'Order placed'}
              </p>
            </div>
            <StatusBadge status={selectedOrder.order_status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4 border-t border-gray-200 pt-4">
              {selectedOrder.products.map(
                (product: Types.IOrderProductResponse, index: number) => (
                  <OrderItem key={index} product={product} />
                ),
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-900">
                  RS {Number(selectedOrder.total_amount).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-lg text-blue-600">
                ₨{Number(selectedOrder.total_amount).toLocaleString()}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Shipping Address
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedOrder.shipping_address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-900 hover:bg-gray-300 px-4 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => navigate('/orders')}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Orders
          </Button>
        </div>
      </main>
    </div>
  );
};
