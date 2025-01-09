import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasKey: !!process.env.RESEND_API_KEY,
    keyLength: process.env.RESEND_API_KEY?.length
  });
} 