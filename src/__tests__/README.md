# Unit Testing

Proyek ini menggunakan Vitest sebagai framework testing dengan React Testing Library untuk testing komponen.

## Struktur Direktori

```
src/__tests__/
├── components/       # Test untuk komponen React
├── utils/           # Test untuk fungsi utility
├── api/             # Test untuk API routes
└── setup.ts         # File setup untuk konfigurasi testing
```

## Menjalankan Test

Untuk menjalankan semua test:

```bash
npm run test
```

Untuk menjalankan test dalam mode watch (akan menjalankan ulang test saat ada perubahan):

```bash
npm run test:watch
```

Untuk menjalankan test dengan coverage report:

```bash
npm run test:coverage
```

## Menulis Test Baru

### Test Komponen

Untuk menulis test untuk komponen, buat file dengan format `[NamaKomponen].test.tsx` di direktori `src/__tests__/components/`. Contoh:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

### Test Utility Functions

Untuk menulis test untuk fungsi utility, buat file dengan format `[namaFile].test.ts` di direktori `src/__tests__/utils/`. Contoh:

```ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '../../utils/myUtils';

describe('myFunction', () => {
  it('returns correct result', () => {
    expect(myFunction(1, 2)).toBe(3);
  });
});
```

### Test API Routes

Untuk menulis test untuk API routes, buat file dengan format `[namaRoute].test.ts` di direktori `src/__tests__/api/`. Contoh:

```ts
import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET } from '../../app/api/myRoute/route';

describe('My API Route', () => {
  it('returns correct response', async () => {
    const req = new NextRequest(new URL('http://localhost:3000/api/myRoute'));
    const res = await GET(req);
    expect(res).toBeInstanceOf(NextResponse);
    const data = await res.json();
    expect(data).toHaveProperty('success', true);
  });
});
```

## Best Practices

1. Gunakan `describe` untuk mengelompokkan test yang berkaitan
2. Gunakan `it` untuk mendeskripsikan apa yang diuji
3. Gunakan `expect` untuk membuat assertions
4. Gunakan `vi.mock()` untuk mocking dependencies
5. Gunakan `beforeEach` dan `afterEach` untuk setup dan teardown
6. Pastikan setiap test bersifat independen dan tidak bergantung pada state dari test lain 