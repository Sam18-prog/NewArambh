import { EducationalHotspot } from '@/types/hotspot';
import tajMahalHotspots from '@/data/hotspots/taj-mahal.json';
import courtyardHotspots from '@/data/hotspots/heritage-courtyard.json';

const HOTSPOT_REGISTRY: Record<string, EducationalHotspot[]> = {
  'taj-mahal': tajMahalHotspots as EducationalHotspot[],
  'heritage-courtyard': courtyardHotspots as EducationalHotspot[],
};

/**
 * Retrieves all educational hotspots for a given destination ID.
 * Defaults to Taj Mahal demonstration hotspots if not found.
 */
export function getHotspotsByDestination(destinationId: string): EducationalHotspot[] {
  return HOTSPOT_REGISTRY[destinationId] || (tajMahalHotspots as EducationalHotspot[]);
}

/**
 * Finds a single hotspot by its unique ID across a destination.
 */
export function getHotspotById(destinationId: string, hotspotId: string): EducationalHotspot | undefined {
  const hotspots = getHotspotsByDestination(destinationId);
  return hotspots.find((h) => h.id === hotspotId);
}
