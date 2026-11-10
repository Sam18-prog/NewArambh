'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Compass } from 'lucide-react';

interface ExperienceClientWrapperProps {
  destinationId: string;
  destinationName: string;
  modelUrl?: string;
}

const DynamicExperienceCanvas = dynamic(
  () => import('@/components/canvas/ExperienceCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0c0603] text-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
          <Compass className="w-6 h-6 animate-spin [animation-duration:6s]" />
        </div>
        <p className="text-xs text-zinc-400 font-mono tracking-wider">
          Initializing 3D Canvas Client...
        </p>
      </div>
    ),
  }
);

export default function ExperienceClientWrapper({
  destinationId,
  destinationName,
  modelUrl,
}: ExperienceClientWrapperProps) {
  return (
    <DynamicExperienceCanvas
      destinationId={destinationId}
      destinationName={destinationName}
      modelUrl={modelUrl}
    />
  );
}
