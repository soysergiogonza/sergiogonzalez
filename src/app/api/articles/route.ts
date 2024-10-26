import { getArticles } from '@/utils/getArticles';
import { NextResponse } from 'next/server';
export const GET = async () => {
    try {
        const articles = await getArticles();
        return NextResponse.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.error();
    }
};
