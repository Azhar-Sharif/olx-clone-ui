interface IFormDataProps {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_no: string;
  address: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface ILoginDataProps {
  username: string;
  password: string;
}

export const validateRegisterForm = (
  formData: IFormDataProps,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!formData.agreeTerms) {
    errors.agreeTerms = 'You must agree to terms';
  }

  return errors;
};

export const validateLoginForm = (
  formData: ILoginDataProps,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  }

  return errors;
};
export const hasFormErrors = (errors: Record<string, string>): boolean =>
  Object.keys(errors).length > 0;
