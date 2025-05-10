import { getRedisClient } from './redis';

// Definisikan tipe untuk konfigurasi rate limit
export type RateLimitConfig = {
  limit: number;
  window: number; // dalam detik
};

export class RateLimiter {
  private prefix: string;
  
  constructor(prefix: string = 'ratelimit') {
    this.prefix = prefix;
  }
  
  private getKey(identifier: string): string {
    return `${this.prefix}:${identifier}`;
  }
  
  /**
   * Memeriksa apakah permintaan melebihi batas rate limit
   * @param identifier - Pengenal unik untuk permintaan (misalnya IP address)
   * @param config - Konfigurasi rate limit
   * @returns Object yang berisi success (boolean), limit, remaining, reset
   */
  async limit(identifier: string, config: RateLimitConfig): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const { limit, window } = config;
    const key = this.getKey(identifier);
    const now = Math.floor(Date.now() / 1000);
    const resetTime = now + window;
    
    try {
      const client = await getRedisClient();
      
      // Dapatkan data rate limit saat ini
      const data = await client.get(key);
      let current: { count: number; reset: number } = data 
        ? JSON.parse(data as string) 
        : { count: 0, reset: resetTime };
      
      // Jika waktu reset sudah berlalu, reset counter
      if (now > current.reset) {
        current = { count: 0, reset: resetTime };
      }
      
      // Tambahkan counter dan periksa apakah melebihi limit
      const newCount = current.count + 1;
      const success = newCount <= limit;
      
      // Simpan data baru
      current.count = newCount;
      await client.set(key, JSON.stringify(current), { EX: window });
      
      return {
        success,
        limit,
        remaining: Math.max(0, limit - newCount),
        reset: current.reset,
      };
    } catch (error) {
      console.error('Error in rate limiter:', error);
      // Jika terjadi error, izinkan permintaan (fail open)
      return {
        success: true,
        limit,
        remaining: 1,
        reset: resetTime,
      };
    }
  }
  
  /**
   * Menghapus data rate limit untuk identifier tertentu
   * @param identifier - Pengenal unik untuk permintaan
   */
  async reset(identifier: string): Promise<void> {
    const key = this.getKey(identifier);
    try {
      const client = await getRedisClient();
      await client.del(key);
    } catch (error) {
      console.error('Error resetting rate limit:', error);
    }
  }
} 