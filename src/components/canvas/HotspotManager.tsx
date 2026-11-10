'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EducationalHotspot } from '@/types/hotspot';
import HotspotMarker from '@/components/canvas/HotspotMarker';

interface HotspotManagerProps {
  hotspots: EducationalHotspot[];
  onNearbyChange: (hotspot: EducationalHotspot | null) => void;
  onSelect: (hotspot: EducationalHotspot) => void;
  nearbyHotspotId?: string | null;
}

export default function HotspotManager({
  hotspots,
  onNearbyChange,
  onSelect,
  nearbyHotspotId = null,
}: HotspotManagerProps) {
  const currentNearestId = useRef<string | null>(null);
  const frameCount = useRef(0);

  // Proximity check on frame loop
  useFrame(({ camera }) => {
    // Run distance evaluation every 4 frames (~15 times per second at 60fps) to eliminate CPU overhead
    frameCount.current += 1;
    if (frameCount.current % 4 !== 0) return;

    let closestHotspot: EducationalHotspot | null = null;
    let minDistanceSq = Infinity;

    const camX = camera.position.x;
    const camY = camera.position.y;
    const camZ = camera.position.z;

    for (let i = 0; i < hotspots.length; i++) {
      const h = hotspots[i];
      const dx = camX - h.position[0];
      const dy = camY - h.position[1];
      const dz = camZ - h.position[2];
      const distSq = dx * dx + dy * dy + dz * dz;
      const radiusSq = h.interactionRadius * h.interactionRadius;

      if (distSq <= radiusSq && distSq < minDistanceSq) {
        minDistanceSq = distSq;
        closestHotspot = h;
      }
    }

    const newNearestId = closestHotspot ? closestHotspot.id : null;
    if (newNearestId !== currentNearestId.current) {
      currentNearestId.current = newNearestId;
      onNearbyChange(closestHotspot);
    }
  });

  return (
    <group name="EducationalHotspotsGroup">
      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          isNearby={hotspot.id === nearbyHotspotId}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}
