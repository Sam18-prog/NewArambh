'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Sparkles,
  BookOpen,
  Landmark,
  Compass,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { EducationalHotspot } from '@/types/hotspot';

interface HotspotDrawerProps {
  hotspot: EducationalHotspot | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function HotspotDrawer({ hotspot, isOpen, onClose }: HotspotDrawerProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevHotspotId, setPrevHotspotId] = useState<string | null>(hotspot?.id || null);

  // Synchronously adjust image index when selected hotspot changes without cascading effects
  if (hotspot && hotspot.id !== prevHotspotId) {
    setPrevHotspotId(hotspot.id);
    setActiveImageIndex(0);
  }

  // Escape key listener to close drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !hotspot) return null;

  const currentImage = hotspot.gallery && hotspot.gallery.length > 0 ? hotspot.gallery[activeImageIndex] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hotspot-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end sm:p-6 bg-black/60 sm:bg-black/50 backdrop-blur-sm select-none animate-in fade-in duration-300"
    >
      {/* Click outside backdrop to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div className="relative z-10 w-full sm:max-w-xl max-h-[90vh] sm:max-h-[94vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-zinc-950/95 border border-amber-500/30 shadow-2xl shadow-amber-500/10 backdrop-blur-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-right-8 duration-300">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Landmark className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                {hotspot.category}
              </span>
              <h3 id="hotspot-title" className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
                {hotspot.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors active:scale-95"
            aria-label="Close Information Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Educational Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-zinc-300 text-xs sm:text-sm select-text">
          {/* Hindi Name Callout if present */}
          {hotspot.hindiName && (
            <div className="text-amber-300/80 font-medium text-xs tracking-wide">
              {hotspot.hindiName}
            </div>
          )}

          {/* Short Summary Lead */}
          <p className="text-zinc-200 font-semibold leading-relaxed border-l-2 border-amber-400 pl-3">
            {hotspot.shortDescription}
          </p>

          {/* Visual Gallery / Image Carousel */}
          {currentImage && (
            <div className="space-y-2">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 540px"
                />

                {/* Carousel Controls if multiple images */}
                {hotspot.gallery.length > 1 && (
                  <div className="absolute inset-x-2 bottom-2 flex items-center justify-between pointer-events-none">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? hotspot.gallery.length - 1 : prev - 1
                        )
                      }
                      className="pointer-events-auto p-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 text-white border border-zinc-700 backdrop-blur-md transition-transform active:scale-90"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-zinc-200 bg-zinc-950/80 backdrop-blur-md">
                      {activeImageIndex + 1} / {hotspot.gallery.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === hotspot.gallery.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="pointer-events-auto p-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 text-white border border-zinc-700 backdrop-blur-md transition-transform active:scale-90"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption & Image Attribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-400 px-1 gap-1">
                <span>{currentImage.caption}</span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {currentImage.attribution}
                </span>
              </div>
            </div>
          )}

          {/* Detailed Architectural Explanation */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" /> Architectural History &amp; Design
            </h4>
            <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
              {hotspot.detailedDescription}
            </p>
          </div>

          {/* Cultural Significance */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Cultural &amp; Civic Significance
            </h4>
            <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
              {hotspot.culturalSignificance}
            </p>
          </div>

          {/* Architectural Key Features */}
          {hotspot.architecturalDetails && hotspot.architecturalDetails.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> Key Architectural Elements
              </h4>
              <ul className="space-y-1.5 text-xs">
                {hotspot.architecturalDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span className="text-zinc-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Source References & Verified Citations */}
          {hotspot.sources && hotspot.sources.length > 0 && (
            <div className="pt-3 border-t border-zinc-800/80 space-y-2">
              <h4 className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Curatorial Sources &amp; Citations
              </h4>
              <div className="space-y-1.5 text-[11px]">
                {hotspot.sources.map((source, idx) => (
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
                    <span className="text-zinc-500 font-mono text-[10px]">
                      {source.authorOrPublisher}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Illustrative Reconstruction Notice */}
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-[10px] text-zinc-400 space-y-0.5">
            <span className="font-bold text-amber-400">Curatorial Notice:</span>
            <p>
              This environment is an illustrative digital heritage reconstruction showcasing classical architectural archetypes. It does not represent an archaeological survey of a single verified monument.
            </p>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-3 sm:p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-500">
            Press [ESC] to resume exploration
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
          >
            Resume Exploration
          </button>
        </div>
      </div>
    </div>
  );
}
