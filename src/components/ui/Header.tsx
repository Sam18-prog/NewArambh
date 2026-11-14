'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  BookOpen,
  Calendar,
  Award,
  ArrowLeftRight,
  Bookmark,
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLearnDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider text-white group-hover:text-amber-400 transition-colors">
                NEWARAMBH
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium">
                Walk Through History
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300">
            <Link
              href="/"
              className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              Explore
            </Link>

            {/* Learn Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLearnDropdownOpen(!learnDropdownOpen)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400 cursor-pointer"
                aria-expanded={learnDropdownOpen}
              >
                <span>Learn</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    learnDropdownOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {learnDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 shadow-2xl p-2.5 space-y-1 animate-in fade-in-50 zoom-in-95 duration-150">
                  <Link
                    href="/learn/timelines"
                    onClick={() => setLearnDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
                  >
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400">
                        Historical Timelines
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Chronological epochs &amp; milestones
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/learn/quiz"
                    onClick={() => setLearnDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
                  >
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400">
                        Knowledge Quizzes
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        4 interactive challenge modes
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/learn/glossary"
                    onClick={() => setLearnDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400">
                        Architectural Glossary
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Dictionary of heritage terms
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/learn/compare"
                    onClick={() => setLearnDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
                  >
                    <ArrowLeftRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400">
                        Compare Monuments
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Side-by-side architectural study
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/my-heritage"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>My Heritage</span>
            </Link>

            <Link
              href="/about"
              className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              About
            </Link>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/explore/taj-mahal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Taj Mahal 3D</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            Home
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            Explore Destinations
          </Link>
          <Link
            href="/my-heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-amber-400 hover:bg-zinc-900"
          >
            <Bookmark className="w-4 h-4 fill-amber-400" />
            <span>My Heritage Collection</span>
          </Link>

          <div className="pt-2 pb-1 border-t border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-3">
            Learn &amp; Discover
          </div>
          <Link
            href="/learn/timelines"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Historical Timelines
          </Link>
          <Link
            href="/learn/quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Knowledge Quizzes
          </Link>
          <Link
            href="/learn/glossary"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Architectural Glossary
          </Link>
          <Link
            href="/learn/compare"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Compare Monuments
          </Link>

          <div className="pt-2 border-t border-zinc-800 space-y-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              About NewArambh
            </Link>
            <Link
              href="/licenses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              Asset Register &amp; Attribution
            </Link>

            <Link
              href="/explore/taj-mahal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Taj Mahal 3D</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
