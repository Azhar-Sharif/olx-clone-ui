/**
 * Route Configuration
 *
 * Centralized routing configuration for the application.
 * Separated into public (unprotected) and protected (authentication required) routes.
 */

export const publicRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  products: '/products',
  productDetail: (id: string) => `/product/${id}`,
  cart: '/cart',
};

export const protectedRoutes = {
  checkout: '/checkout',
  orders: '/orders',
  orderDetail: (id: string) => `/orders/${id}`,
  postProduct: '/post-product',
  profile: '/profile',
};

export const errorRoutes = {
  notFound: '*',
};
