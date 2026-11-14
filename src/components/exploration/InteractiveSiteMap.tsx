'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Destination } from '@/types/destination';
import { Landmark } from '@/types/landmark';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Layers,
  Info,
  Search,
  Filter,
  X,
} from 'lucide-react';

interface InteractiveSiteMapProps {
  destination: Destination;
  selectedLandmarkId?: string | null;
  onSelectLandmark: (landmark: Landmark) => void;
  className?: string;
  showControls?: boolean;
}

export default function InteractiveSiteMap({
  destination,
  selectedLandmarkId,
  onSelectLandmark,
  className = '',
  showControls = true,
}: InteractiveSiteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(false);
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);
  const [mapSearch, setMapSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Available categories in this destination
  const landmarkCategories = useMemo(() => {
    const cats = new Set<string>();
    destination.landmarks.forEach((l) => cats.add(l.category));
    return ['all', ...Array.from(cats)];
  }, [destination.landmarks]);

  // Reset view
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.8));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.75));

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click and if not clicking a pin directly
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag handling
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - touchStartRef.current.x,
      y: e.touches[0].clientY - touchStartRef.current.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#110c08] via-[#1a120b] to-[#0c0805] border border-amber-900/30 select-none shadow-2xl ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label={`Interactive site plan for ${destination.name}`}
    >
      {/* Decorative Blueprint Background Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 119, 6, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 119, 6, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* SVG Canvas with Pan & Zoom Transform */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full max-w-[650px] max-h-[650px] p-6 drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Architectural Gradients */}
            <radialGradient id="sandstoneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="marbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="sandstoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gardenGrass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14532d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.25" />
            </linearGradient>

            {/* Filter for glowing pin */}
            <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Destination Specific Schematic Background Architectural Layer */}
          {renderDestinationSchematic(destination.id)}

          {/* Landmark Interactive SVG Pins */}
          <g className="landmark-pins">
            {destination.landmarks.map((landmark, index) => {
              const cx = (landmark.mapCoordinates.x / 100) * 500;
              const cy = (landmark.mapCoordinates.y / 100) * 500;
              const isSelected = selectedLandmarkId === landmark.id;
              const isHovered = hoveredLandmark?.id === landmark.id;
              const stopNumber = index + 1;
              const matchesFilter =
                (selectedCategory === 'all' || landmark.category === selectedCategory) &&
                (mapSearch.trim() === '' ||
                  landmark.name.toLowerCase().includes(mapSearch.toLowerCase()) ||
                  landmark.shortDescription.toLowerCase().includes(mapSearch.toLowerCase()));

              return (
                <g
                  key={landmark.id}
                  className="cursor-pointer group transition-opacity duration-200"
                  style={{ opacity: matchesFilter ? 1 : 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLandmark(landmark);
                  }}
                  onMouseEnter={() => setHoveredLandmark(landmark)}
                  onMouseLeave={() => setHoveredLandmark(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Landmark ${stopNumber}: ${landmark.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectLandmark(landmark);
                    }
                  }}
                >
                  {/* Subtle target radar ripples for active landmark */}
                  {isSelected && (
                    <>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="24"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="32"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    </>
                  )}

                  {/* Pulsing halo around hovered pin */}
                  {isHovered && !isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="20"
                      fill="#f59e0b"
                      opacity="0.15"
                      className="animate-pulse"
                    />
                  )}

                  {/* Outer Pin Body */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 16 : 13}
                    fill={isSelected ? '#f59e0b' : '#1c1917'}
                    stroke={isSelected ? '#ffffff' : '#d97706'}
                    strokeWidth={isSelected ? 3 : 2}
                    filter={isSelected ? 'url(#glowEffect)' : undefined}
                    className="transition-all duration-300 group-hover:scale-110"
                  />

                  {/* Pin Number */}
                  <text
                    x={cx}
                    y={cy + 4.5}
                    textAnchor="middle"
                    fill={isSelected ? '#1c1917' : '#fef3c7'}
                    fontSize={isSelected ? '12px' : '10px'}
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    pointerEvents="none"
                  >
                    {stopNumber}
                  </text>

                  {/* Pin Label Label Tooltip (visible on hover or select) */}
                  {(isHovered || isSelected) && (
                    <g pointerEvents="none" className="transition-opacity duration-200">
                      {/* Tooltip Background Card */}
                      <rect
                        x={Math.max(10, Math.min(330, cx - 80))}
                        y={cy < 90 ? cy + 24 : cy - 54}
                        width="160"
                        height="40"
                        rx="8"
                        fill="#0c0805"
                        stroke="#d97706"
                        strokeWidth="1.2"
                        opacity="0.95"
                      />
                      <text
                        x={Math.max(90, Math.min(410, cx))}
                        y={cy < 90 ? cy + 40 : cy - 38}
                        textAnchor="middle"
                        fill="#fef3c7"
                        fontSize="9.5px"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {landmark.name.length > 22
                          ? `${landmark.name.slice(0, 20)}...`
                          : landmark.name}
                      </text>
                      <text
                        x={Math.max(90, Math.min(410, cx))}
                        y={cy < 90 ? cy + 54 : cy - 24}
                        textAnchor="middle"
                        fill="#d97706"
                        fontSize="8px"
                        fontFamily="sans-serif"
                      >
                        {landmark.category}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Mandatory Schematic Disclaimer Badge */}
      <div className="absolute bottom-3 left-4 right-4 sm:right-auto sm:left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-amber-900/40 text-[11px] text-amber-300/90 shadow-lg pointer-events-none">
        <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-medium tracking-wide">
          {destination.mapConfig?.schematicDisclaimer ||
            'Schematic educational site map — not to scale.'}
        </span>
      </div>

      {/* Heritage North Compass Rose */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-center bg-zinc-950/80 backdrop-blur-md p-2.5 rounded-2xl border border-amber-900/30 text-amber-400 shadow-xl pointer-events-none">
        <Compass className="w-6 h-6 stroke-[1.8] animate-spin-slow" />
        <span className="text-[9px] font-extrabold tracking-widest text-amber-300 mt-0.5">N</span>
      </div>

      {/* Map Interactive Controls Panel */}
      {showControls && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-9 h-9 rounded-xl bg-zinc-950/80 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 border border-amber-900/40 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Zoom in on site map"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-9 h-9 rounded-xl bg-zinc-950/80 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 border border-amber-900/40 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Zoom out on site map"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset Zoom & Center */}
          <button
            type="button"
            onClick={handleReset}
            className="w-9 h-9 rounded-xl bg-zinc-950/80 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 border border-amber-900/40 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Reset map view"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Legend Toggle */}
          <button
            type="button"
            onClick={() => {
              setShowLegend(!showLegend);
              if (isSearchOpen) setIsSearchOpen(false);
            }}
            className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-95 border ${
              showLegend
                ? 'bg-amber-400 text-zinc-950 border-amber-400'
                : 'bg-zinc-950/80 text-amber-400 hover:bg-zinc-800 border-amber-900/40'
            }`}
            aria-label="Toggle site map legend"
            title="Map Legend"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Search & Category Filter Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (showLegend) setShowLegend(false);
            }}
            className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-95 border ${
              isSearchOpen
                ? 'bg-amber-400 text-zinc-950 border-amber-400'
                : 'bg-zinc-950/80 text-amber-400 hover:bg-zinc-800 border-amber-900/40'
            }`}
            aria-label="Search and filter map landmarks"
            title="Filter Landmarks"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expandable Landmark Search & Category Filter Panel */}
      {isSearchOpen && (
        <div className="absolute top-16 left-16 z-20 w-72 bg-zinc-950/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 shadow-2xl text-xs space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Landmarks</span>
            </span>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={mapSearch}
                onChange={(e) => setMapSearch(e.target.value)}
                placeholder="Search pins..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Category filter chips */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
              Category:
            </span>
            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pt-1">
              {landmarkCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-zinc-950'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Match Count */}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
            <span>
              Showing{' '}
              {
                destination.landmarks.filter(
                  (l) =>
                    (selectedCategory === 'all' || l.category === selectedCategory) &&
                    (mapSearch.trim() === '' ||
                      l.name.toLowerCase().includes(mapSearch.toLowerCase()) ||
                      l.shortDescription.toLowerCase().includes(mapSearch.toLowerCase()))
                ).length
              }{' '}
              of {destination.landmarks.length} pins
            </span>
            {(mapSearch || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setMapSearch('');
                  setSelectedCategory('all');
                }}
                className="text-amber-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Expandable Architectural Map Legend */}
      {showLegend && (
        <div className="absolute top-16 left-16 z-20 w-64 bg-zinc-950/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 shadow-2xl text-xs space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
              Site Map Legend
            </span>
            <span className="text-[10px] text-zinc-400">{destination.landmarks.length} Stops</span>
          </div>

          <div className="space-y-2 text-[11px] text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-white inline-block shrink-0" />
              <span>Numbered Landmark Stops</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-sky-500/50 border border-sky-400 inline-block shrink-0" />
              <span>River, Moat & Water Reservoirs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-700/50 border border-emerald-600 inline-block shrink-0" />
              <span>Formal Gardens & Courtyards</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-amber-700/60 border border-amber-600 inline-block shrink-0" />
              <span>Fort Walls, Bastions & Portals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-zinc-200/80 border border-white inline-block shrink-0" />
              <span>Marble & Primary Shrines</span>
            </div>
          </div>

          <p className="text-[10px] text-zinc-500 italic pt-1 border-t border-zinc-800">
            Click any numbered pin to inspect detailed architectural documentation.
          </p>
        </div>
      )}
    </div>
  );
}

// Destination-specific schematic architectural SVG plans
function renderDestinationSchematic(destinationId: string) {
  switch (destinationId) {
    case 'taj-mahal':
      return (
        <g id="schematic-taj-mahal">
          {/* Yamuna River at North */}
          <rect x="20" y="20" width="460" height="45" rx="6" fill="url(#waterFlow)" />
          <text x="250" y="46" textAnchor="middle" fill="#7dd3fc" fontSize="10" opacity="0.8">
            Yamuna River (Northern Riverbank)
          </text>

          {/* Elevated High Marble Plinth Terrace */}
          <rect
            x="130"
            y="75"
            width="240"
            height="115"
            rx="12"
            fill="#1e293b"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Left Mosque & Right Jawab (Guest House) */}
          <rect
            x="60"
            y="95"
            width="55"
            height="75"
            rx="4"
            fill="url(#sandstoneGradient)"
            stroke="#d97706"
            strokeWidth="1.2"
          />
          <text x="87" y="140" textAnchor="middle" fill="#fef3c7" fontSize="8">
            Mosque
          </text>

          <rect
            x="385"
            y="95"
            width="55"
            height="75"
            rx="4"
            fill="url(#sandstoneGradient)"
            stroke="#d97706"
            strokeWidth="1.2"
          />
          <text x="412" y="140" textAnchor="middle" fill="#fef3c7" fontSize="8">
            Jawab
          </text>

          {/* Four Corner Minaret Footprints */}
          <circle cx="145" cy="90" r="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="355" cy="90" r="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="145" cy="175" r="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="355" cy="175" r="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Octagonal Main Mausoleum Footprint */}
          <polygon
            points="220,95 280,95 310,125 310,150 280,180 220,180 190,150 190,125"
            fill="url(#marbleGradient)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <circle cx="250" cy="137" r="22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <text
            x="250"
            y="141"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="8"
            fontWeight="bold"
          >
            Tomb Chamber
          </text>

          {/* Charbagh Four-Quadrant Garden */}
          <rect
            x="70"
            y="215"
            width="360"
            height="180"
            rx="8"
            fill="url(#gardenGrass)"
            stroke="#166534"
            strokeWidth="1.5"
          />

          {/* Axial Reflecting Canals */}
          <rect x="245" y="215" width="10" height="180" fill="url(#waterFlow)" />
          <rect x="70" y="300" width="360" height="10" fill="url(#waterFlow)" />

          {/* Central Al-Kawthar Raised Marble Lotus Tank */}
          <rect
            x="230"
            y="285"
            width="40"
            height="40"
            rx="4"
            fill="#e2e8f0"
            stroke="#0284c7"
            strokeWidth="2"
          />

          {/* 4 Quadrants of Trees / Lawns */}
          <rect x="85" y="228" width="145" height="60" rx="4" fill="#14532d" opacity="0.4" />
          <rect x="270" y="228" width="145" height="60" rx="4" fill="#14532d" opacity="0.4" />
          <rect x="85" y="322" width="145" height="60" rx="4" fill="#14532d" opacity="0.4" />
          <rect x="270" y="322" width="145" height="60" rx="4" fill="#14532d" opacity="0.4" />

          {/* Southern Great Gateway (Darwaza-i-Rauza) */}
          <rect
            x="180"
            y="415"
            width="140"
            height="55"
            rx="8"
            fill="url(#sandstoneGradient)"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text
            x="250"
            y="448"
            textAnchor="middle"
            fill="#fef3c7"
            fontSize="10"
            fontWeight="bold"
          >
            Darwaza-i-Rauza (Main Gate)
          </text>
        </g>
      );

    case 'red-fort':
      return (
        <g id="schematic-red-fort">
          {/* Yamuna River / Moat on East */}
          <path
            d="M 430 40 Q 450 250 430 460 L 470 460 L 470 40 Z"
            fill="url(#waterFlow)"
            opacity="0.8"
          />
          <text x="450" y="250" textAnchor="middle" fill="#7dd3fc" fontSize="9" transform="rotate(90 450 250)">
            Yamuna River
          </text>

          {/* Massive Polygonal Fortification Walls */}
          <polygon
            points="60,100 140,40 380,40 420,100 420,400 380,460 140,460 60,400"
            fill="#451a03"
            stroke="#b45309"
            strokeWidth="4"
          />

          {/* Lahori Gate on West */}
          <rect
            x="50"
            y="250"
            width="35"
            height="50"
            rx="4"
            fill="#b45309"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="67" y="315" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">
            Lahori Gate
          </text>

          {/* Chhatta Chowk (Covered Bazaar) */}
          <rect
            x="95"
            y="262"
            width="75"
            height="26"
            rx="4"
            fill="#78350f"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="132" y="278" textAnchor="middle" fill="#fde68a" fontSize="7.5">
            Chhatta Chowk
          </text>

          {/* Naubat Khana (Drum House) */}
          <rect
            x="180"
            y="260"
            width="30"
            height="30"
            rx="4"
            fill="#92400e"
            stroke="#f59e0b"
            strokeWidth="1.2"
          />

          {/* Diwan-i-Aam (Hall of Public Audience) */}
          <rect
            x="225"
            y="245"
            width="70"
            height="60"
            rx="6"
            fill="url(#sandstoneGradient)"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x="260"
            y="278"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="9"
            fontWeight="bold"
          >
            Diwan-i-Aam
          </text>

          {/* Diwan-i-Khas & Khas Mahal on East Terrace */}
          <rect
            x="340"
            y="230"
            width="55"
            height="45"
            rx="6"
            fill="url(#marbleGradient)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <text x="367" y="255" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
            Diwan-i-Khas
          </text>

          <rect
            x="340"
            y="290"
            width="55"
            height="45"
            rx="6"
            fill="url(#marbleGradient)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <text x="367" y="315" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
            Khas Mahal
          </text>

          {/* Moti Masjid (Pearl Mosque) */}
          <rect
            x="330"
            y="170"
            width="40"
            height="40"
            rx="4"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <text x="350" y="194" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">
            Moti Masjid
          </text>

          {/* Hayat Bakhsh Bagh (Life Bestowing Gardens) */}
          <rect
            x="280"
            y="80"
            width="120"
            height="75"
            rx="6"
            fill="url(#gardenGrass)"
            stroke="#166534"
            strokeWidth="1.2"
          />
          <text x="340" y="120" textAnchor="middle" fill="#86efac" fontSize="8">
            Hayat Bakhsh Bagh
          </text>
        </g>
      );

    case 'agra-fort':
      return (
        <g id="schematic-agra-fort">
          {/* Yamuna River along Eastern Curved Wall */}
          <path
            d="M 370 20 Q 420 250 370 480 L 480 480 L 480 20 Z"
            fill="url(#waterFlow)"
            opacity="0.85"
          />
          <text x="430" y="250" textAnchor="middle" fill="#7dd3fc" fontSize="9" transform="rotate(90 430 250)">
            Yamuna River
          </text>

          {/* Semicircular Fortification Ramparts */}
          <path
            d="M 120 440 L 350 440 Q 400 250 350 60 L 120 60 Q 30 250 120 440 Z"
            fill="#451a03"
            stroke="#b45309"
            strokeWidth="4"
          />

          {/* Amar Singh Gate at South */}
          <rect
            x="130"
            y="370"
            width="40"
            height="50"
            rx="6"
            fill="#b45309"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="150" y="432" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">
            Amar Singh Gate
          </text>

          {/* Jahangiri Mahal (Akbar's Red Sandstone Palace) */}
          <rect
            x="240"
            y="320"
            width="75"
            height="65"
            rx="6"
            fill="url(#sandstoneGradient)"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text x="277" y="355" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold">
            Jahangiri Mahal
          </text>

          {/* Anguri Bagh (Grape Garden) & Khas Mahal */}
          <rect
            x="240"
            y="225"
            width="70"
            height="75"
            rx="6"
            fill="url(#gardenGrass)"
            stroke="#166534"
            strokeWidth="1.5"
          />
          <text x="275" y="265" textAnchor="middle" fill="#86efac" fontSize="8">
            Anguri Bagh
          </text>

          <rect
            x="315"
            y="245"
            width="45"
            height="45"
            rx="4"
            fill="url(#marbleGradient)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <text x="337" y="270" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="bold">
            Khas Mahal
          </text>

          {/* Musamman Burj (Octagonal River Tower) */}
          <polygon
            points="355,210 380,210 395,225 395,250 380,265 355,265 340,250 340,225"
            fill="#f8fafc"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="367" y="240" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">
            Burj
          </text>

          {/* Diwan-i-Aam & Diwan-i-Khas */}
          <rect
            x="215"
            y="170"
            width="75"
            height="45"
            rx="6"
            fill="url(#sandstoneGradient)"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          <text x="252" y="195" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold">
            Diwan-i-Aam
          </text>
        </g>
      );

    case 'rani-ki-vav':
      return (
        <g id="schematic-rani-ki-vav">
          {/* East-West Linear Axis Framing */}
          <rect
            x="40"
            y="190"
            width="420"
            height="120"
            rx="12"
            fill="#1e1811"
            stroke="#78350f"
            strokeWidth="3"
          />

          {/* Stepped Entry Ramp at East */}
          <rect x="60" y="210" width="60" height="80" rx="4" fill="#b45309" opacity="0.6" />
          <path d="M 65 220 L 115 220 M 65 240 L 115 240 M 65 260 L 115 260 M 65 280 L 115 280" stroke="#fef3c7" strokeWidth="1" />
          <text x="90" y="200" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="bold">
            Eastern Stepped Entry
          </text>

          {/* 7 Terraced Descending Pavilion Levels */}
          <rect x="135" y="205" width="45" height="90" fill="#92400e" stroke="#d97706" />
          <rect x="190" y="210" width="45" height="80" fill="#78350f" stroke="#d97706" />
          <rect x="245" y="215" width="45" height="70" fill="#451a03" stroke="#d97706" />
          <rect x="300" y="220" width="45" height="60" fill="#292524" stroke="#d97706" />

          {/* Sheshashayi Vishnu Sanctum Level */}
          <rect
            x="355"
            y="215"
            width="35"
            height="70"
            rx="4"
            fill="#451a03"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          <text x="372" y="252" textAnchor="middle" fill="#fde68a" fontSize="7" fontWeight="bold">
            Vishnu
          </text>

          {/* Deep Circular Well Shaft at West Terminus */}
          <circle cx="420" cy="250" r="30" fill="url(#waterFlow)" stroke="#0284c7" strokeWidth="3" />
          <circle cx="420" cy="250" r="16" fill="#0369a1" />
          <text x="420" y="253" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">
            Well Shaft
          </text>

          {/* Longitudinal Water Channel Axis */}
          <line x1="60" y1="250" x2="390" y2="250" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      );

    case 'dholavira':
      return (
        <g id="schematic-dholavira">
          {/* Monumental Harappan Urban City Boundary */}
          <rect
            x="60"
            y="60"
            width="380"
            height="380"
            rx="16"
            fill="#1c1917"
            stroke="#a16207"
            strokeWidth="3.5"
          />

          {/* Deep Water Reservoirs along perimeter */}
          <rect
            x="75"
            y="75"
            width="65"
            height="180"
            rx="6"
            fill="url(#waterFlow)"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <text x="107" y="165" textAnchor="middle" fill="#7dd3fc" fontSize="8" transform="rotate(-90 107 165)">
            Western Reservoirs
          </text>

          <rect
            x="75"
            y="360"
            width="350"
            height="40"
            rx="6"
            fill="url(#waterFlow)"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <text x="250" y="385" textAnchor="middle" fill="#7dd3fc" fontSize="8">
            Southern Stepped Storm-Water Channel & Reservoirs
          </text>

          {/* High Citadel (Castle + Bailey) */}
          <rect
            x="160"
            y="210"
            width="120"
            height="130"
            rx="8"
            fill="#78350f"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
          <text x="220" y="275" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
            Citadel (Castle)
          </text>

          {/* Ceremonial Ground / Stadium */}
          <rect
            x="160"
            y="150"
            width="120"
            height="45"
            rx="4"
            fill="#292524"
            stroke="#a16207"
            strokeWidth="1.5"
          />
          <text x="220" y="177" textAnchor="middle" fill="#e7e5e4" fontSize="8">
            Ceremonial Stadium
          </text>

          {/* Middle Town (Grid Layout) */}
          <rect
            x="200"
            y="80"
            width="140"
            height="60"
            rx="6"
            fill="#451a03"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />
          <text x="270" y="115" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">
            Middle Town
          </text>

          {/* Lower Town (Artisans & Citizens) */}
          <rect
            x="310"
            y="150"
            width="110"
            height="180"
            rx="6"
            fill="#292524"
            stroke="#78350f"
            strokeWidth="1.5"
          />
          <text x="365" y="240" textAnchor="middle" fill="#d6d3d1" fontSize="9" fontWeight="bold">
            Lower Town
          </text>
        </g>
      );

    case 'champaner-pavagadh':
      return (
        <g id="schematic-champaner">
          {/* Pavagadh Volcanic Hill in North */}
          <path
            d="M 60 160 Q 250 40 440 160 L 440 180 L 60 180 Z"
            fill="#292524"
            stroke="#78350f"
            strokeWidth="2"
          />
          <text x="250" y="125" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
            Pavagadh Hill & Kalika Mata Peak
          </text>

          {/* Citadel Fortification Walls */}
          <rect
            x="80"
            y="220"
            width="340"
            height="220"
            rx="12"
            fill="#1c1917"
            stroke="#b45309"
            strokeWidth="3"
          />

          {/* Jami Masjid (Centerpiece) */}
          <rect
            x="200"
            y="250"
            width="100"
            height="90"
            rx="6"
            fill="url(#sandstoneGradient)"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          {/* Two 30m Minarets */}
          <circle cx="210" cy="335" r="7" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="290" cy="335" r="7" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
          <text x="250" y="295" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            Jami Masjid
          </text>

          {/* Kevada Masjid (West) */}
          <rect
            x="120"
            y="300"
            width="55"
            height="50"
            rx="4"
            fill="#78350f"
            stroke="#d97706"
            strokeWidth="1.2"
          />
          <text x="147" y="330" textAnchor="middle" fill="#fde68a" fontSize="7.5">
            Kevada
          </text>

          {/* Nagina Masjid (East) */}
          <rect
            x="325"
            y="300"
            width="55"
            height="50"
            rx="4"
            fill="url(#marbleGradient)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          <text x="352" y="330" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="bold">
            Nagina
          </text>

          {/* Helical Stepwell */}
          <circle cx="140" cy="245" r="18" fill="url(#waterFlow)" stroke="#0284c7" strokeWidth="1.5" />
          <text x="140" y="248" textAnchor="middle" fill="#ffffff" fontSize="6.5">
            Stepwell
          </text>
        </g>
      );

    case 'sarnath':
      return (
        <g id="schematic-sarnath">
          {/* Deer Park Sacred Enclosure */}
          <rect
            x="60"
            y="40"
            width="380"
            height="420"
            rx="20"
            fill="url(#gardenGrass)"
            stroke="#166534"
            strokeWidth="2.5"
          />
          <text x="250" y="70" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">
            Rishipatana Deer Park Monastic Zone
          </text>

          {/* Dhamek Stupa (Towering Cylindrical Monument at Center-North) */}
          <circle cx="250" cy="190" r="38" fill="url(#sandstoneGradient)" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="250" cy="190" r="22" fill="#78350f" />
          <text x="250" y="194" textAnchor="middle" fill="#fef3c7" fontSize="8.5" fontWeight="bold">
            Dhamek Stupa
          </text>

          {/* Dharmarajika Stupa Foundation & Ashoka Pillar */}
          <circle cx="230" cy="250" r="24" fill="#451a03" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="215" cy="245" r="5" fill="#f59e0b" />
          <text x="230" y="285" textAnchor="middle" fill="#fef08a" fontSize="7.5">
            Dharmarajika & Pillar
          </text>

          {/* Mulagandha Kuti Vihara (Principal Temple) */}
          <rect
            x="280"
            y="225"
            width="55"
            height="55"
            rx="6"
            fill="#78350f"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="307" y="255" textAnchor="middle" fill="#fef3c7" fontSize="7.5" fontWeight="bold">
            Vihara
          </text>

          {/* Excavated Monasteries (Courtyards) */}
          <rect x="100" y="160" width="60" height="60" rx="4" fill="#292524" stroke="#78350f" />
          <text x="130" y="195" textAnchor="middle" fill="#d6d3d1" fontSize="7">
            Monastery 1
          </text>

          <rect x="340" y="160" width="60" height="60" rx="4" fill="#292524" stroke="#78350f" />
          <text x="370" y="195" textAnchor="middle" fill="#d6d3d1" fontSize="7">
            Monastery 2
          </text>

          {/* Chaukhandi Stupa (Southern Outlier Mound) */}
          <polygon
            points="220,430 280,430 290,400 270,370 230,370 210,400"
            fill="#b45309"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="250" y="405" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            Chaukhandi Stupa
          </text>
        </g>
      );

    case 'somnath':
      return (
        <g id="schematic-somnath">
          {/* Arabian Sea crashing on North and West */}
          <path
            d="M 20 20 L 480 20 L 480 140 Q 250 180 20 140 Z"
            fill="url(#waterFlow)"
            opacity="0.85"
          />
          <text x="250" y="70" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
            Arabian Sea (Prabhas Patan Shoreline)
          </text>

          {/* Sea-Facing Fortified Parapet & Promenade */}
          <path
            d="M 30 150 Q 250 190 470 150"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
          />

          {/* Temple Outer Courtyard */}
          <rect
            x="90"
            y="180"
            width="320"
            height="260"
            rx="16"
            fill="#1c1917"
            stroke="#b45309"
            strokeWidth="2.5"
          />

          {/* Kailash Mahameru Prasad Temple Complex */}
          {/* Garbhagriha & 155ft Shikhara */}
          <rect
            x="215"
            y="210"
            width="70"
            height="70"
            rx="8"
            fill="url(#sandstoneGradient)"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <polygon
            points="250,220 275,260 225,260"
            fill="#fef08a"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="250" y="275" textAnchor="middle" fill="#1c1917" fontSize="8" fontWeight="bold">
            Shikhara
          </text>

          {/* Sabha Mandap (Colonnaded Hall) */}
          <rect
            x="205"
            y="295"
            width="90"
            height="75"
            rx="8"
            fill="#78350f"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text x="250" y="338" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">
            Sabha Mandap
          </text>

          {/* Digvijay Dwar Entrance Gate */}
          <rect
            x="220"
            y="410"
            width="60"
            height="35"
            rx="6"
            fill="#b45309"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="250" y="432" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">
            Digvijay Dwar
          </text>

          {/* Baan Stambh (Arrow Pillar on Sea Promenade) */}
          <circle cx="160" cy="360" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
          <line x1="160" y1="360" x2="160" y2="400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <text x="160" y="415" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="bold">
            Baan Stambh
          </text>
        </g>
      );

    case 'dwarkadhish':
      return (
        <g id="schematic-dwarkadhish">
          {/* Gomti River confluence at South */}
          <rect x="20" y="415" width="460" height="65" rx="8" fill="url(#waterFlow)" opacity="0.85" />
          <text x="250" y="455" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="bold">
            Gomti River Ghat (Confluence with Arabian Sea)
          </text>

          {/* 56-Stepped Ascent from Gomti Ghat */}
          <rect x="210" y="380" width="80" height="35" fill="#78350f" stroke="#ca8a04" />
          <line x1="210" y1="390" x2="290" y2="390" stroke="#fde68a" strokeWidth="1" />
          <line x1="210" y1="400" x2="290" y2="400" stroke="#fde68a" strokeWidth="1" />
          <text x="250" y="375" textAnchor="middle" fill="#fef08a" fontSize="7.5">
            56 Ceremonial Steps
          </text>

          {/* Outer Temple Enclosure */}
          <rect
            x="80"
            y="80"
            width="340"
            height="290"
            rx="16"
            fill="#1c1917"
            stroke="#ca8a04"
            strokeWidth="3"
          />

          {/* Southern Swarga Dwar (Heaven's Gate) */}
          <rect x="225" y="350" width="50" height="25" rx="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="250" y="366" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="bold">
            Swarga Dwar
          </text>

          {/* Northern Moksha Dwar (Liberation Gate) */}
          <rect x="120" y="225" width="25" height="50" rx="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="132" y="220" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="bold">
            Moksha Dwar
          </text>

          {/* Central Jagat Mandir (Nij Mandir) */}
          <rect
            x="195"
            y="180"
            width="110"
            height="130"
            rx="10"
            fill="url(#sandstoneGradient)"
            stroke="#f59e0b"
            strokeWidth="3"
          />

          {/* 78-meter Ladva Mandir Shikhara */}
          <polygon
            points="250,195 285,250 215,250"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="2"
          />
          <text x="250" y="240" textAnchor="middle" fill="#1c1917" fontSize="8" fontWeight="bold">
            78m Spire
          </text>

          {/* 72-Pillared Sabha Mandap */}
          <rect
            x="205"
            y="260"
            width="90"
            height="45"
            rx="4"
            fill="#78350f"
            stroke="#d97706"
          />
          <text x="250" y="287" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">
            Sabha Mandap (72 Pillars)
          </text>
        </g>
      );

    default:
      return (
        <rect
          x="50"
          y="50"
          width="400"
          height="400"
          rx="16"
          fill="#1c1917"
          stroke="#d97706"
          strokeWidth="2"
        />
      );
  }
}
