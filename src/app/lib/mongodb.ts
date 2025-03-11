import { MongoClient, Db, ObjectId } from 'mongodb';
import { MongoDocument, User, Product } from '@/types/mongodb';

// Validasi environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DB"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Di development, gunakan variable global untuk menyimpan koneksi
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Di production, lebih baik membuat koneksi baru
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { db, client };
}

// Fungsi untuk mendapatkan koleksi
export async function getCollection(collectionName: string) {
  try {
    console.log('Getting collection:', collectionName);
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
  } catch (error: any) {
    console.error('Error getting collection:', error?.message);
    throw new Error(`Gagal mengakses koleksi database: ${error?.message || 'Unknown error'}`);
  }
}

// Fungsi untuk menambahkan dokumen
export async function addDocument<T extends MongoDocument>(collectionName: string, data: T): Promise<T & { id: string }> {
  try {
    const collection = await getCollection(collectionName);
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return {
      ...data,
      id: result.insertedId.toString(),
      _id: undefined
    } as T & { id: string };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

// Fungsi untuk mendapatkan dokumen
export async function getDocuments<T extends MongoDocument>(
  collectionName: string,
  filter: Record<string, any> = {},
  options: Record<string, any> = {}
): Promise<(T & { id: string })[]> {
  try {
    const collection = await getCollection(collectionName);
    const documents = await collection.find(filter, options).toArray();
    
    return documents.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: doc._id
    })) as (T & { id: string })[];
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
}

// Fungsi untuk mendapatkan dokumen berdasarkan ID
export async function getDocumentById<T extends MongoDocument>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
  try {
    const collection = await getCollection(collectionName);
    const objectId = new ObjectId(id);
    const document = await collection.findOne({ _id: objectId });
    
    if (!document) return null;
    
    return {
      ...document,
      id: document._id.toString(),
      _id: undefined
    } as T & { id: string };
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

// Fungsi untuk memperbarui dokumen
export async function updateDocument<T extends MongoDocument>(collectionName: string, id: string, data: Partial<T>): Promise<boolean> {
  try {
    const collection = await getCollection(collectionName);
    const objectId = new ObjectId(id);
    const result = await collection.updateOne(
      { _id: objectId },
      { 
        $set: {
          ...data,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

// Fungsi untuk menghapus dokumen
export async function deleteDocument(collectionName: string, id: string): Promise<boolean> {
  try {
    const collection = await getCollection(collectionName);
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

// Fungsi untuk mendapatkan produk
export async function getProducts(): Promise<(Product & { id: string })[]> {
  return getDocuments<Product>('products');
}

// Fungsi untuk mendapatkan pengguna berdasarkan email
export async function getUserByEmail(email: string): Promise<(User & { id: string }) | null> {
  if (!email) {
    throw new Error('Email diperlukan');
  }

  try {
    console.log('Connecting to MongoDB...');
    const collection = await getCollection('users');
    
    console.log('Finding user by email:', email.toLowerCase());
    const user = await collection.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('User not found:', email);
      return null;
    }
    
    console.log('User found:', user._id);
    return {
      ...user,
      id: user._id.toString(),
      _id: undefined
    } as User & { id: string };
  } catch (error: any) {
    console.error('MongoDB Error in getUserByEmail:', error?.message);
    throw new Error(`Terjadi kesalahan saat mengakses database: ${error?.message || 'Unknown error'}`);
  }
}

// Fungsi untuk memeriksa apakah pengguna adalah admin
export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  
  // Verifikasi berdasarkan properti isAdmin atau role
  if (user.isAdmin === true || user.role === 'admin') {
    return true;
  }
  
  // Fallback untuk email admin dari environment variable
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(user.email?.toLowerCase());
}

// Fungsi untuk menjadikan pengguna sebagai admin
export async function setUserAsAdmin(userId: string): Promise<boolean> {
  return updateDocument<User>('users', userId, { role: 'admin' });
} 