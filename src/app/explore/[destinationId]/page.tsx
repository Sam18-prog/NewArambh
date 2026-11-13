import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { getAllDestinations, getDestinationById } from '@/data/destinations/index';
import DestinationDetailClientView from '@/components/exploration/DestinationDetailClientView';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  const params = destinations.map((d) => ({
    destinationId: d.id,
  }));
  params.push({ destinationId: 'somnath-temple' });
  params.push({ destinationId: 'dwarkadhish-temple' });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const { destinationId } = await params;
  const destination = getDestinationById(destinationId);

  if (!destination) {
    return {
      title: 'Destination Not Found | NewArambh',
    };
  }

  return {
    title: `${destination.name} (${destination.hindiName || destination.city}) — Digital Exploration | NewArambh`,
    description: destination.subtitle || destination.description,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const { destinationId } = await params;
  const destination = getDestinationById(destinationId);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="flex-1">
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </Link>
        </div>

        <DestinationDetailClientView destination={destination} />
      </main>

      <Footer />
    </div>
  );
}
