import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/app/lib/db';
import { ObjectId } from 'mongodb';

// GET: Mendapatkan status maintenance mode
export async function GET() {
  console.log('GET /api/maintenance - Checking maintenance status');
  
  try {
    const { db } = await connectToDatabase();
    
    // Cek semua dokumen di collection settings
    const allSettings = await db.collection('settings').find({}).toArray();
    console.log('All settings in collection:', allSettings);
    
    // Ambil settings pertama
    const settings = allSettings[0];
    console.log('Using settings:', settings);
    
    const isMaintenanceMode = settings?.maintenanceMode === true;
    
    return NextResponse.json({
      status: 'success',
      data: {
        isMaintenanceMode,
        settings // Mengembalikan settings untuk debugging
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error getting maintenance mode:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Gagal mengambil status maintenance mode',
        data: { 
          isMaintenanceMode: false 
        }
      },
      { status: 500 }
    );
  }
}

// POST: Mengubah status maintenance mode
export async function POST(request: Request) {
  console.log('POST /api/maintenance - Updating maintenance status');
  
  try {
    const session = await getServerSession(authOptions);
    
    // Cek apakah user adalah admin
    if (!session?.user?.email) {
      console.log('Unauthorized attempt to change maintenance mode');
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Unauthorized',
          data: null
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const isMaintenanceMode = Boolean(body.isMaintenanceMode);
    
    console.log('Updating maintenance mode to:', isMaintenanceMode);
    
    const { db } = await connectToDatabase();

    // Cek semua dokumen di collection settings
    const allSettings = await db.collection('settings').find({}).toArray();
    console.log('All settings before update:', allSettings);

    // Gunakan _id dari settings yang ada atau buat baru jika tidak ada
    const settingsId = allSettings[0]?._id || new ObjectId();
    
    // Update maintenance mode in site settings
    const result = await db.collection('settings').updateOne(
      { _id: settingsId },
      { 
        $set: { 
          maintenanceMode: isMaintenanceMode,
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );

    console.log('Maintenance mode update result:', result);

    // Ambil settings terbaru setelah update
    const updatedSettings = await db.collection('settings').findOne({ _id: settingsId });
    console.log('Updated settings:', updatedSettings);

    return NextResponse.json({
      status: 'success',
      message: `Maintenance mode berhasil ${isMaintenanceMode ? 'diaktifkan' : 'dinonaktifkan'}`,
      data: { 
        isMaintenanceMode,
        settings: updatedSettings
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating maintenance mode:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Gagal mengubah status maintenance mode',
        data: null
      },
      { status: 500 }
    );
  }
} 