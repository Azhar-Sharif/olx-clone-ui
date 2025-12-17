import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@components/atoms';
import { CartItemCard, OrderSummary } from '@components/molecules';
import {
  clearCart,
  removeFromCart,
  updateQuantity,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);
  const { items, totalPrice, totalQuantity } = cart;

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleClearCart = () => {
    if (items.length === 0) {
      toast.error('Cart is already empty');
      return;
    }

    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={32} />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {totalQuantity === 0
              ? 'Your cart is empty'
              : `${totalQuantity} item${totalQuantity !== 1 ? 's' : ''} in cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart to get started
            </p>
            <Button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((cartItem: any) => (
                  <CartItemCard
                    key={cartItem.productId}
                    cartItem={cartItem}
                    onRemove={handleRemoveItem}
                    onQuantityChange={handleUpdateQuantity}
                  />
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="flex-1 border border-gray-300 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={handleClearCart}
                  variant="outline"
                  className="flex-1 border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <OrderSummary subtotal={totalPrice} itemCount={totalQuantity} />

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Proceed to Checkout
                </Button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
