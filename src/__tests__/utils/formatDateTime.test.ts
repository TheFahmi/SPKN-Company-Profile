import { describe, it, expect } from 'vitest';
import { formatDateTime } from '../../app/utils/formatters';

describe('DateTime Formatter', () => {
  it('formats date string correctly with time', () => {
    // Buat tanggal dengan waktu spesifik
    const dateString = '2023-01-15T14:30:00';
    const result = formatDateTime(dateString);
    
    // Verifikasi format tanggal dan waktu
    expect(result).toContain('15');
    expect(result).toContain('Januari');
    expect(result).toContain('2023');
    expect(result).toContain('14.30'); // Waktu dalam format Indonesia menggunakan titik
    expect(result).toContain('pukul'); // Kata "pukul" dalam format Indonesia
  });

  it('formats Date object correctly with time', () => {
    // Buat Date object dengan waktu spesifik (15 Januari 2023, 14:30)
    const date = new Date(2023, 0, 15, 14, 30);
    const result = formatDateTime(date);
    
    // Verifikasi format tanggal dan waktu
    expect(result).toContain('15');
    expect(result).toContain('Januari');
    expect(result).toContain('2023');
    expect(result).toContain('14.30'); // Waktu dalam format Indonesia menggunakan titik
    expect(result).toContain('pukul'); // Kata "pukul" dalam format Indonesia
  });

  it('handles midnight correctly', () => {
    // Buat Date object untuk tengah malam (00:00)
    const date = new Date(2023, 0, 15, 0, 0);
    const result = formatDateTime(date);
    
    // Verifikasi format tanggal dan waktu
    expect(result).toContain('15');
    expect(result).toContain('Januari');
    expect(result).toContain('2023');
    expect(result).toContain('00.00'); // Tengah malam dalam format Indonesia
    expect(result).toContain('pukul'); // Kata "pukul" dalam format Indonesia
  });

  it('handles noon correctly', () => {
    // Buat Date object untuk tengah hari (12:00)
    const date = new Date(2023, 0, 15, 12, 0);
    const result = formatDateTime(date);
    
    // Verifikasi format tanggal dan waktu
    expect(result).toContain('15');
    expect(result).toContain('Januari');
    expect(result).toContain('2023');
    expect(result).toContain('12.00'); // Tengah hari dalam format Indonesia
    expect(result).toContain('pukul'); // Kata "pukul" dalam format Indonesia
  });
}); 