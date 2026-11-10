import React from 'react';
import { notFound } from 'next/navigation';
import destinationsData from '@/data/destinations.json';
import { Destination } from '@/types/destination';
import ExperienceClientWrapper from '@/components/canvas/ExperienceClientWrapper';

const destinations: Destination[] = destinationsData as Destination[];

export async function generateStaticParams() {
  return destinations.map((d) => ({
    destinationId: d.id,
  }));
}

export default async function ExperiencePortalPage({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const { destinationId } = await params;
  const destination = destinations.find((d) => d.id === destinationId);

  if (!destination) {
    notFound();
  }

  // Model path for demonstration environment
  const modelUrl =
    destination.id === 'heritage-courtyard'
      ? '/models/heritage-courtyard/scene.glb'
      : '/models/heritage-courtyard/scene.glb';

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0c0603]">
      <ExperienceClientWrapper
        destinationId={destination.id}
        destinationName={destination.name}
        modelUrl={modelUrl}
      />
    </main>
  );
}
