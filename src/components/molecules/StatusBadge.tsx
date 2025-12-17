import React, { HTMLAttributes } from 'react';

interface IStatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: string;
}

interface StatusColorMap {
  [key: string]: string;
}

export const StatusBadge: React.FC<IStatusBadgeProps> = ({
  status,
  className = '',
  ...props
}) => {
  const statusColorMap: StatusColorMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const colorClass = statusColorMap[status] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${colorClass} ${className}`}
      {...props}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
