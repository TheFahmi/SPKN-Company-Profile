import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Mendapatkan path absolut ke file swagger.json
    const swaggerJsonPath = path.join(process.cwd(), 'src', 'app', 'api', 'docs', 'swagger.json');
    
    // Membaca file swagger.json
    const swaggerJsonContent = fs.readFileSync(swaggerJsonPath, 'utf8');
    const swaggerJson = JSON.parse(swaggerJsonContent);
    
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