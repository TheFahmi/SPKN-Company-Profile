import { NextResponse } from 'next/server';
import { checkRedisConnection, getRedisClient } from '@/app/lib/redis';

export async function GET() {
  try {
    // Periksa koneksi Redis menggunakan fungsi dari lib/redis.ts
    const connectionStatus = await checkRedisConnection();
    
    // Dapatkan informasi tambahan tentang client Redis
    let clientInfo = '';
    try {
      const client = await getRedisClient();
      clientInfo = await client.info();
    } catch (error) {
      console.error('Error getting Redis client info:', error);
      clientInfo = 'Tidak dapat mendapatkan informasi client';
    }
    
    // Informasi tambahan tentang koneksi
    const connectionInfo = {
      redisUrl: process.env.REDIS_URL ? 'Terkonfigurasi' : 'Tidak terkonfigurasi',
      isConnectionWorking: connectionStatus.isConnected,
      testValue: connectionStatus.testValue,
      clientInfo,
    };
    
    if (connectionStatus.isConnected) {
      return NextResponse.json({
        status: 'success',
        message: 'Koneksi Redis Standar berfungsi dengan baik',
        connectionInfo,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Gagal terhubung ke Redis Standar',
        error: connectionStatus.error || 'Koneksi tidak berhasil',
        connectionInfo,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error saat memeriksa koneksi Redis Standar:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Gagal terhubung ke Redis Standar',
      error: error instanceof Error ? error.message : 'Unknown error',
      connectionInfo: {
        redisUrl: process.env.REDIS_URL ? 'Terkonfigurasi' : 'Tidak terkonfigurasi',
      },
    }, { status: 500 });
  }
} 