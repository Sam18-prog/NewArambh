'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Rani-ki-Vav (The Queen's Stepwell)
 * Features:
 * - 7-tier subterranean stepped corridor descending into the earth (Y = 0 to Y = -10)
 * - Multi-storey colonnaded pavilion pillared mandapas at each level
 * - Stepped flights of stone stairs along the corridor
 * - Dasavatara & Sheshashayi Vishnu sculptural wall niches
 * - Circular deep well shaft (Kua) at the western terminus with sacred water basin
 */
export default function RaniKiVav3D() {
  const materials = useMemo(() => {
    return {
      stepwellSandstone: new THREE.MeshStandardMaterial({
        color: 0xc89868,
        roughness: 0.82,
        metalness: 0.02,
      }),
      darkCarvedStone: new THREE.MeshStandardMaterial({
        color: 0x966840,
        roughness: 0.88,
        metalness: 0.04,
      }),
      sculptureGold: new THREE.MeshStandardMaterial({
        color: 0xdaa06d,
        roughness: 0.75,
        metalness: 0.05,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x05668d,
        roughness: 0.05,
        metalness: 0.3,
        transparent: true,
        opacity: 0.88,
      }),
      groundTerrain: new THREE.MeshStandardMaterial({
        color: 0xba9b7a,
        roughness: 0.95,
        metalness: 0.0,
      }),
    };
  }, []);

  return (
    <group name="RaniKiVavMonument">
      {/* 1. Surrounding Ground Level Terrain (Y = 0) */}
      <mesh position={[0, -0.1, 0]} receiveShadow material={materials.groundTerrain}>
        <boxGeometry args={[65, 0.2, 85]} />
      </mesh>

      {/* Retaining Parapet Walls along Ground Edge */}
      <mesh position={[-12.5, 0.6, 0]} castShadow material={materials.stepwellSandstone}>
        <boxGeometry args={[1.5, 1.4, 75]} />
      </mesh>
      <mesh position={[12.5, 0.6, 0]} castShadow material={materials.stepwellSandstone}>
        <boxGeometry args={[1.5, 1.4, 75]} />
      </mesh>

      {/* 2. Subterranean Trench Corridor Retaining Walls */}
      <mesh position={[-11.5, -4.5, 0]} receiveShadow material={materials.darkCarvedStone}>
        <boxGeometry args={[1.5, 9, 74]} />
      </mesh>
      <mesh position={[11.5, -4.5, 0]} receiveShadow material={materials.darkCarvedStone}>
        <boxGeometry args={[1.5, 9, 74]} />
      </mesh>

      {/* 3. The 7 Descending Terraced Stepped Levels */}
      {[
        { level: 1, z: 28, y: -0.8, length: 10 },
        { level: 2, z: 18, y: -2.2, length: 10 },
        { level: 3, z: 8, y: -3.8, length: 10 },
        { level: 4, z: -2, y: -5.4, length: 10 },
        { level: 5, z: -12, y: -7.0, length: 10 },
        { level: 6, z: -22, y: -8.6, length: 10 },
      ].map((tier, idx) => (
        <group key={`tier-${idx}`}>
          {/* Terraced Floor Platform */}
          <mesh position={[0, tier.y, tier.z]} receiveShadow material={materials.stepwellSandstone}>
            <boxGeometry args={[21, 0.4, tier.length]} />
          </mesh>

          {/* Stepped Flights between tiers */}
          {Array.from({ length: 6 }).map((_, sIdx) => (
            <mesh
              key={`step-${idx}-${sIdx}`}
              position={[0, tier.y + 0.12 * (sIdx + 1), tier.z + tier.length / 2 - sIdx * 0.4]}
              material={materials.stepwellSandstone}
            >
              <boxGeometry args={[16, 0.24, 0.45]} />
            </mesh>
          ))}

          {/* Multi-Pillared Pavilion Mandapa at this Tier */}
          <group position={[0, tier.y, tier.z - 2]}>
            {[-7, -2.5, 2.5, 7].map((colX, cIdx) => (
              <group key={`col-${idx}-${cIdx}`} position={[colX, 0, 0]}>
                {/* Carved Chaulukya Column */}
                <mesh position={[0, 1.8, 0]} castShadow material={materials.darkCarvedStone}>
                  <cylinderGeometry args={[0.3, 0.38, 3.6, 8]} />
                </mesh>
                {/* Ornate Bracket Capital */}
                <mesh position={[0, 3.7, 0]} material={materials.sculptureGold}>
                  <boxGeometry args={[1.2, 0.4, 1.2]} />
                </mesh>
              </group>
            ))}
            {/* Cross Beam Canopy */}
            <mesh position={[0, 4.0, 0]} castShadow material={materials.stepwellSandstone}>
              <boxGeometry args={[18, 0.5, 3]} />
            </mesh>
          </group>

          {/* Sculptural Wall Niches on Side Walls */}
          {[-10.2, 10.2].map((wallX, wIdx) => (
            <group key={`niche-${idx}-${wIdx}`} position={[wallX, tier.y + 1.8, tier.z]}>
              <mesh material={materials.sculptureGold}>
                <boxGeometry args={[0.6, 2.2, 1.4]} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* 4. Sheshashayi Vishnu Master Sculptural Niche Wall (Tier 5 / 6) */}
      <group position={[0, -7.0, -18]}>
        <mesh position={[0, 1.5, 0]} material={materials.sculptureGold}>
          <boxGeometry args={[8, 3.0, 0.8]} />
        </mesh>
        {/* Recumbent Vishnu Figure Form */}
        <mesh position={[0, 1.2, 0.5]} material={materials.sculptureGold}>
          <capsuleGeometry args={[0.4, 2.8, 8, 12]} />
        </mesh>
      </group>

      {/* 5. Circular Deep Well Shaft (Kua at Western End Z = -30) */}
      <group position={[0, 0, -30]}>
        {/* Ground Level Rim */}
        <mesh position={[0, 0.4, 0]} castShadow material={materials.stepwellSandstone}>
          <cylinderGeometry args={[7.2, 7.8, 1.2, 32, 1, true]} />
        </mesh>
        {/* Stepped Descending Stone Rings inside well shaft */}
        {Array.from({ length: 6 }).map((_, rIdx) => (
          <mesh key={`well-ring-${rIdx}`} position={[0, -1.8 * (rIdx + 1), 0]} material={materials.darkCarvedStone}>
            <cylinderGeometry args={[6.8 - rIdx * 0.2, 7.0 - rIdx * 0.2, 1.8, 32, 1, true]} />
          </mesh>
        ))}
        {/* Deep Water Reservoir Surface */}
        <mesh position={[0, -11.5, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.water}>
          <circleGeometry args={[5.6, 32]} />
        </mesh>
      </group>

      {/* 6. Eastern Monumental Torana / Entry Pavilion (Z = 35) */}
      <group position={[0, 0, 35]}>
        {[-5, 5].map((tx, idx) => (
          <mesh key={`torana-col-${idx}`} position={[tx, 2.5, 0]} castShadow material={materials.stepwellSandstone}>
            <cylinderGeometry args={[0.45, 0.55, 5, 12]} />
          </mesh>
        ))}
        {/* Cusped Torana Archway */}
        <mesh position={[0, 5.2, 0]} material={materials.sculptureGold}>
          <boxGeometry args={[11, 0.8, 1.5]} />
        </mesh>
      </group>
    </group>
  );
}
