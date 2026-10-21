import React, { useState } from 'react';
import { Currency, PricingPackage, CountryCode, CountryInfo } from '../types';
import { NIGERIA_PACKAGES, SUPPORTED_COUNTRIES } from '../data/mockData';
import { Check, ArrowRight, Sparkles, Clock, Table, LayoutGrid, Globe, ChevronDown } from 'lucide-react';

interface PricingSectionProps {
  currency: Currency;
  onSelectPackage: (pkg: PricingPackage, country?: CountryInfo) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currency,
  onSelectPackage
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>('NG');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  const selectedCountry = SUPPORTED_COUNTRIES.find((c) => c.code === selectedCountryCode) || SUPPORTED_COUNTRIES[0];

  const getPackagePrice = (pkg: PricingPackage, countryCode: CountryCode) => {
    switch (countryCode) {
      case 'US':
        return pkg.priceUSD;
      case 'GB':
        return pkg.priceGBP;
      case 'NG':
      default:
        return pkg.priceNGN;
    }
  };

  return (
    <section id="pricing" className="py-20 bg-[#0a0c10] border-t border-white/5 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-orange-600/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with Country Dropdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
                PACKAGES & REGIONAL PRICING
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Website Design & Development Packages
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Transparent, competitive rates tailored to your target region with local payment integrations and high-performance engineering.
            </p>
          </div>

          {/* Controls: Country Dropdown & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-end">
            {/* Country Dropdown List */}
            <div className="flex items-center gap-2 bg-[#141820] border border-white/10 rounded-xl px-3 py-1.5 shadow-md">
              <Globe className="w-4 h-4 text-orange-400 shrink-0" />
              <label htmlFor="country-selector" className="text-xs text-zinc-400 font-medium whitespace-nowrap">
                Country:
              </label>
              <select
                id="country-selector"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value as CountryCode)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-[#141820] text-white">
                    {c.flag} {c.name} ({c.currencyCode})
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle: Cards vs Country Matrix */}
            <div className="flex items-center gap-1 p-1 bg-[#141820] border border-white/10 rounded-xl">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-[#ff5722] text-white shadow-md shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards View</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'matrix'
                    ? 'bg-[#ff5722] text-white shadow-md shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>All Countries Matrix</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Country Comparison Matrix View (Exact table matching prompt) */}
        {viewMode === 'matrix' ? (
          <div className="overflow-hidden rounded-2xl bg-[#12151c] border border-white/10 shadow-2xl">
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#171b24] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Regional Pricing Comparison
                </h3>
                <p className="text-xs text-zinc-400">
                  Direct pricing comparison across Nigeria, United States, and United Kingdom
                </p>
              </div>
              <span className="text-xs font-mono text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                Multi-Currency Matrix
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141820] text-zinc-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6 font-bold text-white">Package</th>
                    <th className="py-4 px-6 font-bold text-emerald-400 text-right">🇳🇬 Nigeria</th>
                    <th className="py-4 px-6 font-bold text-blue-400 text-right">🇺🇸 United States</th>
                    <th className="py-4 px-6 font-bold text-purple-400 text-right">🇬🇧 United Kingdom</th>
                    <th className="py-4 px-6 font-bold text-white">Best for</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {NIGERIA_PACKAGES.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className={`hover:bg-white/[0.03] transition-colors group cursor-pointer ${
                        pkg.name === 'Premium' ? 'bg-orange-500/[0.04]' : ''
                      }`}
                      onClick={() => onSelectPackage(pkg, selectedCountry)}
                    >
                      <td className="py-4 px-6 font-bold text-white text-sm flex items-center gap-2">
                        <span>{pkg.name}</span>
                        {pkg.popular && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#ff5722] text-white">
                            Popular
                          </span>
                        )}
                        {pkg.name === 'Premium' && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500 text-black">
                            Flagship
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-sm text-emerald-400 text-right tabular-nums whitespace-nowrap">
                        {pkg.priceNGN}
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-sm text-blue-400 text-right tabular-nums whitespace-nowrap">
                        {pkg.priceUSD}
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-sm text-purple-400 text-right tabular-nums whitespace-nowrap">
                        {pkg.priceGBP}
                      </td>
                      <td className="py-4 px-6 text-xs text-zinc-300 max-w-xs">
                        <div className="font-medium text-zinc-200">{pkg.bestFor}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                          {pkg.features.slice(0, 3).join(' · ')}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPackage(pkg, selectedCountry);
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-[#ff5722] rounded-lg transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Get Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* 2. Interactive Cards View filtered by Selected Country */
          <div>
            {/* Active country banner */}
            <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-[#141820] border border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="text-zinc-300">
                  Showing pricing for <strong className="text-white">{selectedCountry.name}</strong> ({selectedCountry.currencyCode})
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 hidden sm:inline">
                Use the dropdown above to view pricing in USD or GBP
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NIGERIA_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-[#181c26] to-[#12151c] border-2 border-orange-500/60 shadow-xl shadow-orange-500/10'
                      : 'bg-[#12151c] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#ff5722] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Popular Choice
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Title & Best For */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {pkg.name}
                        </h3>
                        <span className="text-lg">{selectedCountry.flag}</span>
                      </div>
                      <p className="text-xs text-orange-400 font-medium mt-0.5">
                        Best for: {pkg.bestFor}
                      </p>
                    </div>

                    {/* Price Tag according to Selected Country */}
                    <div className="py-2.5 border-y border-white/5 space-y-1">
                      <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        {getPackagePrice(pkg, selectedCountryCode)}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span>Delivery: {pkg.timeline}</span>
                        </div>
                        <span className="font-mono text-zinc-500 text-[10px]">
                          {selectedCountry.currencyCode}
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                        Included in Package:
                      </div>
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-white/5">
                    <button
                      onClick={() => onSelectPackage(pkg, selectedCountry)}
                      className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        pkg.popular
                          ? 'bg-[#ff5722] hover:bg-[#f4511e] text-white shadow-lg shadow-orange-500/25'
                          : 'bg-white/10 hover:bg-white/15 text-white hover:border-white/20'
                      }`}
                    >
                      <span>Choose {pkg.name} ({getPackagePrice(pkg, selectedCountryCode)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Delivery Note */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-base">🌍</span>
            <span>We serve clients globally across Nigeria (Paystack, Flutterwave), the US, and UK (Stripe, Wire, Card).</span>
          </div>
          <span className="text-orange-400 font-medium whitespace-nowrap">
            Flexible milestones: 50% upfront & 50% on verified launch.
          </span>
        </div>
      </div>
    </section>
  );
};
