'use client';

import React from 'react';
import { SceneCollider } from '@/types/collision';

interface CollisionSystemProps {
  colliders: SceneCollider[];
  visible?: boolean;
}

/**
 * Visual debugging component for physical colliders.
 * Renders color-coded wireframes for boxes, cylinders, and climbable steps.
 * When visible=false, it costs zero draw calls and renders nothing.
 */
export default function CollisionSystem({ colliders, visible = false }: CollisionSystemProps) {
  if (!visible) return null;

  return (
    <group name="Physics-Collision-Debug-Wireframes">
      {colliders.map((collider) => {
        if (collider.type === 'cylinder') {
          return (
            <mesh key={collider.id} position={collider.center}>
              <cylinderGeometry args={[collider.radius, collider.radius, collider.height, 16]} />
              <meshBasicMaterial
                wireframe
                color="#f59e0b" // Amber/Yellow for Pillars & Columns
                transparent
                opacity={0.7}
              />
            </mesh>
          );
        }

        if (collider.type === 'box') {
          return (
            <mesh key={collider.id} position={collider.center}>
              <boxGeometry args={collider.size} />
              <meshBasicMaterial
                wireframe
                color="#06b6d4" // Cyan for Perimeter & Stepwell Rim Walls
                transparent
                opacity={0.6}
              />
            </mesh>
          );
        }

        if (collider.type === 'step') {
          return (
            <mesh key={collider.id} position={collider.center}>
              <boxGeometry args={collider.size} />
              <meshBasicMaterial
                wireframe
                color="#ec4899" // Pink/Magenta for Climbable Plinth Steps
                transparent
                opacity={0.65}
              />
            </mesh>
          );
        }

        return null;
      })}
    </group>
  );
}
