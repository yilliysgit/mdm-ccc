import Header from '../../components/layout/header/Header'
import Link from 'next/link'
import Image from 'next/image'
import AboutHero from '../../components/hero/OverOnsHero';
import AboutIntro from '@/app/components/intros/AboutIntro';
import MissionSection from '@/app/components/MissionSection/MissionSection';
import WhatWeDo from '@/app/components/whatwedo/WhatWeDo';
import WhyClassics from '@/app/components/MissionSection/whyclassics/WhyClassics.';
import HistoryTimeline from '@/app/components/HistoryTimeline/HistoryTimeline';
import TeamSection from '@/app/components/teamsection/TeamSection';
import FinalStatement from '@/app/components/finalsection/🌅 FinalCtaSection';

export default function OverOnsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
        
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
<AboutHero />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-bold tracking-wider uppercase">
                Sinds 2020
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              Marocains du Monde<br/>Classic Car Club
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
              Passie, erfgoed en verbinding — van Europa tot Marokko
            </p>
          </div>
        </section>
        <AboutIntro />

<MissionSection />
<WhatWeDo />
<WhyClassics />
<HistoryTimeline />
<TeamSection />
<FinalStatement />


      </main>
    </>
  )
}

