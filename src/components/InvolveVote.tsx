import React from 'react';
import { Users, Calendar, UserPlus, CheckSquare, ExternalLink, Vote } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface InvolveVoteProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const InvolveVote: React.FC<InvolveVoteProps> = ({ t, lang }) => {
  return (
    <section className="py-16 md:py-20 bg-warmBg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="text-civicGreen font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-2">
            {t.involve.tag} · <span className="font-poppins">{t.involve.tagEn}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            {t.involve.title}
          </h2>
        </div>

        {/* 3 Involvement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {t.involve.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 p-3 rounded-xl bg-slate-50 w-fit text-civicBlue border border-slate-100">
                  {idx === 0 && <Calendar className="w-6 h-6" />}
                  {idx === 1 && <Users className="w-6 h-6" />}
                  {idx === 2 && <UserPlus className="w-6 h-6" />}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-navy mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              <a
                href={card.linkHref}
                target={card.linkHref.startsWith('http') ? '_blank' : '_self'}
                rel={card.linkHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-civicBlue hover:text-navy transition-colors pt-3 border-t border-slate-100"
              >
                <span>{card.linkText}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Voting Responsibility Card (ఓటు వేయడం — మన బాధ్యత) */}
        <div id="vote" className="bg-civicGreen rounded-3xl p-6 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-bold uppercase mb-3">
              <Vote className="w-3.5 h-3.5" />
              <span>{lang === 'te' ? 'మున్సిపల్ ఎన్నికలు' : 'Municipal Elections'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
              {t.voteSection.title}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 font-medium">
              {t.voteSection.pollingInfo}
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-start md:items-end text-left md:text-right gap-4">
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-50 font-medium">
              <li className="flex items-center gap-2 justify-start md:justify-end">
                <CheckSquare className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>{t.voteSection.rule1}</span>
              </li>
              <li className="flex items-center gap-2 justify-start md:justify-end">
                <CheckSquare className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>{t.voteSection.rule2}</span>
              </li>
            </ul>

            <a
              href={t.voteSection.btnPollingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy hover:bg-navy-900 text-white font-extrabold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <span>{t.voteSection.btnPollingCenter}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
