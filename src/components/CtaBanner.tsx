import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

interface CtaBannerProps {
  onGetStarted: () => void;
  onViewPackages: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onGetStarted, onViewPackages }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#181c25] via-[#141820] to-[#0f1217] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle amber glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-600/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
                READY TO START?
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Let's Build Something Great
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
                Get a custom website designed around your goals. Your next big project starts here...
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onGetStarted}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:translate-x-0.5"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onViewPackages}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-colors"
                >
                  View Packages
                </button>
              </div>

              {/* Trust markers */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span>Fast & Reliable · Modern & responsive</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Secure & Scalable · Built for growth</span>
                </div>
              </div>
            </div>

            {/* Right Column: Newsletter Subscription Box matching mockup */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Subscribe to our newsletter
              </div>
              <p className="text-xs text-zinc-400">
                Get the latest updates, new template drops and exclusive special offers.
              </p>

              {isSubscribed ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! You're subscribed to Anthira template drops.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-[#181c25] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white rounded-xl transition-colors shadow-md shadow-orange-500/20"
                    title="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
