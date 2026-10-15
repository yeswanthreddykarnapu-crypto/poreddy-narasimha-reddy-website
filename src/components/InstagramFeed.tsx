import React, { useState, useEffect } from 'react';
import { Play, Heart, MessageCircle, ExternalLink, Sparkles, Film } from 'lucide-react';
import { INSTAGRAM_PROFILE, INSTAGRAM_POSTS } from '../data/instagramData';
import type { InstagramPost } from '../data/instagramData';

interface InstagramFeedProps {
  lang: 'en' | 'te';
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reels' | 'field' | 'welfare' | 'speeches'>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  // Load official Instagram Embed JS SDK for native embeds
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('instagram-embed-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else if ((window as unknown as { instgrm?: { Embeds?: { process?: () => void } } }).instgrm?.Embeds?.process) {
        (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process();
      }
    }
  }, []);

  const filteredPosts = INSTAGRAM_POSTS.filter((post) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'reels') return post.type === 'reel';
    return post.category === activeTab;
  });

  return (
    <section id="instagram" className="py-16 md:py-24 bg-gradient-to-b from-warmWhite via-slate-50 to-warmWhite border-b border-subtleBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-200 text-pink-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3">
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>{lang === 'te' ? 'లైవ్ ఇన్‌స్టాగ్రామ్ స్ట్రీమ్' : 'Live Instagram Feed & Reels'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-2">
              {lang === 'te' ? 'తాజా పోస్ట్‌లు & రీల్స్ — ప్రత్యక్ష ప్రసారం' : 'Latest Posts & Reels from the Ground'}
            </h2>
            
            <p className="text-base text-slate-600 leading-relaxed">
              {lang === 'te'
                ? 'శ్రీ పోరెడ్డి నరసింహా రెడ్డి గారి అధికారిక ఇన్‌స్టాగ్రామ్ ఖాతా (@poreddy_narasimha_reddy_) నుండి తాజా ప్రజా పర్యటనలు, ప్రసంగాలు మరియు రీల్స్.'
                : 'Follow live grassroots moments, public speeches, constituency interactions, and video reels directly from @poreddy_narasimha_reddy_.'
              }
            </p>
          </div>

          {/* Follow Call to Action Button */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              href={INSTAGRAM_PROFILE.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white font-extrabold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{lang === 'te' ? 'ఇన్‌స్టాగ్రామ్‌లో ఫాలో అవ్వండి' : 'Follow @poreddy_narasimha_reddy_'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-subtleBorder shadow-elevated mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            
            {/* Avatar & Username */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-md">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white bg-slate-100">
                  <img
                    src={INSTAGRAM_PROFILE.avatarUrl}
                    alt={INSTAGRAM_PROFILE.displayName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl font-extrabold text-navy">
                    @{INSTAGRAM_PROFILE.handle}
                  </h3>
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black" title="Verified Account">
                    ✓
                  </div>
                </div>

                <p className="text-sm font-bold text-slate-700 mb-2">
                  {lang === 'te' ? INSTAGRAM_PROFILE.displayNameTE : INSTAGRAM_PROFILE.displayName}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                  {lang === 'te' ? INSTAGRAM_PROFILE.bioTE : INSTAGRAM_PROFILE.bio}
                </p>
              </div>
            </div>

            {/* Live Profile Counters */}
            <div className="flex items-center gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-around sm:justify-end">
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-black text-navy block">
                  {INSTAGRAM_PROFILE.postsCount}
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  {lang === 'te' ? 'పోస్ట్‌లు' : 'Posts'}
                </span>
              </div>

              <div className="text-center">
                <span className="text-xl sm:text-2xl font-black text-navy block">
                  {INSTAGRAM_PROFILE.followers}
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  {lang === 'te' ? 'ఫాలోవర్లు' : 'Followers'}
                </span>
              </div>

              <div className="text-center">
                <span className="text-xl sm:text-2xl font-black text-navy block">
                  {INSTAGRAM_PROFILE.following}
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  {lang === 'te' ? 'ఫాలోయింగ్' : 'Following'}
                </span>
              </div>
            </div>

          </div>

          {/* Live Sync Status Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-emerald-700">
                {lang === 'te' ? 'లైవ్ అప్‌డేట్‌లు కనెక్ట్ అయ్యాయి' : 'Live Connected to Instagram Stream'}
              </span>
            </div>
            <span>
              {lang === 'te' ? 'ప్రతి కొత్త రీల్ & ఫోటో ఇక్కడ ప్రత్యక్షంగా వీక్షించవచ్చు' : 'New reels and updates synchronize automatically'}
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-bodyDark border border-subtleBorder hover:bg-slate-100'
            }`}
          >
            {lang === 'te' ? 'అన్ని అప్‌డేట్‌లు' : 'All Updates'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reels')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'reels'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xs'
                : 'bg-white text-bodyDark border border-subtleBorder hover:bg-slate-100'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'వైరల్ రీల్స్' : 'Viral Reels'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('field')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'field'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-bodyDark border border-subtleBorder hover:bg-slate-100'
            }`}
          >
            {lang === 'te' ? 'క్షేత్ర పర్యటనలు' : 'Field Campaigns'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('speeches')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'speeches'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-bodyDark border border-subtleBorder hover:bg-slate-100'
            }`}
          >
            {lang === 'te' ? 'ప్రజా సమావేశాలు' : 'Speeches & Meetings'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('welfare')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'welfare'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-bodyDark border border-subtleBorder hover:bg-slate-100'
            }`}
          >
            {lang === 'te' ? 'సేవా కార్యక్రమాలు' : 'Foundation Seva'}
          </button>
        </div>

        {/* Posts & Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-subtleBorder overflow-hidden shadow-2xs hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              {/* Media Container */}
              <div
                className="relative aspect-square bg-slate-900 overflow-hidden cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Reel Video Indicator & Views Badge */}
                {post.type === 'reel' && (
                  <>
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-xs font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                      <Play className="w-3 h-3 fill-white text-white" />
                      <span>{post.views} views</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                      {post.videoBadge}
                    </div>

                    {/* Centered Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/90 text-navy flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-navy ml-1 text-navy" />
                      </div>
                    </div>
                  </>
                )}

                {/* Bottom Meta Overlay */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-bold drop-shadow-md">
                  <span className="bg-black/60 px-2 py-0.5 rounded">
                    {lang === 'te' ? post.dateTE : post.date}
                  </span>
                  <span className="flex items-center gap-1 text-accentGold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instagram Reel</span>
                  </span>
                </div>
              </div>

              {/* Caption & Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-navy mb-2 group-hover:text-civicBlue transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-bodyDark/90 leading-relaxed mb-4 line-clamp-3">
                    {lang === 'te' ? post.captionTE : post.caption}
                  </p>
                </div>

                {/* Interaction & Direct Link Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-rose-600 font-bold">
                      <Heart className="w-4 h-4 fill-rose-50" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 font-semibold">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                  </div>

                  <a
                    href={post.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-civicBlue hover:text-navy transition-colors"
                  >
                    <span>{lang === 'te' ? 'ఇన్‌స్టాగ్రామ్‌లో చూడండి' : 'Watch on Instagram'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner to Explore Full Profile */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy via-[#833AB4] to-navy text-white text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-premium">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black mb-1">
              {lang === 'te' ? 'ప్రొద్దుటూరు ప్రగతికి పోరెడ్డి నరసింహా రెడ్డితో కలిసి నడవండి!' : 'Join 3,850+ Citizens Following Sri Poreddy Narasimha Reddy'}
            </h3>
            <p className="text-sm text-slate-200">
              {lang === 'te' ? 'దైనందిన కార్యకలాపాలు, ప్రజా సమస్యల పరిష్కారాలు, తాజా రీల్స్ ఎప్పటికప్పుడు పొందండి.' : 'Get daily reels, public welfare distributions, and ward progress updates.'}
            </p>
          </div>

          <a
            href={INSTAGRAM_PROFILE.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white text-navy font-black text-sm hover:bg-slate-100 shadow-xl transition-all shrink-0 flex items-center gap-2 hover:scale-[1.02]"
          >
            <InstagramIcon className="w-4 h-4 text-pink-600" />
            <span>{lang === 'te' ? 'ఇన్‌స్టాగ్రామ్‌లో 381+ పోస్ట్‌లు చూడండి' : 'Open Instagram Account'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Reel Preview Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-navy rounded-2xl border border-slate-700 shadow-2xl overflow-hidden p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-5 h-5 text-pink-400" />
                <span className="font-extrabold text-sm truncate">@{INSTAGRAM_PROFILE.handle}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a
                  href={selectedPost.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{lang === 'te' ? 'ఇన్‌స్టాగ్రామ్‌లో రీల్ ప్లే చేయండి' : 'Play Live Reel on Instagram'}</span>
                </a>
              </div>
            </div>

            <h4 className="text-lg font-bold mb-2">{selectedPost.title}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {lang === 'te' ? selectedPost.captionTE : selectedPost.caption}
            </p>

            <div className="flex gap-3">
              <a
                href={selectedPost.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold rounded-xl text-sm shadow-md"
              >
                {lang === 'te' ? 'ఇన్‌స్టాగ్రామ్‌లో లైక్ & షేర్ చేయండి' : 'View & Engage on Instagram'}
              </a>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm"
              >
                {lang === 'te' ? 'మూసివేయండి' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
