'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Dholavira (Harappan City)
 * Features:
 * - Harappan stone-masonry Citadel Castle and Bailey with massive dressed stone walls
 * - Enormous rock-cut stepped water reservoirs with stone masonry embankments
 * - Middle Town regular urban street grid with residential walls and stone drains
 * - Open ceremonial ground / stadium
 * - North Gate ceremonial portal with Harappan Signboard representation
 */
export default function Dholavira3D() {
  const materials = useMemo(() => {
    return {
      dressedLimestone: new THREE.MeshStandardMaterial({
        color: 0xc89e70,
        roughness: 0.9,
        metalness: 0.02,
      }),
      weatheredStone: new THREE.MeshStandardMaterial({
        color: 0x9e7348,
        roughness: 0.94,
        metalness: 0.02,
      }),
      mudBrickCore: new THREE.MeshStandardMaterial({
        color: 0xb58252,
        roughness: 0.96,
        metalness: 0.0,
      }),
      salineSoil: new THREE.MeshStandardMaterial({
        color: 0xd9ba96,
        roughness: 0.98,
        metalness: 0.0,
      }),
      reservoirWater: new THREE.MeshStandardMaterial({
        color: 0x1f5f6b,
        roughness: 0.08,
        metalness: 0.25,
        transparent: true,
        opacity: 0.82,
      }),
      signboardWood: new THREE.MeshStandardMaterial({
        color: 0x4a2e18,
        roughness: 0.85,
        metalness: 0.05,
      }),
      gypsumWhite: new THREE.MeshStandardMaterial({
        color: 0xf0ede6,
        roughness: 0.4,
        metalness: 0.08,
      }),
    };
  }, []);

  return (
    <group name="DholaviraHarappanCity">
      {/* 1. Base Arid Saline Ground Terrain */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.salineSoil}>
        <boxGeometry args={[110, 0.4, 115]} />
      </mesh>

      {/* 2. Citadel Castle (Upper Fortification at X = -22, Z = -10) */}
      <group position={[-22, 0, -10]}>
        {/* Massive Stone Rampart Enclosure */}
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow material={materials.dressedLimestone}>
          <boxGeometry args={[32, 9, 34]} />
        </mesh>
        {/* Sunken Inner Courtyard */}
        <mesh position={[0, 4.2, 0]} material={materials.weatheredStone}>
          <boxGeometry args={[22, 8.8, 24]} />
        </mesh>
        {/* Corner Square Bastions */}
        {[-16, 16].map((bx, idxX) =>
          [-17, 17].map((bz, idxZ) => (
            <mesh key={`bastion-${idxX}-${idxZ}`} position={[bx, 5.2, bz]} castShadow material={materials.weatheredStone}>
              <boxGeometry args={[6.5, 10.5, 6.5]} />
            </mesh>
          ))
        )}
        {/* Polished Limestone Pillar Bases inside the Castle */}
        {[-6, 6].map((px, idxX) =>
          [-5, 5].map((pz, idxZ) => (
            <mesh key={`pillar-base-${idxX}-${idxZ}`} position={[px, 1.2, pz]} material={materials.gypsumWhite}>
              <cylinderGeometry args={[1.2, 1.4, 1.8, 16]} />
            </mesh>
          ))
        )}
      </group>

      {/* 3. Citadel Bailey (Lower Terrace at X = -22, Z = 18) */}
      <group position={[-22, 0, 18]}>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow material={materials.mudBrickCore}>
          <boxGeometry args={[26, 5, 20]} />
        </mesh>
        <mesh position={[0, 2.7, 0]} material={materials.salineSoil}>
          <boxGeometry args={[20, 5, 14]} />
        </mesh>
      </group>

      {/* 4. North Gate of the Citadel with Harappan Signboard (Z = 7) */}
      <group position={[-6, 0, 7]}>
        <mesh position={[0, 3.5, 0]} castShadow material={materials.dressedLimestone}>
          <boxGeometry args={[8, 7, 4]} />
        </mesh>
        {/* Gate Portal Passage */}
        <mesh position={[0, 2.2, 0]} material={materials.weatheredStone}>
          <boxGeometry args={[3.2, 4.5, 4.4]} />
        </mesh>
        {/* The Famous 10-Glyph Indus Signboard Display */}
        <group position={[0, 4.8, 2.1]}>
          <mesh material={materials.signboardWood}>
            <boxGeometry args={[6.5, 1.2, 0.2]} />
          </mesh>
          {/* 10 Inlaid Gypsum White Glyphs */}
          {Array.from({ length: 10 }).map((_, gIdx) => (
            <mesh key={`glyph-${gIdx}`} position={[-2.7 + gIdx * 0.6, 0, 0.12]} material={materials.gypsumWhite}>
              <boxGeometry args={[0.35, 0.7, 0.08]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 5. Central Grand Ceremonial Ground / Stadium (Z = 0) */}
      <group position={[0, 0, 4]}>
        <mesh position={[0, 0.05, 0]} receiveShadow material={materials.salineSoil}>
          <boxGeometry args={[30, 0.1, 45]} />
        </mesh>
        {/* Stepped Terraced Spectator Stands along edge */}
        {Array.from({ length: 4 }).map((_, sIdx) => (
          <mesh key={`stand-${sIdx}`} position={[-16 - sIdx * 1.2, 0.3 * (sIdx + 1), 0]} material={materials.dressedLimestone}>
            <boxGeometry args={[1.2, 0.6, 42]} />
          </mesh>
        ))}
      </group>

      {/* 6. Eastern Giant Rock-Cut Stepped Water Reservoir (X = 24, Z = 6) */}
      <group position={[24, 0, 6]}>
        {/* Reservoir Masonry Bund Wall */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow material={materials.dressedLimestone}>
          <boxGeometry args={[28, 3, 44]} />
        </mesh>
        {/* Sunken Stepped Basin Cutout */}
        <mesh position={[0, -1.5, 0]} material={materials.weatheredStone}>
          <boxGeometry args={[23, 5, 38]} />
        </mesh>
        {/* Water Body */}
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.reservoirWater}>
          <planeGeometry args={[22, 37]} />
        </mesh>
        {/* Stepped Descent Stone Flights along sides */}
        {Array.from({ length: 5 }).map((_, stIdx) => (
          <mesh key={`res-step-${stIdx}`} position={[-9.5 + stIdx * 0.8, -0.4 * stIdx, 0]} material={materials.dressedLimestone}>
            <boxGeometry args={[0.8, 0.4, 34]} />
          </mesh>
        ))}
      </group>

      {/* 7. Middle Town Residential Grid (Z = -34) */}
      <group position={[0, 0, -34]}>
        {/* Streets & House Compound Footprints */}
        {[-16, 0, 16].map((hx, idxX) =>
          [-8, 8].map((hz, idxZ) => (
            <group key={`house-${idxX}-${idxZ}`} position={[hx, 0, hz]}>
              <mesh position={[0, 1.6, 0]} castShadow receiveShadow material={materials.weatheredStone}>
                <boxGeometry args={[12, 3.2, 12]} />
              </mesh>
              {/* Inner Room Cutout */}
              <mesh position={[0, 1.8, 0]} material={materials.mudBrickCore}>
                <boxGeometry args={[9.5, 3.2, 9.5]} />
              </mesh>
            </group>
          ))
        )}
        {/* Covered Stone Drainage Channels running down the main street */}
        <mesh position={[0, 0.08, 0]} material={materials.dressedLimestone}>
          <boxGeometry args={[2.5, 0.16, 32]} />
        </mesh>
      </group>
    </group>
  );
}
