import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/90 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-white group">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-lg tracking-wider group-hover:text-amber-400 transition-colors">
                NEWARAMBH
              </span>
            </Link>
            <div className="space-y-1.5 max-w-sm">
              <p className="font-bold text-sm text-zinc-100 tracking-tight">
                Walk Through History, From Anywhere.
              </p>
              <p className="text-zinc-400 leading-relaxed text-xs">
                Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D exploration and open educational access.
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Platform</p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-amber-400 transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link href="/explore/taj-mahal" className="hover:text-amber-400 transition-colors">
                  The Taj Mahal (3D Demo)
                </Link>
              </li>
              <li>
                <Link href="/my-heritage" className="hover:text-amber-400 transition-colors">
                  My Heritage Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About NewArambh
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn & Explore */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Learn &amp; Discover</p>
            <ul className="space-y-2">
              <li>
                <Link href="/learn/timelines" className="hover:text-amber-400 transition-colors">
                  Historical Timelines
                </Link>
              </li>
              <li>
                <Link href="/learn/quiz" className="hover:text-amber-400 transition-colors">
                  Knowledge Quizzes
                </Link>
              </li>
              <li>
                <Link href="/learn/glossary" className="hover:text-amber-400 transition-colors">
                  Architectural Glossary
                </Link>
              </li>
              <li>
                <Link href="/learn/compare" className="hover:text-amber-400 transition-colors">
                  Compare Monuments
                </Link>
              </li>
              <li>
                <Link href="/explore?category=unesco" className="hover:text-amber-400 transition-colors">
                  UNESCO World Heritage Sites
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Licenses */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Integrity</p>
            <ul className="space-y-2">
              <li>
                <Link href="/licenses" className="hover:text-amber-400 transition-colors">
                  Asset Register &amp; Attribution
                </Link>
              </li>
              <li>
                <span className="text-zinc-500">Zero-Budget Project ($0.00)</span>
              </li>
              <li>
                <span className="text-zinc-500">Public Domain &amp; CC Assets</span>
              </li>
              <li>
                <span className="text-zinc-500">Client-Side Storage Only</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <p>© {new Date().getFullYear()} NewArambh. Built for open cultural education and architectural discovery.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/licenses" className="hover:text-white transition-colors">
              Attribution &amp; Licenses
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
