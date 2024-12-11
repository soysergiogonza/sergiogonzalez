import { Client } from '@notionhq/client';
import { NOTION_API_KEY } from '@/environments/environments';

if (!NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY es requerido');
}

export const notion = new Client({
  auth: NOTION_API_KEY,
});

export async function getNotionContent(pageId: string) {
  try {
    // Primero obtenemos los metadatos de la página
    const page = await notion.pages.retrieve({
      page_id: pageId,
    });

    // Luego obtenemos los bloques
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    // Procesar los bloques y obtener el contenido de las columnas
    const processedBlocks = await Promise.all(
      (blocks.results || []).map(async (block: any) => {
        if (block.type === 'column_list') {
          try {
            const columnListChildren = await notion.blocks.children.list({
              block_id: block.id,
            });

            const columns = await Promise.all(
              (columnListChildren.results || []).map(async (column: any) => {
                try {
                  const columnChildren = await notion.blocks.children.list({
                    block_id: column.id,
                  });

                  return {
                    ...column,
                    children: columnChildren.results || [],
                  };
                } catch (error) {
                  console.error('Error fetching column content:', error);
                  return {
                    ...column,
                    children: [],
                  };
                }
              })
            );

            return {
              ...block,
              children: columns,
            };
          } catch (error) {
            console.error('Error fetching column list:', error);
            return {
              ...block,
              children: [],
            };
          }
        }

        return block;
      })
    );

    // Retornamos tanto los metadatos de la página como los bloques
    return {
      page,
      blocks: processedBlocks
    };
  } catch (error) {
    console.error('Error fetching Notion content:', error);
    throw error;
  }
} 