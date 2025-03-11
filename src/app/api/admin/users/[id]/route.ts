import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

interface Props {
  params: {
    id: string;
  };
}

// GET /api/admin/users/[id] - Mendapatkan pengguna berdasarkan ID
export async function GET(
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
    const user = await db.collection('users').findOne(
      { _id: objectId },
      { projection: { password: 0 } } // Exclude password field
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Pengguna tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data pengguna' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Memperbarui pengguna berdasarkan ID
export async function PUT(
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
    const body = await request.json();
    const { name, email, password, isAdmin } = body;

    // Validasi data
    if (!email) {
      return NextResponse.json(
        { message: 'Email harus diisi' },
        { status: 400 }
      );
    }

    // Persiapkan objek update
    const updateData: any = {
      name: name || '',
      email,
      isAdmin: isAdmin || false,
      updatedAt: new Date(),
    };

    // Jika password diubah, hash password baru
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Update pengguna
    const result = await db.collection('users').updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Pengguna tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Pengguna berhasil diperbarui',
      id: id
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memperbarui pengguna' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Menghapus pengguna berdasarkan ID
export async function DELETE(
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
    const result = await db.collection('users').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Pengguna tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Pengguna berhasil dihapus',
      id: id
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menghapus pengguna' },
      { status: 500 }
    );
  }
} 