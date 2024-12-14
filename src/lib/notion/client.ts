import { Client } from '@notionhq/client';
import { NOTION_API_KEY } from '@/environments/environments';

if (!NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY es requerido');
}

export const notion = new Client({
  auth: NOTION_API_KEY,
});

async function processBlock(block: any): Promise<any> {
  if (!block) return null;

  // Procesar el bloque actual
  let processedBlock = { ...block };

  // Si el bloque tiene hijos, procesarlos recursivamente
  if (block.has_children) {
    const childBlocks = await notion.blocks.children.list({
      block_id: block.id,
    });

    const children = await Promise.all(
      (childBlocks.results || []).map(async (childBlock) => {
        return await processBlock(childBlock);
      })
    );

    // Asignar los hijos procesados al bloque
    processedBlock = {
      ...processedBlock,
      children,
    };
  }

  // Procesar tipos específicos de bloques
  switch (block.type) {
    case 'numbered_list_item':
    case 'bulleted_list_item':
    case 'toggle':
    case 'column_list':
    case 'column':
    case 'synced_block':
    case 'template':
    case 'child_page':
    case 'child_database':
      // Asegurarse de que estos tipos de bloques mantengan su estructura
      return processedBlock;
    
    case 'embed':
      // Procesar embeds específicos (Figma, Excalidraw, etc.)
      return {
        ...processedBlock,
        embed: {
          ...block.embed,
          processedUrl: block.embed.url // Aquí podrías procesar la URL según el tipo de embed
        }
      };

    default:
      return processedBlock;
  }
}

export async function getNotionContent(pageId: string) {
  try {
    const page = await notion.pages.retrieve({
      page_id: pageId,
    });

    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    const processedBlocks = await Promise.all(
      (blocks.results || []).map(processBlock)
    );

    return {
      page,
      blocks: processedBlocks
    };
  } catch (error) {
    console.error('Error fetching Notion content:', error);
    throw error;
  }
} 