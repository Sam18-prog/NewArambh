'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import {
  Bookmark,
  Trash2,
  Compass,
  ArrowRight,
  Award,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  loadUserCollection,
  clearUserCollection,
  toggleBookmarkDestination,
  toggleSaveLandmark,
  UserHeritageCollection,
} from '@/lib/storage/collectionStorage';

const emptyCollection: UserHeritageCollection = {
  version: '1.0',
  savedDestinations: [],
  savedLandmarks: [],
  quizScores: [],
  journeyProgress: {},
};

export default function MyHeritagePage() {
  const [collection, setCollection] = useState<UserHeritageCollection>(emptyCollection);
  const [activeTab, setActiveTab] = useState<'destinations' | 'landmarks' | 'journeys' | 'quizzes'>('destinations');
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const refresh = () => setCollection(loadUserCollection());
    refresh();
    window.addEventListener('newarambh_collection_updated', refresh);
    return () => window.removeEventListener('newarambh_collection_updated', refresh);
  }, []);

  const handleRemoveDestination = (id: string, name: string, location: string, thumb: string) => {
    toggleBookmarkDestination({
      id,
      name,
      location,
      thumbnailUrl: thumb,
    });
    setCollection(loadUserCollection());
  };

  const handleRemoveLandmark = (destId: string, landmarkId: string, name: string, category: string) => {
    toggleSaveLandmark({
      id: landmarkId,
      destinationId: destId,
      destinationName: destId,
      name,
      category,
    });
    setCollection(loadUserCollection());
  };

  const handleClearAll = () => {
    clearUserCollection();
    setConfirmClear(false);
    setCollection(loadUserCollection());
  };

  const { savedDestinations, savedLandmarks, journeyProgress, quizScores } = collection;
  const journeyList = Object.values(journeyProgress);

  return (
    <div className="min-h-screen bg-[#0c0805] text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400" />
              <span>Personal Collection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              My Heritage Collection
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Your saved monuments, curated landmarks, guided journey progress, and quiz challenges. Stored locally and securely in your browser with zero logins and zero data tracking.
            </p>
          </div>

          {/* Clear Collection Button */}
          {(savedDestinations.length > 0 ||
            savedLandmarks.length > 0 ||
            journeyList.length > 0 ||
            quizScores.length > 0) && (
            <div>
              {!confirmClear ? (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 bg-zinc-900/80 hover:bg-red-950/30 border border-zinc-800 hover:border-red-900/50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Collection</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-red-950/40 p-2 rounded-xl border border-red-500/40">
                  <span className="text-xs text-red-300 font-medium">Delete all items?</span>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-400 text-zinc-950 text-xs font-bold transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('destinations')}
            className={`py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'destinations'
                ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <span>Saved Destinations</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-950/30 font-mono">
              {savedDestinations.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('landmarks')}
            className={`py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'landmarks'
                ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <span>Favorite Landmarks</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-950/30 font-mono">
              {savedLandmarks.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('journeys')}
            className={`py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'journeys'
                ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <span>Guided Journeys</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-950/30 font-mono">
              {journeyList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quizzes')}
            className={`py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'quizzes'
                ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <span>Quiz History</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-950/30 font-mono">
              {quizScores.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Saved Destinations */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            {savedDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="group relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 shadow-xl transition-all flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dest.thumbnailUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveDestination(dest.id, dest.name, dest.location, dest.thumbnailUrl)
                        }
                        className="absolute top-3 right-3 p-2 rounded-full bg-zinc-950/80 hover:bg-red-950/80 text-zinc-300 hover:text-red-400 border border-white/20 transition-colors shadow-lg"
                        title="Remove Bookmark"
                        aria-label="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-amber-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{dest.location}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {dest.name}
                        </h2>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                        <Link
                          href={`/explore/${dest.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                        >
                          <span>Explore Site</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          Saved: {new Date(dest.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4 rounded-3xl border border-dashed border-zinc-800 p-8 bg-zinc-950/40">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white">No bookmarked destinations yet</h2>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Click the bookmark icon on any destination card or page to save monuments to your collection.
                  </p>
                </div>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore All 9 Destinations</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Favorite Landmarks */}
        {activeTab === 'landmarks' && (
          <div className="space-y-6">
            {savedLandmarks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedLandmarks.map((lm) => (
                  <div
                    key={`${lm.destinationId}-${lm.id}`}
                    className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          {lm.category}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveLandmark(lm.destinationId, lm.id, lm.name, lm.category)
                          }
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                          title="Remove Landmark"
                          aria-label="Remove Landmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h2 className="text-lg font-bold text-white">{lm.name}</h2>
                      <div className="text-xs text-zinc-400">
                        From: <strong className="text-zinc-300">{lm.destinationName}</strong>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <Link
                        href={`/explore/${lm.destinationId}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                      >
                        <span>View at Destination</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4 rounded-3xl border border-dashed border-zinc-800 p-8 bg-zinc-950/40">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white">No saved landmarks yet</h2>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Inspect individual landmarks on the interactive site map and click the bookmark button to collect favorite pavilions, gates, and spires.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Guided Journeys */}
        {activeTab === 'journeys' && (
          <div className="space-y-6">
            {journeyList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journeyList.map((j) => (
                  <div
                    key={j.destinationId}
                    className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">{j.destinationName}</h2>
                      {j.completed ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                        <span>Progress: Stop {j.currentStopIndex + 1} of {j.totalStops}</span>
                        <span>{Math.round(((j.currentStopIndex + 1) / j.totalStops) * 100)}%</span>
                      </div>
                      <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                        <div
                          className="bg-amber-400 h-full transition-all duration-300"
                          style={{
                            width: `${((j.currentStopIndex + 1) / j.totalStops) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={`/explore/${j.destinationId}/experience`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-95"
                      >
                        <span>{j.completed ? 'Revisit Journey' : 'Resume Journey'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        Last visited: {new Date(j.lastVisitedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4 rounded-3xl border border-dashed border-zinc-800 p-8 bg-zinc-950/40">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white">No active journeys yet</h2>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Start a sequential guided journey on any destination to track your cultural exploration progress.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Quiz History */}
        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            {quizScores.length > 0 ? (
              <div className="space-y-3">
                {quizScores.map((score) => (
                  <div
                    key={score.id}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {score.quizMode}
                        </span>
                        <h2 className="text-base font-bold text-white">
                          {score.destinationName}
                        </h2>
                      </div>
                      <div className="text-xs text-zinc-400">
                        Completed on {new Date(score.completedAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-black text-amber-400">
                          {score.score} / {score.total}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          {score.percentage}% Accuracy
                        </div>
                      </div>
                      <Link
                        href="/learn/quiz"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                      >
                        Retake Quiz
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4 rounded-3xl border border-dashed border-zinc-800 p-8 bg-zinc-950/40">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white">No quiz scores recorded yet</h2>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Challenge your architectural and historical knowledge to earn badges and track learning scores.
                  </p>
                </div>
                <Link
                  href="/learn/quiz"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Take a Heritage Quiz</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Privacy & Storage Transparency Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 flex items-start gap-3 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-zinc-200">Local Privacy Guarantee: </strong>
            All collection records are maintained exclusively in your browser’s local storage. NewArambh does not require accounts, stores zero personal credentials, and transmits no user collection data to external servers.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
