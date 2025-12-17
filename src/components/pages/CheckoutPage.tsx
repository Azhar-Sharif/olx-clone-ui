import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@components/atoms';
import { Header } from '@components/compounds';
import { OrderSummary } from '@components/molecules';
import type * as Types from '@types';
import { clearCart, createOrder, useAppDispatch, useAppSelector } from '@store';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);
  const { isLoading: orderLoading } = useAppSelector((state) => state.order);
  const { items } = cart;

  const [shippingAddress, setShippingAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderRequest: Types.ICreateOrderRequest = {
        shipping_address: shippingAddress.trim(),
        products_data: items.map((item: Types.ICartItem) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const resultAction = await dispatch(createOrder(orderRequest) as any);

      if (createOrder.fulfilled.match(resultAction)) {
        toast.success('Order placed successfully!');
        dispatch(clearCart());
        setTimeout(() => {
          navigate(`/orders/${resultAction.payload.id}`);
        }, 500);
      } else {
        toast.error(
          resultAction.payload || 'Failed to place order. Please try again.',
        );
      }
    } catch (_error) {
      toast.error('An error occurred while placing your order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Shipping Address *
                </label>
                <textarea
                  id="address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your complete shipping address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                  rows={4}
                  disabled={isSubmitting || orderLoading}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Order Items ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map((item: Types.ICartItem) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.product.product_name} x {item.quantity}
                      </span>
                      <span>
                        RS{' '}
                        {(
                          Number(item.product.price) * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || orderLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isSubmitting || orderLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting || orderLoading
                  ? 'Placing Order...'
                  : 'Place Order'}
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>
            <OrderSummary subtotal={cart.totalPrice} itemCount={items.length} />
          </div>
        </div>
      </main>
    </div>
  );
};
