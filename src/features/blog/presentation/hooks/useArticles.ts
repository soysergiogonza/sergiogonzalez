import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Article } from '../domain/entities/Article';
import { NotionBlogRepository } from '../infrastructure/repositories/NotionBlogRepository';
import { GetArticlesUseCase } from '../domain/useCases/GetArticlesUseCase';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inyectamos dependencias
  const repository = useMemo(() => new NotionBlogRepository(), []);
  const getArticlesUseCase = useMemo(
    () => new GetArticlesUseCase(repository),
    [repository]
  );

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const articles = await getArticlesUseCase.execute();
      setArticles(articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [getArticlesUseCase]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    isLoading,
    error,
    refetch: fetchArticles
  };
}; 