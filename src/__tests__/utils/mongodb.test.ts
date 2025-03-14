import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isAdmin } from '../../app/lib/mongodb';
import type { User } from '../../types/mongodb';

// Mock process.env
vi.mock('process', () => ({
  env: {
    ADMIN_EMAILS: 'admin@example.com,admin2@example.com'
  }
}));

describe('MongoDB Utility Functions', () => {
  describe('isAdmin', () => {
    it('returns false for null user', () => {
      expect(isAdmin(null)).toBe(false);
    });

    it('returns true for user with isAdmin property set to true', () => {
      const user = { 
        email: 'user@example.com', 
        isAdmin: true 
      } as User;
      expect(isAdmin(user)).toBe(true);
    });

    it('returns true for user with role set to admin', () => {
      const user = { 
        email: 'user@example.com', 
        role: 'admin' 
      } as User;
      expect(isAdmin(user)).toBe(true);
    });

    it('returns true for user with email in ADMIN_EMAILS', () => {
      const user = { 
        email: 'admin@example.com'
      } as User;
      expect(isAdmin(user)).toBe(true);
    });

    it('returns false for regular user', () => {
      const user = { 
        email: 'regular@example.com'
      } as User;
      expect(isAdmin(user)).toBe(false);
    });

    it('handles email case insensitively', () => {
      const user = { 
        email: 'ADMIN@example.com'
      } as User;
      expect(isAdmin(user)).toBe(true);
    });
  });
}); 