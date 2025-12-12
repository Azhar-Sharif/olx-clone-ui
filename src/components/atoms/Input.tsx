import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}: IInputProps) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3.5 py-2.5 text-sm bg-white/70 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all shadow-sm ${
        error
          ? 'border-rose-300 focus:ring-rose-500/50 focus:border-rose-400'
          : 'border-indigo-200/50'
      } ${className}`}
      {...props}
    />
    {error && (
      <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>
    )}
    {helperText && !error && (
      <p className="mt-1 text-xs text-slate-500">{helperText}</p>
    )}
  </div>
);
