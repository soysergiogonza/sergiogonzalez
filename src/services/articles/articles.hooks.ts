import { getFetchArticles } from '@/services/articles/articles.service';
import { useQuery } from '@tanstack/react-query';

export const useArticles = () => {
 return useQuery({
  ...getFetchArticles(),
 });
};
