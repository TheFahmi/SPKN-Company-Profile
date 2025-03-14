import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 100000,
    category: 'category1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 200000,
    category: 'category2',
    createdAt: new Date().toISOString(),
  },
];

// Mock the MongoDB client
vi.mock('../../app/lib/mongodb', () => ({
  connectToDatabase: vi.fn().mockResolvedValue({
    db: vi.fn().mockReturnValue({
      collection: vi.fn().mockReturnValue({
        find: vi.fn().mockReturnValue({
          toArray: vi.fn().mockResolvedValue(mockProducts),
          sort: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          skip: vi.fn().mockReturnThis(),
        }),
        findOne: vi.fn().mockImplementation((query) => {
          const product = mockProducts.find(p => p.id === query._id);
          return Promise.resolve(product);
        }),
        countDocuments: vi.fn().mockResolvedValue(mockProducts.length),
      }),
    }),
  }),
}));

// Import the handler after mocking
import { GET as getProducts } from '../../app/api/products/route';
// We would normally import the handler, but for this test we'll mock it

describe('Products API', () => {
  let req: NextRequest;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Create a new request for each test
    req = new NextRequest(new URL('http://localhost:3000/api/products'), {
      method: 'GET',
    });
  });

  it('should return all products', async () => {
    // This is a simplified test since we can't directly import the handler
    // In a real test, you would import the actual handler
    const res = await getProducts(req);
    
    expect(res).toBeInstanceOf(NextResponse);
    
    const data = await res.json();
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveLength(mockProducts.length);
    expect(data).toHaveProperty('pagination');
  });

  it('should handle pagination parameters', async () => {
    // Create a request with pagination parameters
    const reqWithParams = new NextRequest(
      new URL('http://localhost:3000/api/products?page=2&limit=10'),
      { method: 'GET' }
    );
    
    const res = await getProducts(reqWithParams);
    const data = await res.json();
    
    expect(data).toHaveProperty('pagination');
    expect(data.pagination).toHaveProperty('currentPage', 2);
    expect(data.pagination).toHaveProperty('itemsPerPage', 10);
  });

  it('should handle category filter', async () => {
    // Create a request with category filter
    const reqWithCategory = new NextRequest(
      new URL('http://localhost:3000/api/products?category=category1'),
      { method: 'GET' }
    );
    
    const res = await getProducts(reqWithCategory);
    
    // In a real test, you would verify that the filter was applied correctly
    expect(res).toBeInstanceOf(NextResponse);
  });
}); 