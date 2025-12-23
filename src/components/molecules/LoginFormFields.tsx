import React from 'react';

import { FormField } from '@components/atoms';

interface IFormData {
  username: string;
  password: string;
}

interface IErrors {
  [key: string]: string;
}

interface ILoginFormFieldsProps {
  formData: IFormData;
  errors: IErrors;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormFields = ({
  formData,
  errors,
  onChange,
}: ILoginFormFieldsProps) => (
  <div className="space-y-4">
    <FormField
      label="Username"
      type="text"
      name="username"
      placeholder="Please enter your name"
      value={formData.username}
      onChange={onChange}
      error={errors.username}
      required
    />

    <FormField
      label="Password"
      type="password"
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={onChange}
      error={errors.password}
      required
    />
  </div>
);
