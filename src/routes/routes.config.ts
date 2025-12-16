/**
 * Route Configuration
 *
 * Centralized routing configuration for the application.
 * This makes it easy to manage routes, add new ones, and maintain consistency.
 */

export const publicRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  products: '/products',
  productDetail: (id: string) => `/product/${id}`,
};

export const errorRoutes = {
  notFound: '*',
};
