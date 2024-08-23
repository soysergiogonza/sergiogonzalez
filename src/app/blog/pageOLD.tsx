'use client';

import { BlogCard } from '@/components/blog';
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

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Error loading articles</div>;

 return (
  <>
   {filteredArticles.map(({ slug, frontMatter }: ArticleProps) => (
    <BlogCard frontMatter={frontMatter} slug={slug} key={slug} />
   ))}
  </>
 );
};

export default BlogPage;
