'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of the Red Fort Complex (Lal Qila)
 * Features:
 * - Monumental red sandstone Lahori Gate with twin octagonal towers and 7 marble chhatris
 * - Barbican defensive outer wall
 * - Covered vaulted arcade of Chhatta Chowk bazaar
 * - Pillared Diwan-i-Aam (Hall of Public Audience) with 27 bays of cusped arches
 * - White marble Diwan-i-Khas pavilion with inlaid pillars
 * - Nahr-i-Behisht (Stream of Paradise) water canal
 * - Moti Masjid (Pearl Mosque) with 3 bulbous white marble domes
 */
export default function RedFort3D() {
  const materials = useMemo(() => {
    return {
      redSandstone: new THREE.MeshStandardMaterial({
        color: 0xa83d2a,
        roughness: 0.85,
        metalness: 0.02,
      }),
      darkSandstone: new THREE.MeshStandardMaterial({
        color: 0x7a2717,
        roughness: 0.9,
        metalness: 0.02,
      }),
      whiteMarble: new THREE.MeshStandardMaterial({
        color: 0xfdfdfd,
        roughness: 0.28,
        metalness: 0.04,
      }),
      pietraDuraDark: new THREE.MeshStandardMaterial({
        color: 0x1f2329,
        roughness: 0.45,
        metalness: 0.1,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.08,
        metalness: 0.35,
        transparent: true,
        opacity: 0.85,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.22,
        metalness: 0.85,
      }),
      lawn: new THREE.MeshStandardMaterial({
        color: 0x245e38,
        roughness: 0.95,
        metalness: 0.0,
      }),
      paving: new THREE.MeshStandardMaterial({
        color: 0xb5634e,
        roughness: 0.88,
        metalness: 0.02,
      }),
    };
  }, []);

  return (
    <group name="RedFortComplex">
      {/* 1. Base Ground & Courtyards */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.paving}>
        <boxGeometry args={[95, 0.4, 110]} />
      </mesh>

      {/* Perimeter Defensive Rampart Walls */}
      <mesh position={[-42, 6, 0]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[3, 12, 105]} />
      </mesh>
      <mesh position={[42, 6, 0]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[3, 12, 105]} />
      </mesh>
      <mesh position={[0, 6, -48]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[84, 12, 3]} />
      </mesh>
      {/* Wall Crenellations (Battlements) along top */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={`crenel-n-${i}`} position={[-38 + i * 3.3, 12.5, -48]} material={materials.darkSandstone}>
          <boxGeometry args={[1.8, 1.2, 3.2]} />
        </mesh>
      ))}

      {/* 2. Lahori Gate (Monumental Portal at Z = 28) */}
      <group position={[0, 0, 28]}>
        {/* Main Central Gateway Block */}
        <mesh position={[0, 8, 0]} castShadow receiveShadow material={materials.redSandstone}>
          <boxGeometry args={[26, 16, 9]} />
        </mesh>

        {/* Central Vaulted Entrance Arch */}
        <mesh position={[0, 4.5, 0]} material={materials.pietraDuraDark}>
          <boxGeometry args={[7, 9, 9.4]} />
        </mesh>

        {/* Twin Semi-Octagonal Flanking Bastions */}
        {[-14, 14].map((bx, idx) => (
          <group key={`lahori-bastion-${idx}`} position={[bx, 0, 0]}>
            <mesh position={[0, 9.5, 0]} castShadow receiveShadow material={materials.redSandstone}>
              <cylinderGeometry args={[4.2, 4.8, 19, 8]} />
            </mesh>
            {/* Crowning Marble Chhatris */}
            <mesh position={[0, 20.2, 0]} material={materials.whiteMarble}>
              <sphereGeometry args={[2.8, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            </mesh>
            <mesh position={[0, 22.8, 0]} material={materials.gold}>
              <cylinderGeometry args={[0.08, 0.25, 2.5, 8]} />
            </mesh>
          </group>
        ))}

        {/* 7 Miniature White Marble Chhatris on Central Parapet */}
        {Array.from({ length: 7 }).map((_, i) => (
          <group key={`chhatri-l-${i}`} position={[-9 + i * 3.0, 16.8, 0]}>
            <mesh material={materials.whiteMarble}>
              <sphereGeometry args={[0.75, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            </mesh>
            <mesh position={[0, 1.1, 0]} material={materials.gold}>
              <cylinderGeometry args={[0.04, 0.1, 0.8, 6]} />
            </mesh>
          </group>
        ))}

        {/* Barbican Outer Enclosure Screen Wall */}
        <mesh position={[0, 3.5, 10]} castShadow receiveShadow material={materials.darkSandstone}>
          <boxGeometry args={[18, 7, 1.8]} />
        </mesh>
      </group>

      {/* 3. Chhatta Chowk (Covered Vaulted Bazaar Arcade Z = 8 to 22) */}
      <group position={[0, 0, 15]}>
        {/* Barrel Vault Roof */}
        <mesh position={[0, 5, 0]} receiveShadow material={materials.darkSandstone}>
          <boxGeometry args={[10, 6, 16]} />
        </mesh>
        {/* Interior Walkway Cutout */}
        <mesh position={[0, 2.5, 0]} material={materials.pietraDuraDark}>
          <boxGeometry args={[5.5, 5, 16.4]} />
        </mesh>
      </group>

      {/* 4. Naubat Khana (Music Gallery Gateway at Z = 5) */}
      <mesh position={[0, 6.5, 5]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[20, 13, 6]} />
      </mesh>
      <mesh position={[0, 3.5, 5]} material={materials.pietraDuraDark}>
        <boxGeometry args={[6, 7, 6.4]} />
      </mesh>

      {/* 5. Central Formal Garden Plaza with Lawns */}
      <group position={[0, 0, -8]}>
        {[-18, 18].map((gx, idx) => (
          <mesh key={`rf-lawn-${idx}`} position={[gx, 0.08, 0]} receiveShadow material={materials.lawn}>
            <boxGeometry args={[22, 0.15, 20]} />
          </mesh>
        ))}
      </group>

      {/* 6. Diwan-i-Aam (Hall of Public Audience at Z = -20) */}
      <group position={[0, 0, -20]}>
        {/* Sandstone Plinth */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow material={materials.redSandstone}>
          <boxGeometry args={[36, 1.6, 20]} />
        </mesh>
        {/* Hypostyle Columns (3 rows of 9 columns = 27 bays) */}
        {[-14, -10.5, -7, -3.5, 0, 3.5, 7, 10.5, 14].map((colX, cIdx) =>
          [-6, 0, 6].map((colZ, rIdx) => (
            <group key={`col-${cIdx}-${rIdx}`} position={[colX, 1.6, colZ]}>
              <mesh position={[0, 3.5, 0]} castShadow material={materials.redSandstone}>
                <cylinderGeometry args={[0.35, 0.45, 7, 12]} />
              </mesh>
              {/* Cusped Arch Capital */}
              <mesh position={[0, 7.2, 0]} material={materials.darkSandstone}>
                <boxGeometry args={[1.2, 0.6, 1.2]} />
              </mesh>
            </group>
          ))
        )}
        {/* Flat Roof Slab with Chhajja Eaves */}
        <mesh position={[0, 9.2, 0]} castShadow material={materials.redSandstone}>
          <boxGeometry args={[37.5, 0.8, 21.5]} />
        </mesh>
        {/* Jharokha (Emperor's Marble Throne Canopy) against rear wall */}
        <group position={[0, 3.5, -8.5]}>
          <mesh castShadow material={materials.whiteMarble}>
            <boxGeometry args={[4, 5, 2.5]} />
          </mesh>
          <mesh position={[0, 3.2, 0]} material={materials.gold}>
            <sphereGeometry args={[1.2, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          </mesh>
        </group>
      </group>

      {/* 7. Diwan-i-Khas (Private Marble Hall at X = 16, Z = -34) */}
      <group position={[18, 0, -34]}>
        {/* White Marble Raised Terrace */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow material={materials.whiteMarble}>
          <boxGeometry args={[18, 2, 14]} />
        </mesh>
        {/* Carved Marble Pillars */}
        {[-6, 0, 6].map((px, idxX) =>
          [-4, 4].map((pz, idxZ) => (
            <mesh key={`d-khas-col-${idxX}-${idxZ}`} position={[px, 4.8, pz]} castShadow material={materials.whiteMarble}>
              <boxGeometry args={[0.8, 5.6, 0.8]} />
            </mesh>
          ))
        )}
        {/* Pierced Marble Roof & Gold Cornice */}
        <mesh position={[0, 8.0, 0]} material={materials.whiteMarble}>
          <boxGeometry args={[19, 0.8, 15]} />
        </mesh>
        <mesh position={[0, 8.5, 0]} material={materials.gold}>
          <boxGeometry args={[19.4, 0.2, 15.4]} />
        </mesh>
        {/* Corner Chhatris */}
        {[-8, 8].map((cx, idxX) =>
          [-6, 6].map((cz, idxZ) => (
            <mesh key={`dk-chhatri-${idxX}-${idxZ}`} position={[cx, 10, cz]} material={materials.whiteMarble}>
              <sphereGeometry args={[1.2, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            </mesh>
          ))
        )}
      </group>

      {/* 8. Moti Masjid (Pearl Mosque at X = -18, Z = -34) */}
      <group position={[-18, 0, -34]}>
        <mesh position={[0, 3.5, 0]} castShadow receiveShadow material={materials.whiteMarble}>
          <boxGeometry args={[14, 7, 12]} />
        </mesh>
        {/* Three Bulbous Marble Domes */}
        {[-3.8, 0, 3.8].map((dx, idx) => (
          <group key={`moti-dome-${idx}`} position={[dx, 7.2, 0]}>
            <mesh castShadow material={materials.whiteMarble}>
              <sphereGeometry args={[idx === 1 ? 2.5 : 2.0, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
            </mesh>
            <mesh position={[0, idx === 1 ? 3.0 : 2.4, 0]} material={materials.gold}>
              <cylinderGeometry args={[0.05, 0.15, 1.5, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 9. Nahr-i-Behisht (Stream of Paradise Canal flowing through) */}
      <group position={[0, 0.1, -34]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.water}>
          <planeGeometry args={[70, 2.2]} />
        </mesh>
      </group>
    </group>
  );
}
