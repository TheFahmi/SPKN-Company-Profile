import { createClient } from 'redis';

// Variabel untuk menyimpan instance Redis
let redisClient: ReturnType<typeof createClient> | null = null;

// Fungsi untuk mendapatkan instance Redis
export async function getRedisClient() {
  // Jika client sudah ada dan terhubung, gunakan yang sudah ada
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  // Jika client sudah ada tapi tidak terhubung, coba hubungkan kembali
  if (redisClient && !redisClient.isOpen) {
    try {
      await redisClient.connect();
      return redisClient;
    } catch (error) {
      console.error('Error reconnecting to Redis:', error);
      // Lanjutkan untuk membuat client baru
    }
  }

  // Buat client baru
  try {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      throw new Error('REDIS_URL tidak terkonfigurasi');
    }
    
    redisClient = createClient({
      url: redisUrl,
    });
    
    // Tangani error koneksi
    redisClient.on('error', (err: Error) => {
      console.error('Redis Client Error:', err);
    });
    
    // Hubungkan ke Redis
    await redisClient.connect();
    
    return redisClient;
  } catch (error) {
    console.error('Error creating Redis client:', error);
    throw error;
  }
}

// Fungsi untuk menutup koneksi Redis
export async function closeRedisConnection() {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    redisClient = null;
  }
}

// Fungsi untuk set nilai ke Redis
export async function setRedisValue(key: string, value: string, expireInSeconds?: number) {
  const client = await getRedisClient();
  
  if (expireInSeconds) {
    await client.set(key, value, { EX: expireInSeconds });
  } else {
    await client.set(key, value);
  }
}

// Fungsi untuk get nilai dari Redis
export async function getRedisValue(key: string) {
  const client = await getRedisClient();
  return client.get(key);
}

// Fungsi untuk menghapus nilai dari Redis
export async function deleteRedisValue(key: string) {
  const client = await getRedisClient();
  return client.del(key);
}

// Fungsi untuk memeriksa apakah Redis berfungsi
export async function checkRedisConnection() {
  try {
    const client = await getRedisClient();
    
    // Coba set dan get nilai untuk memastikan koneksi berfungsi
    const testKey = 'redis-connection-test';
    const testValue = 'Koneksi Redis berfungsi! ' + new Date().toISOString();
    
    // Set nilai ke Redis
    await client.set(testKey, testValue);
    
    // Ambil nilai dari Redis
    const retrievedValue = await client.get(testKey);
    
    // Periksa apakah nilai yang diambil sama dengan yang disimpan
    return {
      isConnected: retrievedValue === testValue,
      testValue: retrievedValue,
    };
  } catch (error) {
    console.error('Error checking Redis connection:', error);
    return {
      isConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
} 