export interface NotionPage {
  id: string;
  properties: {
    title: {
      title: Array<{ plain_text: string }>;
    };
    category: {
      select: { name: string };
    };
    icon?: {
      emoji?: string;
    };
    slug: {
      rich_text: Array<{ plain_text: string }>;
    };
  };
}
