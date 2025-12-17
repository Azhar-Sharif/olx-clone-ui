import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Package, Search, ShoppingCart } from 'lucide-react';

import { logoutUser, useAppDispatch, useAppSelector } from '@store';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const cartItemCount = useAppSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate('/login');
  };

  const handleAuthClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
        >
          OLX Store
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <Search size={20} />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button
            onClick={handleCartClick}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2 relative"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleOrdersClick}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <Package size={20} />
                <span className="hidden sm:inline">Orders</span>
              </button>
              <span className="text-gray-300">|</span>
              <span className="text-gray-700 font-medium">
                {user?.email || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleAuthClick}
                className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Login</span>
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => navigate('/register')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
