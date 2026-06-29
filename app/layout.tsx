import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.freshbeanscoffee.co'),
  title: {
    default: 'Fresh Beans Coffee | Premium Ethiopian Coffee Exporter',
    template: '%s | Fresh Beans Coffee',
  },
  description:
    'Providing organic, premium, and sustainable raw and roasted coffee beans directly from Ethiopia\'s finest regions: Jimma, Yirgacheffe, Sidamo, and Guji.',
  keywords: [
    'Ethiopian coffee beans',
    'specialty coffee exporter',
    'direct trade coffee',
    'Yirgacheffe coffee',
    'Guji coffee export',
    'Sidamo coffee',
    'Jimma coffee',
    'Ethiopian coffee wholesale',
    'organic coffee exporters',
    'green coffee beans Ethiopia',
    'single origin coffee export',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freshbeanscoffee.co',
    siteName: 'Fresh Beans Coffee Trading',
    title: 'Fresh Beans Coffee Trading | Ethiopian Specialty Coffee Exporter',
    description:
      "The origin of exceptional coffee. Premium single-origin Ethiopian green coffee for the world's finest roasters.",
    images: [
      {
        url: 'https://picsum.photos/seed/freshbeansog/1200/630',
        width: 1200,
        height: 630,
        alt: 'Fresh Beans Coffee — Ethiopian Highlands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fresh Beans Coffee Trading',
    description: 'Direct-trade Ethiopian specialty green coffee exporter.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://www.freshbeanscoffee.co',
    languages: {
      'en-US': 'https://www.freshbeanscoffee.co',
    },
  },
  icons: {
    icon: [
      { url: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fresh Beans Coffee Trading',
  url: 'https://www.freshbeanscoffee.co',
  logo: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1782629902/fresh-beans-coffee-trading/Freshbeanslogo-removebg-preview-Photoroom_gugilr.png',
  description: 'Direct-trade Ethiopian specialty green coffee exporter',
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ET',
    addressLocality: 'Addis Ababa',
  },
  areaServed: ['Worldwide'],
  knowsAbout: [
    'Ethiopian Coffee',
    'Specialty Coffee',
    'Green Coffee Export',
    'Direct Trade Coffee',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782666416/fresh-beans-coffee-trading/iconlogo-removebg-preview_w4jbra.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-obsidian text-stone antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
