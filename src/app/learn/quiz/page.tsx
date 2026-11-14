'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { allQuizQuestions } from '@/data/quizQuestions';
import { allDestinations } from '@/data/destinations/index';
import HeritageQuizModal from '@/components/quiz/HeritageQuizModal';
import { QuizMode, QuizQuestion } from '@/types/quiz';
import {
  Award,
  HelpCircle,
  Sparkles,
  MapPin,
  BookOpen,
  Compass,
  ArrowRight,
  Layers,
  History,
} from 'lucide-react';

export default function KnowledgeQuizzesPage() {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<QuizMode>('mixed');
  const [selectedDestId, setSelectedDestId] = useState<string>('taj-mahal');
  const [modalQuestions, setModalQuestions] = useState<QuizQuestion[]>([]);
  const [modalTitle, setModalTitle] = useState<string>('');

  const startQuiz = (mode: QuizMode, destId?: string) => {
    let filtered: QuizQuestion[] = [];
    let title = '';

    if (mode === 'destination' && destId) {
      filtered = allQuizQuestions.filter(
        (q) => q.mode === 'destination' && q.destinationId === destId
      );
      const dest = allDestinations.find((d) => d.id === destId);
      title = dest ? dest.shortName || dest.name : 'Destination Quiz';
    } else if (mode === 'destination') {
      filtered = allQuizQuestions.filter((q) => q.mode === 'destination');
      title = 'All Monuments Quiz';
    } else if (mode === 'landmark') {
      filtered = allQuizQuestions.filter((q) => q.mode === 'landmark');
      title = 'Landmark Identification Quiz';
    } else if (mode === 'architecture') {
      filtered = allQuizQuestions.filter((q) => q.mode === 'architecture');
      title = 'Architectural Knowledge Quiz';
    } else {
      filtered = [...allQuizQuestions].sort(() => 0.5 - Math.random()).slice(0, 8);
      title = 'Grand Heritage Challenge';
    }

    if (filtered.length === 0) {
      filtered = allQuizQuestions.slice(0, 5);
    }

    setActiveMode(mode);
    setSelectedDestId(destId || '');
    setModalQuestions(filtered);
    setModalTitle(title);
    setActiveModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0805] text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 w-full">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Interactive Learning Challenges</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Heritage Quiz &amp; Knowledge Challenges
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Test your knowledge of Indian civilization, imperial Mughal fortresses, ancient Harappan engineering, sacred Maru-Gurjara temple architecture, and world-renowned UNESCO World Heritage monuments. All questions are sourced from peer-reviewed ASI and UNESCO dossiers.
          </p>
        </div>

        {/* 4 Quiz Mode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode 1: Destination Specific */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 shadow-xl space-y-5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1. Monument-Specific Quizzes
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Focused question banks exploring individual monuments: architecture, builders, dates, materials, and significant events.
              </p>
            </div>

            {/* Destination Selector Dropdown & Launch */}
            <div className="space-y-3 pt-2">
              <label htmlFor="quiz-destination-select" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Select Destination:
              </label>
              <select
                id="quiz-destination-select"
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
              >
                {allDestinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.shortName || d.name} ({d.heritageClassification === 'unesco' ? 'UNESCO' : 'Cultural'})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => startQuiz('destination', selectedDestId)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Start Destination Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode 2: Landmark Identification */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 shadow-xl space-y-5 transition-all flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  2. Landmark Identification
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Identify specific halls, pavilions, stepwells, spires, and gates from their architectural descriptions and historical roles.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startQuiz('landmark')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Start Identification Challenge</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Mode 3: Architectural Knowledge */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 shadow-xl space-y-5 transition-all flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Layers className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  3. Architectural Knowledge
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Test your grasp of traditional terms: Chhatris, Jalis, Shikharas, Mandapas, Stepwells, Pietra Dura inlay, and passive environmental design.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startQuiz('architecture')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Test Architectural Knowledge</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Mode 4: Mixed Heritage Challenge */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/30 via-zinc-900/70 to-zinc-950 border border-amber-500/40 shadow-xl space-y-5 transition-all flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  4. Grand Mixed Heritage Challenge
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  A comprehensive challenge covering all nine Indian destinations, historical dynasties, and architectural styles.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startQuiz('mixed')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <span>Launch Grand Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Heritage Quiz Modal Runner */}
      {activeModal && (
        <HeritageQuizModal
          questions={modalQuestions}
          mode={activeMode}
          destinationId={selectedDestId}
          destinationName={modalTitle}
          isOpen={activeModal}
          onClose={() => setActiveModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}
