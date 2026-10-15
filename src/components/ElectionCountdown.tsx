import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Flame, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

/**
 * Election Countdown Target Configuration
 * Target: 28 October 2026, 12:00 AM IST (Asia/Kolkata, UTC+5:30)
 * Configurable target ISO string with '+05:30' time zone offset.
 */
export const ELECTION_TARGET_TIME = '2026-10-28T00:00:00+05:30';

// Election Day duration is 24 hours (until 23:59:59 IST)
const ELECTION_DAY_DURATION_MS = 24 * 60 * 60 * 1000;

interface ElectionCountdownProps {
  lang: 'en' | 'te';
  className?: string;
}

interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isElectionDay: boolean;
  isPostElection: boolean;
}

// Single Animated Digit Card Component with smooth value transition
const CountdownUnitCard: React.FC<{
  value: string;
  label: string;
  isHighlighted?: boolean;
}> = ({ value, label, isHighlighted = false }) => {
  const prevValueRef = useRef(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 300);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center py-2.5 px-1 sm:py-3.5 sm:px-2 md:py-4 md:px-3 rounded-xl sm:rounded-2xl transition-all duration-300 border ${
        isHighlighted
          ? 'bg-gradient-to-b from-emerald-500/15 via-emerald-500/10 to-transparent border-emerald-400/40 shadow-[0_4px_16px_rgba(52,211,153,0.2)]'
          : 'bg-white/[0.06] hover:bg-white/[0.09] border-white/10 hover:border-emerald-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
      }`}
    >
      {/* Subtle top glare highlight */}
      <div className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Number Display with smooth pulse transition on change */}
      <span
        className={`font-poppins font-black text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none transition-all duration-300 ${
          animating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
        } ${
          isHighlighted
            ? 'text-emerald-300 drop-shadow-[0_2px_12px_rgba(52,211,153,0.5)]'
            : 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]'
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </span>

      {/* Label */}
      <span
        className={`font-poppins text-[9px] sm:text-[10px] md:text-xs font-extrabold tracking-wider uppercase mt-1 sm:mt-1.5 transition-colors ${
          isHighlighted ? 'text-emerald-300' : 'text-slate-300'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export const ElectionCountdown: React.FC<ElectionCountdownProps> = ({ lang, className = '' }) => {
  const calculateTime = (): TimeRemaining => {
    const targetMs = Date.parse(ELECTION_TARGET_TIME);
    const endOfElectionDayMs = targetMs + ELECTION_DAY_DURATION_MS;
    const nowMs = Date.now();

    // After Election Day
    if (nowMs >= endOfElectionDayMs) {
      return {
        totalMs: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isElectionDay: false,
        isPostElection: true,
      };
    }

    // On Election Day (28 October 2026 IST)
    if (nowMs >= targetMs && nowMs < endOfElectionDayMs) {
      return {
        totalMs: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isElectionDay: true,
        isPostElection: false,
      };
    }

    // Active Countdown
    const diff = Math.max(0, targetMs - nowMs);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      totalMs: diff,
      days,
      hours,
      minutes,
      seconds,
      isElectionDay: false,
      isPostElection: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    // Recalculate immediately on mount and when window gains focus/visibility
    const update = () => setTimeLeft(calculateTime());
    update();

    const interval = setInterval(update, 1000);
    const handleFocus = () => update();
    const handleVisibilityChange = () => {
      if (!document.hidden) update();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Format 2 digits with leading zero
  const pad = (n: number): string => n.toString().padStart(2, '0');

  // Dynamic headline strictly adhering to prompt specifications:
  // - More than 7 days: "Election Day Is Approaching"
  // - 7 days or fewer: "Only X Days to Go"
  // - Less than 24 hours: "Only X Hours to Go"
  // - On 28 October: "TODAY IS ELECTION DAY"
  const getDynamicHeadline = () => {
    if (timeLeft.isElectionDay) {
      return {
        text: lang === 'te' ? 'ఈరోజే ఎన్నికల రోజు' : 'TODAY IS ELECTION DAY',
        urgent: true,
      };
    }
    if (timeLeft.isPostElection) {
      return {
        text: lang === 'te' ? 'పోలింగ్ ముగిసింది' : 'POLLING CONCLUDED',
        urgent: false,
      };
    }
    // Less than 24 hours
    if (timeLeft.days === 0) {
      if (timeLeft.hours >= 1) {
        return {
          text: lang === 'te'
            ? `మరో ${timeLeft.hours} గంటలు మాత్రమే`
            : `Only ${timeLeft.hours} Hour${timeLeft.hours > 1 ? 's' : ''} to Go`,
          urgent: true,
        };
      }
      return {
        text: lang === 'te'
          ? `మరో ${timeLeft.minutes} నిమిషాలు మాత్రమే`
          : `Only ${timeLeft.minutes} Minute${timeLeft.minutes > 1 ? 's' : ''} to Go`,
        urgent: true,
      };
    }
    // 7 days or fewer
    if (timeLeft.days <= 7) {
      return {
        text: lang === 'te'
          ? `మరో ${timeLeft.days} రోజులు మాత్రమే`
          : `Only ${timeLeft.days} Day${timeLeft.days > 1 ? 's' : ''} to Go`,
        urgent: true,
      };
    }
    // More than 7 days
    return {
      text: lang === 'te' ? 'ఎన్నికల సమయం సమీపిస్తోంది' : 'Election Day Is Approaching',
      urgent: false,
    };
  };

  const dynamicStatus = getDynamicHeadline();
  const isFinalHours = !timeLeft.isElectionDay && !timeLeft.isPostElection && timeLeft.days === 0;

  // Case 1: Election Day Visible (28 October 2026)
  if (timeLeft.isElectionDay) {
    return (
      <div
        className={`w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-emerald-950/95 via-[#0c2756]/95 to-emerald-950/95 border-2 border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.35)] backdrop-blur-md text-white animate-in fade-in zoom-in-95 duration-500 ${className}`}
        role="region"
        aria-label="Election Day Announcement"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 animate-pulse">
              <Flame className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-emerald-300 uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{lang === 'te' ? 'ప్రత్యక్ష ప్రకటన' : 'TODAY IS ELECTION DAY'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
                {lang === 'te' ? 'ఈరోజే ఎన్నికల రోజు — 28 అక్టోబర్ 2026' : 'TODAY IS ELECTION DAY — 28 OCTOBER 2026'}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
                {lang === 'te'
                  ? 'ప్రొద్దుటూరు మున్సిపల్ ప్రగతికి ఫ్యాన్ గుర్తుకే మీ అమూల్యమైన ఓటు వేయండి!'
                  : 'Cast your vote for clean governance & municipal progress — Vote for Fan symbol!'}
              </p>
            </div>
          </div>

          <a
            href="https://electoralsearch.eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-black text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            <span>{lang === 'te' ? 'పోలింగ్ కేంద్రం తెలుసుకోండి' : 'Find Your Polling Station'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Case 2: Post-Election Neutral Message
  if (timeLeft.isPostElection) {
    return (
      <div
        className={`w-full rounded-2xl p-4 sm:p-5 bg-white/10 border border-white/15 backdrop-blur-md text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}
        role="region"
        aria-label="Post Election Notice"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-white">
              {lang === 'te' ? 'పోలింగ్ విజయవంతంగా ముగిసింది — 28 అక్టోబర్ 2026' : 'POLLING CONCLUDED — 28 OCTOBER 2026'}
            </h4>
            <p className="text-xs text-slate-300">
              {lang === 'te'
                ? 'ప్రజాస్వామ్య ప్రక్రియలో పాల్గొన్న ప్రొద్దుటూరు ప్రజలందరికీ హృదయపూర్వక ధన్యవాదాలు.'
                : 'Heartfelt gratitude to the citizens of Proddatur for participating in the democratic mandate.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Active Real-Time Countdown Panel (DAYS : HOURS : MINUTES : SECONDS)
  return (
    <div
      className={`w-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#091e42]/90 via-[#0b2450]/85 to-[#0f2a5a]/90 border border-emerald-400/35 shadow-[0_12px_36px_rgba(9,30,66,0.4),0_0_24px_rgba(26,122,74,0.18)] backdrop-blur-md text-white relative overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
        isFinalHours ? 'ring-2 ring-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.35)]' : ''
      } ${className}`}
      role="timer"
      aria-live="polite"
      aria-label="Live Election Countdown"
    >
      {/* Ambient background glows */}
      <div
        className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-blue-500/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header Row: Headline & Dynamic Supporting Message */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/10 mb-3.5">
        
        {/* Main Countdown Headline */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-poppins text-xs sm:text-sm font-black tracking-wider uppercase text-white">
            {lang === 'te' ? 'ఎన్నికల రోజుకు కౌంట్‌డౌన్' : 'COUNTDOWN TO ELECTION DAY'}
          </span>
        </div>

        {/* Dynamic Supporting Headline Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-colors ${
            dynamicStatus.urgent
              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/50 shadow-xs'
              : 'bg-white/10 text-blue-200 border border-white/15'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                dynamicStatus.urgent ? 'bg-emerald-400' : 'bg-blue-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                dynamicStatus.urgent ? 'bg-emerald-400' : 'bg-blue-300'
              }`}
            />
          </span>
          <span className="tracking-wide font-semibold">{dynamicStatus.text}</span>
        </div>

      </div>

      {/* Real-time 4-Unit Grid (DAYS : HOURS : MIN : SEC) */}
      <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 my-2.5">
        
        {/* Unit 1: DAYS */}
        <CountdownUnitCard
          value={pad(timeLeft.days)}
          label={lang === 'te' ? 'రోజులు' : 'DAYS'}
          isHighlighted={false}
        />

        {/* Unit 2: HOURS */}
        <CountdownUnitCard
          value={pad(timeLeft.hours)}
          label={lang === 'te' ? 'గంటలు' : 'HOURS'}
          isHighlighted={isFinalHours}
        />

        {/* Unit 3: MINUTES */}
        <CountdownUnitCard
          value={pad(timeLeft.minutes)}
          label={lang === 'te' ? 'నిమిషాలు' : 'MIN'}
          isHighlighted={isFinalHours}
        />

        {/* Unit 4: SECONDS (Live active pulse in emerald) */}
        <CountdownUnitCard
          value={pad(timeLeft.seconds)}
          label={lang === 'te' ? 'సెకన్లు' : 'SEC'}
          isHighlighted={true}
        />

      </div>

      {/* Bottom Row: Highlight 28 OCTOBER 2026 + IST Timezone Indicator */}
      <div className="relative z-10 pt-3 border-t border-white/10 mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300">
        
        {/* Highlighted Target Date Below Countdown */}
        <div className="flex items-center gap-1.5 text-emerald-300 font-black tracking-wide">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="font-poppins text-xs sm:text-sm">
            {lang === 'te' ? '28 అక్టోబర్ 2026' : '28 OCTOBER 2026'}
          </span>
          <span className="text-[10px] text-blue-200/90 font-bold ml-1">
            ({lang === 'te' ? 'ఎన్నికల రోజు' : 'ELECTION DAY'})
          </span>
        </div>

        {/* IST Time Zone Indicator */}
        <div className="text-[10px] sm:text-[11px] text-blue-200/80 font-medium font-poppins flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>12:00 AM IST (Asia/Kolkata)</span>
        </div>

      </div>

    </div>
  );
};
