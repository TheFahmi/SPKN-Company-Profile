import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiter, RateLimitConfig } from '@/app/lib/rate-limiter';

// Definisikan tipe untuk konfigurasi rate limit per endpoint
type EndpointRateLimitConfig = {
  [key: string]: RateLimitConfig;
};

// Konfigurasi rate limit per endpoint
const RATE_LIMIT_CONFIG: EndpointRateLimitConfig = {
  // Default untuk semua API endpoint
  'default': { limit: 10, window: 60 }, // 60 detik = 1 menit
  
  // Endpoint spesifik dengan konfigurasi khusus
  '/api/auth/login': { limit: 5, window: 300 }, // 300 detik = 5 menit
  '/api/auth/register': { limit: 3, window: 600 }, // 600 detik = 10 menit
  '/api/upload': { limit: 5, window: 900 }, // 900 detik = 15 menit
  '/api/products': { limit: 20, window: 60 }, // 60 detik = 1 menit
  '/api/admin/': { limit: 30, window: 60 }, // 60 detik = 1 menit
};

// Inisialisasi rate limiter
const rateLimiter = new RateLimiter('api');

// Fungsi untuk mendapatkan konfigurasi rate limit yang sesuai dengan endpoint
function getRateLimitConfig(endpoint: string): RateLimitConfig {
  // Cari konfigurasi yang cocok dengan endpoint
  let config = RATE_LIMIT_CONFIG.default;
  
  // Cek apakah ada konfigurasi khusus untuk endpoint ini
  for (const pattern in RATE_LIMIT_CONFIG) {
    if (pattern !== 'default' && endpoint.startsWith(pattern)) {
      config = RATE_LIMIT_CONFIG[pattern];
      break;
    }
  }
  
  return config;
}

// Fungsi untuk mendapatkan IP yang lebih akurat
function getIP(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  return xff ? xff.split(',')[0] : request.ip || '127.0.0.1';
}

// Fungsi untuk mendapatkan identifier unik untuk permintaan
function getIdentifier(req: NextRequest): string {
  // Gunakan IP address sebagai identifier
  const ip = getIP(req);
  const path = req.nextUrl.pathname;
  
  return `${ip}:${path}`;
}

// Security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://analytics.example.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.example.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-ancestors 'self'; form-action 'self';"
  }
];

// Middleware
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();
  
  // Skip maintenance check untuk route admin, API, dan halaman maintenance itu sendiri
  if (!(pathname.startsWith('/admin') || 
      pathname === '/maintenance')) {
    try {
      // Cek status maintenance mode dari API
      const maintenanceUrl = new URL('/api/maintenance', request.url);
      
      const maintenanceResponse = await fetch(maintenanceUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (maintenanceResponse.ok) {
        const data = await maintenanceResponse.json();

        // Jika dalam maintenance mode, redirect ke halaman maintenance
        if (data.status === 'success' && data.data?.isMaintenanceMode === true) {
          return NextResponse.redirect(new URL('/maintenance', request.url));
        }
      }
    } catch (error) {
      console.error('Error checking maintenance mode:', error);
    }
  }
  
  // Apply security headers to all routes
  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });

  // Apply CORS headers to API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || 'https://yourdomain.com');
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204 });
    }
    
    // Apply rate limiting to API routes
    try {
      // Dapatkan konfigurasi rate limit untuk endpoint ini
      const config = getRateLimitConfig(pathname);
      
      // Dapatkan identifier unik untuk permintaan
      const identifier = getIdentifier(request);
      
      // Periksa rate limit
      const result = await rateLimiter.limit(identifier, config);
      
      // Set rate limit headers
      response.headers.set('X-RateLimit-Limit', result.limit.toString());
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
      response.headers.set('X-RateLimit-Reset', result.reset.toString());
      
      // Jika melebihi rate limit, kembalikan respons 429 (Too Many Requests)
      if (!result.success) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Anda telah melebihi batas permintaan. Silakan coba lagi nanti.'
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': result.limit.toString(),
              'X-RateLimit-Remaining': result.remaining.toString(),
              'X-RateLimit-Reset': result.reset.toString(),
              'Retry-After': (result.reset - Math.floor(Date.now() / 1000)).toString()
            }
          }
        );
      }
    } catch (error) {
      console.error('Rate limiting error:', error);
      // Continue even if rate limiting fails
    }
  }
  
  return response;
}

// Konfigurasi middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 