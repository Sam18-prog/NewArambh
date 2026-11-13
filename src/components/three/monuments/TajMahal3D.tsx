'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural PBR 3D Architectural Model of the Taj Mahal Complex
 * Features:
 * - 95m elevated white marble plinth
 * - Hasht-bihisht octagonal central mausoleum with arched pishtaq iwans
 * - Double-shell bulbous onion dome & 4 pillared chhatris
 * - 4 monumental corner minarets with seismic tilt
 * - Central Charbagh reflecting canal (Al-Hawd al-Kawthar) with water reflections & lotus tank
 * - Cypress tree alleys & garden quadrants
 * - Southern Great Gate (Darwaza-i-rauza) with 11 mini-chhatris
 */
export default function TajMahal3D() {
  const materials = useMemo(() => {
    return {
      whiteMarble: new THREE.MeshStandardMaterial({
        color: 0xfdfdfd,
        roughness: 0.25,
        metalness: 0.05,
      }),
      accentMarble: new THREE.MeshStandardMaterial({
        color: 0xf0f0f0,
        roughness: 0.35,
        metalness: 0.02,
      }),
      redSandstone: new THREE.MeshStandardMaterial({
        color: 0x933d2d,
        roughness: 0.82,
        metalness: 0.02,
      }),
      darkSandstone: new THREE.MeshStandardMaterial({
        color: 0x6e2c1e,
        roughness: 0.88,
        metalness: 0.02,
      }),
      pietraDuraDark: new THREE.MeshStandardMaterial({
        color: 0x1a1e24,
        roughness: 0.4,
        metalness: 0.1,
      }),
      goldFinial: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.2,
        metalness: 0.88,
      }),
      poolWater: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.06,
        metalness: 0.35,
        transparent: true,
        opacity: 0.88,
      }),
      lawn: new THREE.MeshStandardMaterial({
        color: 0x225e36,
        roughness: 0.95,
        metalness: 0.0,
      }),
      cypress: new THREE.MeshStandardMaterial({
        color: 0x163821,
        roughness: 0.9,
        metalness: 0.0,
      }),
      trunk: new THREE.MeshStandardMaterial({
        color: 0x3d271d,
        roughness: 0.9,
        metalness: 0.0,
      }),
    };
  }, []);

  return (
    <group name="TajMahalMonument">
      {/* 1. Base Red Sandstone Site Terrace */}
      <mesh position={[0, -0.2, 10]} receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[106, 0.4, 146]} />
      </mesh>

      {/* Perimeter Boundary Walls */}
      <mesh position={[-52, 3, 10]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[1.6, 6, 146]} />
      </mesh>
      <mesh position={[52, 3, 10]} castShadow receiveShadow material={materials.redSandstone}>
        <boxGeometry args={[1.6, 6, 146]} />
      </mesh>
      <mesh position={[0, 2, -62]} castShadow receiveShadow material={materials.darkSandstone}>
        <boxGeometry args={[105, 4, 2]} />
      </mesh>

      {/* 2. Elevated White Marble Terrace (Chameli Farsh) at Z = -25 */}
      <group position={[0, 0, -25]}>
        {/* Main Plinth Base */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow material={materials.whiteMarble}>
          <boxGeometry args={[56, 5, 56]} />
        </mesh>
        {/* Decorative Plinth Cornice */}
        <mesh position={[0, 5.15, 0]} receiveShadow material={materials.accentMarble}>
          <boxGeometry args={[57.2, 0.3, 57.2]} />
        </mesh>

        {/* 3. Main Octagonal Tomb Body (Rauza-i-Munawwara) */}
        <group position={[0, 5.3, 0]}>
          {/* Core Central Cube */}
          <mesh position={[0, 10.5, 0]} castShadow receiveShadow material={materials.whiteMarble}>
            <boxGeometry args={[36, 21, 36]} />
          </mesh>

          {/* 4 Cardinal Grand Pishtaqs (Deep Arched Portals) */}
          {[
            { pos: [0, 10.5, 17.6], rot: [0, 0, 0] },
            { pos: [0, 10.5, -17.6], rot: [0, Math.PI, 0] },
            { pos: [-17.6, 10.5, 0], rot: [0, Math.PI / 2, 0] },
            { pos: [17.6, 10.5, 0], rot: [0, -Math.PI / 2, 0] },
          ].map((portal, idx) => (
            <group key={`pishtaq-${idx}`} position={portal.pos as [number, number, number]} rotation={portal.rot as [number, number, number]}>
              {/* Outer Marble Frame */}
              <mesh castShadow receiveShadow material={materials.whiteMarble}>
                <boxGeometry args={[17, 18, 1.2]} />
              </mesh>
              {/* Recessed Iwan Chamber */}
              <mesh position={[0, -1, -1.8]} material={materials.pietraDuraDark}>
                <boxGeometry args={[11, 14, 3.2]} />
              </mesh>
              {/* Crown Parapet Crest */}
              <mesh position={[0, 9.8, 0]} material={materials.accentMarble}>
                <boxGeometry args={[17.8, 1.2, 1.5]} />
              </mesh>
            </group>
          ))}

          {/* 4 Chamfered Corners */}
          {[
            [-18, 18],
            [18, 18],
            [-18, -18],
            [18, -18],
          ].map(([cx, cz], idx) => (
            <mesh key={`chamfer-${idx}`} position={[cx, 10.5, cz]} rotation={[0, Math.PI / 4, 0]} castShadow material={materials.accentMarble}>
              <boxGeometry args={[7, 21, 2]} />
            </mesh>
          ))}

          {/* Roof Parapet Balustrade */}
          <mesh position={[0, 21.4, 0]} material={materials.accentMarble}>
            <boxGeometry args={[36.8, 0.8, 36.8]} />
          </mesh>

          {/* 4. Monumental Bulbous Onion Dome (Amrud) */}
          <group position={[0, 21.8, 0]}>
            {/* Cylindrical High Drum */}
            <mesh position={[0, 4, 0]} castShadow receiveShadow material={materials.whiteMarble}>
              <cylinderGeometry args={[8.8, 9.2, 8, 32]} />
            </mesh>
            {/* Swelling Bulbous Dome Shell */}
            <mesh position={[0, 13.5, 0]} castShadow material={materials.whiteMarble}>
              <sphereGeometry args={[10.2, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
            </mesh>
            {/* Crown Pointed Siphon */}
            <mesh position={[0, 21.2, 0]} castShadow material={materials.whiteMarble}>
              <cylinderGeometry args={[0.3, 3.2, 4.5, 24]} />
            </mesh>
            {/* Gilded Kalash Finial with Crescent */}
            <mesh position={[0, 24.5, 0]} castShadow material={materials.goldFinial}>
              <cylinderGeometry args={[0.08, 0.5, 5, 12]} />
            </mesh>
            <mesh position={[0, 27.2, 0]} material={materials.goldFinial}>
              <sphereGeometry args={[0.6, 16, 16]} />
            </mesh>
          </group>

          {/* 4 Corner Octagonal Pillared Chhatris */}
          {[
            [-14, -14],
            [14, -14],
            [-14, 14],
            [14, 14],
          ].map(([cx, cz], idx) => (
            <group key={`chhatri-${idx}`} position={[cx, 21.8, cz]}>
              {/* 8 Columns */}
              {Array.from({ length: 8 }).map((_, cIdx) => {
                const angle = (cIdx * Math.PI * 2) / 8;
                return (
                  <mesh key={cIdx} position={[Math.cos(angle) * 2.2, 2.5, Math.sin(angle) * 2.2]} material={materials.whiteMarble}>
                    <cylinderGeometry args={[0.22, 0.25, 5, 8]} />
                  </mesh>
                );
              })}
              {/* Chhatri Cupola Dome */}
              <mesh position={[0, 6, 0]} castShadow material={materials.whiteMarble}>
                <sphereGeometry args={[2.8, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              </mesh>
              <mesh position={[0, 8.2, 0]} material={materials.goldFinial}>
                <cylinderGeometry args={[0.05, 0.2, 1.8, 8]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* 5. Four Monumental Minarets at Corner Corners */}
        {[
          { x: -26, z: -26, tiltX: -0.012, tiltZ: -0.012 },
          { x: 26, z: -26, tiltX: 0.012, tiltZ: -0.012 },
          { x: -26, z: 26, tiltX: -0.012, tiltZ: 0.012 },
          { x: 26, z: 26, tiltX: 0.012, tiltZ: 0.012 },
        ].map((minaret, idx) => (
          <group
            key={`minaret-${idx}`}
            position={[minaret.x, 5.0, minaret.z]}
            rotation={[minaret.tiltZ, 0, minaret.tiltX]}
          >
            {/* Octagonal Plinth Base */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow material={materials.whiteMarble}>
              <cylinderGeometry args={[2.8, 3.2, 3, 8]} />
            </mesh>
            {/* Tier 1 Shaft */}
            <mesh position={[0, 7.5, 0]} castShadow material={materials.whiteMarble}>
              <cylinderGeometry args={[2.2, 2.6, 9, 24]} />
            </mesh>
            {/* Balcony 1 */}
            <mesh position={[0, 12.2, 0]} material={materials.accentMarble}>
              <cylinderGeometry args={[2.7, 2.3, 0.6, 24]} />
            </mesh>
            {/* Tier 2 Shaft */}
            <mesh position={[0, 17, 0]} castShadow material={materials.whiteMarble}>
              <cylinderGeometry args={[1.8, 2.1, 9, 24]} />
            </mesh>
            {/* Balcony 2 */}
            <mesh position={[0, 21.7, 0]} material={materials.accentMarble}>
              <cylinderGeometry args={[2.3, 1.9, 0.6, 24]} />
            </mesh>
            {/* Tier 3 Shaft */}
            <mesh position={[0, 26, 0]} castShadow material={materials.whiteMarble}>
              <cylinderGeometry args={[1.5, 1.7, 8, 24]} />
            </mesh>
            {/* Balcony 3 */}
            <mesh position={[0, 30.2, 0]} material={materials.accentMarble}>
              <cylinderGeometry args={[2.0, 1.6, 0.5, 24]} />
            </mesh>
            {/* Crowning Chhatri */}
            <mesh position={[0, 32.5, 0]} castShadow material={materials.whiteMarble}>
              <sphereGeometry args={[1.6, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            </mesh>
            <mesh position={[0, 34.5, 0]} material={materials.goldFinial}>
              <cylinderGeometry args={[0.04, 0.15, 2.2, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. Charbagh Paradise Gardens & Central Water Pool */}
      <group position={[0, 0, 0]}>
        {/* 4 Sunken Lawn Quadrants */}
        {[
          { x: -24, z: 23, w: 32, l: 30 },
          { x: 24, z: 23, w: 32, l: 30 },
          { x: -24, z: 53, w: 32, l: 24 },
          { x: 24, z: 53, w: 32, l: 24 },
        ].map((lawn, idx) => (
          <mesh key={`lawn-${idx}`} position={[lawn.x, 0.08, lawn.z]} receiveShadow material={materials.lawn}>
            <boxGeometry args={[lawn.w, 0.15, lawn.l]} />
          </mesh>
        ))}

        {/* Central Long Reflecting Pool (Al-Hawd al-Kawthar canal) */}
        <group position={[0, 0, 36]}>
          {/* Raised Sandstone Curb */}
          <mesh position={[0, 0.2, 0]} receiveShadow material={materials.redSandstone}>
            <boxGeometry args={[7.2, 0.4, 50]} />
          </mesh>
          {/* White Marble Coping */}
          <mesh position={[0, 0.22, 0]} receiveShadow material={materials.whiteMarble}>
            <boxGeometry args={[6.2, 0.45, 49]} />
          </mesh>
          {/* Water Surface */}
          <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.poolWater}>
            <planeGeometry args={[5.4, 48]} />
          </mesh>
          {/* Center Lotus Tank (Hawd al-Kawthar) */}
          <mesh position={[0, 0.32, 0]} receiveShadow material={materials.whiteMarble}>
            <boxGeometry args={[10.5, 0.65, 10.5]} />
          </mesh>
          <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.poolWater}>
            <planeGeometry args={[8.8, 8.8]} />
          </mesh>
        </group>

        {/* Cypress Trees Flanking the Canal */}
        {[-4.6, 4.6].map((tx, rowIdx) => (
          <group key={`cypress-row-${rowIdx}`}>
            {Array.from({ length: 8 }).map((_, cIdx) => {
              const tz = 14 + cIdx * 6;
              return (
                <group key={`tree-${rowIdx}-${cIdx}`} position={[tx, 0, tz]}>
                  {/* Trunk */}
                  <mesh position={[0, 1.0, 0]} material={materials.trunk}>
                    <cylinderGeometry args={[0.15, 0.2, 2.0, 8]} />
                  </mesh>
                  {/* Dense Conical Foliage */}
                  <mesh position={[0, 3.5, 0]} castShadow material={materials.cypress}>
                    <coneGeometry args={[0.9, 4.5, 8]} />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>

      {/* 7. Southern Great Gate (Darwaza-i-rauza) at Z = 68 */}
      <group position={[0, 0, 68]}>
        <mesh position={[0, 7.5, 0]} castShadow receiveShadow material={materials.redSandstone}>
          <boxGeometry args={[32, 15, 8]} />
        </mesh>
        {/* Recessed Iwan Portal */}
        <mesh position={[0, 5.25, -2.4]} material={materials.pietraDuraDark}>
          <boxGeometry args={[11, 10.5, 3.5]} />
        </mesh>
        {/* White Marble Calligraphic Frame */}
        <mesh position={[0, 6.0, -3.9]} material={materials.whiteMarble}>
          <boxGeometry args={[12.6, 12, 0.4]} />
        </mesh>
        {/* Open Walkway Passage */}
        <mesh position={[0, 2.25, 0]} material={materials.pietraDuraDark}>
          <boxGeometry args={[5.0, 4.5, 8.4]} />
        </mesh>
        {/* 2 Corner Towers with Cupolas */}
        {[-16, 16].map((gx, idx) => (
          <group key={`gate-tower-${idx}`} position={[gx, 0, 0]}>
            <mesh position={[0, 8.25, 0]} castShadow material={materials.redSandstone}>
              <cylinderGeometry args={[1.4, 1.6, 16.5, 8]} />
            </mesh>
            <mesh position={[0, 16.5, 0]} material={materials.whiteMarble}>
              <sphereGeometry args={[1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            </mesh>
          </group>
        ))}
        {/* 11 Decorative Parapet Chhatris */}
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={i} position={[-12.5 + i * 2.5, 15.2, 0]} material={materials.whiteMarble}>
            <sphereGeometry args={[0.55, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
