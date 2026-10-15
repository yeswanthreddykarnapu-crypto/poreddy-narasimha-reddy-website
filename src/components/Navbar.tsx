import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Globe,
  MessageSquare,
  Sparkles,
  ChevronDown,
  User,
  Target,
  Briefcase,
  Heart,
  Rss,
  Image,
  Vote,
  Palette,
} from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface NavbarProps {
  t: TranslationData;
  lang: 'en' | 'te';
  onToggleLang: () => void;
  onReplaySplash: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ t, lang, onToggleLang, onReplaySplash }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (moreOpen) setMoreOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, moreOpen]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Primary links shown directly in desktop nav (max 5 for clean layout)
  const primaryLinks = [
    { href: '#about', label: t.nav.about, icon: User },
    { href: '#priorities', label: t.nav.priorities, icon: Target },
    { href: '#career', label: t.nav.career, icon: Briefcase },
    { href: '#foundation', label: t.nav.foundation, icon: Heart },
    { href: '#gallery', label: t.nav.gallery, icon: Image },
  ];

  // Secondary links in "More" dropdown
  const secondaryLinks = [
    { href: '#support-poster', label: lang === 'te' ? 'మద్దతు పోస్టర్' : 'Support Poster', icon: Palette },
    { href: '#instagram', label: t.nav.instagram, icon: Rss },
    { href: '#vote', label: t.nav.voteInfo, icon: Vote },
  ];

  // All links combined for mobile menu
  const allLinks = [
    ...primaryLinks,
    ...secondaryLinks,
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Main Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full text-white transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/95 backdrop-blur-md shadow-lg py-0'
            : 'bg-navy shadow-elevated py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">

            {/* Brand: Candidate Name as Wordmark */}
            <a href="#" className="flex flex-col group shrink-0 min-w-0">
              <span className="text-sm sm:text-base lg:text-lg font-extrabold text-white leading-tight tracking-tight group-hover:text-emerald-300 transition-colors truncate">
                {t.brand.candidateShort}
              </span>
              <span className="text-[9px] sm:text-[10px] text-blue-300/80 tracking-wider uppercase font-medium truncate">
                {lang === 'te' ? 'YSRCP · PRODDATUR' : 'వైఎస్సార్‌సీపీ · ప్రొద్దుటూరు'}
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {primaryLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all px-3 py-2 rounded-lg"
                >
                  {link.label}
                </a>
              ))}

              {/* "More" Dropdown for secondary items */}
              <div className="relative" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center gap-1 text-[13px] font-semibold px-3 py-2 rounded-lg transition-all cursor-pointer ${
                    moreOpen
                      ? 'text-white bg-white/15'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                  aria-expanded={moreOpen}
                >
                  <span>{lang === 'te' ? 'మరిన్ని' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-navy-900 border border-white/10 rounded-xl shadow-2xl py-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {secondaryLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setMoreOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-emerald-400/70" />
                          <span>{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Primary CTA: Share Ward Issue */}
              <a
                href="#listen"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-civicGreen hover:bg-civicGreen-dark text-white text-[13px] font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all ml-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.nav.listenCta}</span>
              </a>

              {/* Language Switch Button */}
              <button
                type="button"
                onClick={onToggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all cursor-pointer ml-1"
                aria-label={`Switch to ${lang === 'en' ? 'Telugu' : 'English'}`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.nav.langSwitch}</span>
              </button>
            </nav>

            {/* Mobile Actions: Language & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onToggleLang}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold border border-white/15"
                aria-label={`Switch to ${lang === 'en' ? 'Telugu' : 'English'}`}
              >
                {t.nav.langSwitch}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-hidden transition-colors"
                aria-label={t.nav.menuToggle}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Tricolor Stripe Directly Under Header */}
        <div className="stripe w-full"></div>

        {/* Premium Continuously Scrolling Slogans Ticker */}
        <div
          className="w-full bg-[#073E79] text-white overflow-hidden select-none border-b border-[#052b54] shadow-md z-30"
          role="region"
          aria-label="Campaign Slogans Ticker"
        >
          <div className="h-9 sm:h-[42px] flex items-center overflow-hidden">
            <div className="animate-ticker-rtl">
              {/* Repeated sets ensure a seamless, gapless marquee loop */}
              {[1, 2, 3, 4].map((setIndex) => (
                <div key={setIndex} className="flex items-center shrink-0">
                  {/* Slogan 1 */}
                  <span className="font-poppins font-extrabold text-xs sm:text-[13px] md:text-sm tracking-wider uppercase text-white whitespace-nowrap px-3 sm:px-4">
                    VOTE FOR CHANGE
                  </span>
                  <span className="text-[#F4C95D] font-black text-xs sm:text-sm px-1" aria-hidden="true">
                    ✦
                  </span>
                  <span className="font-poppins font-extrabold text-xs sm:text-[13px] md:text-sm tracking-wider uppercase text-white whitespace-nowrap px-3 sm:px-4">
                    VOTE FOR FAN
                  </span>

                  <span className="text-[#F4C95D] font-black text-xs sm:text-sm px-2 sm:px-3" aria-hidden="true">
                    ✦
                  </span>

                  {/* Slogan 2 */}
                  <span className="font-poppins font-extrabold text-xs sm:text-[13px] md:text-sm tracking-wider uppercase text-white whitespace-nowrap px-3 sm:px-4">
                    OUR PRODDATUR
                  </span>
                  <span className="text-[#F4C95D] font-black text-xs sm:text-sm px-1" aria-hidden="true">
                    ✦
                  </span>
                  <span className="font-poppins font-extrabold text-xs sm:text-[13px] md:text-sm tracking-wider uppercase text-white whitespace-nowrap px-3 sm:px-4">
                    OUR RESPONSIBILITY
                  </span>

                  <span className="text-[#F4C95D] font-black text-xs sm:text-sm px-2 sm:px-3" aria-hidden="true">
                    ✦
                  </span>

                  {/* Slogan 3 */}
                  <span className="font-poppins font-extrabold text-xs sm:text-[13px] md:text-sm tracking-wider uppercase text-white whitespace-nowrap px-3 sm:px-4">
                    POREDDY NARASIMHA REDDY FOR MUNICIPAL CHAIRPERSON
                  </span>

                  <span className="text-[#F4C95D] font-black text-xs sm:text-sm px-2 sm:px-3" aria-hidden="true">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <div className="lg:hidden fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] bg-navy-950 z-50 flex flex-col animate-in slide-in-from-right duration-250 shadow-2xl">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-sm font-bold text-white">
                {t.brand.candidateShort}
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" aria-label="Mobile Navigation">
              {allLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-semibold text-white/85 hover:text-white hover:bg-white/8 active:bg-white/12 transition-colors"
                  >
                    <Icon className="w-4.5 h-4.5 text-emerald-400/60 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Drawer Footer CTAs */}
            <div className="px-4 py-4 border-t border-white/10 space-y-2.5">
              <a
                href="#listen"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-civicGreen hover:bg-civicGreen-dark text-white font-bold text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.nav.listenCta}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onReplaySplash();
                }}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white/8 hover:bg-white/12 text-slate-300 text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.nav.replaySplash}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
