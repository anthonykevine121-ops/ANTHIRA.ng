import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface MobileFloatingCartProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileFloatingCart: React.FC<MobileFloatingCartProps> = ({
  cartCount,
  onOpenCart
}) => {
  const positionClass = 'fixed bottom-18 right-4 z-40 md:hidden';

  return (
    <div className={positionClass}>
      <button
        onClick={onOpenCart}
        aria-label={`Shopping cart with ${cartCount} items`}
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#ff5722] via-[#f4511e] to-[#ff7043] text-white shadow-[0_8px_25px_rgba(255,87,34,0.45)] border-2 border-white/20 hover:border-white/40 active:scale-95 transition-all duration-200"
      >
        {/* Glow halo when cart has items */}
        {cartCount > 0 && (
          <span className="absolute -inset-1 rounded-full bg-[#ff5722]/30 animate-ping pointer-events-none" />
        )}

        {/* Shopping Bag Icon */}
        <ShoppingBag className="w-6 h-6 text-white drop-shadow-sm transition-transform group-hover:scale-110" />

        {/* Cart Item Count Badge */}
        {cartCount > 0 ? (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-white text-[#ff5722] text-[11px] font-black font-mono flex items-center justify-center border-2 border-[#12151c] shadow-lg animate-pulse">
            {cartCount}
          </span>
        ) : (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#12151c]" title="Cart empty" />
        )}
      </button>
    </div>
  );
};
