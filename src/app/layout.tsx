import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NewArambh — Explore the World Beyond Boundaries',
  description: 'An immersive 3D virtual exploration platform for cultural heritage, monuments, and historical destinations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
