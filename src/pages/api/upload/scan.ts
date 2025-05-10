import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { scanUploadedFiles, ScanResult } from '@/lib/antivirus';

// Konfigurasi untuk tidak mengizinkan body parser bawaan Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  try {
    // Parse form dengan formidable
    const form = formidable({ 
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB maksimum
    });

    // Parsing form data
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve([fields, files]);
      });
    });

    // Validasi file
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }

    // Pindai file yang diunggah
    const scanResults = await scanUploadedFiles(files as Record<string, formidable.File[]>);
    
    // Periksa apakah ada file yang terinfeksi
    const hasInfectedFiles = Object.values(scanResults).some(result => !result.isClean);
    
    // Kirim respons dengan hasil pemindaian
    return res.status(200).json({
      success: true,
      isClean: !hasInfectedFiles,
      results: scanResults,
      message: hasInfectedFiles 
        ? 'Beberapa file terdeteksi mengandung ancaman' 
        : 'Semua file aman untuk digunakan',
    });
  } catch (error) {
    console.error('Error saat memindai file:', error);
    return res.status(500).json({ 
      error: 'Terjadi kesalahan saat memindai file',
      message: error instanceof Error ? error.message : 'Kesalahan tidak diketahui'
    });
  }
} 