'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Destination } from '@/types/destination';
import { Landmark } from '@/types/landmark';
import InteractiveSiteMap from './InteractiveSiteMap';
import LandmarkDetailsPanel from './LandmarkDetailsPanel';
import GuidedExplorationHUD from './GuidedExplorationHUD';
import ImageGalleryModal from './ImageGalleryModal';
import UpcomingFeatures from '@/components/roadmap/UpcomingFeatures';
import { updateJourneyProgress } from '@/lib/storage/collectionStorage';
import {
  ArrowLeft,
  Compass,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react';

interface DestinationExperienceViewProps {
  destination: Destination;
}

export default function DestinationExperienceView({
  destination,
}: DestinationExperienceViewProps) {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isTourMode, setIsTourMode] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [isTourFinished, setIsTourFinished] = useState(false);

  const landmarks = destination.landmarks;
  const totalStops = landmarks.length;
  const activeLandmark = landmarks[currentStopIndex] || landmarks[0];

  useEffect(() => {
    if (destination && totalStops > 0) {
      updateJourneyProgress(destination.id, destination.name, currentStopIndex, totalStops);
    }
  }, [destination, currentStopIndex, totalStops]);

  // Handle selecting a landmark pin on the map
  const handleSelectLandmark = useCallback(
    (landmark: Landmark) => {
      const idx = landmarks.findIndex((l) => l.id === landmark.id);
      if (idx !== -1) {
        setCurrentStopIndex(idx);
      }
      setIsDetailsOpen(true);
    },
    [landmarks]
  );

  // Stepper handlers
  const handlePreviousStop = useCallback(() => {
    setCurrentStopIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextStop = useCallback(() => {
    setCurrentStopIndex((prev) => {
      if (prev >= totalStops - 1) {
        setIsTourFinished(true);
        return prev;
      }
      return prev + 1;
    });
  }, [totalStops]);

  const handleSelectStopIndex = useCallback((index: number) => {
    setCurrentStopIndex(index);
  }, []);

  const handleRestartTour = useCallback(() => {
    setCurrentStopIndex(0);
    setIsTourFinished(false);
    setIsTourMode(true);
  }, []);

  const isUnesco = destination.heritageClassification === 'unesco';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0805] text-zinc-100 flex flex-col select-none">
      {/* Top Header Bar */}
      <header className="relative z-30 px-4 sm:px-6 py-3 bg-zinc-950/90 backdrop-blur-xl border-b border-amber-900/40 flex items-center justify-between gap-4">
        {/* Left: Back Link & Destination Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/explore/${destination.id}`}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors shrink-0"
            aria-label="Back to destination overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
                {destination.name}
              </h1>
              {isUnesco ? (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  UNESCO {destination.unescoInscriptionYear}
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Culturally Significant
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{destination.location}</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* 3D Walkthrough Trigger */}
          <Link
            href={`/explore/${destination.slug || destination.id}/3d`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 transition-all shadow-sm active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Enter 3D Walkthrough</span>
          </Link>
        </div>
      </header>

      {/* Main Exploration Space */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex flex-col justify-between">
        {/* Interactive SVG Site Map (Filling background canvas) */}
        <div className="absolute inset-0 z-0">
          <InteractiveSiteMap
            destination={destination}
            selectedLandmarkId={activeLandmark?.id}
            onSelectLandmark={handleSelectLandmark}
            className="w-full h-full rounded-none border-none"
            showControls={true}
          />
        </div>

        {/* Floating Bottom / Pinned HUD Controls */}
        <div className="relative z-20 mt-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
          <GuidedExplorationHUD
            destination={destination}
            currentStopIndex={currentStopIndex}
            totalStops={totalStops}
            activeLandmark={activeLandmark}
            isTourMode={isTourMode}
            onToggleTourMode={() => setIsTourMode(!isTourMode)}
            onPreviousStop={handlePreviousStop}
            onNextStop={handleNextStop}
            onSelectStopIndex={handleSelectStopIndex}
            onOpenDetails={() => setIsDetailsOpen(true)}
            onFinishTour={() => setIsTourFinished(true)}
            isTourFinished={isTourFinished}
            onRestartTour={handleRestartTour}
          />
        </div>
      </main>

      {/* Architectural Landmark Details Drawer */}
      <LandmarkDetailsPanel
        landmark={activeLandmark}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onPrevious={currentStopIndex > 0 ? handlePreviousStop : undefined}
        onNext={currentStopIndex < totalStops - 1 ? handleNextStop : undefined}
        currentIndex={currentStopIndex}
        totalLandmarks={totalStops}
        destinationId={destination.id}
        destinationName={destination.name}
        onOpenGallery={(idx) => {
          setGalleryStartIndex(idx);
          setIsGalleryOpen(true);
        }}
      />

      {/* Lightbox Image Modal */}
      {isGalleryOpen && activeLandmark?.gallery && (
        <ImageGalleryModal
          images={activeLandmark.gallery}
          currentIndex={galleryStartIndex}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          onSelectIndex={(idx) => setGalleryStartIndex(idx)}
          title={activeLandmark.name}
        />
      )}

      {/* 3D Walkthrough Roadmap Modal */}
      {is3DModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-amber-500/30 shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setIs3DModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <UpcomingFeatures />
          </div>
        </div>
      )}
    </div>
  );
}
