import { Client } from '@notionhq/client';
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/environments/environments';
import { BlockObjectResponse, PageObjectResponse, MultiSelectPropertyItemObjectResponse, SelectPropertyItemObjectResponse, DatePropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

if (!NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY es requerido');
}

export const notion = new Client({
  auth: NOTION_API_KEY,
});

export async function getNotionContent(blockId: string) {
  try {
    const response = await notion.databases.query({
      database_id: blockId,
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Published'
            }
          }
        ]
      },
      sorts: [
        {
          property: 'Position',
          direction: 'ascending'
        }
      ]
    });

    return response.results;
  } catch (error) {
    throw error;
  }
} 