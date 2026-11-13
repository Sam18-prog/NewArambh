'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Gamepad2,
  Smartphone,
  ShieldAlert,
  Layers,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface UpcomingFeaturesProps {
  className?: string;
}

export default function UpcomingFeatures({ className = '' }: UpcomingFeaturesProps) {
  return (
    <section
      className={`rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#18110b] via-[#120c07] to-[#0a0704] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden relative ${className}`}
      aria-label="Upcoming 3D features roadmap"
    >
      {/* Decorative Blueprint Glow in Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Live 3D Engine Badge */}
      <div className="relative z-10 space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Universal 3D Engine • Live Across All 9 Destinations</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Immersive 3D Heritage Walkthroughs
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          Experience authentic real-time 3D architectural exploration. Walk through sacred monuments and ancient citadels at true human scale with desktop WASD controls, mobile dual-zone touch, in-scene discovery beacons, and guided tours.
        </p>
      </div>

      {/* Feature Pillars Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Pillar 1: Physical Collision & Scale */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Physical Collision Engine</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Authentic mathematical collision boundaries preventing players from walking through stone pillars, fortified walls, balustrades, or ornamental stepwell terraces.
          </p>
          <div className="pt-2 text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pillar & wall sliding physics</span>
          </div>
        </div>

        {/* Pillar 2: Desktop Controls */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Desktop First-Person Controls</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Smooth WASD and Arrow key navigation, Pointer Lock 360-degree mouse look, Sprint key for expansive courtyards, and step-climbing mechanics.
          </p>
          <div className="pt-2 text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>WASD + Pointer Lock</span>
          </div>
        </div>

        {/* Pillar 3: Mobile Touch Controls */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Mobile Dual-Zone Touch</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Seamless smartphone exploration with a floating analog virtual joystick on the left side and a smooth touch-look pan zone on the right side.
          </p>
          <div className="pt-2 text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero install • Mobile browser</span>
          </div>
        </div>

        {/* Pillar 4: In-World Hotspots */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Interactive 3D Hotspots</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Approach physical monuments and inspect architectural features in 3D space to trigger rich educational dossiers with historical context and citations.
          </p>
          <div className="pt-2 text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>In-scene discovery markers</span>
          </div>
        </div>

        {/* Pillar 5: Photorealistic Optimization */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">WebXR & PBR Lighting</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Physically based rendering (PBR) calibrated for daylight cycles, architectural materials (Makrana marble, sandstone), and future VR headset immersion.
          </p>
          <div className="pt-2 text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>WebGL 2.0 & WebXR Ready</span>
          </div>
        </div>

        {/* Pillar 6: Live 3D Walkthrough Portal */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-amber-300">Live 3D Walkthroughs</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Explore Taj Mahal, Red Fort, Agra Fort, Rani-ki-Vav, Dholavira, Champaner, Sarnath, Somnath Mandir, and Dwarka Mandir in genuine 3D.
            </p>
          </div>
          <Link
            href="/explore/taj-mahal/3d"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-500/20"
          >
            <span>Enter Taj Mahal 3D</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
