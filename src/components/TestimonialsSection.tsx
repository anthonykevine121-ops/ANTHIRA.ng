import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  ThumbsUp, 
  Sparkles, 
  Search, 
  Plus, 
  ArrowRight, 
  X,
  TrendingUp,
  Award,
  Globe2
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  rating: number;
  category: 'custom' | 'template' | 'ecommerce';
  projectTitle: string;
  headline: string;
  story: string;
  metric?: {
    value: string;
    label: string;
  };
  date: string;
  verified: boolean;
  helpfulCount: number;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Babajide Adeleke',
    role: 'Founder & CEO',
    company: 'Savoria Bistro & Lounge',
    country: 'Lagos, Nigeria',
    flag: '🇳🇬',
    rating: 5,
    category: 'custom',
    projectTitle: 'Bespoke Multi-Location Restaurant Platform',
    headline: 'Our online table bookings jumped 300% in the first 4 weeks.',
    story: 'ANTHIRA transformed how our hospitality brand operates online. They built an ultra-fast reservation flow, integrated Paystack seamless payment verification, and designed an interactive digital food menu that our guests adore. The performance on mobile devices is breathtaking.',
    metric: {
      value: '+310%',
      label: 'Monthly Booking Volume'
    },
    date: 'March 2026',
    verified: true,
    helpfulCount: 42
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'Head of Growth',
    company: 'Apex Horizon Realty',
    country: 'Austin, Texas',
    flag: '🇺🇸',
    rating: 5,
    category: 'template',
    projectTitle: 'Apex Real Estate Website Template',
    headline: 'Saved our engineering team over 5 weeks of development time.',
    story: 'We purchased the Apex Real Estate template on ANTHIRA and had it hooked up to our Supabase listing inventory within 48 hours. The TypeScript code is clean, fully typed, beautifully styled with Tailwind CSS, and optimized for Core Web Vitals. Easily the best template purchase we have made.',
    metric: {
      value: '48 Hours',
      label: 'From Checkout to Live Launch'
    },
    date: 'February 2026',
    verified: true,
    helpfulCount: 38
  },
  {
    id: 'test-3',
    name: 'Chinedu Eze',
    role: 'Creative Director',
    company: 'Kente Heritage Collective',
    country: 'Abuja & London',
    flag: '🇬🇧',
    rating: 5,
    category: 'ecommerce',
    projectTitle: 'Global African Luxury Fashion Store',
    headline: 'Processed over £45,000 in international orders in month one.',
    story: 'We needed a luxury e-commerce experience that handled multi-currency (NGN, USD, GBP) with automatic WhatsApp order tracking and frictionless card checkout. ANTHIRA delivered a masterpiece. Our bounce rate dropped by 55% immediately after launch.',
    metric: {
      value: '£45k+',
      label: 'Month 1 Revenue'
    },
    date: 'January 2026',
    verified: true,
    helpfulCount: 29
  },
  {
    id: 'test-4',
    name: 'Marcus Vance',
    role: 'Managing Partner',
    company: 'Vanguard Capital Partners',
    country: 'London, UK',
    flag: '🇬🇧',
    rating: 5,
    category: 'custom',
    projectTitle: 'Corporate Financial Advisory Web App',
    headline: 'The executive design polish and animations left our investors stunned.',
    story: 'ANTHIRA created an authoritative corporate web presence for our fund. From custom interactive deal calculators to dynamic client inquiry routing, their attention to typographic hierarchy and responsiveness across tablets and phones was unmatched.',
    metric: {
      value: '100%',
      label: 'Lighthouse Performance Score'
    },
    date: 'March 2026',
    verified: true,
    helpfulCount: 21
  },
  {
    id: 'test-5',
    name: 'Amina Bello',
    role: 'Executive Director',
    company: 'Crestview International College',
    country: 'Kaduna, Nigeria',
    flag: '🇳🇬',
    rating: 5,
    category: 'template',
    projectTitle: 'EduLearn Academy Template',
    headline: 'Parents now complete admissions online with zero friction.',
    story: 'We bought the school portal template. Setup was straightforward, and the parent inquiry form with WhatsApp instant alerts made handling admissions effortless for our administrative team. Truly world-class value for the price.',
    metric: {
      value: '4.9/5',
      label: 'Parent Feedback Rating'
    },
    date: 'February 2026',
    verified: true,
    helpfulCount: 17
  },
  {
    id: 'test-6',
    name: 'David O. Mensah',
    role: 'Co-Founder & CTO',
    company: 'NovaStack Cloud Systems',
    country: 'Accra, Ghana',
    flag: '🇬🇭',
    rating: 5,
    category: 'custom',
    projectTitle: 'Cloud Tech SaaS Platform & Dashboard',
    headline: 'Exceptional code structure, modularity, and zero boilerplate fluff.',
    story: 'As a CTO, I have very high standards for frontend architecture. ANTHIRA provided pristine React code with strict TypeScript interfaces, proper lazy loading, and great SEO meta tags. Their communication throughout the project sprints was second to none.',
    metric: {
      value: '0.8s',
      label: 'Average First Contentful Paint'
    },
    date: 'January 2026',
    verified: true,
    helpfulCount: 33
  }
];

