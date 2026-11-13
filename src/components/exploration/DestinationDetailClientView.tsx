'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Destination } from '@/types/destination';
import { Landmark, LandmarkGalleryItem } from '@/types/landmark';
import InteractiveSiteMap from './InteractiveSiteMap';
import LandmarkDetailsPanel from './LandmarkDetailsPanel';
import ImageGalleryModal from './ImageGalleryModal';
import UpcomingFeatures from '@/components/roadmap/UpcomingFeatures';
import {
  Compass,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  ChevronRight,
  Award,
  Bookmark,
} from 'lucide-react';

interface DestinationDetailClientViewProps {
  destination: Destination;
}

export default function DestinationDetailClientView({
  destination,
}: DestinationDetailClientViewProps) {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<LandmarkGalleryItem[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isUnesco = destination.heritageClassification === 'unesco';
  const totalLandmarks = destination.landmarks.length;
  const currentLandmarkIndex = selectedLandmark
    ? destination.landmarks.findIndex((l) => l.id === selectedLandmark.id)
    : 0;

  const handleSelectLandmark = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    setIsDetailsOpen(true);
  };

  const handlePreviousLandmark = () => {
    if (currentLandmarkIndex > 0) {
      setSelectedLandmark(destination.landmarks[currentLandmarkIndex - 1]);
    }
  };

  const handleNextLandmark = () => {
    if (currentLandmarkIndex < totalLandmarks - 1) {
      setSelectedLandmark(destination.landmarks[currentLandmarkIndex + 1]);
    }
  };

  const openDestinationGallery = (index: number) => {
    const allImgs = [
      ...destination.galleryImages.map((g, i) => ({
        id: `dest-img-${i}`,
        url: g.url,
        caption: g.caption,
        credit: g.credit,
        alt: g.alt || g.caption || destination.name,
      })),
      ...destination.landmarks.flatMap((l) => l.gallery || []),
    ];
    setGalleryImages(allImgs);
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-amber-500/30 overflow-hidden shadow-2xl bg-zinc-950 min-h-[520px] sm:min-h-[580px] flex items-end">
          {/* Background Photographic Hero Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
            style={{ backgroundImage: `url('${destination.heroImageUrl}')` }}
          />
          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />

          {/* Top Classification Badges */}
          <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex flex-wrap items-center gap-2">
              {isUnesco ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg backdrop-blur-md">
                  <Award className="w-4 h-4 text-amber-400" />
                  UNESCO World Heritage Site ({destination.unescoInscriptionYear})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Culturally Significant Monument
                </span>
              )}
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-zinc-700">
                {destination.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900/80 backdrop-blur-md text-zinc-300 border border-zinc-700">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                {destination.landmarks.length} Landmark Stops
              </span>

              {/* Bookmark Button (matching Image 1) */}
              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="w-10 h-10 rounded-full bg-zinc-950/70 hover:bg-zinc-900/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all active:scale-90 cursor-pointer"
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark destination'}
              >
                <Bookmark
                  className={`w-4 h-4 transition-colors ${
                    isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Floating Hero Content Card */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{destination.location}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">{destination.period}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {destination.name}
            </h1>
            {destination.hindiName && (
              <div className="text-xl font-serif text-amber-300/90 tracking-wide">
                {destination.hindiName}
              </div>
            )}

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {destination.subtitle}
            </p>

            {/* Exploration Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href={`/explore/${destination.slug || destination.id}/3d`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all hover:scale-105 active:scale-95"
              >
                <Compass className="w-4 h-4 stroke-[2.3]" />
                <span>Explore 3D Walkthrough</span>
                <ArrowRight className="w-4 h-4 stroke-[2.3]" />
              </Link>

              <Link
                href={`/explore/${destination.slug || destination.id}/3d?mode=tour`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Guided Tour</span>
              </Link>

              <Link
                href={`/explore/${destination.slug || destination.id}/map`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800 transition-all hover:scale-105 active:scale-95"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>2D Site Map</span>
              </Link>

              <button
                type="button"
                onClick={() => openDestinationGallery(0)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800 transition-all hover:scale-105 active:scale-95"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Photo Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left 8 Columns: Narrative, Site Map, Landmarks, Timeline */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview & Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Overview & History</h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {destination.description}
              </p>
              {destination.detailedHistory && (
                <div className="space-y-3 pt-2 text-sm text-zinc-300 leading-relaxed">
                  {destination.detailedHistory.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
            </section>

            {/* Embedded Interactive Site Map Preview */}
            <section className="space-y-4 rounded-3xl p-6 sm:p-8 bg-zinc-900/40 border border-amber-900/40 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                    <Compass className="w-3 h-3" />
                    Interactive Architectural Blueprint
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Schematic Site Plan &amp; Landmarks
                  </h3>
                </div>
                <Link
                  href={`/explore/${destination.id}/experience`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all self-start sm:self-auto shadow-md shadow-amber-500/20"
                >
                  <span>Full-Screen Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Explore the spatial layout of {destination.name}. Click or tap any numbered pin on the map below to inspect its architectural dossier, structural highlights, and historical significance.
              </p>

              {/* Embedded Interactive Map */}
              <div className="h-[460px] w-full rounded-2xl overflow-hidden border border-zinc-800">
                <InteractiveSiteMap
                  destination={destination}
                  selectedLandmarkId={selectedLandmark?.id}
                  onSelectLandmark={handleSelectLandmark}
                  showControls={true}
                />
              </div>
            </section>

            {/* Architectural Landmarks & Hotspots Grid */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Architectural Landmarks &amp; Curated Stops
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Curated educational landmarks verified with official UNESCO and ASI dossiers
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                  {destination.landmarks.length} Landmarks
                </span>
              </div>

              {/* Landmark Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                {destination.landmarks.map((landmark, idx) => (
                  <div
                    key={landmark.id}
                    onClick={() => handleSelectLandmark(landmark)}
                    className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row gap-5 items-start shadow-md"
                  >
                    {/* Landmark Vector/Photo Thumbnail */}
                    {landmark.gallery && landmark.gallery.length > 0 && (
                      <div className="w-full sm:w-44 sm:h-32 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shrink-0 relative aspect-[16/10] sm:aspect-auto">
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url('${landmark.gallery[0].url}')` }}
                        />
                      </div>
                    )}

                    {/* Content Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {landmark.category}
                          </span>
                          {landmark.hindiName && (
                            <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                              {landmark.hindiName}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono font-bold text-zinc-500">
                          Stop #{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">
                        {landmark.name}
                      </h4>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {landmark.shortDescription}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-zinc-800/60">
                        <span className="text-[11px] text-zinc-400">
                          Highlights: {landmark.architecturalHighlights.length} features documented
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                          <span>Inspect Landmark</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Historical Chronology & Timeline */}
            {destination.timeline && destination.timeline.length > 0 && (
              <section className="space-y-6 rounded-3xl p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Calendar className="w-4 h-4" />
                  <span>Historical Chronology &amp; Key Milestones</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Timeline of {destination.name}
                </h3>

                <div className="space-y-6 pt-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-zinc-800">
                  {destination.timeline.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-8">
                      <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-zinc-950" />
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {event.year}
                        </span>
                        <h4 className="text-sm font-bold text-white">{event.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Official UNESCO & ASI Academic Citations */}
            {destination.historicalReferences && destination.historicalReferences.length > 0 && (
              <section className="space-y-4 rounded-3xl p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Verified Curatorial Citations</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Academic &amp; Official References
                </h3>
                <p className="text-xs text-zinc-400">
                  Documentation across NewArambh is sourced from official UNESCO World Heritage dossiers, Archaeological Survey of India (ASI) reports, and peer-reviewed heritage publications.
                </p>

                <div className="space-y-3 pt-2">
                  {destination.historicalReferences.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 hover:border-amber-500/40 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                            {ref.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400">{ref.organization}</p>
                          <p className="text-xs text-zinc-300 italic pt-1">{ref.relevantClaim}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 shrink-0 transition-colors mt-0.5" />
                      </div>
                      <div className="mt-2 text-[10px] text-zinc-500 font-mono truncate">
                        {ref.url}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Transparent Asset Attribution Notice */}
            <section className="rounded-3xl p-6 sm:p-8 bg-amber-950/20 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>Open Heritage Licensing &amp; Attribution</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                NewArambh is built with zero software and asset budget ($0.00), utilizing verified public domain, Creative Commons, and open-access educational cultural heritage records.
              </p>

              <div className="space-y-2 pt-1">
                {destination.assetCredits.map((credit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-semibold text-white">{credit.assetName}</span> —{' '}
                      <span className="text-zinc-400">{credit.creator}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px]">
                        {credit.license}
                      </span>
                      <span className="text-zinc-500">({credit.source})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/licenses"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>View Complete Platform Asset Register</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>
          </div>

          {/* Right 4 Columns: Sticky Quick Facts & Launch Box */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl p-6 sm:p-7 bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-6 sticky top-28">
              {/* Launch Box */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                  <Compass className="w-3.5 h-3.5" />
                  Interactive Blueprint
                </div>
                <h3 className="text-xl font-bold text-white">Start Exploration</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enter the dedicated full-screen interactive site plan with sequential guided journey and curatorial landmark dossiers.
                </p>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/explore/${destination.slug || destination.id}/map`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4 stroke-[2.5]" />
                  <span>View 2D Site Map</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  href={`/explore/${destination.slug || destination.id}/experience`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-semibold text-zinc-200 bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Start Guided Journey</span>
                </Link>

                <a
                  href="#roadmap-3d"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] font-medium text-amber-300/80 hover:text-amber-200 bg-amber-500/10 border border-amber-500/20 text-center transition-colors"
                >
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>3D Walkthroughs (Coming Soon)</span>
                </a>
              </div>

              {/* Quick Facts Section */}
              {destination.quickFacts && destination.quickFacts.length > 0 && (
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Quick Architectural Facts:
                  </p>
                  <div className="space-y-2 text-xs">
                    {destination.quickFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between py-1.5 border-b border-zinc-800/60"
                      >
                        <span className="text-zinc-400">{fact.label}:</span>
                        <span className="font-semibold text-zinc-200 text-right">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported Modes */}
              <div className="pt-4 border-t border-zinc-800 space-y-3 text-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Available Exploration Capabilities:
                </p>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Interactive SVG Site Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Guided Landmark Journey</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Deep Architectural Dossiers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-amber-300/90 font-medium">
                      3D Walkthrough (Coming Soon on Roadmap)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Section: Upcoming 3D Features Roadmap */}
        <div id="roadmap-3d" className="mt-16 scroll-mt-24">
          <UpcomingFeatures />
        </div>
      </div>

      {/* Landmark Details Drawer */}
      <LandmarkDetailsPanel
        landmark={selectedLandmark}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onPrevious={currentLandmarkIndex > 0 ? handlePreviousLandmark : undefined}
        onNext={currentLandmarkIndex < totalLandmarks - 1 ? handleNextLandmark : undefined}
        currentIndex={currentLandmarkIndex}
        totalLandmarks={totalLandmarks}
        onOpenGallery={(idx) => {
          if (selectedLandmark?.gallery) {
            setGalleryImages(selectedLandmark.gallery);
            setGalleryIndex(idx);
            setIsGalleryOpen(true);
          }
        }}
      />

      {/* Lightbox Image Modal */}
      {isGalleryOpen && galleryImages.length > 0 && (
        <ImageGalleryModal
          images={galleryImages}
          currentIndex={galleryIndex}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          onSelectIndex={(idx) => setGalleryIndex(idx)}
          title={selectedLandmark?.name || destination.name}
        />
      )}
    </div>
  );
}
