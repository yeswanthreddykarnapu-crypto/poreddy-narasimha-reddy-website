import React from 'react';
import { ArrowUp, Globe, ShieldCheck } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface FooterProps {
  t: TranslationData;
  lang: 'en' | 'te';
  onToggleLang: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, lang, onToggleLang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-navy-900 text-white pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row matching poreddynarasimhareddy.com */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-10 border-b border-white/10">
          
          {/* Left: Campaign & Privacy Notice */}
          <div className="max-w-xl text-left">
            <b className="text-base sm:text-lg font-bold text-white block mb-1.5 tracking-wide">
              {t.footer.campaignInfoTitle}
            </b>
            <div className="font-poppins text-xs sm:text-sm text-blue-200 mb-2">
              {t.footer.publisherText}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {t.footer.privacyNote}
            </p>
          </div>

          {/* Right: Official Social Profiles */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Poreddy-Narasimha-Reddy/100063638053656"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-poppins text-xs sm:text-sm transition-all hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M13.500 22v-8.500h2.900l.5-3.500h-3.400V7.800c0-1 .3-1.7 1.7-1.7H17V3c-.3 0-1.400-.1-2.6-.1-2.6 0-4.300 1.6-4.300 4.400V10H7.200v3.500h2.900V22z" />
              </svg>
              <span>{t.footer.socialFacebook}</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-poppins text-xs sm:text-sm transition-all hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.500a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9zm0 2a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5zM17.500 5.500a1.100 1.100 0 1 1 0 2.200 1.100 1.100 0 0 1 0-2.200z" />
              </svg>
              <span>{t.footer.socialInstagram}</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCzj3Zlh3hpn8cz_LHXkQBdQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-poppins text-xs sm:text-sm transition-all hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 8.200a3 3 0 0 0-2.100-2.100C18 5.6 12 5.6 12 5.6s-6 0-7.900.5A3 3 0 0 0 2 8.200 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.800a3 3 0 0 0 2.100 2.100c1.900.5 7.900.5 7.900.5s6 0 7.900-.5a3 3 0 0 0 2.100-2.100 31 31 0 0 0 .4-3.800 31 31 0 0 0-.4-3.800zM10 15V9l5.200 3z" />
              </svg>
              <span>{t.footer.socialYoutube}</span>
            </a>

            {/* WhatsApp Channel */}
            <a
              href="https://whatsapp.com/channel/0029Vb9SlGo1yT23AuXOiU2a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-civicGreen hover:bg-civicGreen-dark text-white font-poppins text-xs sm:text-sm transition-all hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-8.6 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.200 14.200c-.2.6-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.100-4.500-4-4.7-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.7-.3h.5c.2 0 .4 0 .6.500l.8 1.900c.1.200.1.400 0 .5l-.4.6-.4.400c-.1.200-.3.300-.1.6.2.300.8 1.300 1.7 2.100 1.100 1 2.100 1.300 2.400 1.400.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.6-.1l1.800.9c.3.100.4.200.5.300.1.200.1.800-.1 1.400z" />
              </svg>
              <span>{t.footer.socialWhatsapp}</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              © {new Date().getFullYear()} {t.brand.candidateShort} • voteforporeddynarasimhareddy.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-300" />
              <span>{lang === 'en' ? 'తెలుగు వెర్షన్' : 'English Version'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === 'te' ? 'పైకి వెళ్లండి' : 'Back to top'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
