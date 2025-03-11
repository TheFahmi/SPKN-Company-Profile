import 'next-auth';
import { CustomUser } from './mongodb';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }

  interface User extends CustomUser {}
} 