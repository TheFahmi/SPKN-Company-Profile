# Printing Company Profile

## 🚀 Main Features

- **Landing Page** with printing service information
- **Product Catalog** with search and filter functionality
- **Product Details** with images, descriptions, and specifications
- **Admin Panel** for managing products, users, and content
- **Authentication** using NextAuth.js
- **Responsive Design** for optimal viewing on all devices
- **Design System** with component documentation using Storybook

## 🎨 Recent UI Enhancements

- **Enhanced Product Section UI** with improved layout and content presentation
- **Modernized Card Designs** with hover effects and visual hierarchy
- **Improved Typography** using gradient text and better readability
- **Responsive Design Improvements** for better mobile experience
- **Interactive Elements** with smooth animations and transitions
- **Comprehensive Design System** with color palette, typography, spacing, and shadows documentation

## ⚙️ Technologies

- **Frontend**: Next.js, React.js, Material UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Material UI, CSS Modules
- **State Management**: React Hooks, Context API
- **Deployment**: Vercel
- **UI Documentation**: Storybook
- **Testing**: Vitest, React Testing Library

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/username/percetakan-profile.git
cd percetakan-profile
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Setup environment variables**

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then edit the `.env` file with the appropriate configuration.

## 🌐 Environment Variables Configuration

Environment variables that need to be set:

```ini
# Database Configuration
MONGODB_URI=mongodb://username:password@localhost:27017/percetakan-profile
MONGODB_DB=percetakan-profile

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Admin Configuration
ADMIN_EMAILS=admin@example.com,superadmin@example.com

# Site Configuration
SITE_URL=http://localhost:3000
SITE_NAME=Printing Company Profile
NEXT_PUBLIC_APP_NAME=Printing Company Profile
```

## 🚀 Running the Application

### Development

```bash
npm run dev
# or
yarn dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

### Storybook

To run the component documentation with Storybook:

```bash
npm run storybook
# or
yarn storybook
```

Storybook will run at [http://localhost:6006](http://localhost:6006).

### Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 🧪 Testing

The project uses Vitest as the testing framework with React Testing Library for component testing.

### Running Tests

To run all tests:

```bash
npm run test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

To run tests with coverage report:

```bash
npm run test:coverage
```

### Test Directory Structure

```
src/__tests__/
├── components/       # Tests for React components
│   ├── ProductCard.test.tsx     # Tests for ProductCard component
│   ├── ServiceCard.test.tsx     # Tests for ServiceCard component
│   ├── TestimonialCard.test.tsx # Tests for TestimonialCard component
│   └── PricingCard.test.tsx     # Tests for PricingCard component
├── utils/           # Tests for utility functions
│   ├── formatters.test.ts       # Tests for date and currency formatters
│   ├── formatDateTime.test.ts   # Tests for datetime formatter
│   └── mongodb.test.ts          # Tests for MongoDB utility functions
├── api/             # Tests for API routes
│   ├── products.test.ts         # Tests for product API endpoints
│   └── auth.test.ts             # Tests for authentication endpoints
└── setup.ts         # Setup file for test configuration
```

### Writing Tests

#### Component Tests

Create a file with the format `[ComponentName].test.tsx` in the `src/__tests__/components/` directory:

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

#### Utility Function Tests

Create a file with the format `[fileName].test.ts` in the `src/__tests__/utils/` directory:

```ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '../../app/utils/myUtils';

describe('myFunction', () => {
  it('returns correct result', () => {
    expect(myFunction(1, 2)).toBe(3);
  });
});
```

#### API Route Tests

Create a file with the format `[routeName].test.ts` in the `src/__tests__/api/` directory:

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

### Best Practices

1. Use `describe` to group related tests
2. Use `it` to describe what is being tested
3. Use `expect` to make assertions
4. Use `vi.mock()` for mocking dependencies
5. Use `beforeEach` and `afterEach` for setup and teardown
6. Ensure each test is independent and doesn't rely on state from other tests
7. For component tests, prefer testing behavior over implementation details
8. For API tests, mock external dependencies like databases

## 🧹 Cleaning Cache

If you experience issues with cache, use the following commands:

```bash
# For Linux/Mac
npm run clean

# For Windows
npm run clean:win
```

## 📁 Folder Structure

