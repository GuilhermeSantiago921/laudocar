import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'A API de teste funciona!' });
}