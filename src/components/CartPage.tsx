import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Clock 
} from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (templateId: string, delta: number) => void;
  onRemoveItem: (templateId: string) => void;
  onProceedToPayment: () => void;
  onContinueShopping: () => void;
  discountPercent: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToPayment,
  onContinueShopping,
  discountPercent,
  onApplyPromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalNGN = cart.reduce((sum, item) => sum + item.template.priceNGN * item.quantity, 0);
  const subtotalUSD = cart.reduce((sum, item) => sum + item.template.priceUSD * item.quantity, 0);

  const discountNGN = Math.round((subtotalNGN * discountPercent) / 100);
  const discountUSD = Math.round((subtotalUSD * discountPercent) / 100);

  const totalNGN = Math.max(0, subtotalNGN - discountNGN);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Shopping Cart ({totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'})
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1 rounded-lg bg-[#ff5722] text-white">1. Cart</span>
          <span className="text-zinc-600">→</span>
          <span className="px-3 py-1 rounded-lg bg-white/5 text-zinc-400">2. Payment</span>
          <span className="text-zinc-600">→</span>
          <span className="px-3 py-1 rounded-lg bg-white/5 text-zinc-400">3. Download</span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#12151c] border border-white/10 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">Your Cart is Currently Empty</h2>
            <p className="text-xs text-zinc-400">
              Browse our catalog of modern, responsive website templates and build your digital footprint faster.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="mt-4 px-6 py-3 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
          >
            Explore Templates Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl bg-[#12151c] border border-white/10 overflow-hidden shadow-xl">
              <div className="p-4 bg-[#171b24] border-b border-white/10 text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                <span>Selected Templates</span>
                <span>Commercial Source Code</span>
              </div>

              <div className="divide-y divide-white/5">
                {cart.map((item) => (
                  <div
                    key={item.template.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.template.image}
                        alt={item.template.title}
                        referrerPolicy="no-referrer"
                        className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white truncate">
                            {item.template.title}
                          </h3>
                          {item.template.badge && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                              {item.template.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">
                          {item.template.subtitle}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-400 pt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Lifetime Commercial License Included</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-black/40">
                        <button
                          onClick={() => onUpdateQuantity(item.template.id, -1)}
                          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                          title="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.template.id, 1)}
                          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                          title="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right shrink-0">
                        <div className="text-sm font-extrabold text-[#ff5722] font-mono tabular-nums">
                          {formatPrice(item.template.priceNGN * item.quantity, item.template.priceUSD * item.quantity, currency)}
                        </div>
                        <span className="text-[10px] text-zinc-500">
                          {formatPrice(item.template.priceNGN, item.template.priceUSD, currency)} each
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.template.id)}
                        className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#12151c] border border-white/5 flex items-center gap-3 text-xs text-zinc-300">
                <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <strong className="text-white block">Instant Delivery</strong>
                  <span className="text-[11px] text-zinc-400">Direct source code unlock</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#12151c] border border-white/5 flex items-center gap-3 text-xs text-zinc-300">
                <Code2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">React 19 & Tailwind</strong>
                  <span className="text-[11px] text-zinc-400">Pristine TypeScript code</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#12151c] border border-white/5 flex items-center gap-3 text-xs text-zinc-300">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <strong className="text-white block">Secure Verification</strong>
                  <span className="text-[11px] text-zinc-400">Automated payment receipt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-5 shadow-2xl">
              <h2 className="text-base font-bold text-white tracking-wide border-b border-white/10 pb-3">
                Order Summary
              </h2>

              {/* Promo code input */}
              <form onSubmit={handleApply} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Coupon (e.g. ANTHIRA10)"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#181c25] border border-white/10 rounded-xl text-white uppercase font-mono placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] font-medium ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Pricing Breakdown */}
              <div className="space-y-2.5 text-xs border-t border-white/5 pt-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-mono text-zinc-200">
                    {formatPrice(subtotalNGN, subtotalUSD, currency)}
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

                <div className="flex justify-between text-zinc-400">
                  <span>Digital Delivery & VAT</span>
                  <span className="text-emerald-400 font-semibold">FREE (₦0)</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="font-mono text-[#ff5722] text-xl">
                    {formatPrice(totalNGN, totalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Proceed to Payment CTA */}
              <button
                onClick={onProceedToPayment}
                className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full py-2.5 text-xs text-zinc-400 hover:text-white transition-colors text-center"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
