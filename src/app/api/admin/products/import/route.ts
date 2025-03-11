import { NextRequest, NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';
import { connectToDatabase } from '@/app/lib/mongodb';

interface Product {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  images: string[];
  price: number;
  author: string;
  publisher: string;
  level: string;
  pages: number;
  year: string;
  size: string;
  isbn?: string;
  createdAt: Date;
  updatedAt: Date;
}

function extractImagesFromContent(content: string): string[] {
  const images: string[] = [];
  
  // Deteksi gambar dari tag <img> dengan src
  const srcRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let srcMatch;
  while ((srcMatch = srcRegex.exec(content)) !== null) {
    if (srcMatch[1]) {
      images.push(srcMatch[1]);
    }
  }

  // Deteksi gambar dari srcset
  const srcsetRegex = /<img[^>]+srcset=["']([^"']+)["'][^>]*>/g;
  let srcsetMatch;
  while ((srcsetMatch = srcsetRegex.exec(content)) !== null) {
    if (srcsetMatch[1]) {
      const srcsetUrls = srcsetMatch[1]
        .split(',')
        .map(src => src.trim().split(' ')[0])
        .filter(Boolean);
      images.push(...srcsetUrls);
    }
  }

  return images;
}

function extractDescription(content: string): string {
  if (!content) return 'Deskripsi tidak tersedia';
  
  // Hapus semua inline CSS dan style tags
  let cleanedContent = content
    // Hapus style tags dan kontennya
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Hapus CSS Elementor
    .replace(/\/\*![\s\S]*?\*\/[\s\S]*?{[\s\S]*?}/g, '')
    // Hapus link stylesheet Elementor
    .replace(/<link[^>]*elementor[^>]*>/gi, '');
  
  // Hapus tag <h2>Deskripsi</h2> dan ambil teks setelahnya sampai tag <h2> berikutnya
  const descriptionRegex = /<h2>Deskripsi<\/h2>([\s\S]*?)(?=<h2>|$)/i;
  const match = cleanedContent.match(descriptionRegex);
  
  if (match && match[1]) {
    // Bersihkan HTML tags dan whitespace berlebih
    return match[1]
      .replace(/<[^>]*>/g, '') // Hapus semua HTML tags
      .replace(/&nbsp;/g, ' ') // Ganti &nbsp; dengan spasi
      .replace(/\s+/g, ' ') // Gabungkan multiple whitespace
      .trim();
  }
  
  // Jika tidak ada deskripsi yang ditemukan, ambil paragraf pertama setelah judul
  const firstParagraphRegex = /<p>([\s\S]*?)<\/p>/;
  const paragraphMatch = cleanedContent.match(firstParagraphRegex);
  
  if (paragraphMatch && paragraphMatch[1]) {
    return paragraphMatch[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  return 'Deskripsi tidak tersedia';
}

function removeDuplicates(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { message: 'File tidak ditemukan' },
        { status: 400 }
      );
    }

    const xmlText = await file.text();
    const xmlData = await parseStringPromise(xmlText);

    // Pastikan ini adalah file WordPress
    if (!xmlData.rss || !xmlData.rss.channel) {
      throw new Error('Format file XML tidak valid');
    }

    const items = xmlData.rss.channel[0].item || [];
    const products: Product[] = items
      .filter((item: any) => item['wp:post_type']?.[0] === 'post')
      .map((item: any) => {
        // Ekstrak harga dari kategori (format: "Rp. XX,XXX")
        const priceCategory = item.category?.find((cat: any) => cat._?.startsWith('Rp.'));
        const priceString = priceCategory?._?.replace('Rp. ', '').replace(/,/g, '');
        const price = priceString ? parseInt(priceString) : 0;

        // Ekstrak konten dari CDATA
        const content = item['content:encoded']?.[0];
        
        // Ekstrak gambar dari berbagai sumber
        const featuredImage = item['wp:attachment_url']?.[0];
        const contentImages = extractImagesFromContent(content || '');
        
        // Cari thumbnail ID dan URL
        const thumbnailId = item['wp:postmeta']?.find((meta: any) => 
          meta['wp:meta_key']?.[0] === '_thumbnail_id'
        )?.[0]?.['wp:meta_value']?.[0];
        
        // Cari attachment dengan ID yang sesuai
        const thumbnailAttachment = items.find((attachment: any) => 
          attachment['wp:post_type']?.[0] === 'attachment' && 
          attachment['wp:post_id']?.[0] === thumbnailId
        );
        
        const thumbnailUrl = thumbnailAttachment?.['wp:attachment_url']?.[0];
        
        // Gabungkan semua gambar yang ditemukan
        const allImages = [
          featuredImage,
          ...contentImages,
          thumbnailUrl
        ].filter(Boolean) as string[];
        
        // Hapus duplikat URL gambar
        const uniqueImages = removeDuplicates(allImages)
          .filter(url => url.match(/\.(jpg|jpeg|png|gif|webp)$/i));

        // Ekstrak deskripsi
        const description = extractDescription(content || '');
        
        // Parse informasi produk dari konten
        const authorMatch = content?.match(/Penulis\s*:\s*([^<\n]+)/);
        const publisherMatch = content?.match(/Penerbit\s*:\s*([^<\n]+)/);
        const levelMatch = content?.match(/Jenjang\s*:\s*([^<\n]+)/);
        const pagesMatch = content?.match(/Halaman\s*:\s*(\d+)/);
        const yearMatch = content?.match(/Tahun Terbit\s*:\s*(\d+)/);
        const sizeMatch = content?.match(/Ukuran\s*:\s*([^<\n]+)/);
        const isbnMatch = content?.match(/ISBN\s*:\s*([^<\n]+)/);

        return {
          name: item.title?.[0] || '',
          description: description,
          category: item.category?.find((cat: any) => !cat._?.startsWith('Rp.'))?._ || 'Tanpa Kategori',
          imageUrl: uniqueImages[uniqueImages.length - 1] || '',
          images: uniqueImages,
          price: price,
          author: authorMatch?.[1]?.trim() || '',
          publisher: publisherMatch?.[1]?.trim() || '',
          level: levelMatch?.[1]?.trim() || '',
          pages: pagesMatch ? parseInt(pagesMatch[1]) : 0,
          year: yearMatch?.[1]?.trim() || '',
          size: sizeMatch?.[1]?.trim() || '',
          isbn: isbnMatch?.[1]?.trim(),
          createdAt: new Date(item['wp:post_date']?.[0] || new Date()),
          updatedAt: new Date()
        };
      });

    if (products.length === 0) {
      return NextResponse.json(
        { message: 'Tidak ada produk yang dapat diimpor' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const insertResult = await db.collection('products').insertMany(products);

    return NextResponse.json({
      message: 'Import berhasil',
      importedCount: insertResult.insertedCount,
      products: products.map(product => ({
        name: product.name,
        price: product.price,
        author: product.author,
        category: product.category,
        imageCount: product.images.length,
        images: product.images
      })),
    });

  } catch (error) {
    console.error('Error importing products:', error);
    return NextResponse.json(
      { 
        message: error instanceof Error 
          ? error.message 
          : 'Terjadi kesalahan saat mengimpor produk'
      },
      { status: 500 }
    );
  }
} 