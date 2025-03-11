import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: 'ID pengguna tidak ditemukan' },
        { status: 400 }
      );
    }

    // Coba konversi ke ObjectId jika memungkinkan
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      // Jika ID tidak valid, kirimkan respons error
      return NextResponse.json(
        { message: 'ID pengguna tidak valid' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Ambil isAdmin dari body request
    const body = await request.json();
    const isAdmin = body.isAdmin !== undefined ? body.isAdmin : true;

    // Update status admin pengguna
    const result = await db.collection('users').updateOne(
      { _id: objectId },
      { $set: { isAdmin, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Pengguna tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Status admin pengguna berhasil ${isAdmin ? 'diaktifkan' : 'dinonaktifkan'}`,
      id,
      isAdmin
    });
  } catch (error) {
    console.error('Error updating user admin status:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengubah status admin pengguna' },
      { status: 500 }
    );
  }
} 