import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, isAdmin } from '@/app/lib/mongodb';
import { compare } from 'bcrypt';

// Deklarasi tipe untuk user
interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isAdmin?: boolean;
  password?: string;
}

// Deklarasi tipe untuk token
interface Token {
  id?: string;
  role?: string;
  isAdmin?: boolean;
}

// Deklarasi tipe untuk session
interface Session {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    isAdmin?: boolean;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password diperlukan');
        }

        try {
          // Dapatkan pengguna dari MongoDB
          const user = await getUserByEmail(credentials.email);

          if (!user) {
            throw new Error('Pengguna tidak ditemukan');
          }

          // Periksa password
          if (!user.password) {
            throw new Error('Password tidak ditemukan');
          }

          const isPasswordValid = await compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error('Password salah');
          }

          // Periksa apakah pengguna adalah admin
          const isUserAdmin = isAdmin(user);

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email.split('@')[0],
            role: user.role || 'user',
            isAdmin: isUserAdmin
          } as User;
        } catch (error) {
          console.error('Error during authentication:', error);
          throw new Error('Terjadi kesalahan saat autentikasi');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: Token; user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 hari
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 