import React, { HTMLAttributes } from 'react';

interface ILoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const LoadingState: React.FC<ILoadingStateProps> = ({
  message = 'Loading...',
  className = '',
  ...props
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center py-12 ${className}`}
    {...props}
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
    <p className="text-gray-600 text-lg">{message}</p>
  </div>
);
