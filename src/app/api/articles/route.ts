import { getArticles } from '@/utils/getArticles';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const articles = await getArticles();
        return NextResponse.json(articles, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
            }
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch articles',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
};
