import React from 'react';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { ShieldCheck, ExternalLink, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

interface AssetRecord {
  id: string;
  name: string;
  category: string;
  creator: string;
  source: string;
  sourceUrl: string;
  license: string;
  commercialUse: string;
  modifications: string;
}

const ASSET_REGISTRY: AssetRecord[] = [
  {
    id: 'polyhaven-sandstone',
    name: 'Sandstone Blocks 02 PBR Material',
    category: 'Surface Texture',
    creator: 'Rob Tuytel',
    source: 'Poly Haven',
    sourceUrl: 'https://polyhaven.com/a/sandstone_blocks_02',
    license: 'CC0 1.0 Universal (Public Domain Dedication)',
    commercialUse: 'Permitted without restriction or fee',
    modifications:
      'Downscaled Diffuse, Roughness, and Normal maps to 1024x1024 WebP format and packed into GLB material.',
  },
  {
    id: 'smithsonian-columns',
    name: 'Carved Architectural Stone Column Scans',
    category: '3D Geometry',
    creator: 'Smithsonian Institution Digitization Office',
    source: 'Smithsonian 3D Open Access',
    sourceUrl: 'https://3d.si.edu',
    license: 'CC0 1.0 Universal (Public Domain Dedication)',
    commercialUse: 'Permitted without restriction or fee',
    modifications:
      'Decimated high-density scan mesh to low-poly game geometry in Blender, baked surface normal maps.',
  },
  {
    id: 'polyhaven-sky',
    name: 'Desert Dawn Sky HDRI Environment',
    category: 'Lighting & Environment Map',
    creator: 'Greg Zaal',
    source: 'Poly Haven',
    sourceUrl: 'https://polyhaven.com/a/desert_dawn',
    license: 'CC0 1.0 Universal (Public Domain Dedication)',
    commercialUse: 'Permitted without restriction or fee',
    modifications:
      'Compressed 1K HDR format for real-time web browser reflection and ambient sunlight calculations.',
  },
  {
    id: 'freesound-wind',
    name: 'Subtle Courtyard Breeze & Wind Ambience',
    category: 'Audio',
    creator: 'InspectorJ',
    source: 'Freesound.org',
    sourceUrl: 'https://freesound.org',
    license: 'Creative Commons Attribution 4.0 International (CC-BY 4.0)',
    commercialUse: 'Permitted with attribution',
    modifications: 'Loop point normalization and compressed to 64kbps MP3.',
  },
];

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        {/* Breadcrumb Back */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Open Source &amp; Intellectual Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Asset Register &amp; Licensing Attribution
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            In accordance with our strict zero-budget rules and ethical heritage standards, NewArambh
            relies exclusively on open-source technologies, verified CC0 Public Domain assets, and
            properly attributed Creative Commons materials.
          </p>
        </div>

        {/* Core Financial & Licensing Statement */}
        <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            Zero-Budget Development &amp; Copyright Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400">100% Free Resources</span>
              <p className="text-zinc-400 leading-relaxed">
                Zero paid subscriptions, zero paid APIs, zero purchased 3D models, and zero hired
                external assets.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400">Verified Legal Rights</span>
              <p className="text-zinc-400 leading-relaxed">
                Every texture, sound effect, and 3D geometry piece has been checked for verified
                commercial and open-access rights.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400">No Fictional Duplication</span>
              <p className="text-zinc-400 leading-relaxed">
                Reconstructed demonstration environments are explicitly stated as illustrative
                demonstrations, preserving historical integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Asset Registry Table */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Vetted Asset Registry</h2>
            <span className="text-xs text-zinc-400">
              {ASSET_REGISTRY.length} Documented Source Assets
            </span>
          </div>

          <div className="space-y-4">
            {ASSET_REGISTRY.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mr-2">
                      {asset.category}
                    </span>
                    <h3 className="text-lg font-bold text-white inline">{asset.name}</h3>
                  </div>
                  <a
                    href={asset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    <span>{asset.source}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Creator / Author:</span>
                    <span className="font-medium text-zinc-200">{asset.creator}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">License Type:</span>
                    <span className="font-medium text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {asset.license}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Commercial Permission:</span>
                    <span className="font-medium text-zinc-300">{asset.commercialUse}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 text-xs">
                  <span className="text-zinc-500">Modifications Made: </span>
                  <span className="text-zinc-400">{asset.modifications}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
