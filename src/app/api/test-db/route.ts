import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const { client, db } = await connectToDatabase();
    
    // Test koneksi dengan mengambil daftar koleksi
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    return NextResponse.json({
      status: 'success',
      message: 'Koneksi ke MongoDB berhasil',
      collections: collections.map(c => c.name)
    });
  } catch (error: any) {
    console.error('Error testing MongoDB connection:', error);
    return NextResponse.json({
      status: 'error',
      message: error?.message || 'Terjadi kesalahan saat menguji koneksi database'
    }, { status: 500 });
  }
} 