import React from 'react';
import { UserCheck, GraduationCap, MapPin, Building2, HeartHandshake } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface AboutProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const About: React.FC<AboutProps> = ({ t, lang }) => {
  return (
    <section id="about" className="py-16 md:py-20 bg-warmBg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left">
          <div className="text-civicGreen font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-2">
            {t.about.tag} · <span className="font-poppins">{t.about.tagEn}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">
            {t.about.title}
          </h2>
        </div>

        {/* 2-Column Grid: Narrative on Left, Quick Facts Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Narrative Bio */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-subtle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-civicBlue shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy mb-1.5">
                    {lang === 'te' ? 'ప్రొద్దుటూరు మూలాలు & విద్యార్థి నాయకత్వం' : 'Proddatur Roots & Student Leadership'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {t.about.p1}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-subtle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-civicGreen shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy mb-1.5">
                    {lang === 'te' ? 'రెండు పర్యాయాలు కౌన్సిలర్ & వస్త్ర వ్యాపార సారథ్యం' : 'Two-Term Councillor & Textile Association'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {t.about.p2}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-subtle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy mb-1.5">
                    {lang === 'te' ? 'వైఎస్సార్‌సీపీలో విధేయత & ప్రజా సంక్షేమం' : 'Steadfast Leadership & Public Welfare'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {t.about.p3}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-elevated">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
              <div className="p-2 rounded-lg bg-navy text-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-navy">
                {t.about.quickFactsTitle}
              </h3>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  {t.about.residenceLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-navy flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-civicGreen shrink-0" />
                  {t.about.residenceValue}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  {t.about.eduLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-navy">
                  {t.about.eduValue}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  {t.about.designationLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-civicGreen">
                  {t.about.designationValue}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  {t.about.foundationLabel}
                </span>
                <span className="text-sm sm:text-base font-bold text-navy">
                  {t.about.foundationValue}
                </span>
              </div>
            </div>

            {/* Quote Strip */}
            <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-5 rounded-b-2xl">
              <p className="text-xs sm:text-sm font-semibold text-slate-700 italic">
                {lang === 'te'
                  ? '“ప్రజల సమస్యలను ప్రత్యక్షంగా విని, వారి మధ్యే ఉంటూ బాధ్యతాయుతమైన పాలన అందించడమే నా జీవిత ఆశయం.”'
                  : '“To listen directly to the people, stay in their midst, and provide dedicated, accountable governance is my life’s commitment.”'}
              </p>
              <span className="block text-[11px] font-bold text-civicGreen mt-2 uppercase tracking-wider">
                — {t.brand.candidateShort}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
