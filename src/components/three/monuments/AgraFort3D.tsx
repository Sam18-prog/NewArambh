'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Agra Fort
 * Features:
 * - Double concentric red sandstone curtain walls with massive semicircular bastions
 * - Amar Singh Gate with dog-leg ramp and drawbridge entry
 * - Akbar's Jahangiri Mahal with Gujarat/Rajasthan serpentine strut brackets & chhajjas
 * - White marble Khas Mahal riverside pavilion
 * - Octagonal Musamman Burj projecting towards the Yamuna riverbank
 * - Anguri Bagh geometric sunken courtyard garden
 */
export default function AgraFort3D() {
  const materials = useMemo(() => {
    return {
      redSandstone: new THREE.MeshStandardMaterial({
        color: 0x9b3b28,
        roughness: 0.84,
        metalness: 0.02,
      }),
      darkSandstone: new THREE.MeshStandardMaterial({
        color: 0x6e2518,
        roughness: 0.88,
        metalness: 0.02,
      }),
      whiteMarble: new THREE.MeshStandardMaterial({
        color: 0xfafafa,
        roughness: 0.26,
        metalness: 0.04,
      }),
      goldFinial: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.2,
        metalness: 0.88,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.06,
        metalness: 0.35,
        transparent: true,
        opacity: 0.85,
      }),
      lawn: new THREE.MeshStandardMaterial({
        color: 0x225c34,
        roughness: 0.95,
        metalness: 0.0,
      }),
      paving: new THREE.MeshStandardMaterial({
        color: 0xaf5a45,
        roughness: 0.85,
        metalness: 0.02,
      }),
    };
  }, []);

  return (
    <group name="AgraFortMonument">
      {/* 1. Base Paving Foundation */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.paving}>
        <boxGeometry args={[96, 0.4, 105]} />
      </mesh>

      {/* Outer Curved Semicircular Defensive Ramparts */}
      <mesh position={[-42, 7, 0]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[3.2, 14, 98]} />
      </mesh>
      <mesh position={[42, 7, 0]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[3.2, 14, 98]} />
      </mesh>
      <mesh position={[0, 7, -46]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[86, 14, 3.2]} />
      </mesh>

      {/* Massive Semicircular Bastion Drums */}
      {[-38, 0, 38].map((bx, idx) => (
        <mesh key={`bastion-n-${idx}`} position={[bx, 8, -46]} castShadow material={materials.redSandstone}>
          <cylinderGeometry args={[5, 5.5, 16, 16]} />
        </mesh>
      ))}

      {/* 2. Amar Singh Gate (Akbar Darwaza at Z = 24) */}
      <group position={[0, 0, 24]}>
        {/* Gateway Bridge & Ramp */}
        <mesh position={[0, 1.2, 10]} receiveShadow material={materials.darkSandstone}>
          <boxGeometry args={[10, 2.4, 18]} />
        </mesh>
        {/* Main Portal Block */}
        <mesh position={[0, 8, 0]} castShadow receiveShadow material={materials.redSandstone}>
          <boxGeometry args={[22, 16, 8]} />
        </mesh>
        <mesh position={[0, 4.5, 0]} material={materials.darkSandstone}>
          <boxGeometry args={[6, 9, 8.4]} />
        </mesh>
        {/* Twin Flanking Semicircular Bastions */}
        {[-11, 11].map((gx, idx) => (
          <group key={`amar-bastion-${idx}`} position={[gx, 0, 0]}>
            <mesh position={[0, 9.5, 0]} castShadow receiveShadow material={materials.redSandstone}>
              <cylinderGeometry args={[4.5, 5.0, 19, 16]} />
            </mesh>
            <mesh position={[0, 19.5, 0]} material={materials.whiteMarble}>
              <sphereGeometry args={[2.5, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. Akbar's Jahangiri Mahal (Palace at X = -18, Z = -8) */}
      <group position={[-18, 0, -8]}>
        {/* Palace Main Block */}
        <mesh position={[0, 7, 0]} castShadow receiveShadow material={materials.redSandstone}>
          <boxGeometry args={[26, 14, 28]} />
        </mesh>
        {/* Interior Open Courtyard Cutout */}
        <mesh position={[0, 6, 0]} material={materials.darkSandstone}>
          <boxGeometry args={[14, 12.2, 14]} />
        </mesh>
        {/* Projecting Gujarati Carved Chhajja Eaves */}
        <mesh position={[0, 14.2, 0]} material={materials.darkSandstone}>
          <boxGeometry args={[27.5, 0.6, 29.5]} />
        </mesh>
        {/* Corner Domed Chhatris */}
        {[-12, 12].map((cx, idxX) =>
          [-13, 13].map((cz, idxZ) => (
            <group key={`jm-chhatri-${idxX}-${idxZ}`} position={[cx, 14.5, cz]}>
              <mesh position={[0, 2.5, 0]} material={materials.redSandstone}>
                <sphereGeometry args={[1.8, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* 4. Anguri Bagh (Central Geometric Sunken Garden Courtyard at Z = -16) */}
      <group position={[0, 0, -16]}>
        <mesh position={[0, 0.1, 0]} receiveShadow material={materials.paving}>
          <boxGeometry args={[28, 0.2, 24]} />
        </mesh>
        {/* Sunken Parterre Lawns */}
        {[-7, 7].map((lx, idxX) =>
          [-6, 6].map((lz, idxZ) => (
            <mesh key={`ab-lawn-${idxX}-${idxZ}`} position={[lx, 0.22, lz]} receiveShadow material={materials.lawn}>
              <boxGeometry args={[11, 0.15, 9.5]} />
            </mesh>
          ))
        )}
        {/* Central Fountain Basin */}
        <mesh position={[0, 0.35, 0]} receiveShadow material={materials.whiteMarble}>
          <cylinderGeometry args={[2.8, 3.2, 0.5, 16]} />
        </mesh>
        <mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.water}>
          <circleGeometry args={[2.6, 16]} />
        </mesh>
      </group>

      {/* 5. Khas Mahal (White Marble Pavilion at X = 16, Z = -20) */}
      <group position={[16, 0, -20]}>
        {/* Marble Plinth */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow material={materials.whiteMarble}>
          <boxGeometry args={[22, 2.4, 16]} />
        </mesh>
        {/* Triple Arched Front Facade */}
        {[-6, 0, 6].map((ax, idx) => (
          <group key={`km-arch-${idx}`} position={[ax, 2.4, 7]}>
            <mesh position={[-2, 3, 0]} material={materials.whiteMarble}>
              <cylinderGeometry args={[0.3, 0.35, 6, 12]} />
            </mesh>
            <mesh position={[2, 3, 0]} material={materials.whiteMarble}>
              <cylinderGeometry args={[0.3, 0.35, 6, 12]} />
            </mesh>
          </group>
        ))}
        {/* Flat Roof with Golden Spire Finials */}
        <mesh position={[0, 8.8, 0]} castShadow material={materials.whiteMarble}>
          <boxGeometry args={[23, 0.8, 17]} />
        </mesh>
        {[-8, 0, 8].map((fx, idx) => (
          <mesh key={`km-finial-${idx}`} position={[fx, 9.8, 7.5]} material={materials.goldFinial}>
            <cylinderGeometry args={[0.06, 0.2, 1.8, 8]} />
          </mesh>
        ))}
      </group>

      {/* 6. Musamman Burj (Octagonal White Marble Tower at X = 25, Z = -34) */}
      <group position={[25, 0, -34]}>
        {/* Octagonal Plinth */}
        <mesh position={[0, 5, 0]} castShadow receiveShadow material={materials.whiteMarble}>
          <cylinderGeometry args={[5.2, 5.8, 10, 8]} />
        </mesh>
        {/* Pierced Jali Screen Walls */}
        <mesh position={[0, 11, 0]} material={materials.whiteMarble}>
          <cylinderGeometry args={[4.8, 5.0, 4, 8, 1, true]} />
        </mesh>
        {/* Octagonal Golden Dome */}
        <mesh position={[0, 14, 0]} castShadow material={materials.whiteMarble}>
          <sphereGeometry args={[4.2, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        </mesh>
        <mesh position={[0, 16.5, 0]} material={materials.goldFinial}>
          <cylinderGeometry args={[0.08, 0.3, 2.4, 8]} />
        </mesh>
      </group>
    </group>
  );
}
