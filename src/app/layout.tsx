// FILE: app/layout.tsx
// ============================================
// Root Layout - Fonts, Providers, Global Setup
// ============================================

import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono, Cairo } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

// Font configurations
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: 'Abdelrahman Abuzaid | Impact Lab',
  description: 'Front-End Developer & Community Leader - Engineering solutions for human problems. Portfolio showcasing web development projects and volunteer impact.',
  keywords: ['Abdelrahman Abuzaid', 'Front-End Developer', 'Web Developer', 'Jordan', 'Portfolio', 'Volunteer', 'Community Leader'],
  authors: [{ name: 'Abdelrahman Abuzaid' }],
  creator: 'Abdelrahman Abuzaid',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_JO',
    title: 'Abdelrahman Abuzaid | Impact Lab',
    description: 'Front-End Developer & Community Leader - Engineering solutions for human problems.',
    siteName: 'Impact Lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdelrahman Abuzaid | Impact Lab',
    description: 'Front-End Developer & Community Leader',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-carbon antialiased" style={{ color: 'var(--text-primary)' }}>
        <LanguageProvider>
          {children}
          {/* Noise overlay */}
          <div className="noise-overlay" aria-hidden="true" />
        </LanguageProvider>
      </body>
    </html>
  );
}
