import type { 
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints";

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
    file?: { url: string };
    external?: { url: string };
  };
  articles: Article[];
}

export interface BlogState {
  articles: Article[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
}

export interface NotionBlock extends BlockObjectResponse {
  id: string;
  type: string;
  children?: NotionBlock[];
  has_children?: boolean;
  [key: string]: any;
}

export interface NotionData {
  page: PageObjectResponse;
  blocks: NotionBlock[];
}

export interface RichText extends RichTextItemResponse {
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string;
} 