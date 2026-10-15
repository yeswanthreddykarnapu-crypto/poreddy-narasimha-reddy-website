import { useState, useEffect } from 'react';
import { contentEN, contentTE } from './data/translations';
import type { TranslationData } from './data/translations';
import { SplashIntro } from './components/SplashIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SupportPosterGenerator } from './components/SupportPosterGenerator';
import { MetricsBar } from './components/MetricsBar';
import { PrioritiesSection } from './components/PrioritiesSection';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { GrievanceListen } from './components/GrievanceListen';
import { InvolveVote } from './components/InvolveVote';
import { Foundation } from './components/Foundation';
import { InstagramFeed } from './components/InstagramFeed';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

export function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const [lang, setLang] = useState<'en' | 'te'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'te' || urlLang === 'en') return urlLang;
      const saved = localStorage.getItem('pnr_lang');
      if (saved === 'te' || saved === 'en') return saved;
    }
    return 'te';
  });

  const t: TranslationData = lang === 'te' ? contentTE : contentEN;

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('pnr_lang', lang);

    if (lang === 'te') {
      document.title = 'పోరెడ్డి నరసింహారెడ్డి – ప్రొద్దుటూరు మున్సిపల్ చైర్పర్సన్ అభ్యర్థి | వైఎస్సార్‌సీపీ';
    } else {
      document.title = 'Poreddy Narasimha Reddy – YSRCP Candidate for Proddatur Municipal Chairperson';
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  const handleReplaySplash = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowSplash(true);
  };

  return (
    <>
      {/* Intro Animation Before Opening Website */}
      {showSplash && (
        <SplashIntro
          t={t}
          lang={lang}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Main Website Structure */}
      <div className={`min-h-screen flex flex-col bg-warmBg text-bodyDark ${lang === 'te' ? 'font-telugu' : 'font-sans'}`}>
        <Navbar
          t={t}
          lang={lang}
          onToggleLang={toggleLanguage}
          onReplaySplash={handleReplaySplash}
        />

        <main id="main-content" className="flex-1">
          {/* 1. Hero with Overlapping Two Votes Banner */}
          <Hero t={t} lang={lang} />

          {/* 2. Interactive "Create Your Support Poster" Feature */}
          <SupportPosterGenerator t={t} lang={lang} />

          {/* 3. Key Metrics Bar */}
          <MetricsBar t={t} />

          {/* 3. Five Daily Priorities with Live Ground Status */}
          <PrioritiesSection t={t} lang={lang} />

          {/* 4. Biography & Leadership Credentials */}
          <About t={t} lang={lang} />

          {/* 5. Political Career Box & Odarpu Yatra Core Committee */}
          <Experience t={t} lang={lang} />

          {/* 6. Citizen Grievance Submission & Direct WhatsApp Helpline ("ముందు వింటాం") */}
          <GrievanceListen t={t} lang={lang} />

          {/* 7. Community Involvement & Sacred Voting Duty */}
          <InvolveVote t={t} lang={lang} />

          {/* 8. Poreddy Sujatha Foundation Dedicated Section */}
          <Foundation t={t} lang={lang} />

          {/* 9. Live Instagram Stream (@poreddy_narasimha_reddy_) */}
          <InstagramFeed lang={lang} />

          {/* 10. Archival Photographic Gallery with Lightbox */}
          <Gallery t={t} lang={lang} />
        </main>

        {/* 11. Official Footer */}
        <Footer t={t} lang={lang} onToggleLang={toggleLanguage} />
      </div>
    </>
  );
}

export default App;
