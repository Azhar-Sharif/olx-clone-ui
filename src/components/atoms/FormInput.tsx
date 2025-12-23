import React from 'react';
import { AlertCircle } from 'lucide-react';

interface IFormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  step?: string;
  disabled?: boolean;
}

export const FormInput: React.FC<IFormInputProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  min,
  step,
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      disabled={disabled}
      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
        error
          ? 'border-red-500 bg-red-50'
          : 'border-gray-300 focus:border-blue-500'
      }`}
    />
    {error && (
      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
        <AlertCircle size={16} />
        {error}
      </p>
    )}
  </div>
);
