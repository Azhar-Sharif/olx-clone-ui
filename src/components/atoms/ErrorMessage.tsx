import React, { HTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface IErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({
  message,
  onDismiss,
  className = '',
  ...props
}) => (
  <div
    className={`flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}
    {...props}
  >
    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-red-800 font-medium">{message}</p>
    </div>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="text-red-600 hover:text-red-800 transition-colors"
        aria-label="Dismiss error"
      >
        ✕
      </button>
    )}
  </div>
);
