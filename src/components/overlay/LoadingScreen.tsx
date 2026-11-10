'use client';

import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { Compass, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  destinationName?: string;
}

export default function LoadingScreen({ destinationName = 'Heritage Environment' }: LoadingScreenProps) {
  const { active, progress, item, loaded, total } = useProgress();
  const [fadedOut, setFadedOut] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setFadedOut(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (fadedOut) return null;

  const isComplete = !active && progress === 100;

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md transition-opacity duration-500 p-6 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated Brand Compass Icon */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 shadow-xl shadow-amber-500/20">
            <Compass className="w-8 h-8 animate-spin [animation-duration:8s] stroke-[2.2]" />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            Initializing 3D Pipeline
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Loading {destinationName}
          </h3>
          <p className="text-xs text-zinc-400">
            Parsing binary GLB geometry, PBR shaders, and environment lighting...
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-300 shadow-md shadow-amber-500/50"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>
              {total > 0 ? `Item ${loaded} of ${total}` : 'Downloading GLB assets...'}
            </span>
            <span className="font-bold text-amber-400">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Current Loading Item Name */}
        {item && (
          <p className="text-[10px] text-zinc-400 font-mono truncate max-w-xs mx-auto">
            {item}
          </p>
        )}
      </div>
    </div>
  );
}
