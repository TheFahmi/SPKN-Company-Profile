import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

function cleanElementorCSS(description: string): string {
  if (!description) return 'Deskripsi tidak tersedia';
  
  return description
    // Hapus CSS Elementor
    .replace(/\/\*![\s\S]*?\*\/[\s\S]*?{[\s\S]*?}/g, '')
    // Hapus style tags dan kontennya
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Hapus link stylesheet Elementor
    .replace(/<link[^>]*elementor[^>]*>/gi, '')
    // Bersihkan sisa HTML jika ada
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection('products').find({}).toArray();
    
    let updateCount = 0;
    
    for (const product of products) {
      if (product.description && (
        product.description.includes('elementor') || 
        product.description.includes('/*!') ||
        product.description.includes('<style')
      )) {
        const cleanedDescription = cleanElementorCSS(product.description);
        
        await db.collection('products').updateOne(
          { _id: product._id },
          { $set: { description: cleanedDescription } }
        );
        
        updateCount++;
      }
    }
    
    return NextResponse.json({
      message: `Berhasil membersihkan CSS Elementor dari ${updateCount} produk`,
      updatedCount: updateCount
    });
  } catch (error) {
    console.error('Error cleaning products:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat membersihkan produk' },
      { status: 500 }
    );
  }
} 