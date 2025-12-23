import { InputHTMLAttributes } from 'react';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({ label, ...props }: ICheckboxProps) => (
  <div className="flex items-start gap-2.5">
    <input
      type="checkbox"
      className="mt-0.5 w-4 h-4 text-indigo-600 border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500/50"
      {...props}
    />
    <div className="flex-1">{label}</div>
  </div>
);
