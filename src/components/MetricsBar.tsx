import React from 'react';
import { Calendar, Users, Briefcase, Award } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface MetricsBarProps {
  t: TranslationData;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ t }) => {
  const metrics = [
    {
      ...t.metrics.stat1,
      icon: Calendar,
      color: 'text-civicBlue',
      bg: 'bg-civicBlue-50',
    },
    {
      ...t.metrics.stat2,
      icon: Users,
      color: 'text-civicGreen',
      bg: 'bg-civicGreen-50',
    },
    {
      ...t.metrics.stat3,
      icon: Briefcase,
      color: 'text-accentGold',
      bg: 'bg-amber-50',
    },
    {
      ...t.metrics.stat4,
      icon: Award,
      color: 'text-navy',
      bg: 'bg-slate-100',
    },
  ];

  return (
    <section className="bg-white border-b border-subtleBorder py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-warmWhite border border-subtleBorder/80 hover:border-civicBlue/40 transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                    {m.value}
                  </span>
                  <div className={`p-2 rounded-lg ${m.bg}`}>
                    <Icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-bodyDark mb-1">
                    {m.label}
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
