import { FC } from 'react';

import { Button } from '@components/atoms';

interface ICategory {
  id: string | number;
  name: string;
}

interface ICategoryFilterProps {
  categories: ICategory[];
  activeCategory: string;
  onCategoryChange: (_category: string) => void;
}

export const CategoryFilter: FC<ICategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => (
  <div className="flex gap-3 flex-wrap">
    <Button
      onClick={() => onCategoryChange('all')}
      className={`px-6 py-2 rounded-full font-semibold transition-all ${
        activeCategory === 'all'
          ? 'bg-blue-600 text-black'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      All Products
    </Button>
    {categories.map((category) => (
      <Button
        key={category.id}
        onClick={() => onCategoryChange(String(category.id))}
        className={`px-6 py-2 rounded-full font-semibold transition-all ${
          activeCategory === String(category.id)
            ? 'bg-blue-600 text-black'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        {category.name}
      </Button>
    ))}
  </div>
);
