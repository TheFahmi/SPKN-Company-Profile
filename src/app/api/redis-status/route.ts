import { NextResponse } from 'next/server';
import { checkRedisConnection } from '@/app/lib/redis';

export async function GET() {
  try {
    // Periksa koneksi Redis menggunakan fungsi dari lib/redis.ts
    const connectionStatus = await checkRedisConnection();
    
    // Informasi tambahan tentang koneksi
    const connectionInfo = {
      redisUrl: process.env.REDIS_URL ? 'Terkonfigurasi' : 'Tidak terkonfigurasi',
      isConnectionWorking: connectionStatus.isConnected,
      testValue: connectionStatus.testValue,
    };
    
    if (connectionStatus.isConnected) {
      return NextResponse.json({
        status: 'success',
        message: 'Koneksi Redis berfungsi dengan baik',
        connectionInfo,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Gagal terhubung ke Redis',
        error: connectionStatus.error || 'Koneksi tidak berhasil',
        connectionInfo,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error saat memeriksa koneksi Redis:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Gagal terhubung ke Redis',
      error: error instanceof Error ? error.message : 'Unknown error',
      connectionInfo: {
        redisUrl: process.env.REDIS_URL ? 'Terkonfigurasi' : 'Tidak terkonfigurasi',
      },
    }, { status: 500 });
  }
} 