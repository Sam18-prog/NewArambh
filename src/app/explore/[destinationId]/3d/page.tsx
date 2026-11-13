import React from 'react';
import { notFound } from 'next/navigation';
import { getAllDestinations, getDestinationById } from '@/data/destinations/index';
import ExperienceClientWrapper from '@/components/canvas/ExperienceClientWrapper';

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
    title: `3D Walkthrough — ${destination.name} | NewArambh`,
    description: `Immerse yourself in a real-time 3D architectural exploration of ${destination.name}. Walk through history from anywhere.`,
  };
}

export default async function Destination3DWalkthroughPage({
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
    <div className="w-screen h-screen overflow-hidden bg-[#0c0603]">
      <ExperienceClientWrapper
        destinationId={destination.id}
        destinationName={destination.name}
      />
    </div>
  );
}
