import React from 'react';
import type { TranslationData } from '../data/translations';

interface ExperienceProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const Experience: React.FC<ExperienceProps> = ({ t, lang }) => {
  return (
    <section id="career" className="py-16 md:py-20 bg-warmBg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Signature Career Box matching poreddynarasimhareddy.com */}
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-[#091e42] via-[#0b224d] to-[#0c2756]">
          
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Career Header */}
          <div className="relative z-10 text-center mb-8 md:mb-10">
            <div className="font-poppins text-xs sm:text-sm font-bold tracking-[0.16em] text-blue-200 uppercase mb-2">
              {t.career.super}
            </div>
            <h3 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide uppercase">
              {t.career.heading}
            </h3>
            <div className="w-16 h-1 bg-emerald-400 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* 2-Column Career Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5">
            {t.career.timeline.map((item, idx) => {
              const isFull = idx === t.career.timeline.length - 1; // 2025 Vice President takes full width

              return (
                <div
                  key={item.year}
                  className={`flex items-start gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 border-l-[3.5px] border-l-emerald-400 transition-all duration-200 hover:translate-x-1 ${
                    isFull ? 'md:col-span-2 bg-emerald-950/30 border-emerald-400/30' : ''
                  }`}
                >
                  {/* Year Tag */}
                  <div className="font-poppins font-extrabold text-base sm:text-lg text-emerald-300 w-20 shrink-0 pt-0.5 tracking-tight">
                    {item.year}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <h4 className="font-poppins text-sm sm:text-base font-extrabold text-white leading-snug mb-1 tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
                      {lang === 'te' ? item.description : `${item.role} • ${item.organization}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Odarpu Yatra Core Committee Box */}
          <div className="relative z-10 mt-7 sm:mt-8 p-4 sm:p-5 rounded-xl bg-emerald-900/30 border-2 border-emerald-400 text-center shadow-lg">
            <b className="block font-poppins text-sm sm:text-base md:text-lg font-extrabold text-white tracking-wider uppercase">
              {t.career.odarpuTitle}
            </b>
            <span className="block text-xs sm:text-sm text-emerald-200 font-semibold mt-1">
              {t.career.odarpuSubtitle}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
