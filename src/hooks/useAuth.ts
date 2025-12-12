import { useCallback } from 'react';
import type * as Types from '@types';

import {
  clearError,
  registerUser,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const isAuthenticated = user;

  const handleRegister = useCallback(
    (data: Types.IRegisterRequest) => dispatch(registerUser(data)),
    [dispatch],
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    handleRegister,
    clearError: handleClearError,
  };
};
