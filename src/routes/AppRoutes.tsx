import { Route, Routes } from 'react-router-dom';

import {
  AuthPage,
  CartPage,
  HomePage,
  ProductDetailPage,
  ProductsPage,
} from '@components/pages';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<AuthPage type="register" />} />
    <Route path="/login" element={<AuthPage type="login" />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />
  </Routes>
);
