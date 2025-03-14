import './globals.css';
import { inter } from './fonts';
import ClientWrapper from './client-wrapper';
import { metadata } from './metadata';
import Script from 'next/script';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Preload critical assets with high priority */}
        <link rel="preload" href="/images/logo.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/bg-pattern.png" as="image" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Preconnect to important domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font display optimization */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Inter var';
            font-weight: 100 900;
            font-display: swap;
            font-style: normal;
            font-named-instance: 'Regular';
            src: url("/fonts/inter-var.woff2") format("woff2");
          }
          
          /* Prevent content layout shifts */
          html {
            font-size: 16px;
            scroll-behavior: smooth;
          }
          
          /* Critical CSS for LCP elements */
          #hero {
            min-height: 400px;
            display: block;
          }
          
          /* Optimize animations */
          .MuiGrow-root, .MuiFade-root {
            will-change: opacity, transform;
          }
          
          /* Optimize images */
          img, svg {
            content-visibility: auto;
          }
        `}} />
      </head>
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
        
        {/* Defer non-critical scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}