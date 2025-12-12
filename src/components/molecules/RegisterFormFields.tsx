import React from 'react';

import { Checkbox, FormField } from '@components/atoms';

interface IFormData {
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

interface IErrors {
  [key: string]: string;
}

interface IRegisterFormFieldsProps {
  formData: IFormData;
  errors: IErrors;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegisterFormFields = ({
  formData,
  errors,
  onChange,
}: IRegisterFormFieldsProps) => {
  const RequiredBadge = () => (
    <span className="text-[9px] font-medium text-rose-500">*</span>
  );

  return (
    <div className="space-y-3">
      <FormField
        label={
          <span className="flex items-center gap-1.5">
            <span>Username</span>
            <RequiredBadge />
          </span>
        }
        type="text"
        name="username"
        placeholder="Enter username"
        value={formData.username}
        onChange={onChange}
        error={errors.username}
        required
      />

      <FormField
        label={
          <span className="flex items-center gap-1.5">
            <span>Email Address</span>
          </span>
        }
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label={
            <span className="flex items-center gap-1.5">
              <span>First Name</span>
            </span>
          }
          type="text"
          name="first_name"
          placeholder="Enter first name"
          value={formData.first_name}
          onChange={onChange}
          error={errors.first_name}
        />

        <FormField
          label={
            <span className="flex items-center gap-1.5">
              <span>Last Name</span>
            </span>
          }
          type="text"
          name="last_name"
          placeholder="Enter last name"
          value={formData.last_name}
          onChange={onChange}
          error={errors.last_name}
        />
      </div>

      <FormField
        label={
          <span className="flex items-center gap-1.5">
            <span>Phone Number</span>
          </span>
        }
        type="tel"
        name="phone_no"
        placeholder="Enter your phone number"
        value={formData.phone_no}
        onChange={onChange}
        error={errors.phone_no}
        helperText="For buyer contact"
      />

      <FormField
        label={
          <span className="flex items-center gap-1.5">
            <span>Address</span>
          </span>
        }
        type="text"
        name="address"
        placeholder="City, State"
        value={formData.address}
        onChange={onChange}
        error={errors.address}
      />

      <FormField
        label={
          <span className="flex items-center gap-1.5">
            <span>Password</span>
            <RequiredBadge />
          </span>
        }
        type="password"
        name="password"
        placeholder="Please enter a strong password"
        value={formData.password}
        onChange={onChange}
        error={errors.password}
        helperText={
          formData.password
            ? `${formData.password.length} characters`
            : 'Min. 8 characters required'
        }
        required
      />

      <FormField
        label={
          <span className="flex items-center gap-1.5">
            <span>Confirm Password</span>
            <RequiredBadge />
          </span>
        }
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        helperText={
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
            ? '✓ Passwords match'
            : ''
        }
        required
      />

      <Checkbox
        name="agreeTerms"
        checked={formData.agreeTerms}
        onChange={onChange}
        label={
          <span className="text-xs text-slate-700">
            I agree to the{' '}
            <span className="font-semibold text-slate-900">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="font-semibold text-slate-900">Privacy Policy</span>
          </span>
        }
      />
      {errors.agreeTerms && (
        <p className="text-xs text-rose-600 mt-1 ml-6 font-medium">
          {errors.agreeTerms}
        </p>
      )}
    </div>
  );
};
