export interface IBlogRepository {
  getArticles(): Promise<Article[]>;
  getCategories(): Promise<Category[]>;
  getArticleById(id: string): Promise<Article>;
} 