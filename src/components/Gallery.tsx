import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import type { TranslationData, GalleryItem } from '../data/translations';

interface GalleryProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

export const Gallery: React.FC<GalleryProps> = ({ t, lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: t.gallery.allFilter },
    { id: 'portraits', label: t.gallery.portraitFilter },
    { id: 'leadership', label: t.gallery.leadershipFilter },
    { id: 'foundation', label: t.gallery.foundationFilter },
  ];

  const filteredItems = t.gallery.items.filter((item: GalleryItem) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'portraits') return item.category.includes('Portrait') || item.category.includes('పోర్ట్రెయిట్');
    if (activeCategory === 'leadership') return item.category.includes('Leadership') || item.category.includes('నాయకత్వం');
    if (activeCategory === 'foundation') return item.category.includes('Foundation') || item.category.includes('ఫౌండేషన్');
    return true;
  });

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
    setIsZoomed(false);
  }, [selectedImageIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
    setIsZoomed(false);
  }, [selectedImageIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleCloseLightbox, handlePrev, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  const currentItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-subtleBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-civicBlue-50 text-civicBlue text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.gallery.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">
            {t.gallery.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-slate-100 text-bodyDark hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: GalleryItem, index: number) => (
            <figure
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${t.gallery.openImage}: ${item.title}`}
              className="group relative bg-warmWhite rounded-2xl border border-subtleBorder overflow-hidden shadow-2xs hover:shadow-elevated transition-all duration-200 cursor-pointer flex flex-col focus-visible:ring-2 focus-visible:ring-civicBlue"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-navy text-xs font-bold shadow-md flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{lang === 'te' ? 'పెద్దదిగా చూడండి' : 'View Full Image'}</span>
                  </span>
                </div>

                <div className="absolute top-2 left-2 bg-navy/85 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {item.category}
                </div>
              </div>

              <figcaption className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-navy group-hover:text-civicBlue transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 text-civicGreen">
                    <Sparkles className="w-3.5 h-3.5 text-accentGold" />
                    <span>{item.badge}</span>
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Keyboard Accessible Lightbox Modal */}
        {selectedImageIndex !== null && currentItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.title}
            onClick={handleCloseLightbox}
          >
            {/* Modal Dialog Content */}
            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-navy rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-700 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-accentGold bg-white/10 px-2.5 py-0.5 rounded">
                    {selectedImageIndex + 1} / {filteredItems.length}
                  </span>
                  <span className="text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md">
                    {currentItem.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title={isZoomed ? "Zoom out" : "Zoom in"}
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseLightbox}
                    className="p-1.5 text-slate-300 hover:text-white hover:bg-rose-600/80 rounded-lg transition-colors cursor-pointer"
                    aria-label={t.gallery.closeLightbox}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 min-h-[300px] max-h-[65vh] bg-black/60 flex items-center justify-center overflow-auto p-2 sm:p-4">
                <img
                  src={currentItem.src}
                  alt={currentItem.alt}
                  className={`transition-all duration-200 max-h-[62vh] object-contain rounded-lg ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Lightbox Navigation Buttons */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-navy/80 hover:bg-civicBlue text-white border border-slate-600 shadow-lg transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-navy/80 hover:bg-civicBlue text-white border border-slate-600 shadow-lg transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Caption Footer */}
              <div className="px-4 sm:px-6 py-3.5 bg-navy-900 border-t border-slate-800 text-white text-xs sm:text-sm">
                <p className="font-semibold text-slate-200 mb-1">
                  {currentItem.caption}
                </p>
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                  <span className="flex items-center gap-1.5 text-accentGold font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentItem.badge}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Use Left/Right arrow keys to navigate, Esc to close
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
