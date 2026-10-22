import React, { useState } from 'react';
import { AnthiraLogo } from './AnthiraLogo';
import { Currency, AuthUser } from '../types';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Sun,
  Moon,
  ChevronDown,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';

interface HeaderProps {
  currency?: Currency;
  onToggleCurrency?: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCustomModal: () => void;
  onOpenCustomerPortal: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (theme: 'dark' | 'light') => void;
  currentUser?: AuthUser | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
  onOpenCustomModal,
  onOpenCustomerPortal,
  theme,
  onToggleTheme,
  currentUser,
  onOpenAuth,
  onLogOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/90 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Wordmark Zone */}
          <div className="cursor-pointer" onClick={() => handleNavClick('hero')}>
            <AnthiraLogo size="md" />
          </div>

          {/* Navigation Links Zone */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-zinc-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('templates')}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              Templates
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#ff5722] transition-colors whitespace-nowrap"
            >
              Contact
            </button>
          </nav>

          {/* Action Zone: Cart, Account, CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Theme Toggle Button */}
            <button
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

            {/* Cart Trigger with Badge (Hidden on mobile devices per user request, visible on md+) */}
            <button
              onClick={onOpenCart}
              className="hidden md:flex relative p-2 rounded-lg bg-black/40 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-colors items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ff5722] text-white text-[10px] font-bold flex items-center justify-center font-mono animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Portal Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-colors"
              >
                {currentUser ? (
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#ff5722] to-amber-500 text-[9px] font-bold text-white flex items-center justify-center uppercase shrink-0">
                    {currentUser.avatarInitials}
                  </div>
                ) : (
                  <User className="w-3.5 h-3.5 text-orange-400" />
                )}
                <span>{currentUser ? currentUser.name.split(' ')[0] : 'Account'}</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>

              {accountDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#171b24] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-xs animate-fade-in"
                  onClick={() => setAccountDropdownOpen(false)}
                >
                  {currentUser ? (
                    <>
                      {/* Current User Header */}
                      <button
                        onClick={onOpenCustomerPortal}
                        className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2.5 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ff5722] to-amber-500 text-xs font-bold text-white flex items-center justify-center uppercase shrink-0">
                          {currentUser.avatarInitials}
                        </div>
                      </button>

                      <div className="my-1.5 border-t border-white/5" />

                      <button
                        onClick={onOpenCustomerPortal}
                        className="w-full px-4 py-2 text-left text-zinc-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <User className="w-4 h-4 text-orange-400" />
                        <div>
                          <div className="font-semibold text-white">Customer Dashboard</div>
                          <div className="text-[10px] text-zinc-400">View Purchased Templates & Downloads</div>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Guest / Not logged in actions */}
                      <button
                        onClick={() => onOpenAuth('login')}
                        className="w-full px-4 py-2 text-left text-zinc-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <LogIn className="w-4 h-4 text-orange-400" />
                        <div>
                          <div className="font-semibold text-white">Sign In</div>
                          <div className="text-[10px] text-zinc-400">Access your ANTHIRA dashboard</div>
                        </div>
                      </button>

                      <button
                        onClick={() => onOpenAuth('signup')}
                        className="w-full px-4 py-2 text-left text-zinc-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <UserPlus className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="font-semibold text-white">Create Account</div>
                          <div className="text-[10px] text-zinc-400">Join as founder or developer</div>
                        </div>
                      </button>
                    </>
                  )}

                  <button
                    onClick={onOpenCart}
                    className="w-full px-4 py-2 text-left text-zinc-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Cart & Checkout</div>
                      <div className="text-[10px] text-zinc-400">Selected Templates ({cartCount})</div>
                    </div>
                  </button>

                  {currentUser && onLogOut && (
                    <>
                      <div className="my-1 border-t border-white/5" />
                      <button
                        onClick={onLogOut}
                        className="w-full px-4 py-2 text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <div>
                          <div className="font-semibold">Sign Out</div>
                          <div className="text-[10px] text-zinc-500">End your active session</div>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Get Started CTA Button */}
            <button
              onClick={onOpenCustomModal}
              className="px-2 py-2 text-[10px] font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap sm:px-4 sm:text-xs"
            >
              Get Started
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#12151c] border-b border-white/10 px-6 py-5 space-y-4 animate-fade-in text-sm font-medium">
            <div className="space-y-2">
              <button
                onClick={() => handleNavClick('hero')}
                className="block w-full text-left py-1 text-zinc-300 hover:text-[#ff5722]"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className="block w-full text-left py-1 text-zinc-300 hover:text-[#ff5722]"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick('templates')}
                className="block w-full text-left py-1 text-zinc-300 hover:text-[#ff5722]"
              >
                Templates
              </button>
              <button
                onClick={() => handleNavClick('pricing')}
                className="block w-full text-left py-1 text-zinc-300 hover:text-[#ff5722]"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="block w-full text-left py-1 text-zinc-300 hover:text-[#ff5722]"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left py-1 text-zinc-300 hover:text-[#ff5722]"
              >
                Contact
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  onOpenCart();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs text-left rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange-400" />
                  <span className="font-semibold">Shopping Cart</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ff5722] text-white text-[10px] font-mono font-bold">
                  {cartCount}
                </span>
              </button>
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      onOpenCustomerPortal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-3 text-xs text-left rounded-lg bg-white/5 text-zinc-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center uppercase">
                        {currentUser.avatarInitials}
                      </div>
                      <span className="font-semibold text-white">{currentUser.name} (Dashboard)</span>
                    </div>
                    <span className="text-[10px] text-orange-400">Manage</span>
                  </button>

                  {onLogOut && (
                    <button
                      onClick={() => {
                        onLogOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 px-3 text-xs text-left rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 text-xs font-bold text-center rounded-lg bg-[#ff5722] text-white flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 text-xs font-bold text-center rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-400" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}

              {/* Appearance Mode for Mobile Drawer */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Appearance</span>
                  <span className="text-[10px] font-semibold text-zinc-400 capitalize">{theme} mode</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onToggleTheme('light')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      theme === 'light'
                        ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                        : 'bg-white/5 text-zinc-300 border border-white/10'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light mode</span>
                  </button>
                  <button
                    onClick={() => onToggleTheme('dark')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      theme === 'dark'
                        ? 'bg-[#ff5722] text-white font-bold shadow-sm'
                        : 'bg-white/5 text-zinc-300 border border-white/10'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-white" />
                    <span>Dark mode</span>
                  </button>
                </div>
              </div>

              {/* Official Social Links for Mobile */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Follow ANTHIRA</div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://x.com/Anthirastore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-medium flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-white shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    <span>X / Twitter</span>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61595107034244"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-medium flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#1877f2] shrink-0"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/anthira_com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-medium flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#e1306c] shrink-0"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@anthira.com?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-medium flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-cyan-400 shrink-0"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.34-6.32V9.38a8.16 8.16 0 0 0 4.91 1.63v-3.5a4.82 4.82 0 0 1-1-.82z"/></svg>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
