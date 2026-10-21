import React, { useState } from 'react';
import { CartItem, Currency, Template } from '../types';
import { formatPrice } from '../utils/format';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, ShieldCheck, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (templateId: string, delta: number) => void;
  onRemoveItem: (templateId: string) => void;
  onCheckoutSuccess: (purchased: Template[]) => void;
  onGoToCartPage?: () => void;
  onGoToPaymentPage?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
  onGoToCartPage,
  onGoToPaymentPage
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const totalNGN = cart.reduce((sum, item) => sum + item.template.priceNGN * item.quantity, 0);
  const totalUSD = cart.reduce((sum, item) => sum + item.template.priceUSD * item.quantity, 0);

  const discountNGN = Math.round((totalNGN * discountPercent) / 100);
  const discountUSD = Math.round((totalUSD * discountPercent) / 100);

  const finalNGN = Math.max(0, totalNGN - discountNGN);
  const finalUSD = Math.max(0, totalUSD - discountUSD);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'ANTHIRA10' || code === 'VEXORA10') {
      setDiscountPercent(10);
      setPromoError('');
    } else if (code === 'SPECIAL20') {
      setDiscountPercent(20);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "ANTHIRA10"');
    }
  };

  const handleExecuteCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setPaymentSuccess(true);
      const purchasedTemplates = cart.map((i) => i.template);
      onCheckoutSuccess(purchasedTemplates);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-md bg-[#12151c] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171b24]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff5722]" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {paymentSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Payment Successful!</h3>
              <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
                Your order is confirmed. Your template files and license keys have been added to your Customer Dashboard.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-xl shadow-lg transition-colors"
                >
                  View in Customer Dashboard
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
              <div className="text-sm font-semibold text-white">Your cart is empty</div>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Explore our premium website templates and launch your next high-converting website today!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.template.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex gap-3 items-center"
                >
                  <img
                    src={item.template.image}
                    alt={item.template.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.template.title}
                    </h4>
                    <div className="text-[11px] text-zinc-400">
                      {formatPrice(item.template.priceNGN, item.template.priceUSD, currency)} each
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-white/10 rounded-md bg-black/30">
                        <button
                          onClick={() => onUpdateQuantity(item.template.id, -1)}
                          className="p-1 hover:text-white text-zinc-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.template.id, 1)}
                          className="p-1 hover:text-white text-zinc-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.template.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors text-xs p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-orange-400">
                      {formatPrice(item.template.priceNGN * item.quantity, item.template.priceUSD * item.quantity, currency)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo code input */}
              <form onSubmit={applyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. ANTHIRA10)"
                    className="flex-1 px-3 py-1.5 text-xs bg-[#181c25] border border-white/10 rounded-lg text-white placeholder:text-zinc-500 uppercase font-mono focus:outline-none focus:border-[#ff5722]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>
                )}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-medium">
                    ✓ {discountPercent}% Discount Applied!
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && !paymentSuccess && (
          <div className="p-6 bg-[#171b24] border-t border-white/10 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">
                  {formatPrice(totalNGN, totalUSD, currency)}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono">
                    -{formatPrice(discountNGN, discountUSD, currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="font-mono text-orange-400 text-base">
                  {formatPrice(finalNGN, finalUSD, currency)}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  if (onGoToPaymentPage) {
                    onGoToPaymentPage();
                  } else {
                    handleExecuteCheckout();
                  }
                }}
                disabled={isCheckingOut}
                className="w-full py-3 px-6 text-xs sm:text-sm font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Payment ({formatPrice(finalNGN, finalUSD, currency)})</span>
                  </>
                )}
              </button>

              {onGoToCartPage && (
                <button
                  onClick={onGoToCartPage}
                  className="w-full py-2 px-4 text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
                  <span>View Full Cart Page</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Secure Verification · Instant Code Download</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
