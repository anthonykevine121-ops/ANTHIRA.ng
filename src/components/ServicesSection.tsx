import React from 'react';
import { Currency, ServiceItem } from '../types';
import { SERVICES } from '../data/mockData';
import { formatPrice } from '../utils/format';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  currency: Currency;
  onSelectService: (service: ServiceItem) => void;
  onOpenCustomModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currency,
  onSelectService,
  onOpenCustomModal
}) => {
  return (
    <section id="services" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
              OUR SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Custom Website Design Services
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Get a professional, modern and responsive website tailored to your business needs.
            </p>
          </div>

          <button
            onClick={onOpenCustomModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors shrink-0 group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Services Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv)}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#141820] border border-white/10 hover:border-orange-500/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer overflow-hidden"
            >
              <div className="space-y-4">
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/5">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>

                {/* Service Info */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {srv.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Orange Round Action Button */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                <div>
                  <span className="text-[11px] text-zinc-400">Starting from </span>
                  <span className="text-xs font-bold text-[#ff5722] font-mono tabular-nums">
                    {formatPrice(srv.startingPriceNGN, srv.startingPriceUSD, currency)}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#ff5722] group-hover:bg-[#f4511e] text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-md shadow-orange-500/25">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