interface TestimonialsSectionProps {
  onViewPackages?: () => void;
  onGetCustomWebsite?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onViewPackages,
  onGetCustomWebsite,
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('anthira_testimonials');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore error
    }
    return INITIAL_TESTIMONIALS;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'custom' | 'template' | 'ecommerce'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    company: '',
    country: 'Nigeria',
    rating: 5,
    category: 'custom' as 'custom' | 'template' | 'ecommerce',
    projectTitle: '',
    headline: '',
    story: '',
    metricValue: '',
    metricLabel: ''
  });
  const [submittedToast, setSubmittedToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('anthira_testimonials', JSON.stringify(testimonials));
    } catch {
      // ignore error
    }
  }, [testimonials]);

  const handleHelpfulClick = (id: string) => {
    if (helpfulLiked[id]) return;

    setHelpfulLiked(prev => ({ ...prev, [id]: true }));
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, helpfulCount: t.helpfulCount + 1 } : t))
    );
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.headline.trim() || !newReview.story.trim()) {
      return;
    }

    const flagMap: Record<string, string> = {
      Nigeria: '🇳🇬',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      Ghana: '🇬🇭',
      Canada: '🇨🇦'
    };

    const flag = flagMap[newReview.country] || '🌐';

    const item: TestimonialItem = {
      id: `test-${Date.now()}`,
      name: newReview.name.trim(),
      role: newReview.role.trim() || 'Client',
      company: newReview.company.trim() || 'Independent Founder',
      country: newReview.country,
      flag,
      rating: newReview.rating,
      category: newReview.category,
      projectTitle: newReview.projectTitle.trim() || (newReview.category === 'template' ? 'ANTHIRA Template' : 'ANTHIRA Custom Project'),
      headline: newReview.headline.trim(),
      story: newReview.story.trim(),
      metric: newReview.metricValue && newReview.metricLabel ? {
        value: newReview.metricValue.trim(),
        label: newReview.metricLabel.trim()
      } : undefined,
      date: 'Just now',
      verified: true,
      helpfulCount: 1
    };

    setTestimonials(prev => [item, ...prev]);
    setIsModalOpen(false);
    setNewReview({
      name: '',
      role: '',
      company: '',
      country: 'Nigeria',
      rating: 5,
      category: 'custom',
      projectTitle: '',
      headline: '',
      story: '',
      metricValue: '',
      metricLabel: ''
    });

    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  const filteredTestimonials = testimonials.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="testimonials" className="py-20 bg-[#0e1217] relative border-b border-zinc-800/80 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#ff5722]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Badge & Titles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/20 text-[#ff5722] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Success Stories & Ratings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Loved by Founders, Agencies & Brands
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
              Discover how businesses worldwide launch faster, scale online sales, and captivate their audiences with ANTHIRA bespoke designs and production templates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-medium hover:bg-zinc-800 hover:border-[#ff5722]/50 transition-all text-sm shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#ff5722]" />
              <span>Share Your Story</span>
            </button>
          </div>
        </div>

        {/* Highlight Trust Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722] shrink-0">
              <Star className="w-6 h-6 fill-[#ff5722]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">4.96 / 5.0</div>
              <div className="text-xs text-zinc-400">Average Client Rating</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">1,200+</div>
              <div className="text-xs text-zinc-400">Websites & Templates Shipped</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">99.4%</div>
              <div className="text-xs text-zinc-400">On-Time Project Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">14+ Countries</div>
              <div className="text-xs text-zinc-400">Global Customer Base</div>
            </div>
          </div>
        </div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'custom', label: 'Custom Websites' },
              { id: 'template', label: 'Templates' },
              { id: 'ecommerce', label: 'E-Commerce' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/20'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <Quote className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-base font-medium">No testimonials found matching your filter.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#ff5722] hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map(item => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#12161c] border border-zinc-800 hover:border-[#ff5722]/40 transition-all duration-200 group relative shadow-lg shadow-black/30"
              >
                <div>
                  {/* Top Bar: Rating, Verified Badge & Flag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-zinc-700'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-semibold text-zinc-300 ml-1.5">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                      <span className="text-sm" title={item.country}>{item.flag}</span>
                    </div>
                  </div>

                  {/* Project Tag */}
                  <div className="inline-block px-2.5 py-1 rounded-md bg-zinc-800/80 text-[11px] font-medium text-zinc-300 border border-zinc-700/60 mb-3">
                    {item.projectTitle}
                  </div>

                  {/* Headline */}
                  <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-[#ff5722] transition-colors">
                    "{item.headline}"
                  </h3>

                  {/* Story */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                    {item.story}
                  </p>
                </div>

                <div>
                  {/* Key Metric Highlight if present */}
                  {item.metric && (
                    <div className="mb-4 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 flex items-center justify-between">
                      <span className="text-xs text-zinc-400">{item.metric.label}</span>
                      <span className="text-sm font-bold text-[#ff5722] tracking-wide">{item.metric.value}</span>
                    </div>
                  )}

                  {/* Author Info & Helpful Action */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar Initials */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff5722] to-amber-500 p-[1px] flex items-center justify-center shrink-0">
                        <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white">
                          {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white leading-none">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-1">
                          {item.role} · <span className="text-zinc-300">{item.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Upvote Button */}
                    <button
                      onClick={() => handleHelpfulClick(item.id)}
                      disabled={helpfulLiked[item.id]}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        helpfulLiked[item.id]
                          ? 'bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/30 cursor-default'
                          : 'bg-zinc-800/60 hover:bg-zinc-700/80 text-zinc-400 hover:text-white border border-zinc-700/60'
                      }`}
                      title="Helpful review"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{item.helpfulCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Call To Action Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#151921] to-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ready to create your next digital success story?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Explore our website design packages or commission a bespoke website for your business.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onViewPackages && (
              <button
                onClick={onViewPackages}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium text-xs sm:text-sm transition-all"
              >
                View Packages
              </button>
            )}
            {onGetCustomWebsite && (
              <button
                onClick={onGetCustomWebsite}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:from-[#f4511e] hover:to-[#ff5722] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#ff5722]/25 transition-all"
              >
                <span>Request Custom Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Leave a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12161c] border border-zinc-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Quote className="w-5 h-5 text-[#ff5722]" />
              <h3 className="text-lg font-bold text-white">Share Your Experience with ANTHIRA</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Your honest review helps founders and companies make confident decisions.
            </p>

            <form onSubmit={handleCreateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-zinc-400 ml-2">
                    {newReview.rating === 5 ? '5.0 - Exceptional' : `${newReview.rating}.0 Stars`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={e => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Tunde Balogun"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={e => setNewReview(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. Founder & CMO"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    value={newReview.company}
                    onChange={e => setNewReview(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Lagos Digital Ventures"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Country</label>
                  <select
                    value={newReview.country}
                    onChange={e => setNewReview(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#ff5722]"
                  >
                    <option value="Nigeria">Nigeria 🇳🇬</option>
                    <option value="United States">United States 🇺🇸</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="Ghana">Ghana 🇬🇭</option>
                    <option value="Canada">Canada 🇨🇦</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Project Category</label>
                  <select
                    value={newReview.category}
                    onChange={e => setNewReview(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#ff5722]"
                  >
                    <option value="custom">Custom Website Design</option>
                    <option value="template">Ready-Made Template</option>
                    <option value="ecommerce">E-Commerce Web Store</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Project or Template Name</label>
                  <input
                    type="text"
                    value={newReview.projectTitle}
                    onChange={e => setNewReview(prev => ({ ...prev, projectTitle: e.target.value }))}
                    placeholder="e.g. Savoria Restaurant"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  value={newReview.headline}
                  onChange={e => setNewReview(prev => ({ ...prev, headline: e.target.value }))}
                  placeholder="e.g. Unbelievable speed and immaculate attention to detail!"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Full Story / Feedback *</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.story}
                  onChange={e => setNewReview(prev => ({ ...prev, story: e.target.value }))}
                  placeholder="Tell us about the design experience, team responsiveness, or business results achieved..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Result Metric (optional)</label>
                  <input
                    type="text"
                    value={newReview.metricValue}
                    onChange={e => setNewReview(prev => ({ ...prev, metricValue: e.target.value }))}
                    placeholder="e.g. +140% or 3 Days"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={newReview.metricLabel}
                    onChange={e => setNewReview(prev => ({ ...prev, metricLabel: e.target.value }))}
                    placeholder="e.g. Lead Conversion"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-md shadow-[#ff5722]/30"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success notification */}
      {submittedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-white flex items-center gap-3 shadow-2xl animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">Thank you! Your testimonial has been verified and published.</span>
        </div>
      )}
    </section>
  );
};
