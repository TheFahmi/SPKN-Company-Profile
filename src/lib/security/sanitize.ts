import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a DOMPurify instance with a window from JSDOM
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Configure DOMPurify for strict sanitization
purify.setConfig({
  ALLOWED_TAGS: [
    'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 
    'li', 'br', 'span', 'div', 'h1', 'h2', 'h3', 'h4'
  ],
  ALLOWED_ATTR: ['href', 'target', 'class', 'id', 'style'],
  ALLOW_DATA_ATTR: false,
  USE_PROFILES: { html: true },
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
});

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param dirty The potentially unsafe HTML string
 * @returns A sanitized HTML string
 */
export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty);
}

/**
 * Sanitizes user input for use in non-HTML contexts
 * @param input The potentially unsafe user input
 * @returns A sanitized string
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
}

/**
 * Sanitizes data for use in JSON responses
 * Recursively sanitizes all string values in an object or array
 * @param data The potentially unsafe data
 * @returns Sanitized data with the same structure
 */
export function sanitizeJson<T>(data: T): T {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => 
      typeof item === 'string' 
        ? sanitizeInput(item) as unknown as T 
        : typeof item === 'object' && item !== null 
          ? sanitizeJson(item) 
          : item
    ) as unknown as T;
  }
  
  const sanitized = { ...data } as Record<string, unknown>;
  
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key];
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeJson(value);
    }
  });
  
  return sanitized as T;
}

/**
 * Sanitizes URL parameters to prevent XSS and injection attacks
 * @param params Object containing URL parameters
 * @returns Sanitized URL parameters
 */
export function sanitizeUrlParams(params: Record<string, string>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  
  Object.keys(params).forEach(key => {
    sanitized[sanitizeInput(key)] = sanitizeInput(params[key]);
  });
  
  return sanitized;
}

/**
 * Sanitizes SQL query parameters to prevent SQL injection
 * @param value The potentially unsafe SQL parameter
 * @returns A sanitized SQL parameter
 */
export function sanitizeSqlParam(value: string): string {
  // Remove SQL injection patterns
  return value.replace(/['";\\%]/g, '');
} 