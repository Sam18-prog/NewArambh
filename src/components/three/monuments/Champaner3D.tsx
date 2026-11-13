'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Champaner-Pavagadh Archaeological Park
 * Features:
 * - Jami Masjid with grand central arched pishtaq portal and pierced stone jali screens
 * - Two soaring 30-meter fluted minarets flanking the entrance
 * - Pillared prayer hall with 172 stone columns and central elevated clerestory dome
 * - Arcaded courtyard cloister with central ablution hauz pool
 * - Silhouette of the sacred Pavagadh Hill in the backdrop
 */
export default function Champaner3D() {
  const materials = useMemo(() => {
    return {
      gujaratSandstone: new THREE.MeshStandardMaterial({
        color: 0xc9935f,
        roughness: 0.82,
        metalness: 0.02,
      }),
      darkSandstone: new THREE.MeshStandardMaterial({
        color: 0x82542a,
        roughness: 0.88,
        metalness: 0.02,
      }),
      jaliLattice: new THREE.MeshStandardMaterial({
        color: 0xb57c4c,
        roughness: 0.7,
        metalness: 0.05,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.06,
        metalness: 0.35,
        transparent: true,
        opacity: 0.85,
      }),
      mountainRock: new THREE.MeshStandardMaterial({
        color: 0x4a3a30,
        roughness: 0.95,
        metalness: 0.02,
      }),
      paving: new THREE.MeshStandardMaterial({
        color: 0xba8c5e,
        roughness: 0.86,
        metalness: 0.02,
      }),
    };
  }, []);

  return (
    <group name="ChampanerJamiMasjid">
      {/* 1. Base Paving Foundation */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.paving}>
        <boxGeometry args={[88, 0.4, 95]} />
      </mesh>

      {/* 2. Sacred Pavagadh Hill Backdrop (Z = -75) */}
      <group position={[0, 0, -75]}>
        <mesh position={[0, 24, 0]} material={materials.mountainRock}>
          <coneGeometry args={[52, 48, 16]} />
        </mesh>
        <mesh position={[-25, 18, 5]} material={materials.mountainRock}>
          <coneGeometry args={[32, 36, 12]} />
        </mesh>
        <mesh position={[28, 20, 5]} material={materials.mountainRock}>
          <coneGeometry args={[36, 40, 12]} />
        </mesh>
      </group>

      {/* 3. Courtyard Enclosure Cloister Arcades */}
      <mesh position={[-28, 3, 10]} castShadow receiveShadow material={materials.gujaratSandstone}>
        <boxGeometry args={[2, 6, 52]} />
      </mesh>
      <mesh position={[28, 3, 10]} castShadow receiveShadow material={materials.gujaratSandstone}>
        <boxGeometry args={[2, 6, 52]} />
      </mesh>
      <mesh position={[0, 3, 36]} castShadow receiveShadow material={materials.gujaratSandstone}>
        <boxGeometry args={[58, 6, 2]} />
      </mesh>

      {/* 4. Central Ablution Hauz Pool in Courtyard (Z = 12) */}
      <group position={[0, 0, 12]}>
        <mesh position={[0, 0.25, 0]} receiveShadow material={materials.darkSandstone}>
          <boxGeometry args={[9, 0.5, 9]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.water}>
          <planeGeometry args={[7.5, 7.5]} />
        </mesh>
      </group>

      {/* 5. Jami Masjid Main Entrance Facade (Z = 4) */}
      <group position={[0, 0, 4]}>
        {/* Central Arched Pishtaq Portal */}
        <mesh position={[0, 8, 0]} castShadow receiveShadow material={materials.gujaratSandstone}>
          <boxGeometry args={[18, 16, 6]} />
        </mesh>
        {/* Deep Recessed Ogee Archway */}
        <mesh position={[0, 5, 0]} material={materials.darkSandstone}>
          <boxGeometry args={[8, 10, 6.4]} />
        </mesh>
        {/* Pierced Stone Jali Screen Over Arch */}
        <mesh position={[0, 11.5, 3.1]} material={materials.jaliLattice}>
          <boxGeometry args={[6.5, 3.5, 0.2]} />
        </mesh>

        {/* 6. Two Soaring 30-Meter Fluted Minarets */}
        {[-11, 11].map((mx, idx) => (
          <group key={`minaret-${idx}`} position={[mx, 0, 0]}>
            {/* Square Molded Base */}
            <mesh position={[0, 2.5, 0]} castShadow receiveShadow material={materials.gujaratSandstone}>
              <boxGeometry args={[4.2, 5, 4.2]} />
            </mesh>
            {/* Tier 1 Fluted Shaft */}
            <mesh position={[0, 9.5, 0]} castShadow material={materials.gujaratSandstone}>
              <cylinderGeometry args={[1.8, 2.2, 9, 24]} />
            </mesh>
            {/* Projecting Carved Balcony 1 */}
            <mesh position={[0, 14.2, 0]} material={materials.darkSandstone}>
              <cylinderGeometry args={[2.5, 2.0, 0.6, 24]} />
            </mesh>
            {/* Tier 2 Shaft */}
            <mesh position={[0, 18.5, 0]} castShadow material={materials.gujaratSandstone}>
              <cylinderGeometry args={[1.5, 1.8, 8, 24]} />
            </mesh>
            {/* Balcony 2 */}
            <mesh position={[0, 22.8, 0]} material={materials.darkSandstone}>
              <cylinderGeometry args={[2.1, 1.7, 0.6, 24]} />
            </mesh>
            {/* Tier 3 Shaft */}
            <mesh position={[0, 26.5, 0]} castShadow material={materials.gujaratSandstone}>
              <cylinderGeometry args={[1.2, 1.5, 7, 24]} />
            </mesh>
            {/* Crowning Chhatri / Cupola */}
            <mesh position={[0, 30.5, 0]} material={materials.gujaratSandstone}>
              <sphereGeometry args={[1.4, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 7. Pillared Prayer Hall (Sanctuary at Z = -16) */}
      <group position={[0, 0, -16]}>
        {/* Hall Enclosure & Plinth */}
        <mesh position={[0, 5, 0]} castShadow receiveShadow material={materials.gujaratSandstone}>
          <boxGeometry args={[40, 10, 18]} />
        </mesh>
        {/* Interior Hypostyle Columns (Colonnaded Hall) */}
        {[-14, -7, 0, 7, 14].map((px, idxX) =>
          [-5, 0, 5].map((pz, idxZ) => (
            <mesh key={`ph-col-${idxX}-${idxZ}`} position={[px, 4, pz]} castShadow material={materials.gujaratSandstone}>
              <cylinderGeometry args={[0.3, 0.35, 8, 12]} />
            </mesh>
          ))
        )}
        {/* Central Elevated Clerestory Octagonal Dome */}
        <group position={[0, 10, 0]}>
          <mesh position={[0, 1.5, 0]} castShadow material={materials.gujaratSandstone}>
            <cylinderGeometry args={[5.2, 5.5, 3, 8]} />
          </mesh>
          <mesh position={[0, 4.2, 0]} castShadow material={materials.gujaratSandstone}>
            <sphereGeometry args={[5.2, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          </mesh>
        </group>
        {/* Flanking Secondary Domes */}
        {[-12, 12].map((dx, idx) => (
          <mesh key={`sub-dome-${idx}`} position={[dx, 11, 0]} castShadow material={materials.gujaratSandstone}>
            <sphereGeometry args={[3.2, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
