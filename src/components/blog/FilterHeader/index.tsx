'use client';

import { useCallback, useState } from 'react';
import styles from './FilterHeader.module.css';

interface FilterHeaderProps {
 categories: string[];
}

export const FilterHeader = ({ categories }: FilterHeaderProps) => {
 const [selectedCategory, setSelectedCategory] = useState<string | null>('All');

 const handleFilterChange = (category: string | null) => {
  setSelectedCategory(category);
 };

 const handleCategoryClick = useCallback(
  (category: string) => {
   handleFilterChange(category === 'All' ? null : category);
  },
  [handleFilterChange],
 );
 //
 // const handleFilterChange = (category: string | null) => {
 //  setSelectedCategory(category);
 //  onFilterChange(category);
 // };
 //
 // const handleFilterChange = (category: string) => {
 //  setSelectedCategory(category);
 //  onFilterChange(category === 'All' ? null : category);
 // };

 return (
  <div className={styles.filterHeader}>
   <button
    className={`${styles.filterButton} ${selectedCategory === 'All' ? styles.active : ''}`}
    onClick={() => handleCategoryClick('All')}
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
