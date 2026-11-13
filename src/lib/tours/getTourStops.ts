import { TourStop } from '@/types/tour';
import { TAJ_MAHAL_TOUR_STOPS } from '@/data/tours/tajMahalTour';
import { getDestinationById } from '@/data/destinations/index';

/**
 * Returns guided tour stops for any destination.
 * Uses handcrafted sequence for Taj Mahal, and generates seamless
 * landmark camera waypoints for other heritage destinations.
 */
export function getTourStopsByDestination(destinationId: string): TourStop[] {
  const normalized = destinationId.replace(/-temple$/, '');
  if (normalized === 'taj-mahal') {
    return TAJ_MAHAL_TOUR_STOPS;
  }

  const destination = getDestinationById(destinationId);
  if (!destination || !destination.landmarks || destination.landmarks.length === 0) {
    return TAJ_MAHAL_TOUR_STOPS;
  }

  const landmarks = destination.landmarks;
  const total = landmarks.length;

  return landmarks.map((lm, idx) => {
    const lx = lm.position3D ? lm.position3D[0] : ((lm.mapCoordinates.x - 50) / 50) * 35;
    const ly = lm.position3D ? lm.position3D[1] : 3.0;
    const lz = lm.position3D ? lm.position3D[2] : ((lm.mapCoordinates.y - 50) / 50) * 35;

    // Camera placed slightly in front and at eye height facing the landmark
    const camX = lx * 0.75;
    const camY = Math.max(1.8, ly + 1.2);
    const camZ = lz + 10.0;

    const dx = lx - camX;
    const dy = ly - camY;
    const dz = lz - camZ;
    const distHoriz = Math.hypot(dx, dz);
    const targetYaw = Math.atan2(-dx, -dz);
    const targetPitch = Math.atan2(dy, distHoriz);

    return {
      id: `tour-stop-${destination.id}-${idx + 1}`,
      hotspotId: lm.id,
      name: lm.name,
      hindiName: lm.hindiName,
      category: lm.category,
      stopNumber: idx + 1,
      totalStops: total,
      position: [camX, camY, camZ],
      lookAt: [lx, ly, lz],
      targetYaw,
      targetPitch,
      shortExplanation: lm.shortDescription,
      durationSeconds: 12,
    };
  });
}
