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
    default: 'NewArambh — Walk Through History, From Anywhere',
    template: '%s | NewArambh',
  },
  description:
    'Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D exploration.',
  keywords: [
    'virtual heritage',
    '3D cultural tourism',
    'Taj Mahal 3D',
    'Three.js',
    'React Three Fiber',
    'architectural history',
    'Mughal architecture',
    'Charbagh',
    'open access culture',
  ],
  authors: [{ name: 'NewArambh Cultural Heritage Initiative' }],
  creator: 'NewArambh',
  publisher: 'NewArambh',
  openGraph: {
    title: 'NewArambh — Walk Through History, From Anywhere',
    description:
      'Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D exploration.',
    url: 'https://newarambh.netlify.app',
    siteName: 'NewArambh',
    images: [
      {
        url: '/images/destinations/hero-taj-sunset.jpg',
        width: 1200,
        height: 630,
        alt: 'NewArambh 3D Cultural Platform — The Taj Mahal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewArambh — Walk Through History, From Anywhere',
    description:
      'Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D exploration.',
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
