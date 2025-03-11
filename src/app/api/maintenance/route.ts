import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const settings = await db.collection('settings').findOne({});
    
    // Log untuk debugging
    console.log('Current maintenance settings:', settings);
    
    const maintenanceMode = settings?.maintenanceMode === true;
    
    // Buat response dengan status maintenance
    const response = NextResponse.json({ 
      maintenanceMode,
      timestamp: new Date().toISOString() 
    });

    // Tambahkan header no-cache
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
    const response = NextResponse.json({ 
      maintenanceMode: false,
      error: 'Failed to check maintenance mode',
      timestamp: new Date().toISOString()
    });
    
    // Tambahkan header no-cache
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  }
} 