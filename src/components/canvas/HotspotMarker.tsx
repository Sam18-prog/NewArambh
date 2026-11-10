'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { EducationalHotspot } from '@/types/hotspot';
import { Info, Sparkles } from 'lucide-react';

interface HotspotMarkerProps {
  hotspot: EducationalHotspot;
  isNearby: boolean;
  onSelect: (hotspot: EducationalHotspot) => void;
}

export default function HotspotMarker({
  hotspot,
  isNearby,
  onSelect,
}: HotspotMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Smooth floating animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle vertical hover bobbing (+/- 8cm)
      groupRef.current.position.y = hotspot.position[1] + Math.sin(time * 2.2) * 0.08;
    }
    if (ringRef.current) {
      // Slow rotation of outer beacon ring
      ringRef.current.rotation.y = time * 1.2;
      ringRef.current.rotation.x = Math.sin(time * 0.8) * 0.2;
    }
    if (coreRef.current) {
      // Subtle pulsing scale of core crystal
      const pulse = 1.0 + Math.sin(time * 3.5) * 0.12;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[hotspot.position[0], hotspot.position[1], hotspot.position[2]]}
    >
      {/* 1. Outer Rotating Amber Ring */}
      <mesh
        ref={ringRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot);
        }}
      >
        <torusGeometry args={[0.32, 0.025, 12, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#d97706"
          emissiveIntensity={isNearby ? 0.9 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Inner Glowing Core Crystal */}
      <mesh
        ref={coreRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot);
        }}
      >
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#f59e0b"
          emissiveIntensity={isNearby ? 1.4 : 0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 3. Subtle Point Light illuminating immediate architecture */}
      <pointLight
        color="#f59e0b"
        intensity={isNearby ? 1.8 : 0.8}
        distance={3.5}
        decay={2}
      />

      {/* 4. High-DPI HTML Badge (Hovering above marker) */}
      <Html
        center
        position={[0, 0.55, 0]}
        distanceFactor={13}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot);
          }}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer active:scale-95 ${
            isNearby
              ? 'bg-amber-400 text-zinc-950 border-amber-200 shadow-amber-500/40 scale-110 animate-bounce'
              : 'bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 border-amber-500/40 hover:border-amber-400 hover:text-white'
          }`}
          title={`Discover ${hotspot.name}`}
          aria-label={`Discover ${hotspot.name}`}
        >
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
              isNearby
                ? 'bg-zinc-950 text-amber-400'
                : 'bg-amber-400/20 text-amber-400 group-hover:bg-amber-400 group-hover:text-zinc-950'
            }`}
          >
            {isNearby ? (
              <Sparkles className="w-2.5 h-2.5 fill-current" />
            ) : (
              <Info className="w-2.5 h-2.5 stroke-[2.5]" />
            )}
          </div>
          <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
            {hotspot.name}
          </span>
        </button>
      </Html>
    </group>
  );
}
