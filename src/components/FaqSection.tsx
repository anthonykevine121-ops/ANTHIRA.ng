import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Code2, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'licensing' | 'services' | 'payments';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'licensing',
    question: 'What type of license is included when I purchase a template?',
    answer: 'Every template comes with a lifetime Commercial License. You are permitted to use it for your own business or build a single client website without paying recurring fees or royalties. You cannot resell or redistribute the template source code as a competing theme.'
  },
  {
    id: 'faq-2',
    category: 'licensing',
    question: 'Do I get complete source code and documentation with my template?',
    answer: 'Yes! Immediately after checkout, you get instant download access in your Customer Dashboard to the clean, production-ready source files (.zip). The codebase is built with modern React 19, TypeScript, and Tailwind CSS with modular component architecture, documented setup steps, and environment variable samples.'
  },
  {
    id: 'faq-3',
    category: 'licensing',
    question: 'Can I connect my own backend, database, and payment gateways?',
    answer: 'Absolutely. ANTHIRA templates are designed with clean API boundaries and separation of concerns. You can easily connect Firebase, Supabase, Cloud SQL, REST APIs, or local payment gateways like Paystack and Flutterwave with zero lock-in.'
  },
  {
    id: 'faq-4',
    category: 'services',
    question: 'What is the difference between buying a template and commissioning a custom website?',
    answer: 'Purchasing a template gives you ready-to-deploy source code for self-customization and fast launch within hours. Our Custom Design Services are end-to-end agency projects where our lead architects design bespoke Figma wireframes, craft conversion copywriting, build custom features, set up domain/hosting, integrate payment APIs, and test across all devices.'
  },
  {
    id: 'faq-5',
    category: 'payments',
    question: 'How do milestone payments work for custom design packages?',
    answer: 'We operate on a transparent milestone structure: 50% upfront deposit to initiate design and architectural sprints, and the remaining 50% upon final staging review and verified live deployment. We accept payments via Paystack, Flutterwave, Stripe, Card, and direct Nigerian / International Bank Transfer.'
  },
  {
    id: 'faq-6',
    category: 'services',
    question: 'Can you integrate Nigerian payment gateways like Paystack and Flutterwave?',
    answer: 'Yes! We natively integrate Paystack, Flutterwave, and Monnify for automated customer checkout, card payments, USSD, bank transfers, and instant receipts, ensuring maximum conversion rates for customers across Nigeria and the diaspora.'
  },
  {
    id: 'faq-7',
    category: 'services',
    question: 'What post-launch warranty and technical support do you provide?',
    answer: 'Depending on your package tier, custom projects include 30 to 90 days of comprehensive post-launch warranty, covering bug fixes, speed optimizations, and DNS support. We also provide a recorded 1-on-1 walkthrough session showing your team how to manage your content effortlessly.'
  },
  {
    id: 'faq-8',
    category: 'licensing',
    question: 'Do I receive free future updates for templates I purchase?',
    answer: 'Yes. Whenever we release bug fixes, security updates, or new framework compatibility patches for a template, the updated version is automatically available in your ANTHIRA Customer Dashboard at no additional charge.'
  }
];

interface FaqSectionProps {
  onOpenCustomModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenCustomModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'licensing' | 'services' | 'payments'>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="faq" className="py-20 bg-[#090b0e] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff5722]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Template Licensing & Custom Services FAQ
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about purchasing website templates, commercial usage rights, and our bespoke design packages.
          </p>

          {/* Category Filter Chips */}
          <div className="flex items-center justify-center gap-1.5 pt-4">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'licensing', label: 'Template Licensing' },
              { id: 'services', label: 'Custom Design Services' },
              { id: 'payments', label: 'Payments & Milestones' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-[#ff5722] text-white shadow-md shadow-orange-500/20'
                    : 'bg-[#141820] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? 'bg-[#141820] border-orange-500/40 shadow-lg shadow-orange-950/20'
                    : 'bg-[#11141a] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-[#ff5722] text-white rotate-180'
                        : 'bg-white/5 text-zinc-400 group-hover:text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Assistance Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171b25] to-[#12151c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle className="w-4 h-4 text-orange-400" />
              <span>Still have questions or need a custom consultation?</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Our lead technical consultants are available to answer your specific requirements.
            </p>
          </div>

          <button
            onClick={onOpenCustomModal}
            className="px-5 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-orange-500/20 shrink-0"
          >
            <span>Request Custom Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
