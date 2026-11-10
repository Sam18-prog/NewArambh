'use client';

import React, { useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EducationalHotspot } from '@/types/hotspot';

interface HotspotPromptProps {
  hotspot: EducationalHotspot | null;
  onActivate: (hotspot: EducationalHotspot) => void;
  isTouchDevice?: boolean;
}

export default function HotspotPrompt({
  hotspot,
  onActivate,
  isTouchDevice = false,
}: HotspotPromptProps) {
  // Listen for desktop 'E' or 'e' key
  useEffect(() => {
    if (!hotspot) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === 'KeyE') {
        e.preventDefault();
        onActivate(hotspot);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotspot, onActivate]);

  if (!hotspot) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 sm:bottom-20 z-40 flex items-center justify-center p-4 select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={() => onActivate(hotspot)}
        className="pointer-events-auto group flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-950/90 hover:bg-zinc-900 text-white border border-amber-400/80 backdrop-blur-xl shadow-2xl shadow-amber-500/20 active:scale-95 transition-all hover:scale-105"
        aria-label={`Discover ${hotspot.name}`}
      >
        {/* Pulsing Icon or Key Badge */}
        {isTouchDevice ? (
          <div className="w-7 h-7 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-md shadow-amber-500/30">
            <Sparkles className="w-4 h-4 fill-current animate-spin-slow" />
          </div>
        ) : (
          <kbd className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-400 text-zinc-950 font-mono font-black text-xs shadow-md shadow-amber-500/30">
            E
          </kbd>
        )}

        {/* Text Details */}
        <div className="text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block leading-none">
            {isTouchDevice ? 'Tap to Discover' : 'Press [E] to Discover'}
          </span>
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
            {hotspot.name}
          </span>
        </div>

        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform ml-1" />
      </button>
    </div>
  );
}
