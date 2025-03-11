import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID Produk tidak valid' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const product = await db.collection('products').findOne({
      _id: new ObjectId(id)
    });
    
    if (!product) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Ambil produk terkait berdasarkan kategori, kecuali produk ini
    const relatedProducts = await db.collection('products')
      .find({
        _id: { $ne: new ObjectId(id) },
        category: product.category
      })
      .limit(4)
      .toArray();
    
    return NextResponse.json({
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    );
  }
}