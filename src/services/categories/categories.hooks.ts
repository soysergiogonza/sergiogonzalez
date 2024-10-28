import { useMemo } from 'react';
import { useArticles } from '@/services/articles/articles.hooks';
import type { ArticleProps, CategoriesProps } from '@/types/blog';

export const useCategories = (): CategoriesProps => {
  const { data: articles = [] } = useArticles();

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        articles.flatMap(({ frontMatter }: ArticleProps) =>
          frontMatter?.category ? [frontMatter.category] : [],
        ),
      ),
    ) as string[];
  }, [articles]);

  return { categories, articles };
};
