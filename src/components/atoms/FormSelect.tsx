import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ISelectOption {
  id: number | string;
  label: string;
}

interface IFormSelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ISelectOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export const FormSelect: React.FC<IFormSelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
  isLoading = false,
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
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled || isLoading}
      style={{
        color: value ? '#000000' : '#666666',
        backgroundColor: error ? '#fef2f2' : '#ffffff',
      }}
      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-medium ${
        error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
      }`}
    >
      <option value="" style={{ color: '#666666' }}>
        {isLoading ? 'Loading...' : placeholder || 'Select an option'}
      </option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id} style={{ color: '#000000' }}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
        <AlertCircle size={16} />
        {error}
      </p>
    )}
    {options.length === 0 && !isLoading && (
      <p className="text-red-600 text-sm mt-2">No options available.</p>
    )}
  </div>
);
