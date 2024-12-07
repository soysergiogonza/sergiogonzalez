import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';
import { NOTION_DATABASE_ID } from '@/environments/environments';
import {  ChildPageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function GET() {
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID no configurado');
    }

    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
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

    // Procesar los resultados para incluir los artículos de cada categoría
    const categoriesWithArticles = await Promise.all(
      response.results.map(async (category: any) => {
        const articles = await notion.blocks.children.list({
          block_id: category.id
        });

        return {
          ...category,
          articles: articles.results
            .filter((block): block is ChildPageBlockObjectResponse => 
              'type' in block && block.type === 'child_page'
            )
            .map(article => ({
              title: article.child_page.title || '',
              url: article.id
            }))
        };
      })
    );

    return NextResponse.json({ 
      success: true, 
      results: categoriesWithArticles 
    });
  } catch (error: any) {
    console.error('Error detallado:', {
      message: error.message,
      code: error.code,
      status: error.status
    });
    
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
} 