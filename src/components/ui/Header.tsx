'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 transition-colors">
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
                Beyond Boundaries
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
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
              Explore Destinations
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              How It Works
            </Link>
            <Link
              href="/#about"
              className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              About
            </Link>
            <Link
              href="/licenses"
              className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
            >
              Attribution
            </Link>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/explore/taj-mahal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enter 3D Demo</span>
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
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            Home
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            Explore Destinations
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            How It Works
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            About
          </Link>
          <Link
            href="/licenses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-zinc-900 hover:text-amber-400"
          >
            Attribution & Licenses
          </Link>
          <div className="pt-2">
            <Link
              href="/explore/taj-mahal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter 3D Demonstration</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
