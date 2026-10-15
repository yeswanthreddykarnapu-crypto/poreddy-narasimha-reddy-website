import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface SplashIntroProps {
  t: TranslationData;
  lang: 'en' | 'te';
  onComplete: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ t, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleEnter();
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0b2048] via-[#0f2a5a] to-[#091e42] text-white overflow-hidden transition-all duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome and Vote for Poreddy Narasimha Reddy"
    >
      {/* Top YSRCP Tricolor Stripe Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 z-20"
        style={{
          background: 'linear-gradient(90deg, #2f5bb7 33.3%, #ffffff 33.3% 66.6%, #1a7a4a 66.6%)',
        }}
      />

      {/* Background ambient lighting effects using official colors (#2f5bb7, #1a7a4a, #34d399) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#2f5bb7]/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#1a7a4a]/25 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#34d399]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto px-6 py-8 text-center flex flex-col items-center">
        
        {/* Top Tagline Badge - matches .pill from poreddynarasimhareddy.com */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a7a4a]/20 border border-[#22c55e] text-[#34d399] text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#34d399]" />
          <span>{t.splash.tagline}</span>
        </div>

        {/* Candidate Portrait with glowing Tricolor & Emerald ring */}
        <div className="relative mb-6 group">
          {/* Animated Tricolor halo */}
          <div
            className="absolute -inset-1.5 rounded-full blur-md opacity-80 group-hover:opacity-100 transition duration-1000 animate-spin"
            style={{
              animationDuration: '8s',
              background: 'linear-gradient(90deg, #2f5bb7, #ffffff, #1a7a4a, #34d399)',
            }}
          />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#1a7a4a] shadow-2xl bg-[#0b2048]">
            <img
              src="/images/poreddy-narasimha-reddy-namaste.jpg"
              alt="Sri Poreddy Narasimha Reddy"
              className="w-full h-full object-cover object-top scale-110"
              width={250}
              height={250}
            />
          </div>
          {/* Party Symbol Pill attached to portrait */}
          <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-0.5 rounded-full bg-white text-[#0f2a5a] font-extrabold text-[11px] shadow-lg border border-[#34d399]/40 flex items-center gap-1.5">
            <img src="/images/ysrcp-fan-symbol.png" alt="Fan" className="w-4 h-3 object-contain" />
            <span className="font-poppins font-black">YSRCP</span>
          </div>
        </div>

        {/* Main Candidate Name */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          {t.splash.candidateName}
        </h1>

        {/* Subtitle in #c9d6f0 */}
        <p className="text-sm sm:text-base font-semibold text-[#c9d6f0] max-w-xl mb-6">
          {t.splash.candidateTitle}
        </p>

        {/* PRIMARY HIGHLIGHTED CALL TO ACTION: VOTE FOR CHANGE */}
        <div className="w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#091e42]/90 to-[#0c2756]/90 border-2 border-[#34d399] shadow-2xl backdrop-blur-md mb-7">
          <div className="flex items-center justify-center gap-2 text-[#34d399] text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
            <span>{t.splash.voteBanner}</span>
          </div>

          {/* Slogan */}
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
            {t.splash.voteSlogan}
          </div>

          {/* Tricolor Accent Divider */}
          <div
            className="w-28 h-1 mx-auto mt-3 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #2f5bb7 33.3%, #ffffff 33.3% 66.6%, #1a7a4a 66.6%)',
            }}
          />
        </div>

        {/* Enter Website Button & Progress Bar */}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <button
            type="button"
            onClick={handleEnter}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#1a7a4a] hover:bg-[#135d38] border-2 border-[#22c55e] text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.splash.enterButton}</span>
            <ArrowRight className="w-4 h-4 text-[#34d399]" />
          </button>

          {/* Progress Bar & Auto-Enter Hint */}
          <div className="w-full">
            <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-75 ease-linear rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #2f5bb7, #34d399, #22c55e)',
                }}
              />
            </div>
            <p className="text-[11px] text-[#c9d6f0] mt-2 font-medium">
              {t.splash.autoEnterHint}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom YSRCP Tricolor Stripe Accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
        style={{
          background: 'linear-gradient(90deg, #2f5bb7 33.3%, #ffffff 33.3% 66.6%, #1a7a4a 66.6%)',
        }}
      />
    </div>
  );
};
