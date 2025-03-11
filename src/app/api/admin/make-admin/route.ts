import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateDocument } from '@/app/lib/mongodb';
import { User } from '@/types/mongodb';

export async function POST(request: Request) {
  try {
    // Periksa sesi dan hak akses admin
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID diperlukan' },
        { status: 400 }
      );
    }

    // Update peran pengguna menjadi admin
    const success = await updateDocument<User>('users', userId, {
      role: 'admin',
      isAdmin: true,
      updatedAt: new Date(),
    });

    if (!success) {
      return NextResponse.json(
        { message: 'Gagal mengubah peran pengguna' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Berhasil mengubah peran pengguna menjadi admin' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error making user admin:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengubah peran pengguna' },
      { status: 500 }
    );
  }
} 