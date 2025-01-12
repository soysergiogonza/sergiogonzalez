export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly image: string,
    public readonly technologies: string[],
    public readonly demo?: string,
    public readonly github?: string,
    public readonly featured: boolean = false,
    public readonly status: 'completed' | 'in-progress' | 'planned' = 'completed'
  ) {}

  public hasDemoLink(): boolean {
    return !!this.demo;
  }

  public hasGithubLink(): boolean {
    return !!this.github;
  }

  public isCompleted(): boolean {
    return this.status === 'completed';
  }
} 