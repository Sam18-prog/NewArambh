'use client';

import React, { useEffect, useCallback } from 'react';
import { LandmarkGalleryItem } from '@/types/landmark';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface ImageGalleryModalProps {
  images: LandmarkGalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  title?: string;
}

export default function ImageGalleryModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
  title,
}: ImageGalleryModalProps) {
  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  const handlePrevious = useCallback(() => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-400 z-10">
        <div>
          {title && <span className="font-bold text-white text-sm mr-3">{title}</span>}
          {hasMultiple && (
            <span className="font-mono text-amber-400">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close image gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Image Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={handlePrevious}
            className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-zinc-950/70 hover:bg-amber-400 hover:text-zinc-950 text-white border border-zinc-700 backdrop-blur-md transition-all shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Displayed Image */}
        <div className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.url}
            alt={currentImage.alt || currentImage.caption}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-zinc-800"
          />
        </div>

        {/* Next Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-zinc-950/70 hover:bg-amber-400 hover:text-zinc-950 text-white border border-zinc-700 backdrop-blur-md transition-all shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & License Attribution */}
      <div className="max-w-3xl mx-auto text-center space-y-1.5 z-10">
        <p className="text-sm text-zinc-200 font-medium">{currentImage.caption}</p>
        {currentImage.credit && (
          <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>Credit & License: {currentImage.credit}</span>
          </div>
        )}
      </div>
    </div>
  );
}
