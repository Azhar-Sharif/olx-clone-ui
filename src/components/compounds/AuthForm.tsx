import React, { useState } from 'react';
import type * as Types from '@types';

import { Button, FormError, FormFooter } from '@components/atoms';
import { LoginFormFields, RegisterFormFields } from '@components/molecules';
import {
  clearError,
  loginUser,
  registerUser,
  useAppDispatch,
  useAppSelector,
} from '@store';

interface IAuthFormProps {
  type: 'register' | 'login';
  onSubmitSuccess?: () => void;
}

export const AuthForm = ({ type, onSubmitSuccess }: IAuthFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_no: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'register') {
      if (!formData.username.trim())
        newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8)
        newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeTerms)
        newErrors.agreeTerms = 'You must agree to terms';
      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = 'Please enter a valid email';
      }
    } else {
      if (!formData.username.trim())
        newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (type === 'register') {
      const registerData: Types.IRegisterRequest = {
        username: formData.username,
        email: formData.email || undefined,
        first_name: formData.first_name || undefined,
        last_name: formData.last_name || undefined,
        phone_no: formData.phone_no || undefined,
        address: formData.address || undefined,
        password: formData.password,
      };
      dispatch(registerUser(registerData) as any)
        .unwrap()
        .then(() => onSubmitSuccess?.())
        .catch(() => {});
    } else {
      const loginData: Types.ILoginRequest = {
        username: formData.username,
        password: formData.password,
      };
      dispatch(loginUser(loginData) as any)
        .unwrap()
        .then(() => onSubmitSuccess?.())
        .catch(() => {});
    }
  };

  const displayError = error || errors.agreeTerms;

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {displayError && (
        <div className="mt-2">
          <FormError message={displayError} />
        </div>
      )}

      {type === 'register' && (
        <RegisterFormFields
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      )}

      {type === 'login' && (
        <LoginFormFields
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      )}

      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        isLoading={isLoading}
        className="mt-6 py-2.5 font-semibold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30"
      >
        {type === 'register' ? 'Create Account' : 'Log In'}
      </Button>

      <FormFooter type={type} />
    </form>
  );
};
