import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Direktori untuk file yang diunggah
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export async function GET(request: NextRequest) {
  // Verifikasi sesi admin
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }

  try {
    // Pastikan direktori upload ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Baca semua file di direktori upload
    const files = getAllFiles(uploadDir);
    
    // Dapatkan data dari database (simulasi)
    const securityData = {
      totalFiles: files.length,
      scannedFiles: Math.floor(files.length * 0.95), // Simulasi 95% file telah dipindai
      cleanFiles: Math.floor(files.length * 0.93), // Simulasi 93% file bersih
      infectedFiles: Math.floor(files.length * 0.02), // Simulasi 2% file terinfeksi
      lastScanDate: new Date().toISOString(),
      recentThreats: [
        'Trojan.PDF.Exploit',
        'Malware.ZIP.Suspicious',
        'Ransomware.DOC.Macro',
      ],
    };

    return NextResponse.json(securityData);
  } catch (error) {
    console.error('Error getting security status:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat mendapatkan status keamanan',
      message: error instanceof Error ? error.message : 'Kesalahan tidak diketahui'
    }, { status: 500 });
  }
}

// Fungsi rekursif untuk mendapatkan semua file dalam direktori dan subdirektori
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
} 