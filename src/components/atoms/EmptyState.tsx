import React, { HTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

import { Button } from './Button';

interface IEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({
  icon = <AlertCircle className="w-12 h-12 text-gray-400" />,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
  ...props
}) => (
  <div
    className={`flex flex-col items-center justify-center min-h-[400px] py-12 px-4 ${className}`}
    {...props}
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
      {title}
    </h2>
    <p className="text-gray-600 mb-6 text-center max-w-md">{description}</p>
    {actionLabel && onAction && (
      <Button
        onClick={onAction}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        {actionLabel}
      </Button>
    )}
  </div>
);
