'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Languages,
  Info,
  Sparkles,
  Headphones,
  Sliders,
  AlertCircle,
} from 'lucide-react';

export type NarrationLanguage = 'en' | 'hi' | 'gu';

export interface AudioGuideContent {
  en: { title: string; text: string };
  hi: { title: string; text: string };
  gu: { title: string; text: string };
}

interface AudioGuidePlayerProps {
  content: AudioGuideContent;
  destinationName: string;
  landmarkName?: string;
  className?: string;
  compact?: boolean;
}

export default function AudioGuidePlayer({
  content,
  destinationName,
  landmarkName,
  className = '',
  compact = false,
}: AudioGuidePlayerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<NarrationLanguage>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showTranscript, setShowTranscript] = useState(!compact);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const estimatedDurationRef = useRef<number>(30); // in seconds

  const currentText = content[selectedLanguage]?.text || '';
  const currentTitle = content[selectedLanguage]?.title || landmarkName || destinationName;

  // Initialize SpeechSynthesis and check voice availability
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('speechSynthesis' in window)) {
      const timer = setTimeout(() => {
        setSpeechSupported(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  // Stop narration
  const stopNarration = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const handleSelectLanguage = (lang: NarrationLanguage) => {
    stopNarration();
    setSelectedLanguage(lang);
  };

  // Handle Play / Resume
  const handlePlay = () => {
    if (!speechSupported || !currentText) return;

    if (isPaused && typeof window !== 'undefined') {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentText);
    utteranceRef.current = utterance;

    // Match voice for language
    let langCode = 'en-IN';
    if (selectedLanguage === 'hi') langCode = 'hi-IN';
    if (selectedLanguage === 'gu') langCode = 'gu-IN';

    utterance.lang = langCode;
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : volume;

    // Try finding best matching voice
    const voice = availableVoices.find(
      (v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase()) || v.lang.toLowerCase().startsWith(selectedLanguage)
    );
    if (voice) {
      utterance.voice = voice;
    }

    // Estimate duration: ~130 words per minute at 1.0x
    const wordCount = currentText.split(/\s+/).length;
    const estSec = Math.max(10, Math.round((wordCount / (130 * playbackRate)) * 60));
    estimatedDurationRef.current = estSec;
    startTimeRef.current = Date.now();

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);

      // Start a smooth progress tick
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      progressTimerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const p = Math.min(99, Math.round((elapsed / estimatedDurationRef.current) * 100));
        setProgress(p);
      }, 500);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    stopNarration();
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const handleRateChange = (newRate: number) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      stopNarration();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  return (
    <div
      className={`rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-xl p-4 sm:p-5 backdrop-blur-md space-y-4 ${className}`}
    >
      {/* Top Banner: Prominent Transparent Disclosure */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                Heritage Audio Guide
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Web Speech
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 line-clamp-1">
              {currentTitle}
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleSelectLanguage('en')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              selectedLanguage === 'en'
                ? 'bg-amber-400 text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="English Narration"
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => handleSelectLanguage('hi')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-serif ${
              selectedLanguage === 'hi'
                ? 'bg-amber-400 text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="हिन्दी (Hindi) Narration"
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => handleSelectLanguage('gu')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-serif ${
              selectedLanguage === 'gu'
                ? 'bg-amber-400 text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="ગુજરાતી (Gujarati) Narration"
          >
            ગુજરાતી
          </button>
        </div>
      </div>

      {/* Honest Disclosure Label */}
      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300/90 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Note:</strong> Generated Educational Narration (Browser Speech Synthesis). Curated educational transcripts read natively by your device voice engine.
        </span>
      </div>

      {!speechSupported && (
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Speech Synthesis is not supported in this browser. Please read the transcript below.</span>
        </div>
      )}

      {/* Player Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <span>{isPlaying ? 'Playing...' : isPaused ? 'Paused' : 'Ready'}</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {/* Play/Pause/Restart buttons */}
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              type="button"
              onClick={handlePause}
              className="w-10 h-10 rounded-full bg-amber-400 text-zinc-950 hover:bg-amber-300 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              aria-label="Pause narration"
            >
              <Pause className="w-4 h-4 fill-zinc-950" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              disabled={!speechSupported}
              className="w-10 h-10 rounded-full bg-amber-400 text-zinc-950 hover:bg-amber-300 disabled:opacity-50 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              aria-label="Play narration"
            >
              <Play className="w-4 h-4 fill-zinc-950 ml-0.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleRestart}
            disabled={!speechSupported}
            className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Restart narration"
            title="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors active:scale-95"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 text-[11px] font-bold">
          {[0.75, 1.0, 1.25].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleRateChange(rate)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                playbackRate === rate
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Toggle Transcript */}
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-500/40"
        >
          {showTranscript ? 'Hide Text' : 'Read Text'}
        </button>
      </div>

      {/* Synchronized Readable Transcript */}
      {showTranscript && (
        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed max-h-48 overflow-y-auto space-y-2">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            {selectedLanguage === 'en' ? 'English Transcript' : selectedLanguage === 'hi' ? 'हिन्दी विवरण' : 'ગુજરાતી વિવરણ'}
          </div>
          <p className="whitespace-pre-line font-sans">
            {currentText}
          </p>
        </div>
      )}
    </div>
  );
}
