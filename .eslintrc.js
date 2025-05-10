module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended'
  ],
  plugins: [
    'security',
    'sonarjs',
    'no-unsanitized'
  ],
  rules: {
    // Prevent XSS vulnerabilities
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error',
    
    // Prevent React dangerouslySetInnerHTML misuse
    'react/no-danger': 'error',
    
    // Prevent SQL injection
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    
    // Prevent other security issues
    'security/detect-object-injection': 'warn',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-new-buffer': 'error',
  }
}; 