import { EducationalHotspot } from '@/types/hotspot';
import courtyardHotspots from '@/data/hotspots/heritage-courtyard.json';

const HOTSPOT_REGISTRY: Record<string, EducationalHotspot[]> = {
  'heritage-courtyard': courtyardHotspots as EducationalHotspot[],
};

/**
 * Retrieves all educational hotspots for a given destination ID.
 * Returns an empty array if no hotspots are configured.
 */
export function getHotspotsByDestination(destinationId: string): EducationalHotspot[] {
  return HOTSPOT_REGISTRY[destinationId] || courtyardHotspots;
}

/**
 * Finds a single hotspot by its unique ID.
 */
export function getHotspotById(destinationId: string, hotspotId: string): EducationalHotspot | undefined {
  const hotspots = getHotspotsByDestination(destinationId);
  return hotspots.find((h) => h.id === hotspotId);
}
