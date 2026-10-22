
import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Headphones,
} from 'lucide-react';

interface HeroProps {
  onExploreTemplates: () => void;
  onGetCustomWebsite: () => void;
}

const animatedWords = [
  'Premium Templates',
  'Beautiful Websites',
  'Modern Web Design',
  'Your Digital Vision',
];

export const Hero: React.FC<HeroProps> = ({
  onExploreTemplates,
  onGetCustomWebsite,
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = animatedWords[wordIndex];

    let delay = isDeleting ? 45 : 90;

    // Pause when the complete word is displayed.
    if (!isDeleting && displayedText === currentWord) {
      delay = 1600;
    }

    // Pause briefly before typing the next word.
    if (isDeleting && displayedText === '') {
      delay = 350;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && displayedText === currentWord) {
        setIsDeleting(true);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setWordIndex((previous) => (previous + 1) % animatedWords.length);
      } else if (isDeleting) {
        setDisplayedText(
          currentWord.substring(0, displayedText.length - 1)
        );
      } else {
        setDisplayedText(
          currentWord.substring(0, displayedText.length + 1)
        );
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[350px] w-[600px] -translate-x-1/2 bg-gradient-to-tr from-orange-600/15 via-amber-600/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Layout */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column */}
          <div className="hero-enter space-y-6 lg:col-span-6">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
                WEBSITE DESIGN & TEMPLATE STORE
              </span>
            </div>

            {/* Animated Headline */}
            <h1 className="text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Build Your Dream Website or Get{' '}
              <span
                className="inline-block bg-gradient-to-r from-[#ff5722] via-[#ff7844] to-[#ffa000] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,87,34,0.3)]"
                aria-live="polite"
                aria-atomic="true"
              >
                {displayedText}
                <span
                  className="typing-cursor ml-0.5 inline-block align-baseline"
                  aria-hidden="true"
                >
                  |
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              ANTHIRA is your one-stop platform for modern website design
              services and ready-to-use website templates. Get a professional
              website built for your business or purchase high-quality
              templates and launch faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreTemplates}
                className="flex items-center gap-2 rounded-xl bg-[#ff5722] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:translate-x-0.5 hover:bg-[#f4511e] active:scale-[0.99] sm:text-sm"
              >
                <span>Explore Templates</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onGetCustomWebsite}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-semibold text-zinc-200 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:text-sm"
              >
                Get a Custom Website
              </button>
            </div>
          </div>

          {/* Right Column: Image Showcase */}
          <div className="hero-enter hero-enter-delay-2 relative lg:col-span-6">
            <div className="group relative mx-auto max-w-lg overflow-hidden rounded-2xl bg-black/40 shadow-2xl lg:max-w-none">
              <img
                src="/hero.png"
                alt="ANTHIRA website design shown on a laptop"
                referrerPolicy="no-referrer"
                className="hero-image-motion h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* Floating Badge */}
              <div className="absolute right-4 top-4 rounded-xl border border-white/15 bg-[#141820]/90 px-3.5 py-2 text-right shadow-xl backdrop-blur-md">
                <div className="text-xs font-bold text-white">
                  Premium Templates
                </div>
                <div className="text-[10px] font-medium text-orange-400">
                  Ready to use & customize
                </div>
              </div>

              {/* Bottom Gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0d10] to-transparent" />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:gap-6 lg:grid-cols-4">
          {/* Modern Designs */}
          <div className="hero-enter hero-enter-delay-1 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="shrink-0 rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white sm:text-sm">
                Modern Designs
              </div>
              <div className="text-[11px] text-zinc-400">
                Clean & professional UI/UX
              </div>
            </div>
          </div>

          {/* Fast Delivery */}
          <div className="hero-enter hero-enter-delay-2 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="shrink-0 rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white sm:text-sm">
                Fast Delivery
              </div>
              <div className="text-[11px] text-zinc-400">
                On-time project completion
              </div>
            </div>
          </div>

          {/* Secure Payments */}
          <div className="hero-enter hero-enter-delay-3 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="shrink-0 rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white sm:text-sm">
                Secure Payments
              </div>
              <div className="text-[11px] text-zinc-400">
                100% safe & reliable
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="hero-enter hero-enter-delay-4 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="shrink-0 rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white sm:text-sm">
                24/7 Support
              </div>
              <div className="text-[11px] text-zinc-400">
                We're always here to help
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Typing Cursor Animation */}
      <style>{`
        .typing-cursor {
          color: #ff5722;
          font-weight: 400;
          animation: anthira-cursor-blink 0.75s step-end infinite;
        }

        @keyframes anthira-cursor-blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .typing-cursor {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};