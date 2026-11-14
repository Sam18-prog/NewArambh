'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Share2,
  Check,
  Compass,
} from 'lucide-react';
import Link from 'next/link';
import { QuizQuestion, QuizMode } from '@/types/quiz';
import { recordQuizScore } from '@/lib/storage/collectionStorage';

interface HeritageQuizModalProps {
  questions: QuizQuestion[];
  mode: QuizMode;
  destinationId?: string;
  destinationName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function HeritageQuizModal({
  questions,
  mode,
  destinationId,
  destinationName,
  isOpen,
  onClose,
}: HeritageQuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongTopics, setWrongTopics] = useState<string[]>([]);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setWrongTopics((prev) =>
        prev.includes(currentQ.topic) ? prev : [...prev, currentQ.topic]
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Finished quiz
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      const total = questions.length;
      const pct = Math.round((finalScore / total) * 100);

      recordQuizScore({
        quizMode: mode,
        destinationId,
        destinationName: destinationName || 'Heritage Quiz',
        score: finalScore,
        total,
        percentage: pct,
      });

      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setWrongTopics([]);
  };

  const handleShareResult = async () => {
    const text = `I scored ${score}/${questions.length} on the NewArambh Heritage Quiz (${destinationName || 'Indian Heritage Challenge'})! Walk through history at https://newarambh.netlify.app/learn/quiz`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My NewArambh Heritage Quiz Result',
          text,
          url: 'https://newarambh.netlify.app/learn/quiz',
        });
      } catch {
        // cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Heritage Knowledge Challenge"
    >
      <div className="w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Heritage Knowledge Challenge
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                {mode.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {destinationName ? `${destinationName} Quiz` : 'Indian Heritage Knowledge'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <>
            {/* Progress Bar & Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>
                  Score: {score}/{currentIndex}
                </span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Topic: {currentQ.topic}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  let btnStyle =
                    'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border-zinc-800';

                  if (selectedOption === idx) {
                    btnStyle =
                      'bg-amber-500/20 text-amber-200 border-amber-500/60 ring-1 ring-amber-500/50';
                  }

                  if (isSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle =
                        'bg-emerald-950/60 text-emerald-200 border-emerald-500 ring-1 ring-emerald-500';
                    } else if (selectedOption === idx) {
                      btnStyle =
                        'bg-red-950/60 text-red-200 border-red-500 ring-1 ring-red-500';
                    } else {
                      btnStyle = 'opacity-40 bg-zinc-950 text-zinc-500 border-zinc-900';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-zinc-950 border border-zinc-700/80 flex items-center justify-center text-xs font-mono text-zinc-400 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box (Visible after submission) */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-400" />
                        <span>Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-zinc-300">{currentQ.explanation}</p>
                  <div className="pt-1 text-[11px] text-zinc-400 flex items-center gap-1.5 border-t border-zinc-800/60">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Reference: {currentQ.reference}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[11px] text-zinc-500">
                {!isSubmitted ? 'Select an answer to continue' : 'Review explanation above'}
              </span>

              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Quiz Completion Screen */
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-black text-white">Quiz Completed!</h4>
              <p className="text-xs text-zinc-400">
                Your score has been saved to your personal collection.
              </p>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-2xl font-black text-amber-400">{score}</div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Correct</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-2xl font-black text-white">{questions.length}</div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Total</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-2xl font-black text-emerald-400">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Accuracy</div>
              </div>
            </div>

            {/* Topics to Revisit */}
            {wrongTopics.length > 0 && (
              <div className="text-left p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 max-w-md mx-auto space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Topics to Revisit:
                </span>
                <ul className="text-xs text-zinc-300 space-y-1 list-disc pl-4">
                  {wrongTopics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Quiz</span>
              </button>

              <button
                type="button"
                onClick={handleShareResult}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                {copiedShare ? <Check className="w-3.5 h-3.5 text-zinc-950" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedShare ? 'Copied to Clipboard!' : 'Share Score'}</span>
              </button>

              <Link
                href="/my-heritage"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
              >
                <span>View My Heritage</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
