'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
  ShieldAlert,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';
import { GalleryItem } from '@/types/destination';

export interface CategorizedGalleryItem extends GalleryItem {
  id: string;
  category: 'exterior' | 'interior' | 'details' | 'surroundings' | 'sculptures' | 'archaeological';
  categoryLabel: string;
}

interface HeritageGalleryProps {
  destinationName: string;
  items: CategorizedGalleryItem[];
  className?: string;
}

export default function HeritageGallery({
  destinationName,
  items,
  className = '',
}: HeritageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Available categories based on actual items
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => set.add(item.category));
    return [
      { id: 'all', label: 'All Photos', count: items.length },
      ...Array.from(set).map((cat) => ({
        id: cat,
        label:
          cat === 'exterior'
            ? 'Exterior Architecture'
            : cat === 'interior'
            ? 'Interior Architecture'
            : cat === 'details'
            ? 'Architectural Details'
            : cat === 'surroundings'
            ? 'Gardens & Grounds'
            : cat === 'sculptures'
            ? 'Sculptures & Reliefs'
            : cat === 'archaeological'
            ? 'Archaeological Remains'
            : cat,
        count: items.filter((i) => i.category === cat).length,
      })),
    ];
  }, [items]);

  const filteredItems = React.useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter((i) => i.category === selectedCategory);
  }, [items, selectedCategory]);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  }, [activeLightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (prev) => (prev! - 1 + filteredItems.length) % filteredItems.length
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, nextImage, prevImage]);

  const currentItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 opacity-60 font-mono text-[10px]">({cat.count})</span>
            </button>
          ))}
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 shadow-xl transition-all cursor-pointer aspect-[16/11]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.alt || item.caption || destinationName}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Hover Indicator */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Caption & Category Badge */}
            <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {item.categoryLabel}
              </span>
              <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                {item.caption}
              </p>
              {item.credit && (
                <p className="text-[10px] text-zinc-400 truncate">
                  Credit: {item.credit}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${currentItem.caption}`}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between gap-4 z-10">
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-bold text-amber-400">
                {activeLightboxIndex! + 1} of {filteredItems.length}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {destinationName} — {currentItem.categoryLabel}
              </h3>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-white transition-colors cursor-pointer"
              aria-label="Close photo viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image Container with Prev/Next buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-700/80 text-white shadow-xl transition-transform active:scale-90 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.url}
              alt={currentItem.alt || currentItem.caption || destinationName}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl select-none"
            />

            {/* Next Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-700/80 text-white shadow-xl transition-transform active:scale-90 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Caption & Credit Bar */}
          <div className="max-w-3xl mx-auto w-full bg-zinc-950/80 backdrop-blur-md rounded-2xl p-4 border border-zinc-800 text-center space-y-1.5 z-10">
            <p className="text-sm font-semibold text-white">
              {currentItem.caption}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
              {currentItem.credit && (
                <span>Photo: <strong className="text-zinc-200">{currentItem.credit}</strong></span>
              )}
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 font-mono text-[11px]">Open Educational Heritage Asset</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
