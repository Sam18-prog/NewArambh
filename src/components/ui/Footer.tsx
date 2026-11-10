import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Heart } from 'lucide-react';

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
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Explore the World Beyond Boundaries. An immersive 3D virtual destination exploration
              platform for global cultural heritage, historical architecture, and sacred monuments.
            </p>
            <p className="text-[11px] text-zinc-400">
              Developed with zero budget using Next.js 16, React 19, Three.js, and public domain
              cultural assets.
            </p>
          </div>

          {/* Quick Links */}
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
                <Link href="/explore/heritage-courtyard" className="hover:text-amber-400 transition-colors">
                  Demonstration Courtyard
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-amber-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-400 transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage Categories */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Categories</p>
            <ul className="space-y-2">
              <li>
                <Link href="/explore?category=forts-palaces" className="hover:text-amber-400 transition-colors">
                  Forts & Palaces
                </Link>
              </li>
              <li>
                <Link href="/explore?category=religious" className="hover:text-amber-400 transition-colors">
                  Religious Places & Temples
                </Link>
              </li>
              <li>
                <Link href="/explore?category=monuments" className="hover:text-amber-400 transition-colors">
                  Historical Monuments
                </Link>
              </li>
              <li>
                <Link href="/explore?category=museums" className="hover:text-amber-400 transition-colors">
                  Museums & Collections
                </Link>
              </li>
              <li>
                <Link href="/explore?category=heritage" className="hover:text-amber-400 transition-colors">
                  Heritage Architecture
                </Link>
              </li>
              <li>
                <Link href="/explore?category=natural" className="hover:text-amber-400 transition-colors">
                  Natural Attractions
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Licenses */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Transparency</p>
            <ul className="space-y-2">
              <li>
                <Link href="/licenses" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Asset Register & Licenses</span>
                </Link>
              </li>
              <li>
                <span className="text-zinc-400">CC0 1.0 Universal</span>
              </li>
              <li>
                <span className="text-zinc-400">Smithsonian Open Access</span>
              </li>
              <li>
                <span className="text-zinc-400">Poly Haven Textures</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} NewArambh. Created for cultural education & spatial exploration.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-current inline" /> using Open-Source Web Technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
