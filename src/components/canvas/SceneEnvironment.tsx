'use client';

import React from 'react';

export default function SceneEnvironment() {
  return (
    <>
      {/* Background Clear Color & Atmospheric Depth Fog */}
      <color attach="background" args={['#0e0703']} />
      <fog attach="fog" args={['#1a0c04', 32, 90]} />

      {/* Ambient Lighting for Base Sandstone Illumination */}
      <ambientLight color="#fff7ed" intensity={0.7} />

      {/* Hemisphere Light for Desert Sky and Warm Earth Tone Bounce */}
      <hemisphereLight
        args={['#fde68a', '#3b1c06', 0.6]}
        position={[0, 50, 0]}
      />

      {/* Primary Directional Sunlight with Shadows */}
      <directionalLight
        position={[25, 40, 22]}
        intensity={2.2}
        color="#fff2d5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-bias={-0.00015}
      />

      {/* Secondary Fill Light from Opposite Side */}
      <directionalLight
        position={[-20, 20, -15]}
        intensity={0.6}
        color="#fdba74"
      />

      {/* Warm Point Light at Central Mandapa (Simulating Oil Lamps / Diyas) */}
      <pointLight
        position={[0, 2.8, 0]}
        color="#f59e0b"
        intensity={35}
        distance={16}
        decay={2}
      />

      {/* Baori Stepwell Subtle Water Glow */}
      <pointLight
        position={[-11, 0.4, 4]}
        color="#38bdf8"
        intensity={12}
        distance={10}
        decay={2}
      />
    </>
  );
}
