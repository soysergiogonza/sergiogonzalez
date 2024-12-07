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
    console.log('\n=== INICIANDO FETCH DE NOTION ===');
    console.log('Database ID:', blockId);

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

    console.log('\n=== RESPUESTA DE NOTION ===');
    console.log('Número de resultados:', response.results.length);
    console.log('Primer resultado:', JSON.stringify(response.results[0], null, 2));

    const results = await Promise.all(
      response.results.map(async (category: any) => {
        const articles = await notion.blocks.children.list({
          block_id: category.id
        });

        const articleDetails = await Promise.all(
          articles.results
            .filter((block): block is BlockObjectResponse => 
              'type' in block && block.type === 'child_page'
            )
            .map(async (article: any) => {
              const pageDetails = await notion.pages.retrieve({
                page_id: article.id
              }) as PageObjectResponse;

              const tagsProperty = pageDetails.properties.Tags as MultiSelectPropertyItemObjectResponse;
              const categoryProperty = pageDetails.properties.Category as SelectPropertyItemObjectResponse;
              const languageProperty = pageDetails.properties.Language as SelectPropertyItemObjectResponse;
              const dateProperty = pageDetails.properties.Date as DatePropertyItemObjectResponse;

              return {
                title: article.child_page?.title || '',
                created: pageDetails.created_time,
                tags: tagsProperty.multi_select?.map(tag => tag.name) || [],
                category: categoryProperty.select?.name || '',
                date: dateProperty.date?.start || '',
                language: languageProperty.select?.name || ''
              };
            })
        );

        return {
          category: category.properties.Title.title[0]?.plain_text,
          position: category.properties.Position.number,
          icon: category.icon,
          articles: articleDetails
        };
      })
    );

    console.log('\n=== DATOS PROCESADOS ===');
    console.log('Categorías procesadas:', JSON.stringify(results, null, 2));

    return results;
  } catch (error) {
    console.error('Error al obtener el contenido de Notion:', error);
    throw error;
  }
} 