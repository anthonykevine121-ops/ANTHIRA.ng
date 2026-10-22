import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Sparkles, Send, MessageCircle } from 'lucide-react';
import { QuoteNotificationResult, QuoteRequest } from '../types';
import { PhoneNumberInput } from './PhoneNumberInput';

interface CustomWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedType?: string;
  onSubmitSuccess: (quote: QuoteRequest) => Promise<QuoteNotificationResult>;
}

export const CustomWebsiteModal: React.FC<CustomWebsiteModalProps> = ({
  isOpen,
  onClose,
  preselectedType,
  onSubmitSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteType, setWebsiteType] = useState(preselectedType || 'Business Website');
  const [projectDetails, setProjectDetails] = useState('');
  const [budget, setBudget] = useState('₦100,000 - ₦250,000 ($160 - $400)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notificationResult, setNotificationResult] = useState<QuoteNotificationResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [fallbackWhatsAppUrl, setFallbackWhatsAppUrl] = useState<string | null>(null);

  const createWhatsAppUrl = (quote: QuoteRequest) => {
    const message = [
      'New custom website request',
      `Name: ${quote.fullName}`,
      `Email: ${quote.email}`,
      `Phone: ${quote.phone || 'Not provided'}`,
      `Service: ${quote.websiteType}`,
      `Budget: ${quote.budgetRange || 'Not provided'}`,
      `Project details: ${quote.projectDetails}`
    ].join('\n');
    return `https://wa.me/2349018021688?text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    setFallbackWhatsAppUrl(null);
    const whatsappWindow = window.open('about:blank', '_blank');
    try {
      const newQuote: QuoteRequest = {
        id: `REQ-${Date.now().toString().slice(-4)}`,
        fullName,
        email,
        phone,
        websiteType,
        projectDetails,
        budgetRange: budget,
        createdAt: new Date().toISOString()
      };

      const result = await onSubmitSuccess(newQuote);
      setNotificationResult(result);
      if (result.email.sent && result.whatsapp.sent) {
        whatsappWindow?.close();
        setIsSubmitted(true);
      } else {
        const whatsappUrl = createWhatsAppUrl(newQuote);
        setFallbackWhatsAppUrl(whatsappUrl);
        if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
        setSubmissionError('WhatsApp notification was unavailable. Your message is ready; tap the button below and send it in WhatsApp.');
      }
    } catch (error) {
      const newQuote: QuoteRequest = {
        id: `REQ-${Date.now().toString().slice(-4)}`,
        fullName,
        email,
        phone,
        websiteType,
        projectDetails,
        budgetRange: budget,
        createdAt: new Date().toISOString()
      };
      const whatsappUrl = createWhatsAppUrl(newQuote);
      setFallbackWhatsAppUrl(whatsappUrl);
      if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
      setSubmissionError(error instanceof Error
        ? `${error.message} Your WhatsApp message is ready below; tap the button and send it.`
        : 'Unable to reach the notification service. Your WhatsApp message is ready below; tap the button and send it.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNotificationResult(null);
    setSubmissionError(null);
    setFallbackWhatsAppUrl(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setProjectDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#12151c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171b24]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]" />
            <span className="text-sm font-bold text-white tracking-wide">
              ANTHIRA CUSTOM SERVICE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Request Received!</h2>
              <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{fullName}</span>. Your request notifications were sent to the ANTHIRA team by email and WhatsApp.
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-400 text-left max-w-xs mx-auto space-y-1">
                <div><span className="text-zinc-500">Service:</span> {websiteType}</div>
                <div><span className="text-zinc-500">Phone:</span> {phone || 'Not provided'}</div>
                <div><span className="text-zinc-500">Reference:</span> #{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
              >
                Back to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submissionError && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200 space-y-2">
                  <p>{submissionError}</p>
                  {notificationResult && (
                    <ul className="space-y-1">
                      {(['email', 'whatsapp'] as const).map((channel) => (
                        <li key={channel}>
                          {channel === 'email' ? 'Email' : 'WhatsApp'}: {notificationResult[channel].sent ? 'Sent' : `Not sent${notificationResult[channel].error ? ` — ${notificationResult[channel].error}` : ''}`}
                        </li>
                      ))}
                    </ul>
                  )}
                  {fallbackWhatsAppUrl && (
                    <a
                      href={fallbackWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send request in WhatsApp</span>
                    </a>
                  )}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Get a Custom Website
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Tell us about your project and we'll get back to you with a tailored quote and launch roadmap.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                  Full Name <span className="text-[#ff5722]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                  Email Address <span className="text-[#ff5722]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Phone Number
                </label>
                <PhoneNumberInput value={phone} onChange={setPhone} />
              </div>

              {/* Website Type / Package */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                  Selected Package / Service <span className="text-[#ff5722]">*</span>
                </label>
                <select
                  value={websiteType}
                  onChange={(e) => setWebsiteType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5722] transition-colors"
                >
                  <optgroup label="Nigeria Packages">
                    <option value="Basic (₦50,000–₦100,000)">Basic (₦50,000–₦100,000) - Individuals & Small Businesses</option>
                    <option value="Standard (₦100,000–₦200,000)">Standard (₦100,000–₦200,000) - Small Businesses</option>
                    <option value="Professional (₦200,000–₦400,000)">Professional (₦200,000–₦400,000) - Growing Businesses</option>
                    <option value="Premium (₦400,000–₦800,000+)">Premium (₦400,000–₦800,000+) - Established Brands</option>
                    <option value="E-commerce (₦300,000–₦1,000,000+)">E-commerce (₦300,000–₦1,000,000+) - Online Stores</option>
                    <option value="Custom Web Application (₦800,000–₦3,000,000+)">Custom Web Application (₦800,000–₦3,000,000+) - Advanced Functionality</option>
                  </optgroup>
                  <optgroup label="Bespoke Design Services">
                    <option value="Business Website">Business Website</option>
                    <option value="Restaurant Website">Restaurant Website</option>
                    <option value="Fashion Website">Fashion Website</option>
                    <option value="Portfolio Website">Portfolio Website</option>
                  </optgroup>
                </select>
              </div>

              {/* Budget Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5722] transition-colors"
                >
                  <option value="₦50,000–₦100,000">₦50,000–₦100,000 (Basic)</option>
                  <option value="₦100,000–₦200,000">₦100,000–₦200,000 (Standard)</option>
                  <option value="₦200,000–₦400,000">₦200,000–₦400,000 (Professional)</option>
                  <option value="₦400,000–₦800,000+">₦400,000–₦800,000+ (Premium)</option>
                  <option value="₦300,000–₦1,000,000+">₦300,000–₦1,000,000+ (E-commerce)</option>
                  <option value="₦800,000–₦3,000,000+">₦800,000–₦3,000,000+ (Custom Web Application)</option>
                </select>
              </div>

              {/* Project Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                  Project Details <span className="text-[#ff5722]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Tell us about your project (website features, design style, target launch deadline, etc.)"
                  className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 text-xs sm:text-sm font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Your Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
