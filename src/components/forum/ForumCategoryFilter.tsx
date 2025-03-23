
import React from 'react';

interface ForumCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ForumCategoryFilter: React.FC<ForumCategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex overflow-x-auto px-4 py-3 bg-white shadow-sm">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-1.5 mx-1 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === cat 
              ? "bg-teal text-white" 
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default ForumCategoryFilter;
