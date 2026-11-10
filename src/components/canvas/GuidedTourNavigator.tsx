'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TourStop } from '@/types/tour';

interface GuidedTourNavigatorProps {
  activeStop: TourStop | null;
  enabled: boolean;
  onArrived?: () => void;
}

export default function GuidedTourNavigator({
  activeStop,
  enabled,
  onArrived,
}: GuidedTourNavigatorProps) {
  const currentPathIndex = useRef(0);
  const targetPos = useRef(new THREE.Vector3());
  const hasTriggeredArrival = useRef(false);

  // When activeStop changes, reset waypoint index and arrival flag
  useEffect(() => {
    if (activeStop) {
      currentPathIndex.current = 0;
      hasTriggeredArrival.current = false;
      const initialTarget =
        activeStop.corridorPath && activeStop.corridorPath.length > 0
          ? activeStop.corridorPath[0]
          : activeStop.position;
      targetPos.current.set(...initialTarget);
    }
  }, [activeStop]);

  useFrame(({ camera }, delta) => {
    if (!enabled || !activeStop) return;

    const dt = Math.min(delta, 0.1);
    const lerpSpeed = 1.0 - Math.exp(-3.5 * dt); // Smooth exponential damping

    const path = activeStop.corridorPath;
    const finalTarget = new THREE.Vector3(...activeStop.position);

    // If multi-point corridor path exists, navigate along intermediate waypoints
    if (path && path.length > 0) {
      const currentWaypoint = new THREE.Vector3(...path[currentPathIndex.current]);
      const distToWaypoint = camera.position.distanceTo(currentWaypoint);

      if (distToWaypoint < 0.8 && currentPathIndex.current < path.length - 1) {
        currentPathIndex.current += 1;
        targetPos.current.set(...path[currentPathIndex.current]);
      } else if (currentPathIndex.current === path.length - 1) {
        targetPos.current.copy(finalTarget);
      }
    } else {
      targetPos.current.copy(finalTarget);
    }

    // Smooth position interpolation
    camera.position.lerp(targetPos.current, lerpSpeed);

    // Smooth camera orientation towards target yaw and pitch
    camera.rotation.order = 'YXZ';

    // Normalize angular difference for shortest path rotation
    let diffY = activeStop.targetYaw - camera.rotation.y;
    while (diffY < -Math.PI) diffY += Math.PI * 2;
    while (diffY > Math.PI) diffY -= Math.PI * 2;

    camera.rotation.y += diffY * lerpSpeed;
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      activeStop.targetPitch,
      lerpSpeed
    );
    camera.rotation.z = 0;

    // Check arrival at final stop position
    const distToFinal = camera.position.distanceTo(finalTarget);
    if (distToFinal < 0.25 && !hasTriggeredArrival.current) {
      hasTriggeredArrival.current = true;
      if (onArrived) {
        onArrived();
      }
    }
  });

  return null;
}
