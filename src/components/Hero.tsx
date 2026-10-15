import React from 'react';
import { MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
import type { TranslationData } from '../data/translations';
import { ElectionCountdown } from './ElectionCountdown';

interface HeroProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const Hero: React.FC<HeroProps> = ({ t, lang }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white pt-10 pb-20 sm:pt-14 sm:pb-28 overflow-hidden">
        {/* Ambient Radial Gradient Glow */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute left-10 bottom-0 w-[360px] h-[360px] rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Designation Pill Badge */}
              <div className="inline-flex items-center gap-2 border border-emerald-400 text-emerald-300 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 bg-emerald-500/10 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.candidatePill}</span>
              </div>

              {/* Main Heading (Candidate Name) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2.5">
                {t.hero.name}
              </h1>

              {/* Subheading */}
              <p className="font-poppins text-xs sm:text-sm md:text-base text-blue-200 leading-relaxed mb-4 max-w-2xl font-medium">
                {t.hero.englishSub}
              </p>

              {/* Slogan with Bright Emerald Highlight */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3">
                {t.hero.mottoHeading}
                <span className="text-emerald-400 drop-shadow-sm">{t.hero.mottoHighlight}</span>
              </h2>

              {/* Direct Election Lead Text */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-5 max-w-xl font-normal">
                {t.hero.lead}
              </p>

              {/* Real-time Election Countdown Component */}
              <ElectionCountdown lang={lang} className="mb-6 max-w-xl" />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="#listen"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-civicGreen hover:bg-civicGreen-dark text-white font-bold text-sm md:text-base shadow-elevated hover:-translate-y-0.5 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.hero.ctaGrievance}</span>
                </a>

                <a
                  href="https://whatsapp.com/channel/0029Vb9SlGo1yT23AuXOiU2a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-bold text-sm md:text-base border-2 border-white/80 hover:border-white transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-300" />
                  <span>{t.hero.ctaWhatsAppChannel}</span>
                </a>
              </div>

              {/* Direct Helpline Indicator */}
              <div className="mt-5 text-xs text-blue-200 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t.hero.callHelp}</span>
              </div>

            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative">
                {/* Authentic Circular Portrait with Clean Brand Green Outline (#00913f) */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-[8px] sm:border-[10px] border-[#00913f] overflow-hidden bg-[#071d41] shadow-2xl">
                  <img
                    src="/images/poreddy-with-ys-jagan-hero.jpg"
                    alt={`${t.hero.name} with Sri Y.S. Jagan Mohan Reddy`}
                    className="w-full h-full object-cover scale-[1.08] translate-y-[2%] hover:scale-[1.12] transition-transform duration-500"
                    style={{ objectPosition: 'center 12%' }}
                  />
                </div>

                {/* Official YSRCP Fan Symbol Badge floating on bottom right */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl border-2 border-[#00913f] flex items-center gap-2">
                  <img
                    src="/images/ysrcp-fan-official-logo.jpg"
                    alt="YSRCP Official Fan Symbol"
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full"
                  />
                  <div className="text-left leading-tight pr-1">
                    <span className="block text-[10px] sm:text-[11px] font-black text-navy uppercase tracking-wider">YSRCP</span>
                    <span className="text-xs sm:text-[13px] font-black text-[#00913f]">ఫ్యాన్ గుర్తు</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Two Votes Overlapping Banner (ఈసారి మీకు రెండు ఓట్లు) */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-10 sm:-mt-14 mb-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-premium border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Header Column */}
          <div className="border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy leading-tight">
              {t.twoVotes.title}
            </h3>
            <p className="font-poppins text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {t.twoVotes.enTitle}
            </p>
          </div>

          {/* Vote 1: Ward Member */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-civicBlue font-poppins font-extrabold text-2xl flex items-center justify-center shrink-0 border border-blue-100">
              {t.twoVotes.vote1Number}
            </div>
            <div>
              <b className="block text-base font-extrabold text-navy leading-snug">
                {t.twoVotes.vote1Title}
              </b>
              <span className="text-xs sm:text-sm text-slate-500">
                {t.twoVotes.vote1Desc}
              </span>
            </div>
          </div>

          {/* Vote 2: Municipal Chairperson */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-civicGreen font-poppins font-extrabold text-2xl flex items-center justify-center shrink-0 border border-emerald-100">
              {t.twoVotes.vote2Number}
            </div>
            <div>
              <b className="block text-base font-extrabold text-navy leading-snug">
                {t.twoVotes.vote2Title}
              </b>
              <span className="text-xs sm:text-sm text-slate-500">
                {t.twoVotes.vote2Desc}
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
