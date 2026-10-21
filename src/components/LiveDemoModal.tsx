import React, { useState } from 'react';
import { Template, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Smartphone, Monitor, Tablet, ShoppingCart, Check, Star, ExternalLink, Calendar, ArrowRight } from 'lucide-react';

interface LiveDemoModalProps {
  template: Template | null;
  currency: Currency;
  onClose: () => void;
  onBuy: (template: Template) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ template, currency, onClose, onBuy }) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'booking' | 'about'>('home');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [addedItemToDemoCart, setAddedItemToDemoCart] = useState(false);

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4">
      <div className="relative flex flex-col w-full max-w-6xl h-[92vh] bg-[#12151b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#181c24] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 text-xs text-zinc-400 bg-black/30 rounded-lg border border-white/5 font-mono">
              <span className="text-zinc-500">https://</span>
              <span>preview.anthira.io/demo/{template.id}</span>
            </div>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/5">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                deviceMode === 'desktop' ? 'bg-[#ff5722] text-white font-medium' : 'text-zinc-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                deviceMode === 'tablet' ? 'bg-[#ff5722] text-white font-medium' : 'text-zinc-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                deviceMode === 'mobile' ? 'bg-[#ff5722] text-white font-medium' : 'text-zinc-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onBuy(template)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-orange-500/20"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Buy Template ({formatPrice(template.priceNGN, template.priceUSD, currency)})</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Sandbox Canvas */}
        <div className="flex-1 overflow-auto bg-[#090b0e] flex items-center justify-center p-2 sm:p-6">
          <div
            className={`transition-all duration-300 bg-[#0d0f14] text-white border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col ${
              deviceMode === 'desktop'
                ? 'w-full h-full'
                : deviceMode === 'tablet'
                ? 'w-[768px] h-[92%] border-zinc-700'
                : 'w-[375px] h-[95%] rounded-[36px] border-zinc-700 p-1.5'
            }`}
          >
            {/* Template Header simulation */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#12151c]/90 backdrop-blur shrink-0">
              <div className="font-bold text-sm tracking-wide text-orange-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                {template.title}
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-300">
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`hover:text-orange-400 transition-colors ${activeTab === 'home' ? 'text-orange-400 font-semibold' : ''}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className={`hover:text-orange-400 transition-colors ${activeTab === 'menu' ? 'text-orange-400 font-semibold' : ''}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => setActiveTab('booking')}
                  className={`hover:text-orange-400 transition-colors ${activeTab === 'booking' ? 'text-orange-400 font-semibold' : ''}`}
                >
                  Live Action
                </button>
              </div>
            </div>

            {/* Template Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Hero inside demo */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900 min-h-[220px] flex items-center p-6">
                <img
                  src={template.image}
                  alt={template.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="relative z-10 max-w-lg space-y-2">
                  <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-widest">
                    Live Interactive Demo
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {template.subtitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setActiveTab('booking')}
                      className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs font-medium transition-colors"
                    >
                      Try Interactive Widget
                    </button>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {template.rating} ({template.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Specific interactive widgets based on category */}
              {template.category === 'Restaurant' ? (
                <div className="p-4 rounded-xl bg-[#161a22] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Chef's Signature Tasting Menu</h3>
                    <span className="text-xs text-amber-400">Available Daily</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white">Wagyu Beef & Truffle</span>
                        <span className="text-amber-400">$145</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Seared Wagyu, black truffle shavings, asparagus, red wine reduction</p>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white">Sea Bass in Golden Broth</span>
                        <span className="text-amber-400">$98</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Pan-seared Chilean sea bass, saffron broth, seasonal vegetables</p>
                    </div>
                  </div>

                  {/* Reservation form widget */}
                  <div className="p-3 rounded-lg bg-orange-950/20 border border-orange-500/20 space-y-2">
                    <div className="text-xs font-semibold text-orange-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Online Table Reservation Test
                    </div>
                    {reservationConfirmed ? (
                      <div className="p-2 bg-emerald-950/40 text-emerald-300 text-xs rounded border border-emerald-500/30 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Table for 2 reserved for today at 7:30 PM! Confirmation code: #RES-892</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          defaultValue="Guest: Anthony K."
                          className="px-2.5 py-1 text-xs bg-black/50 border border-white/10 rounded text-zinc-200"
                        />
                        <button
                          onClick={() => setReservationConfirmed(true)}
                          className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded font-medium"
                        >
                          Book Table Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : template.category === 'Fashion' || template.category === 'E-commerce' ? (
                <div className="p-4 rounded-xl bg-[#161a22] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Live Product Selector</h3>
                    <span className="text-xs text-emerald-400">In Stock</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img 
                      src={template.image} 
                      alt="Product" 
                      referrerPolicy="no-referrer"
                      className="w-28 h-28 object-cover rounded-lg border border-white/10 shrink-0" 
                    />
                    <div className="space-y-2 flex-1">
                      <h4 className="text-xs font-medium text-white">The Terracotta Modern Minimalist Jacket</h4>
                      <div className="text-sm font-bold text-orange-400">$140.00</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-400">Size:</span>
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium border ${
                              selectedSize === size
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-black/40 text-zinc-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setAddedItemToDemoCart(true)}
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs font-medium flex items-center gap-1.5"
                      >
                        {addedItemToDemoCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                        {addedItemToDemoCart ? 'Added to Cart!' : 'Add to Demo Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#161a22] border border-white/10 space-y-3">
                  <h3 className="text-sm font-semibold text-white">Selected Project Case Studies</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
                      <div className="font-semibold text-white">Orbital UI System</div>
                      <p className="text-[11px] text-zinc-400">Design system and component kit built for fintech apps.</p>
                    </div>
                    <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
                      <div className="font-semibold text-white">Neon Flow Experience</div>
                      <p className="text-[11px] text-zinc-400">WebGL 3D shader landing page with +180% engagement.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Features list */}
              <div className="p-4 rounded-xl bg-[#161a22]/60 border border-white/5 space-y-2">
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Template Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                  {template.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom floating bar */}
            <div className="p-3 bg-[#12151c] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Ready to deploy with your branding?
              </span>
              <button
                onClick={() => onBuy(template)}
                className="px-3.5 py-1.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <span>Buy Template Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
