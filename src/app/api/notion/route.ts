import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';
import { NOTION_DATABASE_ID } from '@/environments/environments';

export async function GET() {
  try {
    if (!NOTION_DATABASE_ID) {
      console.error('NOTION_DATABASE_ID no configurado');
      return NextResponse.json(
        { error: 'NOTION_DATABASE_ID no configurado' },
        { status: 500 }
      );
    }

    const blocks = await notion.blocks.children.list({
      block_id: NOTION_DATABASE_ID,
      page_size: 100,
    });

    return NextResponse.json({ blocks: blocks.results });
  } catch (error) {
    console.error('Error al obtener datos de Notion:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos de Notion' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  }); 
}