```
percetakan-profile/
├── public/               # Static files
├── src/
│   ├── app/              # Next.js App Router application
│   │   ├── (auth)/       # Authentication pages (login/register)
│   │   ├── (error-pages)/# Custom error pages
│   │   ├── (main)/       # Main application pages
│   │   ├── 404/          # Custom 404 page
│   │   ├── admin/        # Admin panel
│   │   ├── api/          # API endpoints
│   │   ├── components/   # React components specific to App Router
│   │   │   ├── home/     # Components for home page
│   │   │   │   ├── HeroSection.tsx      # Hero section with main banner
│   │   │   │   ├── ProdukSection.tsx    # Product showcase section
│   │   │   │   ├── KeunggulanSection.tsx# Company advantages section
│   │   │   │   ├── TestimonialSection.tsx# Customer testimonials section
│   │   │   │   ├── PengalamanSection.tsx# Company experience section
│   │   │   │   └── CTASection.tsx       # Call-to-action section
│   │   │   ├── admin/    # Components for admin panel
│   │   │   │   ├── AdminLayout.tsx      # Main admin panel layout
│   │   │   │   ├── AdminHeader.tsx      # Admin panel header
│   │   │   │   ├── AdminFooter.tsx      # Admin panel footer
│   │   │   │   ├── AdminPageWrapper.tsx # Admin page wrapper
│   │   │   │   ├── AdminFormTemplate.tsx# Admin form template
│   │   │   │   ├── AdminListTemplate.tsx# Admin list template
│   │   │   │   ├── AdminSkeleton.tsx    # Skeleton loading for admin
│   │   │   │   ├── AdminPagination.tsx  # Admin pagination component
│   │   │   │   ├── ProductForm.tsx      # Form for managing products
│   │   │   │   ├── ProductList.tsx      # Product list for admin
│   │   │   │   ├── FormFields.tsx       # Reusable form field components
│   │   │   │   ├── DeleteConfirmDialog.tsx # Delete confirmation dialog
│   │   │   │   ├── NotificationPanel.tsx# Admin notification panel
│   │   │   │   └── ThemeToggle.tsx      # Light/dark theme toggle
│   │   │   ├── about/    # Components for about page
│   │   │   │   ├── AboutHeader.tsx      # About page header
│   │   │   │   ├── CompanyInfoSection.tsx # Company information
│   │   │   │   ├── VisionMissionSection.tsx # Company vision and mission
│   │   │   │   ├── TimelineSection.tsx  # Company history timeline
│   │   │   │   └── TeamSection.tsx      # Company team section
│   │   │   ├── contact/  # Components for contact page
│   │   │   │   ├── ContactHeader.tsx    # Contact page header
│   │   │   │   └── ContactFormSection.tsx # Contact form section
│   │   │   ├── product/  # Components for product page
│   │   │   │   ├── ProductHeader.tsx    # Product page header
│   │   │   │   ├── ProductGrid.tsx      # Grid for displaying products
│   │   │   │   ├── ProductFilters.tsx   # Product filters
│   │   │   │   ├── ProductPagination.tsx# Product pagination
│   │   │   │   └── ProductSkeleton.tsx  # Skeleton loading for products
│   │   │   ├── Navbar.tsx          # Main application navigation
│   │   │   ├── Footer.tsx          # Application footer
│   │   │   ├── ThemeRegistry.tsx   # Material UI theme registry
│   │   │   ├── PageTransition.tsx  # Page transition animations
│   │   │   ├── LoadingScreen.tsx   # Loading screen during navigation
│   │   │   ├── StructuredData.tsx  # SEO structured data component
│   │   │   ├── Analytics.tsx       # Google Analytics integration
│   │   │   ├── OptimizedImage.tsx  # Wrapper for image optimization
│   │   │   ├── ContactForm.tsx     # Contact form with validation
│   │   │   ├── AdminProtected.tsx  # Wrapper for admin page protection
│   │   │   └── Preload.tsx         # Preloading important assets
│   │   ├── contexts/     # Context providers
│   │   ├── design-system/# Application design system
│   │   ├── hooks/        # Custom React hooks
│   │   ├── kontak/       # Contact page
│   │   ├── lib/          # Library and utility functions
│   │   ├── login/        # Login page
│   │   ├── maintenance/  # Maintenance page
│   │   ├── models/       # Data models
│   │   ├── produk/       # Product page
│   │   ├── register/     # Registration page
│   │   ├── styles/       # Styles specific to App Router
│   │   ├── tentang-kami/ # About us page
│   │   ├── theme/        # Theme configuration
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   ├── components/       # Reusable UI components
│   │   ├── ProductCard.tsx    # Card for displaying products with image, price, rating, and actions
│   │   ├── ServiceCard.tsx    # Card for displaying services with features, price, and time estimate
│   │   ├── TestimonialCard.tsx# Card for displaying customer testimonials with rating and info
│   │   ├── PricingCard.tsx    # Card for displaying pricing packages with features and action buttons
│   │   ├── Header.tsx         # Application header with responsive navigation and scroll animations
│   │   ├── Footer.tsx         # Application footer with contact info, navigation, and newsletter
│   │   └── LoadingScreen.tsx  # Loading screen with animations for page transitions
│   ├── fonts/            # Local fonts
│   ├── hooks/            # Global custom React hooks
│   ├── stories/          # Storybook documentation for UI components
│   │   ├── assets/       # Assets for Storybook
│   │   ├── Colors.mdx    # Color palette documentation with usage examples
│   │   ├── Typography.mdx# Typography hierarchy and font family documentation
│   │   ├── SpacingShadows.mdx # Spacing system and shadows usage documentation
│   │   ├── Introduction.mdx   # Design system introduction
│   │   ├── CustomComponents.mdx # Custom components documentation
│   │   ├── ThemeProvider.tsx  # Theme provider for Storybook with fallback
│   │   ├── ProductCard.stories.tsx # Stories for ProductCard component
│   │   ├── ServiceCard.stories.tsx # Stories for ServiceCard component
│   │   ├── TestimonialCard.stories.tsx # Stories for TestimonialCard component
│   │   ├── PricingCard.stories.tsx # Stories for PricingCard component
│   │   ├── Button.stories.tsx # Stories for Button component
│   │   ├── TextField.stories.tsx # Stories for TextField component
│   │   ├── Card.stories.tsx # Stories for Card component
│   │   └── Alert.stories.tsx # Stories for Alert component
│   ├── styles/           # Global styles
│   ├── types/            # Global TypeScript type definitions
│   └── middleware.ts     # Next.js middleware
├── .env.example          # Environment variables template
├── .gitignore            # Files to ignore in git
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## 👥 Admin Features

1. **Product Management**
   - Add, edit, and delete products
   - Upload product images
   - Set product categories and details

2. **User Management**
   - Add, edit, and delete users
   - Set roles and access rights
   - User verification

3. **Product Import**
   - Import products from WordPress XML files
   - Extract images and metadata

## 🔒 Security

- All sensitive data stored in environment variables
- Passwords encrypted using bcrypt
- JWT authentication using NextAuth.js
- CSRF protection
- Rate limiting for API endpoints

## 📚 API Documentation

API endpoints available at `/api/`:

- `GET /api/products` - Get list of products
- `GET /api/products/[id]` - Get product details
- `POST /api/admin/products` - Add new product (admin)
- `PUT /api/admin/products/[id]` - Update product (admin)
- `DELETE /api/admin/products/[id]` - Delete product (admin)
- `POST /api/auth/register` - Register new user
- `GET /api/admin/users` - Get list of users (admin)

### Swagger UI

Interactive API documentation available through Swagger UI:

- **Swagger UI**: `/api/docs`
- **JSON Format**: `/api/docs/swagger.json`

Swagger UI allows you to:
- Explore all available API endpoints
- View required parameters for each endpoint
- Test endpoints directly from the browser
- View response schemas for each endpoint

## 🤝 Contribution

Contributions are always welcome. To contribute:

1. Fork the repository
2. Create a branch for a new feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

For questions, contact our team at [me@mfah.me](mailto:me@mfah.me).

## 📚 Design System Documentation

This project uses a design system documented with Storybook. This documentation includes:

- **Colors**: Primary, secondary, and neutral color palettes with shade variations
- **Typography**: Typography hierarchy, font families, and text usage
- **Spacing & Shadows**: Consistent spacing system and shadow usage for elevation
- **UI Components**: Interactive documentation for all UI components such as Button, TextField, Card, Alert, etc.

To access the design system documentation, run Storybook with the command `npm run storybook`.

---

Made with ❤️ for Printing Company Profile.