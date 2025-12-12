import { InputHTMLAttributes } from 'react';

import { Input } from './Input';

interface IFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormField = ({
  label,
  error,
  helperText,
  ...props
}: IFormFieldProps) => (
  <div className="mb-4">
    <Input label={label} error={error} {...props} />
    {helperText && !error && (
      <p className="text-gray-500 text-xs mt-1">{helperText}</p>
    )}
  </div>
);
