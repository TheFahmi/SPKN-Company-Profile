import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname);

  // Skip maintenance check untuk route admin, API, dan halaman maintenance itu sendiri
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api') ||
      request.nextUrl.pathname === '/maintenance') {
    console.log('Skipping maintenance check for:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  try {
    // Cek status maintenance mode dari API
    const maintenanceUrl = new URL('/api/maintenance', request.url);
    console.log('Checking maintenance status from:', maintenanceUrl.toString());
    
    const maintenanceResponse = await fetch(maintenanceUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!maintenanceResponse.ok) {
      console.error('Failed to check maintenance status:', maintenanceResponse.status);
      return NextResponse.next();
    }

    const data = await maintenanceResponse.json();
    console.log('Maintenance response:', data);

    // Jika dalam maintenance mode, redirect ke halaman maintenance
    if (data.status === 'success' && data.data?.isMaintenanceMode === true) {
      console.log('Site is in maintenance mode, redirecting to maintenance page');
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 