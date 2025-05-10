import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/app/lib/mongodb';
import { getServerSession } from 'next-auth';

// GET /api/admin/products/[id] - Mendapatkan produk berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    
    // Validasi ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    const product = await db.collection('products').findOne({
      _id: new ObjectId(params.id)
    });
    
    if (!product) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/[id] - Memperbarui produk berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    
    // Validasi ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    // Dapatkan data produk dari request
    const productData = await request.json();
    
    // Validasi required fields
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { message: 'Nama dan harga produk wajib diisi' },
        { status: 400 }
      );
    }
    
    // Prepare product object with all fields
    const updateData = {
      name: productData.name,
      description: productData.description || '',
      price: Number(productData.price),
      category: productData.category || '',
      imageUrl: productData.imageUrl || '',
      images: productData.images || [],
      features: productData.features || [],
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      author: productData.author || '',
      publisher: productData.publisher || '',
      level: productData.level || '',
      pages: productData.pages ? Number(productData.pages) : undefined,
      year: productData.year || '',
      size: productData.size || '',
      isbn: productData.isbn || '',
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Produk berhasil diperbarui',
      productId: params.id
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memperbarui produk' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - Menghapus produk berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    
    // Validasi ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(params.id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Produk berhasil dihapus',
      productId: params.id
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menghapus produk' },
      { status: 500 }
    );
  }
} 