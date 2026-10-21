import React, { useState, useEffect } from 'react';
import { Currency, Template, CountryCode } from '../types';
import { formatPrice } from '../utils/format';
import { TEMPLATES, TEMPLATE_CATEGORY_RATES, SUPPORTED_COUNTRIES } from '../data/mockData';
import { 
  Eye, 
  ShoppingCart, 
  Search, 
  Star, 
  ArrowRight, 
  X, 
  Sparkles, 
  Filter, 
  Tag, 
  RotateCcw, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  Table, 
} from 'lucide-react';

interface TemplatesSectionProps {
  currency: Currency;
  onSelectTemplate: (template: Template) => void;
  onLiveDemo: (template: Template) => void;
  onBuyNow: (template: Template) => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  currency,
  onSelectTemplate,
  onLiveDemo,
  onBuyNow
}) => {
  // Selected Country for the category pricing guide
  const [guideCountry, setGuideCountry] = useState<CountryCode>('NG');
  const [showPriceGuideTable, setShowPriceGuideTable] = useState(true);

  // Search & Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Restaurant', 'Fashion', 'E-commerce', 'Portfolio', 'Business', 'React'];

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      tpl.title.toLowerCase().includes(query) ||
      tpl.description.toLowerCase().includes(query) ||
      Boolean(tpl.tags && tpl.tags.some((tag) => tag.toLowerCase().includes(query))) ||
      tpl.subtitle.toLowerCase().includes(query) ||
      tpl.category.toLowerCase().includes(query) ||
      tpl.technologies.some((t) => t.toLowerCase().includes(query)) ||
      tpl.features.some((f) => f.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const handleSelectCategoryFromGuide = (catName: string) => {
    // Extract base keyword (e.g. "Restaurant" from "Restaurant Website")
    const keyword = catName.split(' ')[0];
    setSearchQuery(keyword);
    // Smooth scroll down to the templates cards
    const el = document.getElementById('template-catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="templates" className="py-20 bg-[#0c0e13] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
              PREMIUM WEBSITE TEMPLATES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Beautiful Templates. Ready to Use.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              Start your project faster with our professionally designed website templates. Fully responsive, easy to customize and built with modern technology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono bg-[#161a22] px-3 py-1.5 rounded-lg border border-white/5">
              Showing <strong className="text-white">{filteredTemplates.length}</strong> of {TEMPLATES.length} templates
            </span>
          </div>
        </div>

        {/* =========================================================================
            1. FIRST BEFORE DISPLAYING THE TEMPLATE:
            Country Dropdown & Template Category Regional Pricing Table
           ========================================================================= */}
        <div className="rounded-2xl bg-[#141820] border border-white/10 overflow-hidden shadow-2xl">
          {/* Header Bar with Country Dropdown & Expand Toggle */}
          <div className="p-4 sm:p-5 bg-[#171b24] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 text-[#ff5722]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Template Category Price Index by Country</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-zinc-300">
                    Official Guide
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your country to view market rates or compare across Nigeria 🇳🇬, USA 🇺🇸, and UK 🇬🇧
                </p>
              </div>
            </div>

            {/* Country Dropdown & Table Toggle */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2 bg-[#1b202a] border border-white/10 rounded-xl px-3 py-1.5 shadow-sm">
                <span className="text-xs text-zinc-400">Country:</span>
                <select
                  value={guideCountry}
                  onChange={(e) => setGuideCountry(e.target.value as CountryCode)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="NG" className="bg-[#141820] text-white">🇳🇬 Nigeria (NGN)</option>
                  <option value="US" className="bg-[#141820] text-white">🇺🇸 United States (USD)</option>
                  <option value="GB" className="bg-[#141820] text-white">🇬🇧 United Kingdom (GBP)</option>
                </select>
              </div>

              <button
                onClick={() => setShowPriceGuideTable(!showPriceGuideTable)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/5"
                title={showPriceGuideTable ? 'Collapse Table' : 'Expand Table'}
              >
                {showPriceGuideTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* The Exact Table with 10 Categories */}
          {showPriceGuideTable && (
            <div className="overflow-x-auto animate-fade-in">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#12151c] text-zinc-400 uppercase tracking-wider text-[11px] border-b border-white/5">
                  <tr>
                    <th className="py-3.5 px-6 font-bold text-white">Template Category</th>
                    <th className={`py-3.5 px-6 font-bold text-right ${guideCountry === 'NG' ? 'text-[#ff5722] bg-orange-500/5 font-extrabold' : 'text-emerald-400'}`}>
                      Nigeria 🇳🇬
                    </th>
                    <th className={`py-3.5 px-6 font-bold text-right ${guideCountry === 'US' ? 'text-[#ff5722] bg-orange-500/5 font-extrabold' : 'text-blue-400'}`}>
                      USA 🇺🇸
                    </th>
                    <th className={`py-3.5 px-6 font-bold text-right ${guideCountry === 'GB' ? 'text-[#ff5722] bg-orange-500/5 font-extrabold' : 'text-purple-400'}`}>
                      UK 🇬🇧
                    </th>
                    <th className="py-3.5 px-6 text-right">Explore</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {TEMPLATE_CATEGORY_RATES.map((row, idx) => (
                    <tr
                      key={idx}
                      onClick={() => handleSelectCategoryFromGuide(row.category)}
                      className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-6 font-semibold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                        <span>{row.category}</span>
                      </td>
                      <td className={`py-3 px-6 font-mono font-bold text-right tabular-nums whitespace-nowrap ${
                        guideCountry === 'NG' ? 'text-[#ff5722] bg-orange-500/5' : 'text-emerald-400'
                      }`}>
                        {row.priceNGN}
                      </td>
                      <td className={`py-3 px-6 font-mono font-bold text-right tabular-nums whitespace-nowrap ${
                        guideCountry === 'US' ? 'text-[#ff5722] bg-orange-500/5' : 'text-blue-400'
                      }`}>
                        {row.priceUSD}
                      </td>
                      <td className={`py-3 px-6 font-mono font-bold text-right tabular-nums whitespace-nowrap ${
                        guideCountry === 'GB' ? 'text-[#ff5722] bg-orange-500/5' : 'text-purple-400'
                      }`}>
                        {row.priceGBP}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <span className="text-[11px] text-zinc-400 group-hover:text-white inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Browse</span>
                          <ArrowRight className="w-3 h-3 text-orange-400" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 bg-[#11141a] border-t border-white/5 px-6 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Click any category row above to automatically filter the template catalog below.</span>
                </span>
                <span className="hidden md:inline font-mono text-zinc-500">10/10 categories actively updated</span>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            2. SEARCH BAR & FILTER CONTROLS
           ========================================================================= */}
        <div id="template-catalog-grid" className="p-4 sm:p-5 rounded-2xl bg-[#141820] border border-white/10 space-y-4 shadow-xl">
          {/* Search Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <label htmlFor="template-search-field" className="font-bold text-white flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Search Templates by Title, Description, or Tags</span>
            </label>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              {searchQuery ? (
                <span className="text-orange-400 font-mono font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping inline-block" />
                  Filtering in real-time ({filteredTemplates.length} matching)
                </span>
              ) : (
                <span className="text-zinc-500 font-mono">Instant real-time search</span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                id="template-search-field"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by title, description, or tags in real-time (e.g. Restaurant, E-commerce, Food, Fashion, Portfolio)..."
                className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-[#1a1f29] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white rounded-md transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown Selector */}
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3.5 py-3 text-xs bg-[#1a1f29] border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#ff5722] cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-3 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                  title="Reset filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Bar & Quick Tag Suggestions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] text-zinc-500 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#ff5722] text-white shadow-md shadow-orange-500/20'
                      : 'bg-[#181c25] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
              <Tag className="w-3 h-3 text-[#ff5722]" />
              <span className="text-[11px] font-medium text-zinc-400">Popular Tags:</span>
              {['Restaurant', 'Food', 'Fashion', 'E-commerce', 'Shop', 'Portfolio', 'React'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? 'bg-orange-500 text-white font-bold'
                      : 'bg-white/5 hover:bg-orange-500/20 text-zinc-300 hover:text-orange-300 border border-white/5'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. TEMPLATES CATALOG GRID OR EMPTY STATE
           ========================================================================= */}
        {filteredTemplates.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#141820] border border-white/10 p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No Templates Found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                We couldn't find any templates matching "{searchQuery || selectedCategory}" in title, description, or tags. Try searching for "Restaurant", "Fashion", "Shop", or "React".
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
              >
                Clear Filters & Show All
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#141820] border border-white/10 hover:border-orange-500/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
              >
                {/* Thumbnail Container */}
                <div
                  onClick={() => onSelectTemplate(template)}
                  className="relative aspect-[16/11] w-full overflow-hidden bg-black/40 cursor-pointer"
                >
                  <img
                    src={template.image}
                    alt={template.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge (Popular, New, Best Seller, Sale) */}
                  {template.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md text-white shadow-md ${
                        template.badge === 'Popular'
                          ? 'bg-[#ff5722]'
                          : template.badge === 'New'
                          ? 'bg-emerald-500'
                          : template.badge === 'Best Seller'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    >
                      {template.badge}
                    </span>
                  )}

                  {/* Star rating overlay */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-white flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{template.rating}</span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div 
                    onClick={() => onSelectTemplate(template)}
                    className="cursor-pointer space-y-1"
                  >
                    <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {template.subtitle}
                    </p>
                  </div>

                  {/* Template Tags (Real-time clickable tags) */}
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tag);
                          }}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 hover:text-orange-200 border border-orange-500/20 transition-colors flex items-center gap-0.5"
                          title={`Filter by tag: ${tag}`}
                        >
                          <Tag className="w-2.5 h-2.5 text-orange-400" />
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Tech stack highlights */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-zinc-400">
                    {template.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-black/30 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-[#ff5722] font-mono tabular-nums">
                      {formatPrice(template.priceNGN, template.priceUSD, currency)}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {template.category}
                    </span>
                  </div>

                  {/* Action Buttons: Live Demo & Buy Now matching mockup */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onLiveDemo(template)}
                      className="py-2 px-2 text-xs font-semibold text-zinc-300 hover:text-white bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </button>

                    <button
                      onClick={() => onBuyNow(template)}
                      className="py-2 px-2 text-xs font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
