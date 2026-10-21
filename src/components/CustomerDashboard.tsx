import React, { useState } from 'react';
import { Currency, Order, Template, AuthUser } from '../types';
import { formatPrice } from '../utils/format';
import { 
  ShoppingBag, 
  Download, 
  Settings, 
  HelpCircle, 
  LogOut, 
  CheckCircle, 
  ExternalLink, 
  ChevronRight, 
  ArrowLeft,
  FileCode,
  Shield,
  Send,
  User
} from 'lucide-react';

interface CustomerDashboardProps {
  currency: Currency;
  onBackToStore: () => void;
  purchasedTemplates: Template[];
  orders: Order[];
  currentUser?: AuthUser | null;
  onLogOut?: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currency,
  onBackToStore,
  purchasedTemplates,
  orders,
  currentUser,
  onLogOut
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'templates' | 'settings' | 'support'>('overview');
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  const handleDownloadTemplate = (templateTitle: string) => {
    setDownloadNotification(`Preparing ${templateTitle} clean source package (.zip)...`);
    setTimeout(() => {
      // Simulate file download trigger
      const element = document.createElement('a');
      const file = new Blob([`// ANTHIRA Clean Production Template: ${templateTitle}\n// Includes: React 19, Tailwind CSS, TypeScript, Components & Documentation\n\nconsole.log("Template ${templateTitle} Initialized.");`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${templateTitle.toLowerCase().replace(/\s+/g, '-')}-source.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadNotification(`Download started for ${templateTitle}!`);
      setTimeout(() => setDownloadNotification(null), 3500);
    }, 600);
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportMessage('');
      setSupportSent(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>
        <span className="text-xs uppercase tracking-widest text-[#ff5722] font-semibold">
          Customer Portal
        </span>
      </div>

      {/* User Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171b24] to-[#12151c] border border-white/10 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff5722] to-amber-500 p-0.5 shadow-lg shadow-orange-500/20 shrink-0">
              <div className="w-full h-full rounded-full bg-[#12151c] flex items-center justify-center text-xl font-bold text-white uppercase">
                {currentUser?.avatarInitials || 'AK'}
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#12151c]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Hello, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Anthony'}</span>
                <span>👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {currentUser?.role || 'Welcome back to your ANTHIRA dashboard'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              {currentUser?.email || 'anthonykevine121@gmail.com'}
            </span>

            {onLogOut && (
              <button
                onClick={onLogOut}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 border border-white/10 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 transition-colors"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Stats Counters matching mockup */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`p-3 rounded-xl border text-center transition-all ${
              activeTab === 'orders' ? 'bg-[#ff5722]/10 border-[#ff5722]' : 'bg-black/30 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
              {orders.length}
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-1">
              Active Orders
            </div>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`p-3 rounded-xl border text-center transition-all ${
              activeTab === 'templates' ? 'bg-[#ff5722]/10 border-[#ff5722]' : 'bg-black/30 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="text-2xl font-extrabold text-[#ff5722] font-mono tabular-nums">
              {purchasedTemplates.length}
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-1">
              Downloads
            </div>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`p-3 rounded-xl border text-center transition-all ${
              activeTab === 'support' ? 'bg-[#ff5722]/10 border-[#ff5722]' : 'bg-black/30 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
              0
            </div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-1">
              Support Tickets
            </div>
          </button>
        </div>
      </div>

      {downloadNotification && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadNotification}</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#171b24] rounded-xl border border-white/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'overview' ? 'bg-[#ff5722] text-white shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'orders' ? 'bg-[#ff5722] text-white shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          My Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'templates' ? 'bg-[#ff5722] text-white shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          My Templates ({purchasedTemplates.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'settings' ? 'bg-[#ff5722] text-white shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Profile Settings
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'support' ? 'bg-[#ff5722] text-white shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Support
        </button>
      </div>

      {/* Main Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Access Card: Downloadable Templates */}
            <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#ff5722]" />
                  <span>Ready for Download</span>
                </h3>
                <button
                  onClick={() => setActiveTab('templates')}
                  className="text-xs text-orange-400 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {purchasedTemplates.slice(0, 3).map((template) => (
                  <div
                    key={template.id}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={template.image}
                        alt={template.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-9 rounded object-cover border border-white/10"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{template.title}</div>
                        <div className="text-[10px] text-zinc-400">Version 2.4 · React & Tailwind</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadTemplate(template.title)}
                      className="p-2 bg-[#ff5722]/15 text-[#ff5722] hover:bg-[#ff5722] hover:text-white rounded-lg transition-colors"
                      title="Download Source Code"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access Card: Recent Transactions */}
            <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#ff5722]" />
                  <span>Recent Purchases</span>
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-orange-400 hover:underline"
                >
                  History
                </button>
              </div>

              <div className="space-y-2">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{ord.packageName}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">{ord.id} · {ord.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-orange-400">
                        {formatPrice(ord.amountNGN, ord.amountUSD, currency)}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white">Purchase History & Receipts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Item / Service</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-mono text-zinc-400">{ord.id}</td>
                    <td className="py-3 px-3 font-medium text-white">{ord.packageName}</td>
                    <td className="py-3 px-3 text-zinc-400">{ord.date}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-orange-400">
                      {formatPrice(ord.amountNGN, ord.amountUSD, currency)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        ord.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => alert(`Official VAT Invoice for ${ord.id} ready to print.`)}
                        className="text-zinc-400 hover:text-white underline text-[11px]"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Templates Downloads Tab */}
      {activeTab === 'templates' && (
        <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">My Downloadable Templates</h2>
              <p className="text-xs text-zinc-400">Full source code packages with lifetime access.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {purchasedTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={template.image}
                    alt={template.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 rounded object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{template.title}</h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{template.subtitle}</p>
                    <span className="text-[10px] text-emerald-400 font-mono mt-1 inline-block">
                      Commercial License Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleDownloadTemplate(template.title)}
                    className="flex-1 py-2 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Source (.zip)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 max-w-lg">
          <h2 className="text-sm font-bold text-white">Account & Billing Profile</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-400 mb-1">Display Name</label>
              <input
                type="text"
                defaultValue="Anthony Kevine"
                className="w-full px-3 py-2 bg-[#181c25] border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="anthonykevine121@gmail.com"
                className="w-full px-3 py-2 bg-[#181c25] border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Default Billing Currency</label>
              <div className="text-xs text-orange-400 font-semibold py-1">
                {currency === 'NGN' ? 'Nigerian Naira (₦ NGN)' : 'US Dollar ($ USD)'}
              </div>
            </div>
            <button
              onClick={() => alert('Settings saved successfully!')}
              className="mt-2 px-5 py-2 bg-[#ff5722] hover:bg-[#f4511e] text-white rounded-lg font-semibold text-xs transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 max-w-lg">
          <h2 className="text-sm font-bold text-white">VIP Priority Developer Support</h2>
          <p className="text-xs text-zinc-400">
            Need help customizing a template or have a question about deployment? We respond within 1 hour.
          </p>

          {supportSent ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Support ticket submitted! Ticket #SUP-492 dispatched to engineering team.</span>
            </div>
          ) : (
            <form onSubmit={handleSendSupport} className="space-y-3">
              <textarea
                rows={4}
                required
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Describe what you need assistance with..."
                className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
