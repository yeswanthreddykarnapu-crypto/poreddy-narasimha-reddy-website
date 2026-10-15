import React, { useState } from 'react';
import { MessageSquare, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface GrievanceListenProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const GrievanceListen: React.FC<GrievanceListenProps> = ({ t, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Wards 1 to 40 of Proddatur
  const wardOptions = Array.from({ length: 40 }, (_, i) => i + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanName = name.trim();
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    }
    const cleanMsg = message.trim();

    if (!cleanName) {
      setError(t.listen.errName);
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError(t.listen.errPhone);
      return;
    }
    if (!ward) {
      setError(t.listen.errWard);
      return;
    }
    if (!type) {
      setError(t.listen.errType);
      return;
    }
    if (!cleanMsg) {
      setError(t.listen.errMsg);
      return;
    }
    if (!consent) {
      setError(t.listen.errConsent);
      return;
    }

    const formattedText =
      `🏛️ *వైఎస్సార్‌సీపీ - వార్డు సమస్య ఫిర్యాదు*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *పేరు:* ${cleanName}\n` +
      `📱 *ఫోన్ నంబర్:* ${cleanPhone}\n` +
      `📍 *వార్డు నంబర్:* వార్డు ${ward}\n` +
      `🏷️ *సమస్య రకం:* ${type}\n` +
      `📝 *సమస్య వివరాలు:*\n${cleanMsg}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `🌐 _ప్రొద్దుటూరు మున్సిపల్ ఎన్నికల వెబ్‌సైట్ నుండి పంపబడింది_`;

    setSuccess(t.listen.successRedirect);

    // Primary helpline 7794969600
    const waUrl = `https://api.whatsapp.com/send?phone=917794969600&text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="listen" className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute left-1/4 top-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Context & Helpline */}
          <div className="lg:col-span-5 text-left">
            <div className="text-emerald-400 font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-2">
              {t.listen.tag} · <span className="font-poppins">{t.listen.tagEn}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {t.listen.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 font-normal">
              {t.listen.desc}
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-white/10 border-l-4 border-civicGreen border-y border-r border-white/15 mb-6">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="block text-xs text-blue-200 font-medium">
                  {t.listen.waText}
                </span>
                <a
                  href="https://wa.me/917794969600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poppins text-lg sm:text-xl font-extrabold text-emerald-300 hover:text-white transition-colors"
                >
                  {t.listen.waNumber}
                </a>
              </div>
            </div>

            {/* Reassurance points */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'te' ? 'ప్రతి వార్డు సమస్యను ప్రత్యేకంగా రికార్డ్ చేస్తాం' : 'Every ward issue is formally registered'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'te' ? 'అధికారుల సమన్వయంతో ప్రాధాన్యత క్రమంలో పరిష్కారం' : 'Prioritized coordination with municipal authorities'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'te' ? 'మీ వ్యక్తిగత వివరాల గోప్యత పూర్తి రక్షణ' : 'Complete privacy of your personal contact data'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Grievance Submission Form */}
          <div className="lg:col-span-7 bg-white text-bodyDark rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-100">
            <form onSubmit={handleSubmit} noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4">
                {/* Name */}
                <div>
                  <label htmlFor="f-name" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {t.listen.formName} *
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.listen.formNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy focus:ring-2 focus:ring-navy/10 text-slate-900 bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="f-phone" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {t.listen.formPhone} *
                  </label>
                  <input
                    id="f-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder={t.listen.formPhonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy focus:ring-2 focus:ring-navy/10 text-slate-900 bg-white"
                  />
                </div>

                {/* Ward Selector (1 to 40) */}
                <div>
                  <label htmlFor="f-ward" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {t.listen.formWard} *
                  </label>
                  <select
                    id="f-ward"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy focus:ring-2 focus:ring-navy/10 text-slate-900 bg-white"
                  >
                    <option value="">{t.listen.formWardPlaceholder}</option>
                    {wardOptions.map((num) => (
                      <option key={num} value={num.toString()}>
                        {lang === 'te' ? `వార్డు ${num}` : `Ward ${num}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Issue Type */}
                <div>
                  <label htmlFor="f-type" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {t.listen.formType} *
                  </label>
                  <select
                    id="f-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy focus:ring-2 focus:ring-navy/10 text-slate-900 bg-white"
                  >
                    <option value="">{t.listen.formTypePlaceholder}</option>
                    {t.listen.typeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Details Message */}
              <div className="mb-4">
                <label htmlFor="f-msg" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  {t.listen.formMsg} *
                </label>
                <textarea
                  id="f-msg"
                  rows={3}
                  placeholder={t.listen.formMsgPlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy focus:ring-2 focus:ring-navy/10 text-slate-900 bg-white"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="mb-4">
                <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-navy focus:ring-navy accent-navy shrink-0"
                  />
                  <span>
                    {t.listen.consentText}{' '}
                    <a href="#footer" className="text-navy font-bold underline hover:text-civicBlue">
                      {t.listen.consentLink}
                    </a>
                  </span>
                </label>
              </div>

              {/* Feedback messages */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs sm:text-sm flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-civicGreen hover:bg-civicGreen-dark text-white font-extrabold text-base shadow-elevated flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t.listen.btnSubmit}</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
