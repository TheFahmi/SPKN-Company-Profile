import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/app/lib/mongodb';

// GET /api/admin/products - Mendapatkan semua produk
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';

    const { db } = await connectToDatabase();
    
    const query = search 
      ? { 
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { publisher: { $regex: search, $options: 'i' } },
            { isbn: { $regex: search, $options: 'i' } }
          ] 
        } 
      : {};
    
    // Count total products for pagination
    const total = await db.collection('products').countDocuments(query);
    
    // Get products with pagination
    const products = await db
      .collection('products')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Menambah produk baru
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    
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
    
    // Validate required fields
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { message: 'Nama dan harga produk wajib diisi' },
        { status: 400 }
      );
    }
    
    // Prepare product object with all fields
    const product = {
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
      pages: productData.pages ? Number(productData.pages) : undefined,
      year: productData.year || '',
      size: productData.size || '',
      isbn: productData.isbn || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').insertOne(product);
    
    return NextResponse.json({
      message: 'Produk berhasil ditambahkan',
      productId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menambahkan produk' },
      { status: 500 }
    );
  }
} 