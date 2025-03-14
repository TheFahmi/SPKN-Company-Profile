import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Jika request adalah untuk swagger.json
  if (pathname.endsWith('/swagger.json')) {
    try {
      // Mendapatkan path absolut ke file swagger.json
      const swaggerJsonPath = path.join(process.cwd(), 'src', 'app', 'api', 'docs', 'swagger.json');
      
      // Membaca file swagger.json
      const swaggerJson = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));
      
      // Mengembalikan file sebagai respons JSON dengan header CORS
      return new NextResponse(JSON.stringify(swaggerJson), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    } catch (error) {
      console.error('Error reading swagger.json:', error);
      return NextResponse.json(
        { error: 'Failed to load Swagger documentation' },
        { status: 500 }
      );
    }
  }
  
  // Untuk request lainnya ke /api/docs
  return NextResponse.next();
} 