'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Landmark } from '@/types/landmark';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Sparkles,
  Landmark as LandmarkIcon,
  Compass,
  Layers,
  Image as ImageIcon,
  Bookmark,
  Share2,
  Check,
} from 'lucide-react';
import {
  isLandmarkSaved,
  toggleSaveLandmark,
  subscribeToCollection,
} from '@/lib/storage/collectionStorage';

interface LandmarkDetailsPanelProps {
  landmark: Landmark | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalLandmarks?: number;
  onOpenGallery?: (imageIndex: number) => void;
  destinationId?: string;
  destinationName?: string;
}

export default function LandmarkDetailsPanel({
  landmark,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  currentIndex = 0,
  totalLandmarks = 0,
  onOpenGallery,
  destinationId = '',
  destinationName = '',
}: LandmarkDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'history' | 'sources'>('overview');
  const [copiedShare, setCopiedShare] = useState(false);

  const isSaved = useSyncExternalStore(
    subscribeToCollection,
    () => (landmark && destinationId ? isLandmarkSaved(destinationId, landmark.id) : false),
    () => false
  );

  if (!isOpen || !landmark) return null;

  const handleToggleSave = () => {
    if (!landmark || !destinationId) return;
    const thumb = landmark.gallery && landmark.gallery[0] ? landmark.gallery[0].url : undefined;
    toggleSaveLandmark({
      id: landmark.id,
      destinationId,
      destinationName: destinationName || destinationId,
      name: landmark.name,
      category: landmark.category,
      thumbnailUrl: thumb,
    });
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/explore/${destinationId}?landmark=${landmark.id}` : '';
    const shareData = {
      title: `${landmark.name} - ${destinationName || 'NewArambh'}`,
      text: `Discover ${landmark.name}: ${landmark.shortDescription}`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled or failed, fallback to clipboard
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950/95 backdrop-blur-2xl border-l border-amber-900/40 shadow-2xl flex flex-col text-zinc-100 animate-in slide-in-from-right duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={`Educational details for ${landmark.name}`}
    >
      {/* Drawer Header */}
      <div className="relative p-5 sm:p-6 border-b border-amber-900/30 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 pr-2">
          {/* Stop Counter & Category Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-zinc-950 shadow-sm">
              Stop {currentIndex + 1} of {totalLandmarks}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {landmark.category}
            </span>
          </div>

          {/* Landmark Name & Hindi Script */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {landmark.name}
          </h2>
          {landmark.hindiName && (
            <div className="text-sm font-serif text-amber-400/90 tracking-wide">
              {landmark.hindiName}
            </div>
          )}
        </div>

        {/* Action Buttons: Save, Share, Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          {destinationId && (
            <button
              type="button"
              onClick={handleToggleSave}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 border-zinc-800'
              }`}
              title={isSaved ? 'Remove from My Heritage' : 'Save Landmark'}
              aria-label={isSaved ? 'Remove from My Heritage' : 'Save Landmark'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>
          )}

          {destinationId && (
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800 transition-colors"
              title="Share Landmark"
              aria-label="Share Landmark"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800 transition-colors"
            aria-label="Close landmark details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center px-6 border-b border-zinc-800/80 bg-zinc-950 text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`py-3.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`py-3.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'architecture'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Architecture ({landmark.architecturalHighlights.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-3.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Significance</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sources')}
          className={`py-3.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'sources'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <LandmarkIcon className="w-3.5 h-3.5" />
          <span>Sources ({landmark.sourceReferences.length})</span>
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Gallery Image Feature */}
            {landmark.gallery && landmark.gallery.length > 0 && (
              <div className="relative rounded-2xl overflow-hidden border border-amber-900/30 bg-zinc-900 group">
                <div
                  className="w-full aspect-[16/10] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${landmark.gallery[0].url}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                  <span className="line-clamp-1 italic text-[11px] text-zinc-300/90">
                    {landmark.gallery[0].caption}
                  </span>
                  {onOpenGallery && (
                    <button
                      type="button"
                      onClick={() => onOpenGallery(0)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950/80 hover:bg-amber-400 hover:text-zinc-950 text-amber-300 text-[11px] font-semibold border border-amber-500/30 flex items-center gap-1 transition-colors shrink-0 ml-2"
                    >
                      <ImageIcon className="w-3 h-3" />
                      Gallery
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Short Lead Summary */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed font-medium">
              {landmark.shortDescription}
            </div>

            {/* Detailed Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Architectural Summary
              </h3>
              <p className="text-zinc-300 leading-relaxed font-normal text-sm">
                {landmark.detailedDescription}
              </p>
            </div>

            {/* Quick Map Coordinates Indicator */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Compass className="w-4 h-4 text-amber-400" />
                Site Plan Coordinates
              </span>
              <span className="font-mono text-amber-300 font-semibold">
                X: {landmark.mapCoordinates.x}%, Y: {landmark.mapCoordinates.y}%
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Architectural Highlights */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Key Architectural Elements
            </h3>
            <div className="space-y-3">
              {landmark.architecturalHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 transition-colors flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Cultural & Historical Significance */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Cultural & Historical Significance
            </h3>
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-300 leading-relaxed text-sm space-y-3">
              <p>{landmark.historicalSignificance}</p>
            </div>
          </div>
        )}

        {/* Tab 4: Official Source Citations */}
        {activeTab === 'sources' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Verified Academic & UNESCO References
            </h3>
            <p className="text-xs text-zinc-400">
              NewArambh citations are verified against official heritage inventories, UNESCO inscription dossiers, and Archaeological Survey of India publications.
            </p>

            <div className="space-y-3 pt-2">
              {landmark.sourceReferences.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-900 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        {ref.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        {ref.authorOrPublisher}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 shrink-0 transition-colors mt-0.5" />
                  </div>
                  <div className="mt-2 text-[10px] text-zinc-500 font-mono truncate">
                    {ref.url}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer with Previous / Next Controls */}
      <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950/95 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!onPrevious}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none border border-zinc-800 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Landmark</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!onNext}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md shadow-amber-500/20"
        >
          <span>Next Landmark</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
