'use client';

import React, { useRef, useEffect } from 'react';

interface TouchLookZoneProps {
  onLook: (yawDelta: number, pitchDelta: number) => void;
  sensitivity?: number;
  invertY?: boolean;
  className?: string;
}

export default function TouchLookZone({
  onLook,
  sensitivity = 0.0035,
  invertY = false,
  className = '',
}: TouchLookZoneProps) {
  const activePointerId = useRef<number | null>(null);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture one camera finger at a time
    if (activePointerId.current !== null) return;

    activePointerId.current = e.pointerId;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId) return;

    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;

    lastX.current = e.clientX;
    lastY.current = e.clientY;

    // Yaw: swiping left turns left (increases yaw in Three.js coordinate convention)
    // Pitch: swiping down looks down (decreases pitch in Three.js convention)
    const yawDelta = -dx * sensitivity;
    const pitchDelta = (invertY ? dy : -dy) * sensitivity;

    onLook(yawDelta, pitchDelta);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current === e.pointerId) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      activePointerId.current = null;
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current === e.pointerId) {
      activePointerId.current = null;
    }
  };

  useEffect(() => {
    const handleGlobalBlur = () => {
      activePointerId.current = null;
    };

    window.addEventListener('blur', handleGlobalBlur);
    return () => {
      window.removeEventListener('blur', handleGlobalBlur);
    };
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: 'none' }}
      className={`select-none ${className}`}
      aria-label="Camera Look Area"
    />
  );
}
