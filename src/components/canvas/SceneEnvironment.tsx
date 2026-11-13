'use client';

import React from 'react';

interface SceneEnvironmentProps {
  preset?: 'daylight' | 'sunset' | 'desert' | 'coastal';
}

export default function SceneEnvironment({ preset = 'daylight' }: SceneEnvironmentProps) {
  switch (preset) {
    case 'sunset':
      return (
        <>
          <color attach="background" args={['#2a1215']} />
          <fog attach="fog" args={['#3d1a1d', 45, 200]} />
          <ambientLight color="#fed7aa" intensity={0.9} />
          <hemisphereLight args={['#fb923c', '#451a03', 0.85]} position={[0, 80, 0]} />
          <directionalLight
            position={[-50, 35, 40]}
            intensity={2.8}
            color="#ffedd5"
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
          <directionalLight position={[40, 25, -30]} intensity={0.6} color="#fdba74" />
        </>
      );

    case 'desert':
      return (
        <>
          <color attach="background" args={['#1c1611']} />
          <fog attach="fog" args={['#292018', 50, 220]} />
          <ambientLight color="#fef3c7" intensity={0.95} />
          <hemisphereLight args={['#e0f2fe', '#78350f', 0.8]} position={[0, 80, 0]} />
          <directionalLight
            position={[45, 75, 35]}
            intensity={3.0}
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
          <directionalLight position={[-40, 30, -30]} intensity={0.7} color="#fed7aa" />
        </>
      );

    case 'coastal':
      return (
        <>
          <color attach="background" args={['#0f172a']} />
          <fog attach="fog" args={['#132238', 50, 210]} />
          <ambientLight color="#f0f9ff" intensity={0.95} />
          <hemisphereLight args={['#38bdf8', '#0c4a6e', 0.85]} position={[0, 80, 0]} />
          <directionalLight
            position={[40, 60, 45]}
            intensity={2.9}
            color="#fffdf5"
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
          <directionalLight position={[-35, 30, -40]} intensity={0.8} color="#bae6fd" />
        </>
      );

    case 'daylight':
    default:
      return (
        <>
          <color attach="background" args={['#0f172a']} />
          <fog attach="fog" args={['#182338', 55, 230]} />
          <ambientLight color="#f8fafc" intensity={0.92} />
          <hemisphereLight args={['#bae6fd', '#451a03', 0.8]} position={[0, 80, 0]} />
          <directionalLight
            position={[45, 65, 45]}
            intensity={2.7}
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
          <directionalLight position={[-40, 35, -35]} intensity={0.75} color="#e0f2fe" />
        </>
      );
  }
}
