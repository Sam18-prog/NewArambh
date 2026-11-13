import React from 'react';
import { notFound } from 'next/navigation';
import { getAllDestinations, getDestinationById } from '@/data/destinations/index';
import DestinationExperienceView from '@/components/exploration/DestinationExperienceView';
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
    title: `3D Heritage Exploration — ${destination.name} | NewArambh`,
    description: `Immerse yourself in a real-time 3D architectural exploration of ${destination.name}. Walk through history from anywhere.`,
  };
}

export default async function ExperiencePortalPage({
  params,
  searchParams,
}: {
  params: Promise<{ destinationId: string }>;
  searchParams?: Promise<{ mode?: string }>;
}) {
  const { destinationId } = await params;
  const { mode } = (await searchParams) || {};
  const destination = getDestinationById(destinationId);

  if (!destination) {
    notFound();
  }

  if (mode === 'map') {
    return <DestinationExperienceView destination={destination} />;
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
