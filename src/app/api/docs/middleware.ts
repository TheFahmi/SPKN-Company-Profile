import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export function middleware(request: NextRequest) {
  // Jika request adalah untuk swagger.json
  if (request.nextUrl.pathname === '/api/docs/swagger.json') {
    try {
      // Mendapatkan path absolut ke file swagger.json
      const swaggerJsonPath = path.join(process.cwd(), 'src', 'app', 'api', 'docs', 'swagger.json');
      
      // Membaca file swagger.json
      const swaggerJson = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));
      
      // Mengembalikan file sebagai respons JSON
      return NextResponse.json(swaggerJson);
    } catch (error) {
      console.error('Error reading swagger.json:', error);
      return NextResponse.json(
        { error: 'Failed to load Swagger documentation' },
        { status: 500 }
      );
    }
  }
  
  // Lanjutkan ke handler berikutnya jika bukan untuk swagger.json
  return NextResponse.next();
}

export const config = {
  matcher: '/api/docs/swagger.json',
}; 