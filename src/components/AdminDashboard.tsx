import React, { useEffect, useState } from 'react';
import { Currency, Order, QuoteRequest, Template } from '../types';
import { formatPrice, USD_TO_NGN_RATE } from '../utils/format';
import { AnthiraLogo } from './AnthiraLogo';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  Search,
  CheckCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { SALES_CHART_DATA } from '../data/mockData';
import { getSupabaseClient } from '../lib/supabase';

interface CustomerProfile {
  id: string;
  email: string;
  full_name: string | null;
  email_verified_at: string | null;
  created_at: string;
}

interface AdminDashboardProps {
  currency: Currency;
  onExitAdmin: () => void;
  orders: Order[];
  quotes: QuoteRequest[];
  templates: Template[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currency,
  onExitAdmin,
  orders,
  quotes,
  templates
}) => {
  const [adminTab, setAdminTab] = useState<'dashboard' | 'templates' | 'orders' | 'customers' | 'messages' | 'settings'>('dashboard');
  const [selectedChartPoint, setSelectedChartPoint] = useState<number | null>(3); // Apr as in mockup
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customersError, setCustomersError] = useState<string | null>(null);
  const [customerRefresh, setCustomerRefresh] = useState(0);

  const totalSalesNGN = orders.reduce((sum, ord) => sum + (ord.status === 'Paid' ? ord.amountNGN : 0), 1280000);
  const totalSalesUSD = Math.round(totalSalesNGN / USD_TO_NGN_RATE);

  useEffect(() => {
    if (adminTab !== 'customers') return;

    let active = true;
    setCustomersLoading(true);
    setCustomersError(null);
    void (async () => {
      try {
        const { data, error } = await getSupabaseClient()
          .from('profiles')
          .select('id,email,full_name,email_verified_at,created_at')
          .not('email_verified_at', 'is', null)
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (active) setCustomers(data || []);
      } catch (error) {
        if (active) {
          setCustomersError(error instanceof Error ? error.message : 'Could not load verified customers.');
        }
      } finally {
        if (active) setCustomersLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [adminTab, customerRefresh]);

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex flex-col md:flex-row">
      {/* Sidebar matching the mockup */}
      <aside className="w-full md:w-64 bg-[#12151c] border-r border-white/10 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <AnthiraLogo size="md" />
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setAdminTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'dashboard'
                  ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setAdminTab('templates')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'templates'
                  ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => setAdminTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'orders'
                  ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders</span>
              {orders.length > 0 && (
                <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-zinc-300">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCustomerRefresh((value) => value + 1)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'customers'
                  ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setAdminTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'messages'
                  ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Quotes & Inquiries</span>
              {quotes.length > 0 && (
                <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] bg-orange-500 text-white font-bold">
                  {quotes.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'settings'
                  ? 'bg-[#ff5722] text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Exit Admin / Logout Button */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {adminTab === 'dashboard' ? 'Dashboard' : adminTab.charAt(0).toUpperCase() + adminTab.slice(1)}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live e-commerce metrics and real-time operations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-zinc-400">
              Admin: <strong className="text-white">Admin Operations</strong>
            </span>
            <div className="w-8 h-8 rounded-full bg-[#ff5722] flex items-center justify-center font-bold text-xs text-white">
              V
            </div>
          </div>
        </div>

        {adminTab === 'dashboard' && (
          <>
            {/* 3 Metric Cards matching mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Sales */}
              <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Total Sales</span>
                  <span className="flex items-center text-emerald-400 font-semibold text-[11px] gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {formatPrice(totalSalesNGN, totalSalesUSD, currency)}
                </div>
                <div className="text-[10px] text-zinc-500">Across digital templates & custom builds</div>
              </div>

              {/* Total Orders */}
              <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Total Orders</span>
                  <span className="flex items-center text-emerald-400 font-semibold text-[11px] gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +8%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  48
                </div>
                <div className="text-[10px] text-zinc-500">36 template downloads · 12 custom contracts</div>
              </div>

              {/* Total Templates */}
              <div className="p-5 rounded-2xl bg-[#12151c] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Total Templates</span>
                  <span className="flex items-center text-emerald-400 font-semibold text-[11px] gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +3%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  12
                </div>
                <div className="text-[10px] text-zinc-500">All responsive & commercial licensed</div>
              </div>
            </div>

            {/* Sales Overview Chart matching mockup */}
            <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    Sales Overview
                  </h2>
                  <p className="text-xs text-zinc-400">Monthly gross volume and revenue performance</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                  <span>2026 Performance</span>
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="relative pt-6 pb-2">
                <svg viewBox="0 0 700 220" className="w-full h-48 overflow-visible">
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff5722" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#ff5722" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="40" y1="30" x2="680" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="40" y1="80" x2="680" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="40" y1="130" x2="680" y2="130" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="40" y1="180" x2="680" y2="180" stroke="rgba(255,255,255,0.06)" />

                  {/* Area fill */}
                  <path
                    d="M 50 160 Q 150 140, 250 145 T 350 70 T 450 95 T 550 45 T 650 35 L 650 180 L 50 180 Z"
                    fill="url(#salesGradient)"
                  />

                  {/* Orange Glowing Curve */}
                  <path
                    d="M 50 160 Q 150 140, 250 145 T 350 70 T 450 95 T 550 45 T 650 35"
                    fill="none"
                    stroke="#ff5722"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Data Points */}
                  {[
                    { cx: 50, cy: 160, label: 'Jan', val: 420000, idx: 0 },
                    { cx: 150, cy: 140, label: 'Feb', val: 610000, idx: 1 },
                    { cx: 250, cy: 145, label: 'Mar', val: 580000, idx: 2 },
                    { cx: 350, cy: 70, label: 'Apr', val: 1100000, idx: 3 },
                    { cx: 450, cy: 95, label: 'May', val: 940000, idx: 4 },
                    { cx: 550, cy: 45, label: 'Jun', val: 1280000, idx: 5 },
                    { cx: 650, cy: 35, label: 'Jul', val: 1450000, idx: 6 },
                  ].map((pt) => {
                    const isSelected = selectedChartPoint === pt.idx;
                    return (
                      <g key={pt.idx} className="cursor-pointer" onClick={() => setSelectedChartPoint(pt.idx)}>
                        <circle
                          cx={pt.cx}
                          cy={pt.cy}
                          r={isSelected ? 6 : 4}
                          fill={isSelected ? '#ff5722' : '#ffffff'}
                          stroke="#ff5722"
                          strokeWidth={isSelected ? 3 : 2}
                          className="transition-all hover:scale-125"
                        />
                        <text
                          x={pt.cx}
                          y="200"
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.5)"
                          fontSize="11"
                          fontFamily="sans-serif"
                        >
                          {pt.label}
                        </text>
                        {isSelected && (
                          <g transform={`translate(${pt.cx - 50}, ${pt.cy - 45})`}>
                            <rect
                              width="100"
                              height="32"
                              rx="6"
                              fill="#1b2029"
                              stroke="#ff5722"
                              strokeWidth="1.5"
                            />
                            <text
                              x="50"
                              y="20"
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="11"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              {formatPrice(pt.val, Math.round(pt.val / USD_TO_NGN_RATE), currency)}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Recent Orders Table matching mockup */}
            <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    Recent Orders
                  </h2>
                  <p className="text-xs text-zinc-400">Latest customer transactions and project contracts</p>
                </div>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-orange-400 hover:underline"
                >
                  View All Orders
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Package/Template</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{ord.customerName}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{ord.customerEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-zinc-200">
                          {ord.packageName}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-orange-400 tabular-nums">
                          {formatPrice(ord.amountNGN, ord.amountUSD, currency)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                              ord.status === 'Paid'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Templates Management Tab */}
        {adminTab === 'templates' && (
          <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">Active Template Catalog ({templates.length})</h2>
              <button
                onClick={() => alert('New template upload workflow is available in next build!')}
                className="px-3.5 py-1.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div key={tpl.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex gap-4">
                  <img src={tpl.image} alt={tpl.title} referrerPolicy="no-referrer" className="w-20 h-16 rounded object-cover border border-white/10 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{tpl.title}</span>
                      <span className="text-xs font-mono font-bold text-orange-400">
                        {formatPrice(tpl.priceNGN, tpl.priceUSD, currency)}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{tpl.category} · {tpl.downloadsCount} total downloads</p>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1">
                      <CheckCircle className="w-3 h-3" /> Live on Store
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'customers' && (
          <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">Verified Accounts ({customers.length})</h2>
                <p className="text-xs text-zinc-400 mt-1">Only accounts with a confirmed email address appear here.</p>
              </div>
              <button
                onClick={() => setAdminTab('customers')}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white"
              >
                Refresh
              </button>
            </div>

            {customersLoading ? (
              <p className="py-8 text-center text-xs text-zinc-400">Loading verified accounts...</p>
            ) : customersError ? (
              <p role="alert" className="py-4 text-sm text-rose-300">{customersError}</p>
            ) : customers.length === 0 ? (
              <p className="py-8 text-center text-xs text-zinc-500">No verified accounts yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Verified</th>
                      <th className="py-3 px-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="py-3.5 px-4 font-semibold text-white">{customer.full_name || 'Customer'}</td>
                        <td className="py-3.5 px-4">{customer.email}</td>
                        <td className="py-3.5 px-4 text-emerald-400">
                          {customer.email_verified_at ? new Date(customer.email_verified_at).toLocaleDateString() : '—'}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400">{new Date(customer.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Quotes & Custom Project Inquiries */}
        {adminTab === 'messages' && (
          <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white">Inbound Custom Website Proposals ({quotes.length})</h2>
            {quotes.length === 0 ? (
              <div className="text-xs text-zinc-500 py-8 text-center">No new project proposals yet.</div>
            ) : (
              <div className="space-y-3">
                {quotes.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{q.fullName}</span>
                      <span className="text-[10px] text-orange-400 font-mono">{q.websiteType}</span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      Email: <span className="text-zinc-200">{q.email}</span> · Phone: <span className="text-zinc-200">{q.phone || 'N/A'}</span>
                    </div>
                    <div className="text-xs text-zinc-300 bg-white/5 p-3 rounded-lg">
                      "{q.projectDetails}"
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Budget: {q.budgetRange} · Received: {new Date(q.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
