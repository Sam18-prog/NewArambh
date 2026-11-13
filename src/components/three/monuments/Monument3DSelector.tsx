'use client';

import React from 'react';
import TajMahal3D from './TajMahal3D';
import RedFort3D from './RedFort3D';
import AgraFort3D from './AgraFort3D';
import RaniKiVav3D from './RaniKiVav3D';
import Dholavira3D from './Dholavira3D';
import Champaner3D from './Champaner3D';
import Sarnath3D from './Sarnath3D';
import Somnath3D from './Somnath3D';
import Dwarkadhish3D from './Dwarkadhish3D';

interface Monument3DSelectorProps {
  destinationId: string;
}

export default function Monument3DSelector({ destinationId }: Monument3DSelectorProps) {
  const normalized = destinationId.replace(/-temple$/, '');

  switch (normalized) {
    case 'taj-mahal':
      return <TajMahal3D />;
    case 'red-fort':
      return <RedFort3D />;
    case 'agra-fort':
      return <AgraFort3D />;
    case 'rani-ki-vav':
      return <RaniKiVav3D />;
    case 'dholavira':
      return <Dholavira3D />;
    case 'champaner-pavagadh':
      return <Champaner3D />;
    case 'sarnath':
      return <Sarnath3D />;
    case 'somnath':
      return <Somnath3D />;
    case 'dwarkadhish':
      return <Dwarkadhish3D />;
    default:
      return <TajMahal3D />;
  }
}
