import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-16 bg-[#0f1217] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Mission & Narrative */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
              ABOUT ANTHIRA
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              We Design, Build & Sell Websites That Work
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              At ANTHIRA, we help individuals and businesses establish a strong online presence. Whether you need a custom website or a ready-made template, we deliver modern, responsive and high-performing solutions that bring your ideas to life.
            </p>

            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-md shadow-orange-500/20"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: 4 Stats + Testimonial Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stat 1: 500+ Happy Clients */}
            <div className="p-5 rounded-2xl bg-[#141820] border border-white/10 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ff5722] font-mono tabular-nums">
                500+
              </div>
              <div className="text-xs font-semibold text-white">Happy Clients</div>
              <div className="text-[11px] text-zinc-400">Across 18+ countries worldwide</div>
            </div>

            {/* Stat 2: 700+ Websites Designed */}
            <div className="p-5 rounded-2xl bg-[#141820] border border-white/10 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ff5722] font-mono tabular-nums">
                700+
              </div>
              <div className="text-xs font-semibold text-white">Websites Designed</div>
              <div className="text-[11px] text-zinc-400">Custom tailored agency builds</div>
            </div>

            {/* Stat 3: 200+ Templates Sold */}
            <div className="p-5 rounded-2xl bg-[#141820] border border-white/10 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ff5722] font-mono tabular-nums">
                200+
              </div>
              <div className="text-xs font-semibold text-white">Templates Sold</div>
              <div className="text-[11px] text-zinc-400">Instant source code packages</div>
            </div>

            {/* Stat 4: 98% Client Satisfaction */}
            <div className="p-5 rounded-2xl bg-[#141820] border border-white/10 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ff5722] font-mono tabular-nums">
                98%
              </div>
              <div className="text-xs font-semibold text-white">Client Satisfaction</div>
              <div className="text-[11px] text-zinc-400">5-star verified reviews</div>
            </div>

            {/* Testimonial Card matching screenshot */}
            <div className="sm:col-span-2 p-5 rounded-2xl bg-[#161b24] border border-orange-500/20 relative overflow-hidden">
              <Quote className="absolute top-4 right-4 w-10 h-10 text-orange-500/10 pointer-events-none" />
              <div className="text-[#ff5722] text-xl font-serif">“</div>
              <p className="text-xs sm:text-sm text-zinc-200 italic leading-relaxed">
                ANTHIRA made it so easy for me to get a professional website for my business. The design is super clean, fast and exactly what I needed!
              </p>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff5722] to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                  DO
                </div>
                <div>
                  <div className="text-xs font-bold text-white">David O.</div>
                  <div className="text-[10px] text-zinc-400">Business Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
