import React, { useState } from 'react';
import { PhoneNumberInput } from './PhoneNumberInput';
import { CartItem, Currency, Template, Order, EmailNotification, AuthUser } from '../types';
import { formatPrice } from '../utils/format';
import { 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  ArrowLeft, 
  Mail, 
  Copy, 
  ShieldCheck, 
  FileCode, 
  ExternalLink, 
  RefreshCw, 
  Send, 
  Key, 
  User, 
  Sparkles 
} from 'lucide-react';

interface PaymentPageProps {
  cart: CartItem[];
  currency: Currency;
  discountPercent: number;
  currentUser?: AuthUser | null;
  onBackToCart: () => void;
  onPaymentSuccess: (purchased: Template[], order: Order, emailNotification: EmailNotification) => void;
  onGoToDashboard: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  cart,
  currency,
  discountPercent,
  currentUser,
  onBackToCart,
  onPaymentSuccess,
  onGoToDashboard
}) => {
  // Customer details form state (prefilled from currentUser if available)
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Anthony Kevine');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'anthonykevine121@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+234 803 241 8920');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');

  // Payment Status State: 'unpaid' | 'processing' | 'received' | 'pending'
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'processing' | 'received' | 'pending'>('unpaid');

  // Simulated email notification
  const [sentEmail, setSentEmail] = useState<EmailNotification | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [gatewayChecking, setGatewayChecking] = useState(false);
  const [gatewayMessage, setGatewayMessage] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Price calculations
  const subtotalNGN = cart.reduce((sum, item) => sum + item.template.priceNGN * item.quantity, 0);
  const subtotalUSD = cart.reduce((sum, item) => sum + item.template.priceUSD * item.quantity, 0);

  const discountNGN = Math.round((subtotalNGN * discountPercent) / 100);
  const discountUSD = Math.round((subtotalUSD * discountPercent) / 100);

  const totalNGN = Math.max(0, subtotalNGN - discountNGN);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const transferReference = `VEX-${Math.floor(100000 + Math.random() * 900000)}`;

  // Handle Payment Simulation
  const handleExecutePayment = (intentStatus: 'received' | 'pending') => {
    if (!customerEmail.trim() || !customerName.trim()) {
      setFormError('Please provide your Full Name and Email Address so we can send your automated payment receipt.');
      return;
    }
    setFormError(null);
    setPaymentStatus('processing');

    setTimeout(() => {
      const isReceived = intentStatus === 'received';
      const orderId = `ORD-${Math.floor(8950 + Math.random() * 500)}`;
      const totalAmountFormatted = formatPrice(totalNGN, totalUSD, currency);

      // Create detailed automated email notification dispatch record
      const emailRecord: EmailNotification = {
        id: `EMAIL-${Date.now()}`,
        recipientEmail: customerEmail,
        recipientName: customerName,
        subject: isReceived
          ? `[ANTHIRA] Payment Accepted: Your Website Template Downloads Are Ready (Order #${orderId})`
          : `[ANTHIRA] Payment Pending: Awaiting Bank Confirmation for Order #${orderId}`,
        sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentStatus: isReceived ? 'Received' : 'Pending',
        transactionId: transferReference,
        items: cart.map((i) => ({
          title: i.template.title,
          price: formatPrice(i.template.priceNGN * i.quantity, i.template.priceUSD * i.quantity, currency)
        })),
        totalAmount: totalAmountFormatted,
        body: isReceived
          ? `Hello ${customerName},\n\nWe have received and accepted your payment of ${totalAmountFormatted} in full for your ordered website templates.\n\nYour commercial licenses have been registered and your production source code packages (.zip) are now unlocked and ready for immediate download.\n\nYou can access your downloads directly on this page or inside your Anthony's Customer Portal anytime.\n\nThank you for choosing ANTHIRA!`
          : `Hello ${customerName},\n\nWe have registered your order for ${totalAmountFormatted}. Current status: PAYMENT PENDING.\n\nWe have not yet received credit confirmation from your bank or payment gateway. As soon as the transfer or transaction is verified, your download templates will be unlocked automatically and an updated receipt will be issued.\n\nTransfer Ref: ${transferReference}\nBank: Wema Bank / GTBank (0284918291)`
      };

      setSentEmail(emailRecord);
      setPaymentStatus(isReceived ? 'received' : 'pending');

      if (isReceived) {
        const primaryOrder: Order = {
          id: orderId,
          customerName,
          customerEmail,
          packageName: cart.map((c) => c.template.title).join(', '),
          amountNGN: totalNGN,
          amountUSD: totalUSD,
          status: 'Paid',
          date: new Date().toISOString().split('T')[0],
          type: 'Template'
        };

        const purchasedTemplates = cart.map((i) => i.template);
        onPaymentSuccess(purchasedTemplates, primaryOrder, emailRecord);
      }
    }, 1000);
  };

  // Check gateway action without alerts
  const handleCheckGatewayAgain = () => {
    setGatewayChecking(true);
    setGatewayMessage(null);
    setTimeout(() => {
      setGatewayChecking(false);
      setGatewayMessage('Status updated: Payment is still Pending bank credit settlement. If you have completed the transfer, click "Confirm Payment Received" to unlock downloads.');
    }, 1200);
  };

  // Download simulation
  const handleDownloadSource = (templateTitle: string) => {
    setDownloadNotice(`Generating production package for ${templateTitle}...`);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `// ANTHIRA Clean Production Template: ${templateTitle}\n// Licensed to: ${customerName} (${customerEmail})\n// Commercial License: AN-COMMERCIAL-2026\n// Framework: React 19 + TypeScript + Tailwind CSS\n// Included: Components, Assets, Configs, Documentation\n\nconsole.log("Template ${templateTitle} Initialized.");`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${templateTitle.toLowerCase().replace(/\s+/g, '-')}-source.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadNotice(`Download started for ${templateTitle}!`);
      setTimeout(() => setDownloadNotice(null), 3000);
    }, 500);
  };

  const copyBankDetails = () => {
    navigator.clipboard?.writeText(`Account: 0284918291\nBank: Wema Bank / GTBank\nName: ANTHIRA DIGITAL LTD\nRef: ${transferReference}`);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <button
            onClick={onBackToCart}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Checkout & Payment Verification
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1 rounded-lg bg-white/5 text-zinc-400">1. Cart</span>
          <span className="text-zinc-600">→</span>
          <span className="px-3 py-1 rounded-lg bg-[#ff5722] text-white">2. Payment</span>
          <span className="text-zinc-600">→</span>
          <span className={`px-3 py-1 rounded-lg ${paymentStatus === 'received' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-zinc-400'}`}>
            3. Download Templates
          </span>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2.5 animate-slide-left shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {cart.length === 0 && paymentStatus === 'unpaid' ? (
        <div className="py-16 text-center rounded-3xl bg-[#12151c] border border-white/10 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
            <CreditCard className="w-8 h-8 text-orange-400" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">No Templates Pending Payment</h2>
            <p className="text-xs text-zinc-400">
              Your shopping cart is currently empty. Please select a website template to proceed to payment and unlock commercial downloads.
            </p>
          </div>
          <button
            onClick={onBackToCart}
            className="mt-4 px-6 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
          >
            View Cart
          </button>
        </div>
      ) : (
      /* Main Grid: Form on Left, Order Summary / Status on Right */
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          {paymentStatus === 'unpaid' || paymentStatus === 'processing' ? (
            <>
              {/* Customer Details Form */}
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-400" />
                    <span>1. Customer & Notification Information</span>
                  </h2>
                  <span className="text-[11px] text-zinc-400">Where we email your payment receipt</span>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Anthony Kevine"
                      className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Email Address (Automatic Receipt Recipient) *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. anthonykevine121@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">WhatsApp / Phone Number</label>
                    <PhoneNumberInput value={customerPhone} onChange={setCustomerPhone} className="w-full" />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-orange-400" />
                    <span>2. Select Payment Method</span>
                  </h2>
                  <span className="text-[11px] text-zinc-400">100% Encrypted & Secure</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-orange-500/10 border-[#ff5722] text-white shadow-md'
                        : 'bg-black/30 border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white">Online Card / Paystack</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Mastercard, Visa, Verve (Instant verification)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      paymentMethod === 'transfer'
                        ? 'bg-orange-500/10 border-[#ff5722] text-white shadow-md'
                        : 'bg-black/30 border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white">Direct Bank Transfer</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Nigerian & International Accounts</div>
                    </div>
                  </button>
                </div>

                {/* Bank Transfer Details Drawer */}
                {paymentMethod === 'transfer' && (
                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5 text-xs text-zinc-300">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Receiving Bank:</span>
                      <strong className="text-white">Wema Bank / GTBank</strong>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Account Name:</span>
                      <strong className="text-white">ANTHIRA DIGITAL SOLUTIONS LTD</strong>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Account Number:</span>
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-orange-400 text-sm">0284918291</strong>
                        <button
                          onClick={copyBankDetails}
                          className="p-1 hover:text-white transition-colors text-zinc-400"
                          title="Copy details"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Transfer Reference:</span>
                      <span className="font-mono text-zinc-200">{transferReference}</span>
                    </div>
                    {copiedBank && (
                      <p className="text-[11px] text-emerald-400 text-right">✓ Bank details copied!</p>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Actions / Intent Triggers */}
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 shadow-xl">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  3. Verify & Execute Payment
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your action below to trigger the automatic email delivery and instant verification test:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Test Payment Received Button (YES) */}
                  <button
                    onClick={() => handleExecutePayment('received')}
                    disabled={paymentStatus === 'processing'}
                    className="py-3 px-4 bg-[#ff5722] hover:bg-[#f4511e] disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25"
                  >
                    {paymentStatus === 'processing' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Payment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payment Received (Yes - Unlock)</span>
                      </>
                    )}
                  </button>

                  {/* Test Payment Pending Button (NO) */}
                  <button
                    onClick={() => handleExecutePayment('pending')}
                    disabled={paymentStatus === 'processing'}
                    className="py-3 px-4 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Payment Pending (No - Waiting)</span>
                  </button>
                </div>
              </div>
            </>
          ) : null}

          {/* =========================================================================
              IF YES: PAYMENT RECEIVED -> SHOW DOWNLOAD TEMPLATES
             ========================================================================= */}
          {paymentStatus === 'received' && (
            <div className="space-y-6">
              {/* Payment Success Hero Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#12151c] to-[#12151c] border-2 border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                      Payment Received & Confirmed
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      Payment Accepted! Download Your Templates
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  We have verified your payment of <strong className="text-white font-mono">{formatPrice(totalNGN, totalUSD, currency)}</strong>. An automated confirmation email with your commercial license keys has been dispatched to <strong className="text-orange-400">{customerEmail}</strong>.
                </p>
              </div>

              {/* UNLOCKED TEMPLATES DOWNLOAD SECTION */}
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#ff5722]" />
                    <span>Download Ready Source Packages (.zip)</span>
                  </h3>
                  <span className="text-xs text-emerald-400 font-mono font-semibold">
                    {cart.length} {cart.length === 1 ? 'Template' : 'Templates'} Unlocked
                  </span>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.template.id}
                      className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.template.image}
                          alt={item.template.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">
                            {item.template.title}
                          </h4>
                          <span className="text-[10px] text-zinc-400 block">
                            React 19 · Tailwind CSS · TypeScript · Full Source
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                            <Key className="w-3 h-3" /> License: VX-2026-COMM-{Math.floor(1000 + Math.random() * 9000)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadSource(item.template.title)}
                        className="py-2 px-4 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-orange-500/20 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download ZIP Package</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Dashboard Shortcut */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-400">
                    Your templates are also permanently saved in your account library.
                  </span>
                  <button
                    onClick={onGoToDashboard}
                    className="text-orange-400 hover:text-orange-300 font-semibold underline flex items-center gap-1 shrink-0"
                  >
                    <span>Go to Customer Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              IF NO: PAYMENT PENDING -> SHOW PAYMENT PENDING ALERT & BANK DETAILS
             ========================================================================= */}
          {paymentStatus === 'pending' && (
            <div className="space-y-6">
              {/* Payment Pending Alert Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#12151c] to-[#12151c] border-2 border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                      Transaction Status
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      Payment Pending
                    </h2>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-amber-500/20 space-y-2 text-xs text-amber-200/90 leading-relaxed">
                  <p>
                    <strong>We have not yet received confirmation of your payment.</strong> If you initiated a Bank Transfer or USSD payment, bank verification typically takes 1 to 5 minutes to reflect in our receiving account.
                  </p>
                  <p className="text-zinc-400">
                    Your templates are securely reserved and will be unlocked for download immediately once bank settlement is confirmed.
                  </p>
                </div>

                {/* Bank Transfer Recap to complete payment */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs text-zinc-300">
                  <div className="font-semibold text-white">To complete this transaction, transfer to:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div><span className="text-zinc-500">Bank:</span> Wema Bank / GTBank</div>
                    <div><span className="text-zinc-500">Account:</span> 0284918291</div>
                    <div><span className="text-zinc-500">Name:</span> ANTHIRA DIGITAL LTD</div>
                    <div><span className="text-zinc-500">Reference:</span> {transferReference}</div>
                  </div>
                </div>

                {/* Status Re-check / Instant Confirm Toggle */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => handleExecutePayment('received')}
                    className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Payment Received (Unlock Now)</span>
                  </button>

                  <button
                    onClick={handleCheckGatewayAgain}
                    disabled={gatewayChecking}
                    className="w-full sm:w-auto py-3 px-4 bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${gatewayChecking ? 'animate-spin text-orange-400' : ''}`} />
                    <span>{gatewayChecking ? 'Checking...' : 'Check Again'}</span>
                  </button>
                </div>

                {gatewayMessage && (
                  <div className="p-3 bg-white/5 border border-amber-500/30 text-amber-300 text-xs rounded-xl flex items-start gap-2 animate-fade-in">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{gatewayMessage}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Automatic Email Inspector */}
        <div className="lg:col-span-5 space-y-5">
          {/* Order Summary Card */}
          <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white tracking-wide border-b border-white/10 pb-3">
              Order Breakdown
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.template.id} className="flex justify-between items-center text-xs">
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-white truncate">{item.template.title}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">Qty: {item.quantity} · Commercial License</div>
                  </div>
                  <span className="font-mono text-orange-400 font-bold shrink-0">
                    {formatPrice(item.template.priceNGN * item.quantity, item.template.priceUSD * item.quantity, currency)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">
                  {formatPrice(subtotalNGN, subtotalUSD, currency)}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono">
                    -{formatPrice(discountNGN, discountUSD, currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                <span>Total Amount</span>
                <span className="font-mono text-[#ff5722] text-lg">
                  {formatPrice(totalNGN, totalUSD, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* AUTOMATIC EMAIL RECEIPT SIMULATOR INSPECTOR */}
          {sentEmail && (
            <div className="p-5 rounded-2xl bg-[#141822] border border-orange-500/30 space-y-3.5 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/20 text-[#ff5722]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    Automated Transaction Email Dispatched
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">{sentEmail.sentAt}</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="text-zinc-400">
                  <span className="text-zinc-500">To:</span> <strong className="text-white">{sentEmail.recipientEmail}</strong> ({sentEmail.recipientName})
                </div>
                <div className="text-zinc-400">
                  <span className="text-zinc-500">Subject:</span> <span className="text-zinc-200 font-semibold">{sentEmail.subject}</span>
                </div>
                <div className="text-zinc-400">
                  <span className="text-zinc-500">Status:</span>{' '}
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    sentEmail.paymentStatus === 'Received' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {sentEmail.paymentStatus === 'Received' ? '✓ Payment Received' : '⏳ Payment Pending'}
                  </span>
                </div>
              </div>

              {/* Email Content Snippet */}
              <div className="p-3 bg-black/50 rounded-xl border border-white/5 text-[11px] text-zinc-300 leading-relaxed font-sans space-y-2">
                <p>{sentEmail.body}</p>
                <div className="pt-2 border-t border-white/5 space-y-1 text-[10px] font-mono text-zinc-400">
                  <div>Reference: {sentEmail.transactionId}</div>
                  <div>Total Billed: {sentEmail.totalAmount}</div>
                  <div>Issued by: ANTHIRA Technology Ltd.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
