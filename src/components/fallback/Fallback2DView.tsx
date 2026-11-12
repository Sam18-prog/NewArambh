'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Layers,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Eye,
  Box,
} from 'lucide-react';
import { EducationalHotspot } from '@/types/hotspot';
import { getHotspotsByDestination } from '@/lib/hotspots/getHotspots';

interface Fallback2DViewProps {
  destinationId: string;
  destinationName: string;
  onSwitchTo3D?: () => void;
  canSwitchTo3D?: boolean;
  webGLError?: string;
}

export default function Fallback2DView({
  destinationId,
  destinationName,
  onSwitchTo3D,
  canSwitchTo3D = true,
  webGLError,
}: Fallback2DViewProps) {
  const hotspots: EducationalHotspot[] = getHotspotsByDestination(destinationId);
  const [selectedHotspotIndex, setSelectedHotspotIndex] = useState(0);

  const activeHotspot = hotspots[selectedHotspotIndex] || hotspots[0];
  const activeImage = activeHotspot.gallery && activeHotspot.gallery.length > 0 ? activeHotspot.gallery[0] : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between p-4 sm:px-8 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href={`/explore/${destinationId}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Return to Overview</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-bold text-white">{destinationName}</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> 2D Interactive Floor Plan
            </span>
          </div>
        </div>

        {/* Switch to 3D Button if available */}
        {canSwitchTo3D && onSwitchTo3D ? (
          <button
            type="button"
            onClick={onSwitchTo3D}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Switch to 3D Experience</span>
          </button>
        ) : (
          <span className="text-[11px] font-medium text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            2D Mode Active
          </span>
        )}
      </header>

      {/* Helpful WebGL Unsupported Notice if 3D is genuinely unavailable */}
      {webGLError && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Hardware Notice:</strong> {webGLError} All educational hotspots, architectural stories,
              and academic citations are fully accessible through this 2D interactive floor plan.
            </span>
          </div>
        </div>
      )}

      {/* Main Educational Interface */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Floor Plan (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Landmark className="w-4 h-4" /> Taj Mahal Site Plan
              </h2>
              <span className="text-[10px] font-mono text-zinc-500">
                Click pins to explore
              </span>
            </div>

            {/* Architectural SVG Map of the Taj Mahal Complex */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0d141e] border border-amber-900/40 p-2 shadow-inner">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full select-none"
                aria-label="Taj Mahal Complex Architectural Floor Plan"
              >
                <defs>
                  <pattern
                    id="marbleGrid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  </pattern>
                  <pattern
                    id="gardenTexture"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="16" height="16" fill="#1b4332" />
                    <circle cx="8" cy="8" r="1.5" fill="#2d6a4f" opacity="0.6" />
                  </pattern>
                </defs>

                {/* Outer Site Ground */}
                <rect width="500" height="500" fill="#0f172a" />

                {/* Yamuna River (North Riverfront) */}
                <rect x="0" y="0" width="500" height="42" fill="#1e3a5f" opacity="0.9" />
                <path d="M 0 32 Q 125 38 250 32 T 500 32" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.7" />
                <text x="250" y="22" fill="#93c5fd" fontSize="9" fontWeight="bold" letterSpacing="2" textAnchor="middle" fontFamily="sans-serif">
                  YAMUNA RIVER (NORTH)
                </text>

                {/* Red Sandstone Riverfront Terrace (Chameli Farsh) */}
                <rect x="60" y="48" width="380" height="140" fill="#8f3c2c" stroke="#6e2c1e" strokeWidth="1.5" rx="3" />

                {/* White Makrana Marble Plinth (Marmar Farsh) */}
                <rect x="135" y="55" width="230" height="125" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" rx="2" />
                <rect x="135" y="55" width="230" height="125" fill="url(#marbleGrid)" />

                {/* Four Corner Minarets */}
                {[
                  { cx: 146, cy: 66, label: 'NW Minaret' },
                  { cx: 354, cy: 66, label: 'NE Minaret' },
                  { cx: 146, cy: 169, label: 'SW Minaret' },
                  { cx: 354, cy: 169, label: 'SE Minaret' },
                ].map((m, idx) => (
                  <g key={idx}>
                    <polygon
                      points={`${m.cx-8},${m.cy-4} ${m.cx-4},${m.cy-8} ${m.cx+4},${m.cy-8} ${m.cx+8},${m.cy-4} ${m.cx+8},${m.cy+4} ${m.cx+4},${m.cy+8} ${m.cx-4},${m.cy+8} ${m.cx-8},${m.cy+4}`}
                      fill="#e2e8f0"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />
                    <circle cx={m.cx} cy={m.cy} r="5" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
                    <circle cx={m.cx} cy={m.cy} r="1.5" fill="#f59e0b" />
                  </g>
                ))}

                {/* Main Mausoleum (Baghdadi Octagon Plan) */}
                <polygon
                  points="215,75 285,75 315,95 315,140 285,160 215,160 185,140 185,95"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                {/* Four Vaulted Arched Iwans (Pishtaq Recesses) */}
                <rect x="232" y="73" width="36" height="10" fill="#1e2229" />
                <rect x="232" y="152" width="36" height="10" fill="#1e2229" />
                <rect x="183" y="106" width="10" height="36" fill="#1e2229" />
                <rect x="307" y="106" width="10" height="36" fill="#1e2229" />

                {/* Central Bulbous Onion Dome & Gilded Kalash Spire */}
                <circle cx="250" cy="118" r="26" fill="#f1f5f9" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="250" cy="118" r="20" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="250" cy="118" r="4" fill="#f59e0b" />

                {/* Four Roof Chhatris */}
                {[
                  [205, 96], [295, 96],
                  [205, 139], [295, 139],
                ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="6" fill="#e2e8f0" stroke="#f59e0b" strokeWidth="1.2" />
                ))}

                {/* South Staircase from Garden to Marble Plinth */}
                <rect x="236" y="180" width="28" height="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

                {/* Charbagh Four-Part Paradise Gardens */}
                <rect x="60" y="196" width="380" height="236" fill="#1b281d" rx="2" />

                {/* 4 Green Lawn Quadrants */}
                <rect x="74" y="206" width="156" height="98" fill="url(#gardenTexture)" rx="4" stroke="#2d6a4f" strokeWidth="1" />
                <rect x="270" y="206" width="156" height="98" fill="url(#gardenTexture)" rx="4" stroke="#2d6a4f" strokeWidth="1" />
                <rect x="74" y="322" width="156" height="98" fill="url(#gardenTexture)" rx="4" stroke="#2d6a4f" strokeWidth="1" />
                <rect x="270" y="322" width="156" height="98" fill="url(#gardenTexture)" rx="4" stroke="#2d6a4f" strokeWidth="1" />

                {/* East-West Transverse Paved Walkway */}
                <rect x="60" y="306" width="380" height="14" fill="#8f3c2c" />

                {/* North-South Axial Reflecting Canal (Al-Hawd al-Kawthar) */}
                <rect x="238" y="196" width="24" height="236" fill="#8f3c2c" />
                <rect x="242" y="198" width="16" height="232" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />

                {/* Cypress Trees Line along the Reflecting Pool */}
                {[214, 238, 262, 342, 366, 390].map((treeY, idx) => (
                  <g key={idx}>
                    <circle cx="234" cy={treeY} r="3.5" fill="#143d24" stroke="#225e36" strokeWidth="0.8" />
                    <circle cx="266" cy={treeY} r="3.5" fill="#143d24" stroke="#225e36" strokeWidth="0.8" />
                  </g>
                ))}

                {/* Center Raised Lotus Pool (Al-Hawd al-Kawthar Tank) */}
                <rect x="228" y="296" width="44" height="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" rx="3" />
                <circle cx="250" cy="318" r="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
                <circle cx="250" cy="318" r="4" fill="#f59e0b" />

                {/* Southern Great Gate (Darwaza-i-rauza) */}
                <g transform="translate(190, 442)">
                  <rect x="0" y="0" width="120" height="34" fill="#8f3c2c" stroke="#6e2c1e" strokeWidth="1.5" rx="3" />
                  <rect x="36" y="6" width="48" height="28" fill="#1e2229" rx="2" />
                  <rect x="42" y="12" width="36" height="22" fill="#3b1d15" rx="1" />
                  <circle cx="6" cy="17" r="7" fill="#8f3c2c" stroke="#f59e0b" strokeWidth="1" />
                  <circle cx="114" cy="17" r="7" fill="#8f3c2c" stroke="#f59e0b" strokeWidth="1" />
                  <text x="60" y="26" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    DARWAZA-I-RAUZA
                  </text>
                </g>

                {/* 5 Interactive Numbered Clickable Pins */}

                {/* Pin 1: Main Mausoleum (Rauza-i-Munawwara: x=250, y=138) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'hotspot-mausoleum'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="138" r="15" fill={activeHotspot.id === 'hotspot-mausoleum' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2.5" />
                  <text x="250" y="143" fill={activeHotspot.id === 'hotspot-mausoleum' ? '#09090b' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
                </g>

                {/* Pin 2: Central Onion Dome & Chhatris (Center: x=250, y=105) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'hotspot-dome'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="105" r="14" fill={activeHotspot.id === 'hotspot-dome' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="250" y="110" fill={activeHotspot.id === 'hotspot-dome' ? '#09090b' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
                </g>

                {/* Pin 3: Four Monumental Minarets (SE Minaret: x=354, y=169) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'hotspot-minarets'))}
                  className="cursor-pointer group"
                >
                  <circle cx="354" cy="169" r="14" fill={activeHotspot.id === 'hotspot-minarets' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="354" y="174" fill={activeHotspot.id === 'hotspot-minarets' ? '#09090b' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
                </g>

                {/* Pin 4: Grand Pishtaq Iwan (South Portal: x=250, y=164) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'hotspot-pishtaq'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="164" r="14" fill={activeHotspot.id === 'hotspot-pishtaq' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="250" y="169" fill={activeHotspot.id === 'hotspot-pishtaq' ? '#09090b' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
                </g>

                {/* Pin 5: Charbagh Gardens & Reflecting Pool (Pool Tank: x=250, y=318) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'hotspot-reflecting-pool'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="318" r="15" fill={activeHotspot.id === 'hotspot-reflecting-pool' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2.5" />
                  <text x="250" y="323" fill={activeHotspot.id === 'hotspot-reflecting-pool' ? '#09090b' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
                </g>
              </svg>
            </div>

            {/* Landmark Quick Selection Pills */}
            <div className="space-y-1.5">
              {hotspots.map((h, idx) => {
                const isCurrent = h.id === activeHotspot.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHotspotIndex(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] ${
                        isCurrent ? 'bg-zinc-950 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{h.name}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-70">
                      {h.category.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Educational Article & Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <article className="p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
            {/* Header & Category Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                  <Landmark className="w-3.5 h-3.5" />
                  {activeHotspot.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Landmark {selectedHotspotIndex + 1} of {hotspots.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeHotspot.name}
              </h1>

              {activeHotspot.hindiName && (
                <div className="text-sm font-medium text-amber-300/80">
                  {activeHotspot.hindiName}
                </div>
              )}
            </div>

            {/* Lead Summary */}
            <p className="text-sm sm:text-base text-zinc-200 font-semibold leading-relaxed border-l-2 border-amber-400 pl-4">
              {activeHotspot.shortDescription}
            </p>

            {/* Visual Diagram or Image */}
            {activeImage && (
              <div className="space-y-2">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl">
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 680px"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 px-1 gap-1">
                  <span>{activeImage.caption}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {activeImage.attribution}
                  </span>
                </div>
              </div>
            )}

            {/* Detailed Architectural Explanation */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Architectural History &amp; Design
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeHotspot.detailedDescription}
              </p>
            </div>

            {/* Cultural Significance */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Cultural &amp; Civic Significance
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeHotspot.culturalSignificance}
              </p>
            </div>

            {/* Key Features List */}
            {activeHotspot.architecturalDetails && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Key Architectural Elements
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {activeHotspot.architecturalDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span className="text-zinc-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources & Citations */}
            {activeHotspot.sources && (
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Curatorial Sources &amp; Citations
                </h3>
                <div className="space-y-1.5 text-xs">
                  {activeHotspot.sources.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between text-zinc-400">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors underline underline-offset-2"
                      >
                        <span>{source.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {source.authorOrPublisher}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2D Sequence Navigation Footer */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedHotspotIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedHotspotIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedHotspotIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-zinc-800 text-zinc-600 bg-zinc-900/40'
                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Landmark</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedHotspotIndex((prev) =>
                    Math.min(hotspots.length - 1, prev + 1)
                  )
                }
                disabled={selectedHotspotIndex === hotspots.length - 1}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedHotspotIndex === hotspots.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-zinc-800 text-zinc-500'
                    : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-md shadow-amber-500/20'
                }`}
              >
                <span>Next Landmark</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
