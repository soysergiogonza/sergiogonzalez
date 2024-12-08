import { NextResponse } from 'next/server';
import { getNotionContent } from '@/lib/notion/client';
import { NOTION_DATABASE_ID } from '@/environments/environments';

export async function GET() {
  try {
    if (!NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: 'NOTION_DATABASE_ID no configurado' },
        { status: 500 }
      );
    }

    const categories = await getNotionContent(NOTION_DATABASE_ID);
    const articles = categories.reduce((acc: any[], category) => {
      return [...acc, ...category.articles];
    }, []);

    return NextResponse.json({ 
      success: true, 
      articles 
    });
  } catch (error: any) {
    console.error('Error al obtener artículos:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener artículos' },
      { status: error.status || 500 }
    );
  }
} 