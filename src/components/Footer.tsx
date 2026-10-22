import React from 'react';
import { AnthiraLogo } from './AnthiraLogo';
import { Heart } from 'lucide-react';
import { NewsletterSubscription } from './NewsletterSubscription';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenMessages: () => void;
  onOpenAbout: () => void;
  onOpenCustomModal: () => void;
  onSubscribeSuccess?: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateSection, 
  onOpenMessages,
  onOpenAbout,
  onOpenCustomModal,
  onSubscribeSuccess
}) => {
  return (
    <footer className="bg-[#090b0e] border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <AnthiraLogo size="md" showSubtitle={true} />
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              ANTHIRA designs and builds modern, high-performance websites tailored to your business.
            </p>
            <div className="text-[11px] text-zinc-500">
              Trusted by 500+ businesses and digital entrepreneurs globally.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Pricing', 'Messages', 'About Us'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      if (item === 'Messages') {
                        onOpenMessages();
                      } else if (item === 'About Us') {
                        onOpenAbout();
                      } else {
                        onNavigateSection(item === 'Home' ? 'hero' : item.toLowerCase());
                      }
                    }}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              {['Help Center', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => alert(`Viewing ${item} - 100% money back guarantee on defective code.`)}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-orange-400 transition-colors"
                >
                  FAQ & Licensing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomModal}
                  className="text-orange-400 hover:underline font-medium"
                >
                  Custom Request
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us & Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Follow Us
              </h4>

              {/* Social Icons & Official Handles */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://x.com/Anthirastore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-black border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all text-xs font-medium shadow-sm"
                  title="Follow ANTHIRA on X (@Anthirastore)"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-white shrink-0">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-[11px] font-semibold">@Anthirastore</span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61595107034244"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#1877f2]/20 border border-white/10 hover:border-[#1877f2]/50 text-zinc-300 hover:text-[#1877f2] transition-all text-xs font-medium shadow-sm"
                  title="Follow ANTHIRA on Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#1877f2] shrink-0">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-[11px] font-semibold">Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/anthira_com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#e1306c]/20 border border-white/10 hover:border-[#e1306c]/50 text-zinc-300 hover:text-[#e1306c] transition-all text-xs font-medium shadow-sm"
                  title="Follow ANTHIRA on Instagram (@anthira_com)"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#e1306c] shrink-0">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-[11px] font-semibold">@anthira_com</span>
                </a>

                <a
                  href="https://www.tiktok.com/@anthira.com?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-zinc-300 hover:text-cyan-300 transition-all text-xs font-medium shadow-sm"
                  title="Follow ANTHIRA on TikTok (@anthira.com)"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-cyan-400 shrink-0">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.34-6.32V9.38a8.16 8.16 0 0 0 4.91 1.63v-3.5a4.82 4.82 0 0 1-1-.82z"/>
                  </svg>
                  <span className="text-[11px] font-semibold">@anthira.com</span>
                </a>
              </div>
            </div>

            {/* Newsletter Subscription Component */}
            <div className="pt-2 border-t border-white/5">
              <NewsletterSubscription onSuccess={onSubscribeSuccess} />
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © 2026 ANTHIRA. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for a better web.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
