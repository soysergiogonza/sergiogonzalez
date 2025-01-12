export class Article {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly categoryId: string,
    public readonly createdAt: Date
  ) {}

  get summary(): string {
    return this.content.substring(0, 150) + '...';
  }
} 