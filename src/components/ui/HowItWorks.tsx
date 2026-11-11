import React from 'react';
import Link from 'next/link';
import { Footprints, Eye, Route, Sparkles, Move, MousePointer, Compass, Shield } from 'lucide-react';

export default function HowItWorks() {
  const modes = [
    {
      id: 'walk',
      title: 'First-Person Walk Mode',
      subtitle: 'Free-Roam Gaming-Style Movement',
      description:
        'Walk through architectural spaces freely using standard WASD/arrow keys and mouse look (or mobile dual virtual joysticks). Built-in collision bounds ensure you stay grounded and interact naturally with walls, stairs, and doors.',
      icon: Footprints,
      accent: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
      features: [
        'Desktop WASD keys & Pointer Lock mouse look',
        'Mobile floating virtual joystick & touch drag',
        'Physical collision & floor height clamping',
        'Proximity detection near interactive hotspots',
      ],
    },
    {
      id: 'inspect',
      title: 'Model Inspection Mode',
      subtitle: '360° Detailed Orbit & Zoom',
      description:
        'Examine historical artifacts, intricate stone carvings, and building elevations up close. Orbit around key focal points, zoom into fine details, and discover the curatorial story behind every sculpture.',
      icon: Eye,
      accent: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-400',
      features: [
        'Intuitive 360-degree orbital rotation',
        'Pinch-to-zoom and multi-angle inspection',
        'High-resolution PBR textures and normal maps',
        'Detailed curator notes and historical references',
      ],
    },
    {
      id: 'tour',
      title: 'Guided Tour Mode',
      subtitle: 'Automated Cinematic Journey',
      description:
        'Prefer a relaxing, curated journey? Sit back as our cinematic camera glides along a smooth spline curve through key landmarks, automatically stopping at major hotspots to narrate their cultural significance.',
      icon: Route,
      accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      features: [
        'Curated spline path with smooth camera lerping',
        'Automatic waypoint navigation through 5 key stops',
        'Dwell time with synced informational overlays',
        'Seamless toggle back to Free Roam at any point',
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Modalities
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Three Ways to Explore
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          Whether you want the complete agency of a first-person video game, the focused scrutiny of an
          art curator, or the effortless narrative of a documentary tour.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modes.map((mode, index) => {
          const Icon = mode.icon;
          return (
            <div
              key={mode.id}
              className="relative rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.accent} border flex items-center justify-center`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-2xl font-black text-zinc-700 select-none">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{mode.title}</h3>
                  <p className="text-xs text-amber-400/90 font-medium mt-0.5">{mode.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {mode.description}
                </p>

                <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Key Capabilities:
                  </p>
                  <ul className="text-xs text-zinc-300 space-y-1.5">
                    {mode.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Included in all destinations
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Tips Pill & 2D Accessibility Banner */}
      <div className="mt-12 space-y-4">
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Move className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Universal Controls Architecture</p>
              <p>
                Desktop: WASD + Mouse Look. Mobile: Floating Virtual Joystick + Swipe. No plugins or
                external downloads required.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-300 shrink-0">
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-3.5 h-3.5 text-amber-400" /> Click to Lock
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> Free Orbit
            </span>
          </div>
        </div>

        {/* 2D Floor Plan Inclusion Callout */}
        <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p>
              <span className="font-bold text-white">Universal 2D Floor Plan Included:</span> Older hardware or slow mobile connection?
              Every destination provides an instant SVG architectural blueprint with interactive hotspot pins and zero GPU load.
            </p>
          </div>
          <Link
            href="/explore/heritage-courtyard/experience?mode=2d"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors shrink-0"
          >
            <span>Try 2D Floor Plan</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
