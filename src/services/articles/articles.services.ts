import { axiosInstance } from '@/services/axiosInstance';
export const getFetchArticles = () => {
  return {
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/articles');
      return response.data;
    },
  };
};
