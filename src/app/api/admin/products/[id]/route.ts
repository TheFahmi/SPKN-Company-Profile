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
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: 'ID produk tidak ditemukan' },
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
        { message: 'ID produk tidak valid' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const product = await db.collection('products').findOne({ _id: objectId });

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
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: 'ID produk tidak ditemukan' },
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
        { message: 'ID produk tidak valid' },
        { status: 400 }
      );
    }

    // Check if the request is multipart/form-data (file upload)
    const contentType = request.headers.get('content-type') || '';
    
    let productData;
    let imageUrl = '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const productJson = formData.get('product') as string;
      const image = formData.get('image') as File;
      
      if (!productJson) {
        return NextResponse.json(
          { message: 'Data produk tidak ditemukan' },
          { status: 400 }
        );
      }
      
      productData = JSON.parse(productJson);
      
      if (image) {
        // Process image upload here...
        // This would typically involve uploading to a storage service
        // For now, we'll just pretend we did that and set a placeholder URL
        imageUrl = 'https://via.placeholder.com/300';
        
        // In a real implementation, you would:
        // 1. Upload the image to a storage service (AWS S3, Cloudinary, etc.)
        // 2. Get the URL of the uploaded image
        // 3. Set imageUrl to that URL
        
        productData.imageUrl = imageUrl;
      }
    } else {
      // Regular JSON request
      productData = await request.json();
    }

    // Validasi input
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { message: 'Nama dan harga produk wajib diisi' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Persiapkan objek update
    const updateData = {
      name: productData.name,
      description: productData.description || '',
      price: Number(productData.price),
      category: productData.category || '',
      imageUrl: productData.imageUrl || '',
      images: productData.images || [],
      author: productData.author || '',
      publisher: productData.publisher || '',
      pages: productData.pages ? Number(productData.pages) : undefined,
      year: productData.year || '',
      size: productData.size || '',
      isbn: productData.isbn || '',
      updatedAt: new Date()
    };

    // Update produk
    const result = await db.collection('products').updateOne(
      { _id: objectId },
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
      id: id
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
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: 'ID produk tidak ditemukan' },
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
        { message: 'ID produk tidak valid' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('products').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Produk berhasil dihapus',
      id: id
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menghapus produk' },
      { status: 500 }
    );
  }
} 