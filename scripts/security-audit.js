#!/usr/bin/env node
/**
 * Security Audit Script
 * 
 * This script runs various security checks on the codebase:
 * 1. npm audit - Checks for vulnerabilities in dependencies
 * 2. ESLint security plugin - Checks for security issues in code
 * 3. Dependency check - Simulates OWASP dependency check
 * 
 * Usage: node scripts/security-audit.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔒 Starting security audit...');

// Run npm audit
console.log('\n📦 Running npm audit...');
try {
  const auditResult = execSync('npm audit --json').toString();
  fs.writeFileSync(
    path.join(reportsDir, 'npm-audit.json'),
    auditResult
  );
  console.log('✅ npm audit completed and report saved');
  
  // Parse the result to provide a summary
  const auditData = JSON.parse(auditResult);
  if (auditData.metadata && auditData.metadata.vulnerabilities) {
    const vulns = auditData.metadata.vulnerabilities;
    console.log(`   Summary: ${vulns.info} info, ${vulns.low} low, ${vulns.moderate} moderate, ${vulns.high} high, ${vulns.critical} critical`);
  }
} catch (error) {
  console.error('❌ npm audit found vulnerabilities');
  fs.writeFileSync(
    path.join(reportsDir, 'npm-audit.json'),
    error.stdout ? error.stdout.toString() : JSON.stringify({ error: error.message })
  );
  
  // Try to parse the error output for a summary
  try {
    if (error.stdout) {
      const auditData = JSON.parse(error.stdout.toString());
      if (auditData.metadata && auditData.metadata.vulnerabilities) {
        const vulns = auditData.metadata.vulnerabilities;
        console.log(`   Summary: ${vulns.info} info, ${vulns.low} low, ${vulns.moderate} moderate, ${vulns.high} high, ${vulns.critical} critical`);
      }
    }
  } catch (parseError) {
    console.error('   Could not parse npm audit results');
  }
}

// Run ESLint security plugin
console.log('\n🔍 Running ESLint security checks...');
try {
  // Check if eslint-plugin-security is installed
  try {
    require.resolve('eslint-plugin-security');
  } catch (e) {
    console.log('   Installing eslint-plugin-security...');
    execSync('npm install --no-save eslint-plugin-security');
  }
  
  const eslintResult = execSync(
    'npx eslint --plugin security --ext .js,.ts,.tsx src/ --format json || true'
  ).toString();
  
  fs.writeFileSync(
    path.join(reportsDir, 'eslint-security.json'),
    eslintResult
  );
  
  // Parse the result to provide a summary
  try {
    const eslintData = JSON.parse(eslintResult);
    let securityIssues = 0;
    
    eslintData.forEach(file => {
      file.messages.forEach(msg => {
        if (msg.ruleId && msg.ruleId.startsWith('security/')) {
          securityIssues++;
        }
      });
    });
    
    if (securityIssues > 0) {
      console.log(`❌ ESLint found ${securityIssues} security issues`);
    } else {
      console.log('✅ ESLint security checks completed with no issues');
    }
  } catch (parseError) {
    console.log('✅ ESLint security checks completed');
  }
} catch (error) {
  console.error('❌ ESLint security checks failed:', error.message);
  fs.writeFileSync(
    path.join(reportsDir, 'eslint-security-error.log'),
    error.message
  );
}

// Simulate OWASP Dependency Check
console.log('\n🛡️ Simulating OWASP Dependency Check...');
try {
  // In a real scenario, you would run the actual OWASP Dependency Check tool
  // Here we're simulating it by checking for known vulnerable package patterns
  
  const packageLockPath = path.join(__dirname, '../package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    const packageLock = require(packageLockPath);
    const dependencies = packageLock.dependencies || {};
    
    // List of packages with known vulnerabilities (this is just an example)
    const knownVulnerablePackages = [
      { name: 'lodash', version: '<4.17.20', severity: 'high', reason: 'Prototype pollution' },
      { name: 'axios', version: '<0.21.1', severity: 'high', reason: 'Server-side request forgery' },
      { name: 'minimist', version: '<1.2.6', severity: 'medium', reason: 'Prototype pollution' },
    ];
    
    const vulnerabilities = [];
    
    Object.keys(dependencies).forEach(depName => {
      const depVersion = dependencies[depName].version;
      
      knownVulnerablePackages.forEach(vulnPackage => {
        if (depName === vulnPackage.name) {
          // Very simple version check - in reality you'd use semver
          if (vulnPackage.version.startsWith('<') && depVersion < vulnPackage.version.substring(1)) {
            vulnerabilities.push({
              package: depName,
              installedVersion: depVersion,
              vulnerableVersion: vulnPackage.version,
              severity: vulnPackage.severity,
              reason: vulnPackage.reason
            });
          }
        }
      });
    });
    
    fs.writeFileSync(
      path.join(reportsDir, 'dependency-check.json'),
      JSON.stringify({ vulnerabilities }, null, 2)
    );
    
    if (vulnerabilities.length > 0) {
      console.log(`❌ Found ${vulnerabilities.length} potential vulnerabilities in dependencies`);
      vulnerabilities.forEach(v => {
        console.log(`   - ${v.package}@${v.installedVersion}: ${v.severity} (${v.reason})`);
      });
    } else {
      console.log('✅ No known vulnerabilities found in dependencies');
    }
  } else {
    console.log('⚠️ package-lock.json not found, skipping dependency check');
  }
} catch (error) {
  console.error('❌ Dependency check failed:', error.message);
}

// Check for security headers in Next.js config
console.log('\n🔒 Checking security headers configuration...');
try {
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    const securityHeaderChecks = [
      { name: 'Content-Security-Policy', regex: /Content-Security-Policy/i },
      { name: 'X-XSS-Protection', regex: /X-XSS-Protection/i },
      { name: 'X-Frame-Options', regex: /X-Frame-Options/i },
      { name: 'X-Content-Type-Options', regex: /X-Content-Type-Options/i },
      { name: 'Referrer-Policy', regex: /Referrer-Policy/i },
      { name: 'Permissions-Policy', regex: /Permissions-Policy/i },
      { name: 'Strict-Transport-Security', regex: /Strict-Transport-Security/i },
    ];
    
    const missingHeaders = [];
    securityHeaderChecks.forEach(header => {
      if (!header.regex.test(nextConfigContent)) {
        missingHeaders.push(header.name);
      }
    });
    
    if (missingHeaders.length > 0) {
      console.log(`⚠️ Missing security headers in next.config.js: ${missingHeaders.join(', ')}`);
    } else {
      console.log('✅ All recommended security headers are configured');
    }
  } else {
    console.log('⚠️ next.config.js not found, skipping security headers check');
  }
} catch (error) {
  console.error('❌ Security headers check failed:', error.message);
}

console.log('\n🎉 Security audit completed. Check the reports directory for detailed results.');
console.log('📁 Reports location:', reportsDir); 