'use client';

import { BlogCard, FilterHeader } from '@/components/blog';
import { useArticles } from '@/services/articles';
import { ArticleProps } from '@/types/blog';
import { useEffect, useState } from 'react';

const BlogPage = () => {
 const { data: articles = [], isLoading, error } = useArticles();
 const [filteredArticles, setFilteredArticles] = useState<ArticleProps[]>([]);
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

 useEffect(() => {
  if (selectedCategory === 'All' || selectedCategory === null) {
   setFilteredArticles(articles);
  } else {
   setFilteredArticles(
    articles.filter(({ frontMatter }: ArticleProps) =>
     frontMatter.category?.includes(selectedCategory),
    ),
   );
  }
 }, [selectedCategory, articles]);

 const handleFilterChange = (category: string | null) => {
  setSelectedCategory(category === 'All' ? null : category);
 };

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Error loading articles</div>;

 return (
  <>
   <FilterHeader
    categories={Array.from(
     new Set(
      articles.flatMap(({ frontMatter }: ArticleProps) => frontMatter.category),
     ),
    )}
    onFilterChange={handleFilterChange}
   />
   {filteredArticles.map(({ slug, frontMatter, date }: ArticleProps) => (
    <BlogCard frontMatter={frontMatter} date={date} slug={slug} key={slug} />
   ))}
  </>
 );
};

export default BlogPage;
