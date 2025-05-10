import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { existsSync } from 'fs';
import { sanitizeInput } from '@/lib/security/sanitize';

// Allowed file types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Max file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Check if user is admin
 */
async function isAdmin() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return false;
  }
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(session.user.email);
}

/**
 * Simple virus scanning simulation
 * In production, you would integrate with a real virus scanning service
 */
async function scanFile(buffer: Buffer): Promise<{ clean: boolean; reason?: string }> {
  // Check for common executable headers
  const header = buffer.slice(0, 4).toString('hex');
  
  // Check for executable file signatures
  const suspiciousHeaders = [
    '4d5a', // MZ (Windows executable)
    '7f454c46', // ELF (Linux executable)
    '504b0304', // PK (ZIP, could contain malicious files)
    '25504446', // %PDF (PDF, could contain malicious JavaScript)
  ];
  
  if (suspiciousHeaders.includes(header)) {
    return { clean: false, reason: 'Potentially malicious file signature detected' };
  }
  
  // Check file size
  if (buffer.length > MAX_FILE_SIZE) {
    return { clean: false, reason: 'File exceeds maximum allowed size' };
  }
  
  // In a real implementation, you would call an actual virus scanning API here
  
  return { clean: true };
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin rights
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get form data with the file
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'File type not allowed',
        allowedTypes: ALLOWED_FILE_TYPES 
      }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: 'File size exceeds limit',
        maxSize: `${MAX_FILE_SIZE / (1024 * 1024)}MB` 
      }, { status: 400 });
    }

    // Convert file to buffer for virus scanning
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Scan file for viruses
    const scanResult = await scanFile(buffer);
    if (!scanResult.clean) {
      return NextResponse.json({ 
        error: 'Security check failed',
        reason: scanResult.reason 
      }, { status: 400 });
    }

    // Sanitize the original filename
    const originalFilename = sanitizeInput(file.name.replace(/[^a-zA-Z0-9.-]/g, '_'));
    
    // Generate a unique filename
    const uniqueFilename = `${uuidv4()}-${originalFilename}`;
    
    // Define secure path outside of public directory
    const uploadDir = join(process.cwd(), 'uploads', 'secure');
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const filePath = join(uploadDir, uniqueFilename);
    
    // Write file to secure location
    await writeFile(filePath, buffer);
    
    // Return success response with file info
    return NextResponse.json({ 
      success: true, 
      filename: uniqueFilename,
      originalName: originalFilename,
      size: file.size,
      type: file.type,
      path: `/uploads/secure/${uniqueFilename}` // Note: This path should be mapped in your API
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} 