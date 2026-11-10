'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface VirtualJoystickProps {
  onMove: (x: number, z: number) => void;
  onRelease: () => void;
  deadzone?: number;
  size?: number; // Base diameter in pixels (default 128)
}

export default function VirtualJoystick({
  onMove,
  onRelease,
  deadzone = 0.08,
  size = 128,
}: VirtualJoystickProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const activePointerId = useRef<number | null>(null);

  const radius = size / 2;
  const maxTravel = radius * 0.68; // Maximum travel distance for knob

  const resetKnob = useCallback(() => {
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
      knobRef.current.style.transition = 'transform 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)';
    }
    onRelease();
  }, [onRelease]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture one touch at a time
    if (activePointerId.current !== null) return;

    activePointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);

    if (knobRef.current) {
      knobRef.current.style.transition = 'none';
    }

    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId || !baseRef.current || !knobRef.current) {
      return;
    }

    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    let clampedDx = dx;
    let clampedDy = dy;

    if (distance > maxTravel) {
      const angle = Math.atan2(dy, dx);
      clampedDx = Math.cos(angle) * maxTravel;
      clampedDy = Math.sin(angle) * maxTravel;
    }

    // Direct GPU transform update on knob element
    knobRef.current.style.transform = `translate3d(${clampedDx}px, ${clampedDy}px, 0px)`;

    // Calculate normalized output [-1.0, 1.0]
    const normalizedDist = Math.min(1.0, distance / maxTravel);
    if (normalizedDist < deadzone) {
      onMove(0, 0);
      return;
    }

    // Scale to account for deadzone so movement starts smoothly
    const scaledMagnitude = (normalizedDist - deadzone) / (1.0 - deadzone);
    const angle = Math.atan2(dy, dx);

    const normX = Math.cos(angle) * scaledMagnitude;
    // Invert Y: dragging upwards on screen (dy < 0) corresponds to forward motion (+Z)
    const normZ = -Math.sin(angle) * scaledMagnitude;

    onMove(normX, normZ);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current === e.pointerId) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      activePointerId.current = null;
      resetKnob();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current === e.pointerId) {
      activePointerId.current = null;
      resetKnob();
    }
  };

  // Safety cleanup if unmounted or window blurred
  useEffect(() => {
    const handleGlobalBlur = () => {
      activePointerId.current = null;
      resetKnob();
    };

    window.addEventListener('blur', handleGlobalBlur);
    return () => {
      window.removeEventListener('blur', handleGlobalBlur);
    };
  }, [resetKnob]);

  return (
    <div
      ref={baseRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        touchAction: 'none',
      }}
      className="relative flex items-center justify-center rounded-full bg-zinc-950/60 border border-amber-500/30 backdrop-blur-md shadow-2xl select-none"
    >
      {/* Concentric subtle guide rings */}
      <div className="absolute w-3/4 h-3/4 rounded-full border border-amber-400/15 pointer-events-none" />
      <div className="absolute w-2/5 h-2/5 rounded-full border border-amber-400/20 pointer-events-none" />

      {/* Directional compass dots */}
      <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 pointer-events-none" />
      <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 pointer-events-none" />
      <div className="absolute left-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 pointer-events-none" />
      <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 pointer-events-none" />

      {/* Movable Joystick Thumb Knob */}
      <div
        ref={knobRef}
        style={{
          width: `${size * 0.44}px`,
          height: `${size * 0.44}px`,
          touchAction: 'none',
        }}
        className="relative rounded-full bg-gradient-to-b from-amber-400/90 to-yellow-600/90 border border-amber-200/60 shadow-lg shadow-amber-500/30 flex items-center justify-center pointer-events-none"
      >
        <div className="w-3 h-3 rounded-full bg-white/60 shadow-inner" />
      </div>
    </div>
  );
}
