'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Ancient Buddhist Site of Sarnath
 * Features:
 * - Cylindrical Dhamek Stupa (towering cylindrical brick/stone drum with 8 arched projecting niches)
 * - Chaukhandi Stupa terraced mound with Mughal octagonal watchtower
 * - Ashoka Pillar stone base with protective railing
 * - Dharmarajika Vihara excavated brick monastic foundations & votive stupas
 * - Deer Park landscape with sacred Bodhi trees & stone pradakshina path
 */
export default function Sarnath3D() {
  const materials = useMemo(() => {
    return {
      chunarSandstone: new THREE.MeshStandardMaterial({
        color: 0xc49a68,
        roughness: 0.82,
        metalness: 0.02,
      }),
      ancientBrick: new THREE.MeshStandardMaterial({
        color: 0xa8513b,
        roughness: 0.92,
        metalness: 0.02,
      }),
      darkBrick: new THREE.MeshStandardMaterial({
        color: 0x753020,
        roughness: 0.94,
        metalness: 0.02,
      }),
      deerParkLawn: new THREE.MeshStandardMaterial({
        color: 0x2b6338,
        roughness: 0.95,
        metalness: 0.0,
      }),
      paving: new THREE.MeshStandardMaterial({
        color: 0xb58e65,
        roughness: 0.86,
        metalness: 0.02,
      }),
      foliage: new THREE.MeshStandardMaterial({
        color: 0x1e4a28,
        roughness: 0.9,
        metalness: 0.0,
      }),
      trunk: new THREE.MeshStandardMaterial({
        color: 0x422c1d,
        roughness: 0.92,
        metalness: 0.0,
      }),
    };
  }, []);

  return (
    <group name="SarnathBuddhistSite">
      {/* 1. Base Deer Park Ground & Lawns */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.deerParkLawn}>
        <boxGeometry args={[95, 0.4, 105]} />
      </mesh>

      {/* Circular Stone Pradakshina Paved Path around Dhamek Stupa */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.paving}>
        <ringGeometry args={[16, 21, 32]} />
      </mesh>

      {/* 2. Cylindrical Dhamek Stupa (Monumental Core at Z = 0) */}
      <group position={[0, 0, 0]}>
        {/* Tier 1: Lower Chunar Sandstone Drum (Height 14m, Diameter 28m) */}
        <mesh position={[0, 7, 0]} castShadow receiveShadow material={materials.chunarSandstone}>
          <cylinderGeometry args={[14, 14.5, 14, 32]} />
        </mesh>

        {/* 8 Projecting Arched Sculptural Niches */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * Math.PI * 2) / 8;
          const nx = Math.cos(angle) * 14.2;
          const nz = Math.sin(angle) * 14.2;
          return (
            <group key={`niche-${idx}`} position={[nx, 7, nz]} rotation={[0, -angle + Math.PI / 2, 0]}>
              <mesh material={materials.darkBrick}>
                <boxGeometry args={[3.2, 5.5, 1.2]} />
              </mesh>
            </group>
          );
        })}

        {/* Carved Relief Frieze Band around middle */}
        <mesh position={[0, 9.5, 0]} material={materials.chunarSandstone}>
          <cylinderGeometry args={[14.2, 14.2, 1.8, 32, 1, true]} />
        </mesh>

        {/* Tier 2: Upper Ancient Burnt-Brick Cylindrical Dome (Height 18m) */}
        <mesh position={[0, 23, 0]} castShadow material={materials.ancientBrick}>
          <cylinderGeometry args={[11.5, 13.8, 18, 32]} />
        </mesh>

        {/* Crowning Hemispherical Top */}
        <mesh position={[0, 32, 0]} castShadow material={materials.darkBrick}>
          <sphereGeometry args={[11.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        </mesh>
      </group>

      {/* 3. Ashoka Pillar Site (Polished Chunar Sandstone Base at X = -18, Z = -10) */}
      <group position={[-18, 0, -10]}>
        {/* Circular Protective Stone Railing */}
        <mesh position={[0, 0.8, 0]} material={materials.chunarSandstone}>
          <cylinderGeometry args={[3.8, 4.0, 1.6, 24, 1, true]} />
        </mesh>
        {/* In-situ Pillar Shaft Stump */}
        <mesh position={[0, 2.5, 0]} castShadow material={materials.chunarSandstone}>
          <cylinderGeometry args={[0.55, 0.65, 3.5, 16]} />
        </mesh>
      </group>

      {/* 4. Excavated Monastic Ruins & Dharmarajika Vihara (X = 18, Z = -14) */}
      <group position={[18, 0, -14]}>
        {/* Brick Cell Foundations */}
        {[-6, 0, 6].map((mx, idxX) =>
          [-6, 0, 6].map((mz, idxZ) => (
            <group key={`vihara-${idxX}-${idxZ}`} position={[mx, 0, mz]}>
              <mesh position={[0, 0.8, 0]} castShadow material={materials.ancientBrick}>
                <boxGeometry args={[4.8, 1.6, 4.8]} />
              </mesh>
              <mesh position={[0, 0.9, 0]} material={materials.deerParkLawn}>
                <boxGeometry args={[3.4, 1.6, 3.4]} />
              </mesh>
            </group>
          ))
        )}
        {/* Votive Mini Stupas */}
        {[-8, 8].map((vx, idx) => (
          <mesh key={`votive-${idx}`} position={[vx, 1.2, 8]} castShadow material={materials.ancientBrick}>
            <cylinderGeometry args={[1.2, 1.6, 2.4, 12]} />
          </mesh>
        ))}
      </group>

      {/* 5. Chaukhandi Stupa (Terraced Mound at Z = -38) */}
      <group position={[0, 0, -38]}>
        {/* Terraced Brick Mound */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow material={materials.ancientBrick}>
          <boxGeometry args={[26, 5, 26]} />
        </mesh>
        <mesh position={[0, 6.0, 0]} castShadow material={materials.ancientBrick}>
          <boxGeometry args={[18, 4, 18]} />
        </mesh>
        {/* Octagonal Mughal Watchtower on Top */}
        <mesh position={[0, 11, 0]} castShadow material={materials.chunarSandstone}>
          <cylinderGeometry args={[4.5, 5.0, 6, 8]} />
        </mesh>
        <mesh position={[0, 14.5, 0]} material={materials.chunarSandstone}>
          <sphereGeometry args={[3.2, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        </mesh>
      </group>

      {/* 6. Sacred Bodhi Tree Groves */}
      {[
        [-25, 18],
        [25, 20],
        [-28, -25],
        [26, -28],
      ].map(([tx, tz], idx) => (
        <group key={`tree-${idx}`} position={[tx, 0, tz]}>
          <mesh position={[0, 2, 0]} material={materials.trunk}>
            <cylinderGeometry args={[0.4, 0.6, 4, 8]} />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow material={materials.foliage}>
            <sphereGeometry args={[3.2, 12, 10]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
