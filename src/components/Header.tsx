import React, { useState } from 'react';
import { AnthiraLogo } from './AnthiraLogo';
import { Menu, Moon, Sun, X } from 'lucide-react';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenMessages: () => void;
  onOpenAbout: () => void;
  onOpenCustomModal: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateSection,
  onOpenMessages,
  onOpenAbout,
  onOpenCustomModal,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  const handlePageClick = (openPage: () => void) => {
    openPage();
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', action: () => handleSectionClick('hero') },
    { label: 'Services', action: () => handleSectionClick('services') },
    { label: 'Packages', action: () => handleSectionClick('pricing') },
    { label: 'Messages', action: () => handlePageClick(onOpenMessages) },
    { label: 'About Us', action: () => handlePageClick(onOpenAbout) },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f14]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        <button
          type="button"
          className="shrink-0"
          onClick={() => handleSectionClick('hero')}
          aria-label="ANTHIRA home"
        >
          <AnthiraLogo size="md" />
        </button>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-300" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={link.action}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden min-[380px]:flex p-2 rounded-lg bg-black/40 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-colors items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCustomModal}
            className="px-2 py-2 text-[10px] font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap sm:px-4 sm:text-xs"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 lg:hidden text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden bg-[#12151c] border-b border-white/10 px-6 py-5 animate-fade-in text-sm font-medium" aria-label="Mobile navigation">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.action}
                className="block w-full text-left py-2 text-zinc-300 hover:text-[#ff5722]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Appearance</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onToggleTheme('light')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                  theme === 'light' ? 'bg-amber-500 text-zinc-950' : 'bg-white/5 text-zinc-300 border border-white/10'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                Light mode
              </button>
              <button
                type="button"
                onClick={() => onToggleTheme('dark')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                  theme === 'dark' ? 'bg-[#ff5722] text-white' : 'bg-white/5 text-zinc-300 border border-white/10'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                Dark mode
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
