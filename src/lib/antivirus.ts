import axios from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';
import { NextApiRequest } from 'next';
import { File } from 'formidable';

// Interface untuk hasil pemindaian
export interface ScanResult {
  isClean: boolean;
  fileName: string;
  threats: string[];
  message: string;
}

// Konfigurasi API antivirus
const AV_API_KEY = process.env.ANTIVIRUS_API_KEY || '';
const AV_API_URL = process.env.ANTIVIRUS_API_URL || 'https://api.virustotal.com/v3/files';

/**
 * Fungsi untuk memindai file dengan API VirusTotal
 * @param file File yang akan dipindai
 * @returns Hasil pemindaian
 */
export async function scanFile(file: File): Promise<ScanResult> {
  try {
    // Validasi konfigurasi API
    if (!AV_API_KEY) {
      throw new Error('API key antivirus tidak dikonfigurasi');
    }

    // Persiapkan form data untuk upload
    const formData = new FormData();
    formData.append('file', createReadStream(file.filepath), {
      filename: file.originalFilename || 'uploaded_file',
      contentType: file.mimetype || 'application/octet-stream',
    });

    // Kirim file ke API VirusTotal untuk analisis
    const uploadResponse = await axios.post(AV_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'x-apikey': AV_API_KEY,
      },
    });

    // Dapatkan ID analisis dari respons
    const analysisId = uploadResponse.data.data.id;

    // Tunggu hasil analisis (polling)
    let analysisComplete = false;
    let analysisResult = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (!analysisComplete && attempts < maxAttempts) {
      // Tunggu beberapa detik antara polling
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Periksa status analisis
      const analysisResponse = await axios.get(`${AV_API_URL}/${analysisId}`, {
        headers: {
          'x-apikey': AV_API_KEY,
        },
      });
      
      if (analysisResponse.data.data.attributes.status === 'completed') {
        analysisComplete = true;
        analysisResult = analysisResponse.data.data.attributes;
      }
      
      attempts++;
    }

    if (!analysisResult) {
      throw new Error('Waktu pemindaian habis');
    }

    // Proses hasil analisis
    const stats = analysisResult.stats;
    const isClean = stats.malicious === 0 && stats.suspicious === 0;
    
    // Kumpulkan informasi ancaman jika ada
    const threats: string[] = [];
    if (!isClean && analysisResult.results) {
      Object.values(analysisResult.results).forEach((result: any) => {
        if (result.category === 'malicious' || result.category === 'suspicious') {
          threats.push(result.result || 'Ancaman tidak diketahui');
        }
      });
    }

    return {
      isClean,
      fileName: file.originalFilename || 'uploaded_file',
      threats,
      message: isClean 
        ? 'File aman untuk digunakan' 
        : `File mengandung ${threats.length} ancaman potensial`,
    };
  } catch (error) {
    console.error('Error saat memindai file:', error);
    return {
      isClean: false,
      fileName: file.originalFilename || 'unknown',
      threats: ['Pemindaian gagal'],
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat memindai file',
    };
  }
}

/**
 * Fungsi alternatif menggunakan ClamAV (jika diinstal di server)
 * Memerlukan ClamAV yang diinstal di server
 */
export async function scanWithClamAV(filePath: string): Promise<ScanResult> {
  try {
    // Gunakan NodeClam atau panggil langsung clamscan melalui child_process
    const { exec } = require('child_process');
    
    return new Promise((resolve, reject) => {
      exec(`clamscan ${filePath}`, (error: any, stdout: string, stderr: string) => {
        if (stderr) {
          console.error('ClamAV error:', stderr);
        }
        
        const fileName = filePath.split('/').pop() || 'unknown';
        
        if (error) {
          // ClamAV mengembalikan kode keluar non-zero jika virus ditemukan
          if (error.code === 1) {
            resolve({
              isClean: false,
              fileName,
              threats: ['Malware terdeteksi'],
              message: stdout || 'File terinfeksi',
            });
          } else {
            // Kesalahan lain
            resolve({
              isClean: false,
              fileName,
              threats: ['Pemindaian gagal'],
              message: error.message || 'Terjadi kesalahan saat memindai file',
            });
          }
        } else {
          // Tidak ada virus yang ditemukan
          resolve({
            isClean: true,
            fileName,
            threats: [],
            message: 'File aman untuk digunakan',
          });
        }
      });
    });
  } catch (error) {
    return {
      isClean: false,
      fileName: filePath.split('/').pop() || 'unknown',
      threats: ['Pemindaian gagal'],
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat memindai file',
    };
  }
}

/**
 * Middleware untuk memindai file yang diunggah
 * @param req Request API Next.js
 * @param files File yang diunggah (dari formidable)
 * @returns Hasil pemindaian untuk semua file
 */
export async function scanUploadedFiles(files: Record<string, File[]>): Promise<Record<string, ScanResult>> {
  const results: Record<string, ScanResult> = {};
  
  // Pindai setiap file yang diunggah
  for (const fieldName in files) {
    const fieldFiles = files[fieldName];
    
    for (let i = 0; i < fieldFiles.length; i++) {
      const file = fieldFiles[i];
      const key = fieldFiles.length > 1 ? `${fieldName}_${i}` : fieldName;
      
      // Pindai file
      results[key] = await scanFile(file);
    }
  }
  
  return results;
} 