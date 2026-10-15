import React from 'react';
import { Droplet, Waves, Navigation, Lightbulb, Trash2, ArrowUpRight } from 'lucide-react';
import type { TranslationData, PriorityItem } from '../data/translations';

interface PrioritiesSectionProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const PrioritiesSection: React.FC<PrioritiesSectionProps> = ({ t, lang }) => {
  const getIcon = (type: PriorityItem['iconType']) => {
    switch (type) {
      case 'water':
        return <Droplet className="w-8 h-8 text-civicBlue" />;
      case 'drainage':
        return <Waves className="w-8 h-8 text-cyan-600" />;
      case 'roads':
        return <Navigation className="w-8 h-8 text-slate-700" />;
      case 'lights':
        return <Lightbulb className="w-8 h-8 text-amber-500" />;
      case 'garbage':
        return <Trash2 className="w-8 h-8 text-emerald-600" />;
      default:
        return <Droplet className="w-8 h-8 text-civicBlue" />;
    }
  };

  const getStatusBadge = (statusType: PriorityItem['statusType'], statusText: string) => {
    switch (statusType) {
      case 'info':
        return (
          <span className="inline-block bg-blue-100/80 text-navy font-bold text-xs px-3 py-1 rounded-full border border-blue-200">
            {statusText}
          </span>
        );
      case 'review':
        return (
          <span className="inline-block bg-amber-100/80 text-amber-900 font-bold text-xs px-3 py-1 rounded-full border border-amber-200">
            {statusText}
          </span>
        );
      case 'complaints':
        return (
          <span className="inline-block bg-emerald-100/90 text-emerald-900 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
            {statusText}
          </span>
        );
    }
  };

  return (
    <section id="priorities" className="py-16 md:py-20 bg-warmBg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="text-civicGreen font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-2">
            {t.priorities.tag} · <span className="font-poppins">{t.priorities.tagEn}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-2.5">
            {t.priorities.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-medium">
            {t.priorities.subtitle}
          </p>
        </div>

        {/* 5 Priority Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {t.priorities.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-subtle hover:shadow-elevated hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 p-2.5 rounded-xl bg-slate-50 w-fit border border-slate-100">
                  {getIcon(item.iconType)}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {getStatusBadge(item.statusType, item.status)}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Grievance CTA Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-subtle">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-navy">
              {lang === 'te' ? 'మీ వార్డులో ఈ సమస్యలు ఉన్నాయా?' : 'Facing these issues in your ward?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'te'
                ? 'నేరుగా మీ సమస్యను నమోదు చేయండి. తక్షణమే పరిశీలించి మున్సిపల్ అధికారుల దృష్టికి తీసుకెళ్తాం.'
                : 'Report your ward grievance directly. We examine every complaint and coordinate for timely resolution.'}
            </p>
          </div>
          <a
            href="#listen"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-civicGreen hover:bg-civicGreen-dark text-white font-bold text-sm shadow-xs shrink-0 transition-colors"
          >
            <span>{lang === 'te' ? 'సమస్య చెప్పండి' : 'Report Issue'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
