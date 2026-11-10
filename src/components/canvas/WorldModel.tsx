'use client';

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface WorldModelProps {
  modelUrl: string;
}

export default function WorldModel({ modelUrl }: WorldModelProps) {
  const gltf = useGLTF(modelUrl);

  // Clone scene so multiple instances don't mutate shared references
  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = Math.max(mat.roughness ?? 0.8, 0.2);
          mat.needsUpdate = true;
        }
      }
    });

    return scene;
  }, [gltf]);

  return <primitive object={clonedScene} />;
}

// Helper to preload GLB assets into cache
export function preloadWorldModel(url: string) {
  useGLTF.preload(url);
}
