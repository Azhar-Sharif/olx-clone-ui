import { Route, Routes } from 'react-router-dom';

import {
  AuthPage,
  CartPage,
  CheckoutPage,
  HomePage,
  OrderDetailPage,
  OrdersPage,
  ProductDetailPage,
  ProductsPage,
  ProfilePage,
} from '@components/pages';

import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<AuthPage type="register" />} />
    <Route path="/login" element={<AuthPage type="login" />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />

    <Route
      path="/checkout"
      element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/orders"
      element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/orders/:id"
      element={
        <ProtectedRoute>
          <OrderDetailPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
  </Routes>
);
