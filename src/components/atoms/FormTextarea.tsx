import React from 'react';

interface IFormTextareaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

export const FormTextarea: React.FC<IFormTextareaProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
    />
  </div>
);
