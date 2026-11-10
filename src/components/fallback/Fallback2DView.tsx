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
}

export default function Fallback2DView({
  destinationId,
  destinationName,
  onSwitchTo3D,
  canSwitchTo3D = true,
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
        {canSwitchTo3D && onSwitchTo3D && (
          <button
            type="button"
            onClick={onSwitchTo3D}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Switch to 3D Walk</span>
          </button>
        )}
      </header>

      {/* Main Educational Interface */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Floor Plan (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Landmark className="w-4 h-4" /> Courtyard Floor Plan
              </h2>
              <span className="text-[10px] font-mono text-zinc-500">
                Click pins to explore
              </span>
            </div>

            {/* Architectural SVG Map */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#18110a] border border-amber-900/40 p-2 shadow-inner">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full select-none"
                aria-label="Courtyard Architectural Floor Plan"
              >
                <defs>
                  <pattern
                    id="stoneGrid"
                    width="25"
                    height="25"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 25 0 L 0 0 0 25"
                      fill="none"
                      stroke="#452a16"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                  </pattern>
                </defs>

                {/* Ground Plinth Grid */}
                <rect width="500" height="500" fill="#1f160e" />
                <rect x="30" y="30" width="440" height="440" fill="url(#stoneGrid)" />

                {/* Perimeter Walls */}
                <rect x="25" y="25" width="450" height="15" fill="#8c582f" rx="2" />
                <rect x="25" y="460" width="450" height="15" fill="#8c582f" rx="2" />
                <rect x="25" y="25" width="15" height="450" fill="#8c582f" rx="2" />
                <rect x="460" y="25" width="15" height="450" fill="#8c582f" rx="2" />

                {/* Central Mandapa Octagonal Plinth */}
                <polygon
                  points="250,150 320,180 350,250 320,320 250,350 180,320 150,250 180,180"
                  fill="#3d2413"
                  stroke="#d97706"
                  strokeWidth="2"
                />
                <circle cx="250" cy="250" r="45" fill="#54331a" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* 8 Mandapa Pillars */}
                {[
                  [250, 175], [305, 195], [325, 250], [305, 305],
                  [250, 325], [195, 305], [175, 250], [195, 195],
                ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="6" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
                ))}

                {/* Baori Stepwell Terraced Cistern (West) */}
                <g transform="translate(60, 200)">
                  <rect x="0" y="0" width="100" height="100" fill="#29180c" stroke="#b45309" strokeWidth="2" rx="4" />
                  <rect x="15" y="15" width="70" height="70" fill="#1b3a4b" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="28" y="28" width="44" height="44" fill="#0284c7" />
                  <text x="50" y="55" fill="#bae6fd" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                    Baori Tank
                  </text>
                </g>

                {/* North Jharokha Balcony */}
                <g transform="translate(200, 25)">
                  <polygon points="0,0 100,0 85,25 15,25" fill="#a16207" stroke="#fef08a" strokeWidth="1" />
                  <text x="50" y="16" fill="#fef3c7" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
                    Jharokha
                  </text>
                </g>

                {/* South Torana Gateway */}
                <g transform="translate(190, 440)">
                  <rect x="0" y="0" width="120" height="12" fill="#78350f" rx="2" />
                  <circle cx="20" cy="6" r="8" fill="#f59e0b" />
                  <circle cx="100" cy="6" r="8" fill="#f59e0b" />
                  <text x="60" y="24" fill="#fde68a" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
                    Torana Gateway
                  </text>
                </g>

                {/* East Jali Screen Gallery */}
                <g transform="translate(460, 190)">
                  <rect x="-8" y="0" width="12" height="120" fill="#b45309" rx="2" />
                  <text x="-12" y="65" fill="#fde68a" fontSize="8" textAnchor="middle" transform="rotate(-90 -12 65)" fontFamily="sans-serif">
                    Jali Gallery
                  </text>
                </g>

                {/* 5 Interactive Numbered Pins */}
                {/* Pin 1: Torana Gateway (South: x=250, y=425) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'torana-gateway'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="425" r="16" fill={activeHotspot.id === 'torana-gateway' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="250" y="430" fill={activeHotspot.id === 'torana-gateway' ? '#09090b' : '#ffffff'} fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
                </g>

                {/* Pin 2: Baori Stepwell (West: x=110, y=250) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'baori-stepwell'))}
                  className="cursor-pointer group"
                >
                  <circle cx="110" cy="250" r="16" fill={activeHotspot.id === 'baori-stepwell' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="110" y="255" fill={activeHotspot.id === 'baori-stepwell' ? '#09090b' : '#ffffff'} fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
                </g>

                {/* Pin 3: Central Mandapa (Center: x=250, y=250) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'mandapa-central'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="250" r="18" fill={activeHotspot.id === 'mandapa-central' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2.5" />
                  <text x="250" y="255" fill={activeHotspot.id === 'mandapa-central' ? '#09090b' : '#ffffff'} fontSize="13" fontWeight="bold" textAnchor="middle">3</text>
                </g>

                {/* Pin 4: Stone Jharokha (North: x=250, y=65) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'jharokha-balcony'))}
                  className="cursor-pointer group"
                >
                  <circle cx="250" cy="65" r="16" fill={activeHotspot.id === 'jharokha-balcony' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="250" y="70" fill={activeHotspot.id === 'jharokha-balcony' ? '#09090b' : '#ffffff'} fontSize="12" fontWeight="bold" textAnchor="middle">4</text>
                </g>

                {/* Pin 5: Jali Screen (East: x=435, y=250) */}
                <g
                  onClick={() => setSelectedHotspotIndex(hotspots.findIndex(h => h.id === 'jali-screen'))}
                  className="cursor-pointer group"
                >
                  <circle cx="435" cy="250" r="16" fill={activeHotspot.id === 'jali-screen' ? '#f59e0b' : '#18181b'} stroke="#fef08a" strokeWidth="2" />
                  <text x="435" y="255" fill={activeHotspot.id === 'jali-screen' ? '#09090b' : '#ffffff'} fontSize="12" fontWeight="bold" textAnchor="middle">5</text>
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
