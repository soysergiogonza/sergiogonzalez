export interface Article {
  title: string;
  url: string;
}

export interface Category {
  category: string;
  position: number;
  icon: {
    type: string;
    emoji?: string;
  } | null;
  articles: Article[];
}
