import { getFetchArticles } from '@/services/articles';
import { useQuery } from '@tanstack/react-query';

export const useArticles = () => {
 return useQuery({
  ...getFetchArticles(),
 });
};
