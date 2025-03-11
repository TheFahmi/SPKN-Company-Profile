import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/app/lib/mongodb';

// GET /api/admin/settings - Mendapatkan pengaturan
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const settings = await db.collection('settings').findOne({}) || {
      emailNotifications: true,
      darkMode: false,
      companyName: 'Percetakan Profile',
      supportEmail: 'support@example.com',
      maintenanceMode: false,
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error in GET /api/admin/settings:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil pengaturan' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Memperbarui pengaturan
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { db } = await connectToDatabase();

    // Pastikan maintenanceMode adalah boolean yang benar
    const settings = {
      emailNotifications: body.emailNotifications === true,
      darkMode: body.darkMode === true,
      companyName: body.companyName || 'Percetakan Profile',
      supportEmail: body.supportEmail || 'support@example.com',
      maintenanceMode: body.maintenanceMode === true,
      updatedAt: new Date()
    };

    // Log untuk debugging
    console.log('New settings to be saved:', settings);

    // Hapus semua dokumen settings yang ada
    await db.collection('settings').deleteMany({});

    // Insert dokumen baru
    const result = await db.collection('settings').insertOne(settings);

    // Log hasil operasi
    console.log('Settings insert result:', result);

    // Verifikasi pengaturan yang tersimpan
    const savedSettings = await db.collection('settings').findOne({});
    console.log('Verified saved settings:', savedSettings);

    return NextResponse.json({ 
      message: 'Pengaturan berhasil disimpan',
      success: true,
      settings: savedSettings
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/settings:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menyimpan pengaturan' },
      { status: 500 }
    );
  }
} 