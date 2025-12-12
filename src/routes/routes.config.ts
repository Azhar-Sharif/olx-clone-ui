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
};

export const errorRoutes = {
  notFound: '*',
};
