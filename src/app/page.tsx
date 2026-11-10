import React from 'react';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/ui/HeroSection';
import FeaturedDestination from '@/components/ui/FeaturedDestination';
import CategoryGrid from '@/components/ui/CategoryGrid';
import HowItWorks from '@/components/ui/HowItWorks';
import WhyNewArambh from '@/components/ui/WhyNewArambh';
import Footer from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedDestination />
        <CategoryGrid />
        <HowItWorks />
        <WhyNewArambh />
      </main>
      <Footer />
    </div>
  );
}
