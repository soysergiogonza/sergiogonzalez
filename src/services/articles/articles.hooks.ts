import { getFetchArticles } from './articles.services';
import { useQuery } from '@tanstack/react-query';
export const useArticles = () => {
    return useQuery({
        ...getFetchArticles(),
    });
};
