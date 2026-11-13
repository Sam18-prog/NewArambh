import { Destination } from '@/types/destination';
import { tajMahalDestination } from './taj-mahal';
import { redFortDestination } from './red-fort';
import { agraFortDestination } from './agra-fort';
import { raniKiVavDestination } from './rani-ki-vav';
import { dholaviraDestination } from './dholavira';
import { champanerPavagadhDestination } from './champaner-pavagadh';
import { sarnathDestination } from './sarnath';
import { somnathDestination } from './somnath';
import { dwarkadhishDestination } from './dwarkadhish';

export {
  tajMahalDestination,
  redFortDestination,
  agraFortDestination,
  raniKiVavDestination,
  dholaviraDestination,
  champanerPavagadhDestination,
  sarnathDestination,
  somnathDestination,
  dwarkadhishDestination,
};

export const allDestinations: Destination[] = [
  tajMahalDestination,
  redFortDestination,
  raniKiVavDestination,
  dholaviraDestination,
  somnathDestination,
  dwarkadhishDestination,
  agraFortDestination,
  champanerPavagadhDestination,
  sarnathDestination,
];

export function getAllDestinations(): Destination[] {
  return allDestinations;
}

export function getDestinationById(id: string): Destination | undefined {
  if (id === 'somnath-temple') return somnathDestination;
  if (id === 'dwarkadhish-temple') return dwarkadhishDestination;
  return allDestinations.find((d) => d.id === id || d.slug === id);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  if (slug === 'somnath-temple') return somnathDestination;
  if (slug === 'dwarkadhish-temple') return dwarkadhishDestination;
  return allDestinations.find((d) => d.slug === slug || d.id === slug);
}

export function getUnescoDestinations(): Destination[] {
  return allDestinations.filter((d) => d.heritageClassification === 'unesco');
}

export function getCulturalDestinations(): Destination[] {
  return allDestinations.filter((d) => d.heritageClassification === 'cultural');
}
