import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware tidak diperlukan lagi karena kita sudah menghapus file-file duplikat
  return NextResponse.next();
}

// Konfigurasi jalur yang akan dijalankan oleh middleware
export const config = {
  matcher: [],
}; 