import React, { HTMLAttributes } from 'react';
import { Minus, Plus } from 'lucide-react';

interface IQuantitySelectorProps extends HTMLAttributes<HTMLDivElement> {
  quantity: number;
  onQuantityChange: (_quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<IQuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 999,
  size = 'md',
  className = '',
  ...props
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <div
      className={`flex items-center gap-2 border border-gray-300 rounded-lg w-fit ${className}`}
      {...props}
    >
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${sizeClasses[size]} flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize[size]} />
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className="w-12 text-center border-0 outline-none bg-transparent font-semibold"
        aria-label="Quantity input"
      />

      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${sizeClasses[size]} flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize[size]} />
      </button>
    </div>
  );
};
