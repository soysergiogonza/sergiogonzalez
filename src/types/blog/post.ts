export interface Post {
  id: string;
  title: string;
  created: string;
  tags: string[];
  category: string;
  date: string;
  language: string | null;
  status: 'Published' | 'Draft';
  url: string;
}