'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Somnath Temple (Prabhas Patan)
 * Features:
 * - Kailash Mahameru Prasad Chaulukya yellow sandstone temple architecture
 * - 155-foot soaring curvilinear Shikhara spire with ribbed amalaka, gold Kalash & saffron flag
 * - Multi-tiered pillared Sabha Mandap with carved chaulukya columns and domed roof
 * - Digvijay Dwar monumental eastern entry gateway
 * - Sea promenade wall with the historic Baan Stambh (Arrow Pillar) pointing to the South Pole
 * - Arabian Sea coastal ocean with gentle rolling water waves
 */
export default function Somnath3D() {
  const materials = useMemo(() => {
    return {
      chaulukyaSandstone: new THREE.MeshStandardMaterial({
        color: 0xd6a066,
        roughness: 0.8,
        metalness: 0.04,
      }),
      darkCarvedStone: new THREE.MeshStandardMaterial({
        color: 0x9c6c3a,
        roughness: 0.86,
        metalness: 0.02,
      }),
      goldKalash: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.18,
        metalness: 0.9,
      }),
      saffronFlag: new THREE.MeshStandardMaterial({
        color: 0xe05615,
        roughness: 0.6,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
      seaWater: new THREE.MeshStandardMaterial({
        color: 0x0369a1,
        roughness: 0.08,
        metalness: 0.4,
        transparent: true,
        opacity: 0.86,
      }),
      paving: new THREE.MeshStandardMaterial({
        color: 0xc49460,
        roughness: 0.88,
        metalness: 0.02,
      }),
      lawn: new THREE.MeshStandardMaterial({
        color: 0x2e663a,
        roughness: 0.95,
        metalness: 0.0,
      }),
    };
  }, []);

  return (
    <group name="SomnathTempleComplex">
      {/* 1. Base Temple Courtyard Paving */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.paving}>
        <boxGeometry args={[92, 0.4, 98]} />
      </mesh>

      {/* 2. Arabian Sea Coast Parapet Wall (Z = -38 to -48) */}
      <mesh position={[0, 1.8, -36]} castShadow material={materials.chaulukyaSandstone}>
        <boxGeometry args={[88, 3.6, 2.5]} />
      </mesh>
      {/* Arabian Sea Water Body stretching to horizon */}
      <mesh position={[0, -0.6, -65]} rotation={[-Math.PI / 2, 0, 0]} material={materials.seaWater}>
        <planeGeometry args={[120, 60]} />
      </mesh>

      {/* 3. Historic Baan Stambh (Arrow Pillar on the Seawall at X = 24, Z = -32) */}
      <group position={[24, 0, -32]}>
        {/* Octagonal Plinth */}
        <mesh position={[0, 1.2, 0]} castShadow material={materials.chaulukyaSandstone}>
          <cylinderGeometry args={[1.5, 1.8, 2.4, 8]} />
        </mesh>
        {/* Red Sandstone Pillar Shaft */}
        <mesh position={[0, 6.0, 0]} castShadow material={materials.darkCarvedStone}>
          <cylinderGeometry args={[0.55, 0.65, 7.5, 16]} />
        </mesh>
        {/* Crowning Globe and Golden Arrow pointing South */}
        <mesh position={[0, 10.2, 0]} material={materials.goldKalash}>
          <sphereGeometry args={[0.7, 16, 16]} />
        </mesh>
        <mesh position={[0, 10.2, -0.8]} rotation={[Math.PI / 2, 0, 0]} material={materials.goldKalash}>
          <coneGeometry args={[0.25, 1.2, 8]} />
        </mesh>
      </group>

      {/* 4. Main Somnath Temple Complex (Z = -10) */}
      <group position={[0, 0, -10]}>
        {/* High Jagati (Temple Base Platform) */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow material={materials.chaulukyaSandstone}>
          <boxGeometry args={[34, 3.6, 42]} />
        </mesh>
        <mesh position={[0, 3.7, 0]} material={materials.darkCarvedStone}>
          <boxGeometry args={[35.2, 0.3, 43.2]} />
        </mesh>

        {/* 5. Soaring Curvilinear Shikhara Spire (over Garbhagriha Sanctum at Z = -10) */}
        <group position={[0, 3.8, -10]}>
          {/* Sanctum Square Body */}
          <mesh position={[0, 5, 0]} castShadow receiveShadow material={materials.chaulukyaSandstone}>
            <boxGeometry args={[18, 10, 18]} />
          </mesh>

          {/* Stepped Multi-Tier Curvilinear Spire Tower */}
          {Array.from({ length: 9 }).map((_, sIdx) => {
            const h = 2.4;
            const y = 10 + sIdx * h;
            const bottomRadius = 8.5 * Math.pow(0.88, sIdx);
            const topRadius = 8.5 * Math.pow(0.88, sIdx + 1);
            return (
              <group key={`shikhara-tier-${sIdx}`} position={[0, y, 0]}>
                <mesh castShadow material={materials.chaulukyaSandstone}>
                  <cylinderGeometry args={[topRadius, bottomRadius, h, 8]} />
                </mesh>
                {/* Miniature Urushringa Spires along flanks */}
                {[-1, 1].map((dirX, idxX) => (
                  <mesh key={`mini-spire-${sIdx}-${idxX}`} position={[dirX * (bottomRadius + 0.3), 0, 0]} material={materials.darkCarvedStone}>
                    <coneGeometry args={[0.6, 2.2, 6]} />
                  </mesh>
                ))}
              </group>
            );
          })}

          {/* Ribbed Massive Amalaka Stone Ring at Spire Summit (Height ~32m) */}
          <mesh position={[0, 32.2, 0]} castShadow material={materials.chaulukyaSandstone}>
            <cylinderGeometry args={[3.2, 3.6, 1.8, 24]} />
          </mesh>

          {/* Golden Kalash Water Pot */}
          <mesh position={[0, 34.0, 0]} material={materials.goldKalash}>
            <sphereGeometry args={[1.5, 16, 16]} />
          </mesh>
          <mesh position={[0, 36.0, 0]} material={materials.goldKalash}>
            <cylinderGeometry args={[0.08, 0.4, 2.5, 8]} />
          </mesh>

          {/* Fluttering Saffron Sacred Dhwaja Flag */}
          <group position={[0, 37.0, 0]}>
            <mesh position={[1.4, 0, 0]} material={materials.saffronFlag}>
              <boxGeometry args={[2.8, 1.2, 0.05]} />
            </mesh>
          </group>
        </group>

        {/* 6. Multi-Pillared Sabha Mandap (Assembly Hall at Z = 8) */}
        <group position={[0, 3.8, 8]}>
          {/* Mandap Octagonal Hall Base */}
          <mesh position={[0, 4, 0]} castShadow receiveShadow material={materials.chaulukyaSandstone}>
            <cylinderGeometry args={[10.5, 11.5, 8, 8]} />
          </mesh>
          {/* Carved Chaulukya Pillars framing entrance */}
          {[-7, -2.5, 2.5, 7].map((colX, cIdx) => (
            <mesh key={`sm-col-${cIdx}`} position={[colX, 3.5, 11]} castShadow material={materials.darkCarvedStone}>
              <cylinderGeometry args={[0.4, 0.5, 7, 12]} />
            </mesh>
          ))}
          {/* Tiered Pyramidal (Samvarana) Roof */}
          {Array.from({ length: 5 }).map((_, rIdx) => (
            <mesh key={`roof-tier-${rIdx}`} position={[0, 8.5 + rIdx * 1.4, 0]} material={materials.chaulukyaSandstone}>
              <cylinderGeometry args={[10.5 - rIdx * 1.8, 11.5 - rIdx * 1.8, 1.4, 8]} />
            </mesh>
          ))}
          {/* Mandap Kalash */}
          <mesh position={[0, 16.0, 0]} material={materials.goldKalash}>
            <sphereGeometry args={[1.0, 12, 12]} />
          </mesh>
        </group>

        {/* Broad Frontal Steps ascending the Jagati Platform */}
        {Array.from({ length: 8 }).map((_, stIdx) => (
          <mesh key={`front-step-${stIdx}`} position={[0, 0.22 * (stIdx + 1), 21.5 + stIdx * 0.45]} material={materials.chaulukyaSandstone}>
            <boxGeometry args={[14, 0.25, 0.5]} />
          </mesh>
        ))}
      </group>

      {/* 7. Monumental Digvijay Dwar (Eastern Entrance Portal at Z = 36) */}
      <group position={[0, 0, 36]}>
        <mesh position={[0, 6, 0]} castShadow receiveShadow material={materials.chaulukyaSandstone}>
          <boxGeometry args={[22, 12, 6]} />
        </mesh>
        {/* Gateway Arch Opening */}
        <mesh position={[0, 3.8, 0]} material={materials.darkCarvedStone}>
          <boxGeometry args={[6.5, 7.6, 6.4]} />
        </mesh>
        {/* Twin Gatehouse Shikhara Finials */}
        {[-9, 9].map((gx, idx) => (
          <group key={`gate-finial-${idx}`} position={[gx, 12, 0]}>
            <mesh position={[0, 2, 0]} material={materials.chaulukyaSandstone}>
              <coneGeometry args={[1.8, 4, 8]} />
            </mesh>
            <mesh position={[0, 4.4, 0]} material={materials.goldKalash}>
              <sphereGeometry args={[0.5, 8, 8]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
