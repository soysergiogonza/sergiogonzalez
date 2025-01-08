export interface Article {
  id: string;
  title: string;
  url: string;
  category: string;
  coverImage?: string | null;
  excerpt?: string | null;
}

export interface Category {
  category: string;
  position: number;
  icon: {
    type: string;
    emoji?: string;
    file?: {
      url: string;
    };
    external?: {
      url: string;
    };
  };
  articles: Article[];
}

export interface ArticlesResponse {
  success: boolean;
  results: Category[];
}
