import { EducationalHotspot } from '@/types/hotspot';
import { getDestinationById } from '@/data/destinations/index';
import tajMahalHotspots from '@/data/hotspots/taj-mahal.json';

/**
 * Retrieves all educational hotspots for a given destination ID.
 * Dynamically converts destination landmarks to 3D hotspots when available.
 */
export function getHotspotsByDestination(destinationId: string): EducationalHotspot[] {
  const normalized = destinationId.replace(/-temple$/, '');

  const destination = getDestinationById(destinationId);
  if (destination && destination.landmarks && destination.landmarks.length > 0) {
    return destination.landmarks.map((landmark) => {
      const pos: [number, number, number] = landmark.position3D || [
        ((landmark.mapCoordinates.x - 50) / 50) * 35,
        3.0,
        ((landmark.mapCoordinates.y - 50) / 50) * 35,
      ];

      return {
        id: landmark.id,
        destinationId: landmark.destinationId,
        name: landmark.name,
        hindiName: landmark.hindiName,
        category: landmark.category,
        position: pos,
        interactionRadius: 4.8,
        shortDescription: landmark.shortDescription,
        detailedDescription: landmark.detailedDescription,
        culturalSignificance: landmark.historicalSignificance,
        architecturalDetails: landmark.architecturalHighlights || [],
        gallery: (landmark.gallery || []).map((g) => ({
          id: g.id,
          url: g.url,
          caption: g.caption,
          alt: g.alt,
          attribution: g.credit || 'Public Cultural Archive',
          sourceUrl: g.sourceUrl,
        })),
        sources: (landmark.sourceReferences || []).map((s) => ({
          title: s.title,
          url: s.url,
          authorOrPublisher: s.authorOrPublisher,
          licenseNote: s.licenseNote,
        })),
        audioUrl: landmark.audioUrl,
      };
    });
  }

  if (normalized === 'taj-mahal') {
    return tajMahalHotspots as EducationalHotspot[];
  }

  return [];
}

/**
 * Finds a single hotspot by its unique ID across a destination.
 */
export function getHotspotById(destinationId: string, hotspotId: string): EducationalHotspot | undefined {
  const hotspots = getHotspotsByDestination(destinationId);
  return hotspots.find((h) => h.id === hotspotId);
}
