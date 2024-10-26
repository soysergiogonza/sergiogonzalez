export interface FrontMatter {
  banner: string;
  category?: string[];
  colors: string;
  date: string;
  description: string;
  tags: string[];
  title: string;
}

export interface ArticleProps {
  content?: string;
  date?: string;
  frontMatter?: FrontMatter | undefined;
  shortDescription?: string;
  slug?: string;
}
