import React, { useState, useEffect } from 'react';
import { Currency, Template, ServiceItem, CartItem, Order, QuoteNotificationResult, QuoteRequest, PricingPackage, CountryInfo, AuthUser } from './types';
import { TEMPLATES, SERVICES, INITIAL_ORDERS } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { CtaBanner } from './components/CtaBanner';
import { TemplatesSection } from './components/TemplatesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { TemplateDetailModal } from './components/TemplateDetailModal';
import { LiveDemoModal } from './components/LiveDemoModal';
import { CustomWebsiteModal } from './components/CustomWebsiteModal';
import { CartDrawer } from './components/CartDrawer';
import { CartPage } from './components/CartPage';
import { PaymentPage } from './components/PaymentPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthPage } from './components/AuthPage';
import { Footer } from './components/Footer';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { MobileFloatingCart } from './components/MobileFloatingCart';
import { AnthiraLogo } from './components/AnthiraLogo';
import { CheckCircle, ArrowRight, X } from 'lucide-react';
import { getSupabaseClient, supabase, toAuthUser } from './lib/supabase';

export default function App() {
  // Currency State (default Nigerian Naira ₦ as in the screenshot)
  const [currency, setCurrency] = useState<Currency>('NGN');

  // Theme State: 'dark' | 'light' with localStorage persistence & HTML class syncing
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('anthira_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('anthira_theme', theme);
    } catch {}
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  // Main Page View Mode
  const [currentView, setCurrentView] = useState<'storefront' | 'templates' | 'packages' | 'customer' | 'admin' | 'cart' | 'payment' | 'auth'>('storefront');
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (currentView === 'templates' || currentView === 'packages') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentView]);

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Discount Percent State for cart & checkout
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Mobile Bottom Navigation Active Tab
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');

  // Interactive Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { template: TEMPLATES[0], quantity: 1 } // Start with Restaurant Website in cart for immediate interactivity
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active Modals State
  const [detailTemplate, setDetailTemplate] = useState<Template | null>(null);
  const [liveDemoTemplate, setLiveDemoTemplate] = useState<Template | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Business Website');

  // Customer & Admin Orders / Inquiries State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('anthira_orders') || localStorage.getItem('vexora_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [purchasedTemplates, setPurchasedTemplates] = useState<Template[]>(() => {
    return [TEMPLATES[0], TEMPLATES[2], TEMPLATES[3]]; // Initial templates Anthony owns
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    return [
      {
        id: 'REQ-101',
        fullName: 'Ayomide Adeyemi',
        email: 'ayomide.a@example.com',
        phone: '+234 803 241 8920',
        websiteType: 'E-commerce Website',
        projectDetails: 'We need an e-commerce platform for our luxury footwear brand with payment integration and inventory alerts.',
        budgetRange: '₦100,000 - ₦250,000 ($160 - $400)',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Global Toast Alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        showToast(`Unable to restore your session: ${error.message}`);
        return;
      }
      if (active) setCurrentUser(data.session ? toAuthUser(data.session.user) : null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session ? toAuthUser(session.user) : null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Discrete Backend Access for staff only (hidden from customers; accessible via URL hash '#admin' or Ctrl+Alt+A)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        if (currentUser?.isAdmin) {
          setCurrentView('admin');
        } else {
          setAuthInitialMode('login');
          setCurrentView('auth');
          showToast('Administrator access is required to view the backend.');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Developer shortcut: Ctrl + Alt + A
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        if (currentUser?.isAdmin) {
          setCurrentView((prev) => (prev === 'admin' ? 'storefront' : 'admin'));
        } else {
          showToast('Administrator access is required to view the backend.');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentUser]);

  // Cart Actions
  const handleAddToCart = (template: Template) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.template.id === template.id);
      if (existing) {
        return prev.map((item) =>
          item.template.id === template.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { template, quantity: 1 }];
    });
    showToast(`Added "${template.title}" to cart!`);
  };

  const handleBuyNow = (template: Template) => {
    handleAddToCart(template);
    setDetailTemplate(null);
    setLiveDemoTemplate(null);
    setCurrentView('cart');
  };

  const handleApplyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ANTHIRA10' || clean === 'VEXORA10') {
      setDiscountPercent(10);
      return { success: true, message: 'Promo code applied! 10% discount deducted.' };
    } else if (clean === 'SPECIAL20') {
      setDiscountPercent(20);
      return { success: true, message: 'Promo code applied! 20% discount deducted.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try "ANTHIRA10"' };
    }
  };

  const handleUpdateQuantity = (templateId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.template.id === templateId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (templateId: string) => {
    setCart((prev) => prev.filter((item) => item.template.id !== templateId));
  };

  const handleCheckoutSuccess = (purchased: Template[]) => {
    const newOrders: Order[] = purchased.map((tpl, i) => ({
      id: `ORD-${Math.floor(8945 + Math.random() * 500)}`,
      customerName: 'Anthony Kevine',
      customerEmail: 'anthonykevine121@gmail.com',
      packageName: tpl.title,
      amountNGN: tpl.priceNGN,
      amountUSD: tpl.priceUSD,
      status: 'Paid',
      date: new Date().toISOString().split('T')[0],
      type: 'Template'
    }));

    const updatedOrders = [...newOrders, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('anthira_orders', JSON.stringify(updatedOrders));

    // Update Anthony's library
    setPurchasedTemplates((prev) => {
      const map = new Map(prev.map((t) => [t.id, t]));
      purchased.forEach((t) => map.set(t.id, t));
      return Array.from(map.values());
    });

    setCart([]);
    showToast('Payment confirmed! Templates ready for download.');
  };

  const handleQuoteSubmitted = async (quote: QuoteRequest): Promise<QuoteNotificationResult> => {
    const { data, error } = await getSupabaseClient().functions.invoke<QuoteNotificationResult>('notify-quote', {
      body: quote
    });
    if (error) {
      throw new Error(`Unable to send request notifications: ${error.message}`);
    }
    if (!data) {
      throw new Error('The notification service returned no delivery status. Please try again.');
    }

    setQuotes((prev) => [quote, ...prev]);
    if (data.email.sent && data.whatsapp.sent) {
      showToast(`Project inquiry notifications sent for ${quote.fullName}.`);
    } else {
      showToast('Your inquiry was recorded, but one or more notifications failed.');
    }
    return data;
  };

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedServiceForQuote(service.title);
    setIsCustomModalOpen(true);
  };

  const handleSelectPackage = (pkg: PricingPackage, country?: CountryInfo) => {
    const priceText = country?.code === 'US' ? pkg.priceUSD : country?.code === 'GB' ? pkg.priceGBP : pkg.priceNGN;
    const countryLabel = country ? ` [${country.flag} ${country.name}]` : '';
    setSelectedServiceForQuote(`${pkg.name} Package (${priceText})${countryLabel}`);
    setIsCustomModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'storefront') {
      setCurrentView('storefront');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}! Successfully signed in.`);
    setCurrentView('customer');
  };

  const handleLogOut = () => {
    void (async () => {
      try {
        await getSupabaseClient().auth.signOut();
        setCurrentUser(null);
        showToast('You have been signed out of ANTHIRA.');
        setAuthInitialMode('login');
        setCurrentView('auth');
      } catch (signOutError) {
        showToast(signOutError instanceof Error ? signOutError.message : 'Unable to sign out.');
      }
    })();
  };

  const handleMobileTabSelect = (tab: MobileTab) => {
    setMobileTab(tab);
    if (tab === 'home') {
      setCurrentView('storefront');
      scrollToSection('hero');
    } else if (tab === 'templates') {
      setCurrentView('templates');
    } else if (tab === 'pricing') {
      setCurrentView('packages');
    } else if (tab === 'cart') {
      setCurrentView('cart');
    } else if (tab === 'account') {
      if (currentUser) {
        setCurrentView('customer');
      } else {
        setAuthInitialMode('login');
        setCurrentView('auth');
      }
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const effectiveMobileTab: MobileTab = 
    currentView === 'cart' ? 'cart' :
    (currentView === 'customer' || currentView === 'auth') ? 'account' :
    currentView === 'templates' ? 'templates' :
    currentView === 'packages' ? 'pricing' :
    mobileTab;

  // Render Admin View
  if (currentView === 'admin' && currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d0f14] text-white">
        <AdminDashboard
          currency={currency}
          onExitAdmin={() => setCurrentView('storefront')}
          orders={orders}
          quotes={quotes}
          templates={TEMPLATES}
        />
      </div>
    );

  }

  // Content for Storefront, Auth, or Customer View
  const mainContent = (
    <div className="min-h-screen bg-[#0b0d10] text-[#f1f3f7] flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif] pb-20 md:pb-0">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-3.5 bg-[#171b24]/95 backdrop-blur-md border border-orange-500/40 text-white rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs shadow-orange-950/40 animate-fade-in">
          <div className="flex items-center gap-2.5 min-w-0">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-zinc-400 hover:text-white rounded transition-colors shrink-0"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header (hidden on dedicated Auth page) */}
      {currentView !== 'auth' && (
        <Header
          cartCount={totalCartCount}
          onOpenCart={() => setCurrentView('cart')}
          onNavigateSection={scrollToSection}
          onOpenCustomModal={() => setIsCustomModalOpen(true)}
          onOpenCustomerPortal={() => {
            if (currentUser) {
              setCurrentView('customer');
            } else {
              setAuthInitialMode('login');
              setCurrentView('auth');
            }
          }}
          theme={theme}
          onToggleTheme={(t) => setTheme(t)}
          currentUser={currentUser}
          onOpenAuth={(mode) => {
            setAuthInitialMode(mode || 'login');
            setCurrentView('auth');
          }}
          onLogOut={handleLogOut}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 pb-16 sm:pb-0">
        {currentView === 'auth' ? (
          <AuthPage
            initialMode={authInitialMode}
            onSuccess={handleAuthSuccess}
            onBackToStore={() => setCurrentView('storefront')}
          />
        ) : currentView === 'customer' ? (
          <CustomerDashboard
            currency={currency}
            onBackToStore={() => setCurrentView('storefront')}
            purchasedTemplates={purchasedTemplates}
            orders={orders}
            currentUser={currentUser}
            onLogOut={handleLogOut}
          />
        ) : currentView === 'cart' ? (
          <CartPage
            cart={cart}
            currency={currency}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onProceedToPayment={() => setCurrentView('payment')}
            onContinueShopping={() => setCurrentView('storefront')}
            discountPercent={discountPercent}
            onApplyPromo={handleApplyPromo}
          />
        ) : currentView === 'payment' ? (
          <PaymentPage
            cart={cart}
            currency={currency}
            discountPercent={discountPercent}
            currentUser={currentUser}
            onBackToCart={() => setCurrentView('cart')}
            onPaymentSuccess={(purchased, order, email) => {
              handleCheckoutSuccess(purchased);
              showToast(`Automated payment confirmation email dispatched to ${email.recipientEmail}!`);
            }}
            onGoToDashboard={() => setCurrentView('customer')}
          />
        ) : currentView === 'templates' ? (
          <TemplatesSection
            currency={currency}
            onSelectTemplate={(tpl) => setDetailTemplate(tpl)}
            onLiveDemo={(tpl) => setLiveDemoTemplate(tpl)}
            onBuyNow={handleBuyNow}
          />
        ) : currentView === 'packages' ? (
          <PricingSection
            currency={currency}
            onSelectPackage={handleSelectPackage}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onExploreTemplates={() => scrollToSection('templates')}
              onGetCustomWebsite={() => setIsCustomModalOpen(true)}
            />

            {/* About & Statistics Section */}
            <AboutSection onLearnMore={() => scrollToSection('services')} />

            {/* Services Section */}
            <ServicesSection
              currency={currency}
              onSelectService={handleServiceSelect}
              onOpenCustomModal={() => setIsCustomModalOpen(true)}
            />

            {/* Transparent Pricing & Nigeria Packages Section */}
            <PricingSection
              currency={currency}
              onSelectPackage={handleSelectPackage}
            />

            {/* CTA Banner */}
            <CtaBanner
              onGetStarted={() => setIsCustomModalOpen(true)}
              onBrowseTemplates={() => scrollToSection('templates')}
            />

            {/* Templates Store Section */}
            <TemplatesSection
              currency={currency}
              onSelectTemplate={(tpl) => setDetailTemplate(tpl)}
              onLiveDemo={(tpl) => setLiveDemoTemplate(tpl)}
              onBuyNow={handleBuyNow}
            />

            {/* Customer Success Stories & Ratings Testimonials Section */}
            <TestimonialsSection
              onExploreTemplates={() => scrollToSection('templates')}
              onGetCustomWebsite={() => setIsCustomModalOpen(true)}
            />

            {/* Collapsible FAQ Section */}
            <FaqSection
              onOpenCustomModal={() => setIsCustomModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Mobile Device Floating Cart Icon (hidden on Auth page) */}
      {currentView !== 'auth' && (
        <MobileFloatingCart
          cartCount={totalCartCount}
          onOpenCart={() => setCurrentView('cart')}
        />
      )}

      {/* Mobile Bottom Navigation Bar matching mockup */}
      <MobileBottomNav
        activeTab={effectiveMobileTab}
        onSelectTab={handleMobileTabSelect}
        cartCount={totalCartCount}
      />

      {/* Footer (hidden on dedicated Auth page) */}
      {currentView !== 'auth' && (
        <Footer
          onNavigateSection={scrollToSection}
          onOpenCustomModal={() => setIsCustomModalOpen(true)}
          onSubscribeSuccess={(email) => {
            showToast(`Successfully subscribed ${email} to ANTHIRA newsletter!`);
          }}
        />
      )}

      {/* Modals & Slide-Overs */}
      {/* 1. Template Detail Modal */}
      <TemplateDetailModal
        template={detailTemplate}
        currency={currency}
        onClose={() => setDetailTemplate(null)}
        onBuyNow={handleBuyNow}
        onLiveDemo={(tpl) => {
          setDetailTemplate(null);
          setLiveDemoTemplate(tpl);
        }}
      />

      {/* 2. Interactive Live Demo Modal */}
      <LiveDemoModal
        template={liveDemoTemplate}
        currency={currency}
        onClose={() => setLiveDemoTemplate(null)}
        onBuy={(tpl) => {
          setLiveDemoTemplate(null);
          handleBuyNow(tpl);
        }}
      />

      {/* 3. Custom Website Request Modal */}
      <CustomWebsiteModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        preselectedType={selectedServiceForQuote}
        onSubmitSuccess={handleQuoteSubmitted}
      />

      {/* 4. Slide-over Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutSuccess={handleCheckoutSuccess}
        onGoToCartPage={() => {
          setIsCartOpen(false);
          setCurrentView('cart');
        }}
        onGoToPaymentPage={() => {
          setIsCartOpen(false);
          setCurrentView('payment');
        }}
      />
    </div>
  );

  return mainContent;
}
