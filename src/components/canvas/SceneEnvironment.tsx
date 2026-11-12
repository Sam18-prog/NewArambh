'use client';

import React from 'react';

export default function SceneEnvironment() {
  return (
    <>
      {/* Background Clear Color & Atmospheric Depth Fog */}
      <color attach="background" args={['#111827']} />
      <fog attach="fog" args={['#182132', 55, 220]} />

      {/* Ambient Lighting for Makrana White Marble Illumination */}
      <ambientLight color="#f8fafc" intensity={0.9} />

      {/* Hemisphere Light for Clear Sky and Warm Sandstone Bounce */}
      <hemisphereLight
        args={['#bae6fd', '#451a03', 0.75]}
        position={[0, 80, 0]}
      />

      {/* Primary Directional Sunlight with Shadows */}
      <directionalLight
        position={[45, 65, 45]}
        intensity={2.6}
        color="#fffbeb"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={220}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-bias={-0.00015}
      />

      {/* Secondary Fill Light from Opposite Side */}
      <directionalLight
        position={[-40, 35, -35]}
        intensity={0.8}
        color="#e0f2fe"
      />

      {/* Subtle Luminous Bounce over Reflecting Pool (Al-Hawd al-Kawthar) */}
      <pointLight
        position={[0, 2.2, 36]}
        color="#38bdf8"
        intensity={20}
        distance={35}
        decay={2}
      />

      {/* Warm Ambient Glow at South Pishtaq Entrance Archway */}
      <pointLight
        position={[0, 5.5, -12]}
        color="#fef3c7"
        intensity={22}
        distance={24}
        decay={2}
      />
    </>
  );
}
