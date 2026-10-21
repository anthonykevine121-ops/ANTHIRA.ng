import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface NewsletterSubscriptionProps {
  onSuccess?: (email: string) => void;
  className?: string;
  variant?: 'footer' | 'card';
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  onSuccess,
  className = '',
  variant = 'footer'
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API subscription delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);

      // Save to localStorage for persistence
      try {
        const existing = JSON.parse(localStorage.getItem('anthira_newsletter_subscribers') || localStorage.getItem('vexora_newsletter_subscribers') || '[]');
        if (!existing.includes(email.toLowerCase().trim())) {
          existing.push(email.toLowerCase().trim());
          localStorage.setItem('anthira_newsletter_subscribers', JSON.stringify(existing));
        }
      } catch {
        // ignore storage errors
      }

      if (onSuccess) {
        onSuccess(email);
      }

      // Reset form after a period
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 5000);
    }, 600);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-[#ff5722]" />
          <span>Newsletter Subscription</span>
        </h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Stay ahead with new template launches, exclusive developer discounts, and design updates.
        </p>
      </div>

      {isSubscribed ? (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2.5 animate-fade-in shadow-lg shadow-emerald-950/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="font-semibold block text-emerald-200">Subscription Confirmed!</span>
            <span className="text-[11px] text-emerald-300/80">Check your inbox for your 10% welcome coupon.</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter your email address"
              className="w-full pl-9 pr-12 py-2.5 text-xs bg-[#141820] border border-white/10 hover:border-white/20 focus:border-[#ff5722] rounded-xl text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-1.5 p-2 bg-[#ff5722] hover:bg-[#f4511e] disabled:opacity-60 text-white rounded-lg transition-all shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95"
              title="Subscribe to Newsletter"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="text-[11px] text-rose-400 font-medium">
              {errorMessage}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <ShieldCheck className="w-3 h-3 text-zinc-400" />
            <span>Zero spam. Unsubscribe anytime with one click.</span>
          </div>
        </form>
      )}
    </div>
  );
};
