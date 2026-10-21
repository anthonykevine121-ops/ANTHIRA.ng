import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Headphones, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onExploreTemplates: () => void;
  onGetCustomWebsite: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreTemplates, onGetCustomWebsite }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/15 via-amber-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
                WEBSITE DESIGN & TEMPLATE STORE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Build Your Dream Website or Get{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] via-[#ff7844] to-[#ffa000] drop-shadow-[0_2px_15px_rgba(255,87,34,0.3)]">
                Premium Templates
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              ANTHIRA is your one-stop platform for modern website design services and ready-to-use website templates. Get a professional website built for your business or purchase high-quality templates and launch faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreTemplates}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:translate-x-0.5 active:scale-[0.99]"
              >
                <span>Explore Templates</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGetCustomWebsite}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 rounded-xl transition-all"
              >
                Get a Custom Website
              </button>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase matching the image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl group">
              <img
                src={HERO_IMAGE}
                alt="Anthira Workspace Setup with Innovate Your Future display"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Floating Badge matching the mockup */}
              <div className="absolute top-4 right-4 bg-[#141820]/90 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2 text-right shadow-xl">
                <div className="text-xs font-bold text-white">Premium Templates</div>
                <div className="text-[10px] text-orange-400 font-medium">Ready to use & customize</div>
              </div>

              {/* Subtle bottom gradient scrim */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0d10] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4 Trust Feature Indicators matching the mockup */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Modern Designs</div>
              <div className="text-[11px] text-zinc-400">Clean & professional UI/UX</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Fast Delivery</div>
              <div className="text-[11px] text-zinc-400">On-time project completion</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Secure Payments</div>
              <div className="text-[11px] text-zinc-400">100% safe & reliable</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">24/7 Support</div>
              <div className="text-[11px] text-zinc-400">We're always here to help</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
