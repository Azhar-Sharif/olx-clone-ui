import { Route, Routes } from 'react-router-dom';

import { AuthPage, HomePage } from '@components/pages';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<AuthPage type="register" />} />
    <Route path="/login" element={<AuthPage type="login" />} />
  </Routes>
);
