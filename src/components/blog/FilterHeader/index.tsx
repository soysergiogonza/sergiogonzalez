'use client';

import { useState } from 'react';
import styles from './FilterHeader.module.css';

interface FilterHeaderProps {
 categories: string[];
 onFilterChange: (selectedCategory: string | null) => void;
}

export const FilterHeader = ({
 categories,
 onFilterChange,
}: FilterHeaderProps) => {
 const [selectedCategory, setSelectedCategory] = useState<string | null>('All');

 const handleFilterChange = (category: string | null) => {
  setSelectedCategory(category);
  onFilterChange(category);
 };

 return (
  <div className={styles.filterHeader}>
   <button
    className={`${styles.filterButton} ${selectedCategory === 'All' ? styles.active : ''}`}
    onClick={() => handleFilterChange('All')}
   >
    All
   </button>
   {categories.map((category) => (
    <button
     key={category}
     className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
     onClick={() => handleFilterChange(category)}
    >
     {category}
    </button>
   ))}
  </div>
 );
};
