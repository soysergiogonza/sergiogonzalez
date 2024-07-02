'use client';

import { BlogCard } from '@/components';
import { FilterHeader } from '@/components/FilterHeader';
import { useArticles } from '@/services/articles/articles.hooks';
import { MatterFile } from '@/types';
import { useEffect, useState } from 'react';

const BlogPage = () => {
 const { data: articles = [], isLoading, error } = useArticles();
 const [filteredArticles, setFilteredArticles] =
  useState<MatterFile[]>(articles);
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

 useEffect(() => {
  if (selectedCategory) {
   setFilteredArticles(
    articles.filter(({ frontMatter }) =>
     frontMatter.category.includes(selectedCategory),
    ),
   );
  } else {
   setFilteredArticles(articles);
  }
 }, [selectedCategory, articles]);

 const handleFilterChange = (category: string) => {
  setSelectedCategory(category);
 };

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Error loading articles</div>;

 return (
  <>
   <FilterHeader
    categories={Array.from(
     new Set(articles.flatMap((article) => article.frontMatter.category)),
    )}
    onFilterChange={handleFilterChange}
   />
   {filteredArticles.map(({ slug, frontMatter, shortDescription, date }) => (
    <BlogCard
     frontMatter={frontMatter}
     date={date}
     slug={slug}
     shortDescription={shortDescription}
     key={slug}
    />
   ))}
  </>
 );
};

export default BlogPage;
