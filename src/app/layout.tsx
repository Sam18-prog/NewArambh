import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#090503',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://newarambh.netlify.app'),
  title: {
    default: 'NewArambh — Explore the World Beyond Boundaries',
    template: '%s | NewArambh',
  },
  description:
    'An immersive 3D virtual cultural heritage platform. Walk through digitally reconstructed historic monuments, temples, and havelis with first-person agency and scholarly curation.',
  keywords: [
    'virtual heritage',
    '3D cultural tourism',
    'Three.js',
    'React Three Fiber',
    'architectural history',
    'mandapa',
    'stepwell',
    'jharokha',
    'jali',
    'open access culture',
  ],
  authors: [{ name: 'NewArambh Cultural Heritage Initiative' }],
  creator: 'NewArambh',
  publisher: 'NewArambh',
  openGraph: {
    title: 'NewArambh — Explore the World Beyond Boundaries',
    description:
      'Immersive 3D cultural destinations in your browser. Walk freely, inspect sacred stone carvings, and experience curated historical tours.',
    url: 'https://newarambh.netlify.app',
    siteName: 'NewArambh',
    images: [
      {
        url: '/images/destinations/hero-taj-sunset.jpg',
        width: 1200,
        height: 630,
        alt: 'NewArambh 3D Cultural Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewArambh — Explore the World Beyond Boundaries',
    description:
      'Immersive 3D cultural destinations in your browser. Walk through historic courtyards with first-person freedom.',
    images: ['/images/destinations/hero-taj-sunset.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
