import React, { useState } from 'react';
import { ArrowRight, Mail, MessageCircle, Send } from 'lucide-react';

interface MessagesPageProps {
  onStartRequest: () => void;
}

const whatsappNumber = '2349018021688';

export const MessagesPage: React.FC<MessagesPageProps> = ({ onStartRequest }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ANTHIRA, my name is ${name.trim() || 'there'}.\n\n${message.trim() || 'I would like to learn more about your website services.'}`
  )}`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
              Messages
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Let&apos;s talk about your project
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Tell us what you&apos;re planning. Send a message on WhatsApp and our team can help you choose the right next step.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 transition-colors hover:bg-emerald-500/10"
              >
                <span className="rounded-xl bg-emerald-500/15 p-3 text-emerald-400">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">WhatsApp</span>
                  <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                    Chat with ANTHIRA directly about your website.
                  </span>
                </span>
              </a>

              <button
                type="button"
                onClick={onStartRequest}
                className="flex w-full items-start gap-4 rounded-2xl border border-white/10 bg-[#12151c] p-5 text-left transition-colors hover:border-orange-500/30 hover:bg-[#171b24]"
              >
                <span className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">Project request</span>
                  <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                    Share your business type, budget, and project details.
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-400">
                    Open request form <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-[#12151c] p-5 sm:p-7 lg:col-span-3"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Send us a message</h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Your message opens in WhatsApp so you can review and send it.
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-name" className="text-xs font-medium text-zinc-300">
                  Your name
                </label>
                <input
                  id="message-name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-[#181c25] px-3.5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5722] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-body" className="text-xs font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message-body"
                  required
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us a little about what you need..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#181c25] px-3.5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5722] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff5722] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-[#f4511e] sm:w-auto"
              >
                <Send className="h-4 w-4" />
                Continue in WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
