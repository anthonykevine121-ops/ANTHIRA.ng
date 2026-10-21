import React from 'react';
import { Home, Layers, Tag, ShoppingBag, User } from 'lucide-react';

export type MobileTab = 'home' | 'templates' | 'pricing' | 'cart' | 'account';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  cartCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount
}) => {
  const containerClass = 'fixed bottom-0 inset-x-0 z-50 bg-[#0b0e14]/95 backdrop-blur-xl border-t border-zinc-800/90 shadow-[0_-8px_30px_rgba(0,0,0,0.7)] px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.65rem)] md:hidden';

  const navItems: { id: MobileTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'templates', label: 'Templates', icon: Layers },
    { id: 'pricing', label: 'Packages', icon: Tag },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <nav className={containerClass} aria-label="Mobile Bottom Navigation">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`group relative flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 outline-none ${
                isActive
                  ? 'text-[#ff5722]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {/* Top active glowing indicator dot/line */}
              {isActive && (
                <span className="absolute -top-2 w-7 h-0.5 bg-gradient-to-r from-transparent via-[#ff5722] to-transparent rounded-full shadow-[0_0_8px_#ff5722]" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <IconComponent
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#ff5722] drop-shadow-[0_2px_8px_rgba(255,87,34,0.5)]' : 'group-hover:scale-105'
                  }`}
                />

                {item.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff7043] text-white text-[9px] font-black font-mono flex items-center justify-center shadow-md border border-[#0b0e14] animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-tight mt-1 transition-all duration-200 ${
                  isActive ? 'font-bold text-[#ff5722]' : 'font-medium text-zinc-400 group-hover:text-zinc-200'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
