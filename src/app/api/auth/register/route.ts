import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { addDocument, getUserByEmail } from '@/app/lib/mongodb';
import { User } from '@/types/mongodb';

export async function POST(request: Request) {
  try {
    console.log('Starting registration process...');
    const body = await request.json();
    console.log('Request body received:', { ...body, password: '[REDACTED]' });

    const { email, password, name } = body;

    // Validasi input
    if (!email || !password) {
      console.log('Missing required fields:', { hasEmail: !!email, hasPassword: !!password });
      return NextResponse.json(
        { error: 'Email dan password diperlukan' },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Validasi panjang password
    if (password.length < 6) {
      console.log('Password too short');
      return NextResponse.json(
        { error: 'Password harus minimal 6 karakter' },
        { status: 400 }
      );
    }

    console.log('Checking if user already exists...');
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new user...');
    const newUser: User = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || '',
      role: 'user',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Simpan pengguna ke database
    const result = await addDocument<User>('users', newUser);
    console.log('User created successfully:', { id: result.id, email: result.email });

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = result;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: `Terjadi kesalahan saat registrasi: ${error.message}` },
      { status: 500 }
    );
  }
} 