import React, { useState } from 'react';
import { Template, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Star, Check, ShoppingBag, Eye, ArrowLeft, Share2, ShieldCheck, Download, Code2, Tag } from 'lucide-react';

interface TemplateDetailModalProps {
  template: Template | null;
  currency: Currency;
  onClose: () => void;
  onBuyNow: (template: Template) => void;
  onLiveDemo: (template: Template) => void;
}

export const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  template,
  currency,
  onClose,
  onBuyNow,
  onLiveDemo
}) => {
  if (!template) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = template.galleryImages.length > 0 ? template.galleryImages : [template.image];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12151b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header / Navigation */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#171b23] shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Templates</span>
          </button>

          <span className="text-sm font-semibold text-white tracking-wide">
            Template Details
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs flex items-center gap-1"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && <span className="text-[10px] text-orange-400">Copied!</span>}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Main Hero Preview */}
          <div className="space-y-3">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
              <img
                src={images[activeImageIndex]}
                alt={template.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              {template.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#ff5722] text-white shadow-md">
                  {template.badge}
                </span>
              )}
            </div>

            {/* Thumbnail carousel */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#ff5722] scale-102' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Pricing */}
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {template.title}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  {template.subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#ff5722] font-mono tabular-nums">
                  {formatPrice(template.priceNGN, template.priceUSD, currency)}
                </span>
                <span className="block text-[11px] text-zinc-400">One-time payment</span>
              </div>
            </div>

            {/* Reviews / Rating */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-white">{template.rating}</span>
              <span className="text-zinc-400">({template.reviewCount} verified reviews)</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{template.downloadsCount}+ downloads</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              About This Template
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {template.description}
            </p>
          </div>

          {/* Features Checklist */}
          <div className="space-y-3 p-4 rounded-xl bg-[#181c24]/80 border border-white/5">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff5722]" />
              <span>Features Included</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {template.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Badges */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-orange-400" />
              <span>Built With Modern Technologies</span>
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {template.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-zinc-300 flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {template.tags && template.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#ff5722]" />
                <span>Tags & Keywords</span>
              </h3>
              <div className="flex flex-wrap items-center gap-1.5">
                {template.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-orange-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* License & Support Guarantee */}
          <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/20 text-xs text-orange-200/90 flex items-center gap-3">
            <Download className="w-5 h-5 text-orange-400 shrink-0" />
            <div>
              <span className="font-semibold text-white">Instant Code Delivery:</span> You get lifetime access, complete clean source files, documentation, and free updates.
            </div>
          </div>
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="p-4 bg-[#171b23] border-t border-white/10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onBuyNow(template)}
            className="w-full sm:flex-1 py-3 px-6 text-sm font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy Now ({formatPrice(template.priceNGN, template.priceUSD, currency)})</span>
          </button>

          <button
            onClick={() => onLiveDemo(template)}
            className="w-full sm:w-auto py-3 px-6 text-sm font-semibold text-zinc-200 hover:text-white bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Live Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
