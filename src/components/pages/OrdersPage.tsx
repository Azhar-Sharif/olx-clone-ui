import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

import { EmptyState, ErrorMessage, LoadingState } from '@components/atoms';
import { Header } from '@components/compounds';
import { OrderCard } from '@components/molecules';
import type * as Types from '@types';
import { fetchOrders, useAppDispatch, useAppSelector } from '@store';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { orders, isLoading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState message="Loading your orders..." />
        </main>
      </div>
    );
  }

  const handleViewDetails = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  const handleStartShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>

        {error && <ErrorMessage message={error} className="mb-6" />}

        {orders.length === 0 ? (
          <EmptyState
            icon={<Package size={48} className="text-gray-400" />}
            title="You haven't placed any orders yet"
            description="Start shopping to place your first order"
            actionLabel="Start Shopping"
            onAction={handleStartShopping}
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order: Types.IOrder) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
