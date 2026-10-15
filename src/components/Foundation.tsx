import React from 'react';
import { Heart, GraduationCap, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface FoundationProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const Foundation: React.FC<FoundationProps> = ({ t, lang }) => {
  return (
    <section id="foundation" className="py-16 md:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Foundation Banner Card */}
        <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-[#091e42] via-[#0b2048] to-[#0f2a5a] text-white shadow-premium border border-white/10 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Foundation Identity & Description */}
            <div className="md:col-span-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Heart className="w-3.5 h-3.5 fill-emerald-400" />
                <span>{t.foundation.founderNotice}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                {t.foundation.title}
              </h2>

              <p className="text-emerald-300 font-bold text-sm sm:text-base mb-4 font-telugu">
                {lang === 'en' ? 'Poreddy Sujatha Foundation • Dedicated Social Welfare Trust' : 'పోరెడ్డి సుజాత ఫౌండేషన్ — సమాజ సేవలో ముందుపీఠ'}
              </p>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                {t.foundation.lead}
              </p>

              {/* Tribute note to Smt. Sujatha Poreddy */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3 text-xs sm:text-sm text-blue-200">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'te'
                    ? 'దివంగత శ్రీమతి సుజాత పోరెడ్డి గారి ఆదర్శాలను సజీవంగా ఉంచుతూ నిరుపేదలకు అండగా నిలుస్తున్న సంస్థ.'
                    : 'Founded in solemn memory of Late Smt. Sujatha Poreddy to empower students and elders in Proddatur.'}
                </span>
              </div>
            </div>

            {/* Right: Authentic Official Foundation Logo */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative p-3 bg-white rounded-2xl shadow-2xl border-2 border-emerald-400/40 max-w-[240px] sm:max-w-[280px]">
                <img
                  src="/images/poreddy-sujatha-foundation-logo.jpg"
                  alt="Official logo of Poreddy Sujatha Foundation"
                  className="w-full h-auto rounded-xl object-contain"
                  width={1024}
                  height={1024}
                  loading="lazy"
                />
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-navy uppercase tracking-wider block">
                    {lang === 'te' ? 'పోరెడ్డి సుజాత ఫౌండేషన్ చిహ్నం' : 'Poreddy Sujatha Foundation'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {lang === 'te' ? 'సేవయే ధ్యేయంగా అడుగులు' : 'Serving Humanity with Devotion'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* The Three Core Pillars */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-navy mb-2">
              {lang === 'te' ? 'మూడు ప్రధాన సేవా విభాగాలు' : 'Three Core Pillars of Community Service'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              {lang === 'te' ? 'ప్రొద్దుటూరు మరియు వైఎస్సార్ కడప జిల్లాలో అమలవుతున్న సేవా పథకాలు' : 'Ongoing social welfare programs across Proddatur and YSR Kadapa District'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Education */}
            <div className="p-6 rounded-2xl bg-warmBg border border-slate-200 shadow-subtle hover:border-civicGreen/40 transition-all flex flex-col justify-between text-left">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-civicBlue flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-navy mb-2">
                  {t.foundation.pillar1Title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.foundation.pillar1Desc}
                </p>
              </div>
            </div>

            {/* Pillar 2: Elderly Care */}
            <div className="p-6 rounded-2xl bg-warmBg border border-slate-200 shadow-subtle hover:border-civicGreen/40 transition-all flex flex-col justify-between text-left">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-civicGreen flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-navy mb-2">
                  {t.foundation.pillar2Title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.foundation.pillar2Desc}
                </p>
              </div>
            </div>

            {/* Pillar 3: Community Welfare */}
            <div className="p-6 rounded-2xl bg-warmBg border border-slate-200 shadow-subtle hover:border-civicGreen/40 transition-all flex flex-col justify-between text-left">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-navy mb-2">
                  {t.foundation.pillar3Title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.foundation.pillar3Desc}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Documented Activities */}
        <div>
          <div className="mb-6 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-navy">
              {lang === 'te' ? 'నిర్వహించిన సేవా కార్యక్రమాలు' : 'Documented Welfare Activities'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.foundation.activities.map((act) => (
              <div
                key={act.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between text-left"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
                    {act.impactHighlight}
                  </span>
                  <h4 className="text-base font-bold text-navy mb-2">
                    {act.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {act.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-civicGreen shrink-0" />
                  <span>{act.verifiedOutcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
