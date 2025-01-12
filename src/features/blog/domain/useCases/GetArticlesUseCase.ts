export class GetArticlesUseCase {
  constructor(private blogRepository: IBlogRepository) {}

  async execute(): Promise<Article[]> {
    return await this.blogRepository.getArticles();
  }
} 