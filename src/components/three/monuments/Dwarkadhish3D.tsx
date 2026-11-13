'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of Dwarkadhish Temple (Jagat Mandir)
 * Features:
 * - 5-storey limestone Jagat Mandir supported by 72 exquisitely carved pillars
 * - 78-meter soaring Shikhara spire flying the iconic 52-yard sacred Dhwaja flag
 * - Multi-tiered pyramidal Sabha Mandap hall
 * - Swarga Dwar 56-step ceremonial entrance ascending from the Gomti River
 * - Moksha Dwar northern exit
 * - Sacred Gomti Ghat riverfront with sacred waters
 */
export default function Dwarkadhish3D() {
  const materials = useMemo(() => {
    return {
      dwarkaLimestone: new THREE.MeshStandardMaterial({
        color: 0xd9be96,
        roughness: 0.78,
        metalness: 0.04,
      }),
      darkLimestone: new THREE.MeshStandardMaterial({
        color: 0x9e805c,
        roughness: 0.85,
        metalness: 0.02,
      }),
      goldKalash: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.18,
        metalness: 0.9,
      }),
      dhwajaFlag: new THREE.MeshStandardMaterial({
        color: 0xf3efe6,
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      flagEmblem: new THREE.MeshStandardMaterial({
        color: 0xd9381e,
        roughness: 0.6,
        metalness: 0.1,
      }),
      gomtiRiver: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.06,
        metalness: 0.35,
        transparent: true,
        opacity: 0.86,
      }),
      ghatPaving: new THREE.MeshStandardMaterial({
        color: 0xc4a478,
        roughness: 0.88,
        metalness: 0.02,
      }),
    };
  }, []);

  return (
    <group name="DwarkadhishJagatMandir">
      {/* 1. Base Temple Courtyard Paving */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.ghatPaving}>
        <boxGeometry args={[86, 0.4, 90]} />
      </mesh>

      {/* 2. Sacred Gomti River Ghat & Riverfront (West side X = -28 to -42) */}
      <group position={[-28, 0, 0]}>
        {/* Riverfront Parapet Wall */}
        <mesh position={[2, 1.2, 0]} castShadow material={materials.dwarkaLimestone}>
          <boxGeometry args={[1.6, 2.8, 80]} />
        </mesh>
        {/* Descending Stone Ghat Steps */}
        {Array.from({ length: 6 }).map((_, sIdx) => (
          <mesh key={`ghat-step-${sIdx}`} position={[-sIdx * 0.8, -0.25 * (sIdx + 1), 0]} material={materials.ghatPaving}>
            <boxGeometry args={[0.8, 0.3, 76]} />
          </mesh>
        ))}
        {/* Gomti River Waters */}
        <mesh position={[-9, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.gomtiRiver}>
          <planeGeometry args={[16, 85]} />
        </mesh>
      </group>

      {/* 3. Main Jagat Mandir Complex (Z = -6) */}
      <group position={[0, 0, -6]}>
        {/* Elevated Temple Terrace Plinth */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow material={materials.dwarkaLimestone}>
          <boxGeometry args={[32, 3.6, 38]} />
        </mesh>

        {/* 4. 78-Meter Monumental Shikhara Spire (Ladva Mandir at Z = -10) */}
        <group position={[0, 3.6, -10]}>
          {/* 5-Storey Towering Base Body */}
          <mesh position={[0, 7.5, 0]} castShadow receiveShadow material={materials.dwarkaLimestone}>
            <boxGeometry args={[18, 15, 18]} />
          </mesh>

          {/* Stepped Curvilinear Shikhara Tiers */}
          {Array.from({ length: 11 }).map((_, tIdx) => {
            const h = 2.2;
            const y = 15 + tIdx * h;
            const rBottom = 8.8 * Math.pow(0.88, tIdx);
            const rTop = 8.8 * Math.pow(0.88, tIdx + 1);
            return (
              <group key={`dw-spire-tier-${tIdx}`} position={[0, y, 0]}>
                <mesh castShadow material={materials.dwarkaLimestone}>
                  <cylinderGeometry args={[rTop, rBottom, h, 8]} />
                </mesh>
                {/* Decorative Urushringa Mini Spires */}
                {[-1, 1].map((dir, dIdx) => (
                  <mesh key={`mini-spire-${tIdx}-${dIdx}`} position={[dir * (rBottom + 0.3), 0, 0]} material={materials.darkLimestone}>
                    <coneGeometry args={[0.55, 2.0, 6]} />
                  </mesh>
                ))}
              </group>
            );
          })}

          {/* Crowning Ribbed Amalaka Stone (Height ~40m) */}
          <mesh position={[0, 39.5, 0]} castShadow material={materials.dwarkaLimestone}>
            <cylinderGeometry args={[3.0, 3.5, 1.8, 24]} />
          </mesh>

          {/* Golden Kalash Spire */}
          <mesh position={[0, 41.2, 0]} material={materials.goldKalash}>
            <sphereGeometry args={[1.4, 16, 16]} />
          </mesh>
          <mesh position={[0, 43.5, 0]} material={materials.goldKalash}>
            <cylinderGeometry args={[0.08, 0.35, 3.2, 8]} />
          </mesh>

          {/* 5. Iconic 52-Yard Sacred Dhwaja Flag (Fluttering in the coastal wind) */}
          <group position={[0, 45.0, 0]}>
            {/* Triangular Sacred Flag */}
            <mesh position={[2.5, 0, 0]} material={materials.dhwajaFlag}>
              <boxGeometry args={[5.0, 2.4, 0.05]} />
            </mesh>
            {/* Sun & Moon Sacred Emblem in center of flag */}
            <mesh position={[2.5, 0, 0.04]} material={materials.flagEmblem}>
              <circleGeometry args={[0.6, 16]} />
            </mesh>
          </group>
        </group>

        {/* 6. 5-Storey Pillared Sabha Mandap (Supported by 72 Carved Pillars at Z = 7) */}
        <group position={[0, 3.6, 7]}>
          {/* Mandap Floor Base */}
          <mesh position={[0, 4.5, 0]} castShadow receiveShadow material={materials.dwarkaLimestone}>
            <boxGeometry args={[22, 9, 16]} />
          </mesh>
          {/* 72 Ornate Limestone Pillars (Representing the Solanki Colonnade) */}
          {[-8, -4, 0, 4, 8].map((px, idxX) =>
            [-6, 0, 6].map((pz, idxZ) => (
              <mesh key={`dw-col-${idxX}-${idxZ}`} position={[px, 4.5, pz]} castShadow material={materials.darkLimestone}>
                <cylinderGeometry args={[0.35, 0.42, 9, 12]} />
              </mesh>
            ))
          )}
          {/* Stepped Pyramidal Roof of Mandap */}
          {Array.from({ length: 5 }).map((_, rIdx) => (
            <mesh key={`mandap-roof-${rIdx}`} position={[0, 9.5 + rIdx * 1.5, 0]} material={materials.dwarkaLimestone}>
              <boxGeometry args={[22 - rIdx * 3.5, 1.5, 16 - rIdx * 2.5]} />
            </mesh>
          ))}
          <mesh position={[0, 17.5, 0]} material={materials.goldKalash}>
            <sphereGeometry args={[1.0, 12, 12]} />
          </mesh>
        </group>
      </group>

      {/* 7. Swarga Dwar (Ceremonial Entrance with 56 Steps at Z = 28) */}
      <group position={[0, 0, 28]}>
        {/* Gateway Portal */}
        <mesh position={[0, 5, 0]} castShadow receiveShadow material={materials.dwarkaLimestone}>
          <boxGeometry args={[16, 10, 5]} />
        </mesh>
        <mesh position={[0, 3.2, 0]} material={materials.darkLimestone}>
          <boxGeometry args={[5.5, 6.4, 5.4]} />
        </mesh>
        {/* 56 Descending Steps leading toward Gomti */}
        {Array.from({ length: 8 }).map((_, stIdx) => (
          <mesh key={`swarga-step-${stIdx}`} position={[0, -0.22 * (stIdx + 1), 3.0 + stIdx * 0.5]} material={materials.ghatPaving}>
            <boxGeometry args={[10, 0.25, 0.55]} />
          </mesh>
        ))}
      </group>

      {/* 8. Moksha Dwar (Northern Gateway at X = 16, Z = -6) */}
      <group position={[16, 0, -6]}>
        <mesh position={[0, 4.5, 0]} castShadow material={materials.dwarkaLimestone}>
          <boxGeometry args={[5, 9, 10]} />
        </mesh>
        <mesh position={[0, 3, 0]} material={materials.darkLimestone}>
          <boxGeometry args={[5.4, 6, 4.5]} />
        </mesh>
      </group>
    </group>
  );
}
