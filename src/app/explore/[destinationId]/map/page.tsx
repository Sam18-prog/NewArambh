import React from 'react';
import { notFound } from 'next/navigation';
import { getAllDestinations, getDestinationById } from '@/data/destinations/index';
import DestinationExperienceView from '@/components/exploration/DestinationExperienceView';

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
    title: `2D Interactive Site Map — ${destination.name} | NewArambh`,
    description: `Explore the schematic architectural layout and landmarks of ${destination.name}.`,
  };
}

export default async function MapPortalPage({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const { destinationId } = await params;
  const destination = getDestinationById(destinationId);

  if (!destination) {
    notFound();
  }

  return <DestinationExperienceView destination={destination} />;
}
