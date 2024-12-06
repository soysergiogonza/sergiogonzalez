export interface FrontMatter {
  banner: string;
  category?: string[];
  colors: string;
  date: string;
  description: string;
  tags: string[];
  title: string;
  position?: number;
  icon?: string;
}

export interface ArticleProps {
  content?: string;
  date?: string;
  shortDescription?: string;
  frontMatter?: FrontMatter | undefined;
  slug?: string;
  [key: string]: any;
}

export interface CategoriesProps {
  categories: string[];
  articles: ArticleProps[];
}

export interface ArticleBlogParams {
  params: {
    slug: string;
  };
}

export interface IconProps {
  icon?: string;
  size?: string;
  className?: string;
}
