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
        {/* Preload critical assets */}
        <link rel="preload" href="/images/logo.png" as="image" fetchpriority="high" />
        <link rel="preload" href="/images/hero-image.webp" as="image" fetchpriority="high" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
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