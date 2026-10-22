import { Template, ServiceItem, Order, PricingPackage, CountryInfo, TemplateReview, TemplateCategoryRate } from '../types';

import HERO_IMAGE_ASSET from '../assets/images/hero_workspace_display_1792030346761.jpg';
import RESTAURANT_ASSET from '../assets/images/template_restaurant_1792030347290.jpg';
import FASHION_ASSET from '../assets/images/template_fashion_1792030348324.jpg';
import ECOMMERCE_ASSET from '../assets/images/template_ecommerce_1792030348998.jpg';
import PORTFOLIO_ASSET from '../assets/images/template_portfolio_1792030349538.jpg';

const HERO_IMAGE = HERO_IMAGE_ASSET.src;
const RESTAURANT_IMG = RESTAURANT_ASSET.src;
const FASHION_IMG = FASHION_ASSET.src;
const ECOMMERCE_IMG = ECOMMERCE_ASSET.src;
const PORTFOLIO_IMG = PORTFOLIO_ASSET.src;

export { HERO_IMAGE, RESTAURANT_IMG, FASHION_IMG, ECOMMERCE_IMG, PORTFOLIO_IMG };

export const TEMPLATE_FALLBACK_IMAGES = {
  Restaurant: RESTAURANT_IMG,
  Fashion: FASHION_IMG,
  'E-commerce': ECOMMERCE_IMG,
  Portfolio: PORTFOLIO_IMG,
  Business: HERO_IMAGE,
  React: ECOMMERCE_IMG,
} as const;

// Storefront default currency: display template prices in US dollars.
export const DEFAULT_CURRENCY = 'USD' as const;

export const TEMPLATES: Template[] = [
  {
    id: 'restaurant-website',
    title: 'Restaurant Website',
    subtitle: 'Modern restaurant template',
    priceNGN: 38000,
    priceUSD: 19,
    badge: 'Popular',
    rating: 4.8,
    reviewCount: 124,
    description: 'A modern and elegant restaurant website template designed to showcase your menu, attract customers and grow your business.',
    category: 'Restaurant',
    image: RESTAURANT_IMG,
    galleryImages: [RESTAURANT_IMG, HERO_IMAGE, ECOMMERCE_IMG],
    features: [
      'Fully responsive design across all devices',
      'Modern and clean UI/UX with amber highlights',
      'Online reservation booking form & confirmation',
      'Categorized menu showcase with dietary badges',
      'Easy to customize components & theme tokens',
      'SEO optimized with Schema.org Restaurant metadata'
    ],
    technologies: ['React', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    downloadsCount: 382,
    tags: ['Restaurant', 'Food', 'Menu', 'Dining', 'Reservation', 'Cafe', 'Culinary']
  },
  {
    id: 'fashion-store',
    title: 'Fashion Store',
    subtitle: 'Stylish eCommerce template',
    priceNGN: 50000,
    priceUSD: 25,
    badge: 'New',
    rating: 4.9,
    reviewCount: 89,
    description: 'A contemporary streetwear and apparel e-commerce store with high-impact lookbooks, seamless product filtering, and fast checkout.',
    category: 'Fashion',
    image: FASHION_IMG,
    galleryImages: [FASHION_IMG, ECOMMERCE_IMG, HERO_IMAGE],
    features: [
      'Curated lookbook & seasonal collection hero',
      'Color & size variant selection chips',
      'Interactive cart drawer & discount code engine',
      'Sticky thumb-friendly mobile action bar',
      'Instagram shoppable gallery section',
      'Instant loading image grid with srcset support'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    downloadsCount: 195,
    tags: ['Fashion', 'Store', 'Clothing', 'Apparel', 'Streetwear', 'Lookbook', 'Shop', 'Boutique']
  },
  {
    id: 'ecommerce-store',
    title: 'E-commerce Store',
    subtitle: 'Complete online store template',
    priceNGN: 78000,
    priceUSD: 39,
    badge: 'Best Seller',
    rating: 5.0,
    reviewCount: 215,
    description: 'Full-featured technology and hardware storefront built for high conversion. Includes technical specs comparison, stock indicator, and customer reviews.',
    category: 'E-commerce',
    image: ECOMMERCE_IMG,
    galleryImages: [ECOMMERCE_IMG, RESTAURANT_IMG, PORTFOLIO_IMG],
    features: [
      'High-conversion product page with multi-angle gallery',
      'Detailed tech specs table & accordion breakdown',
      'Real-time inventory counter simulation',
      'Verified customer review scorecards with ratings',
      'Integrated payment checkout flow simulation',
      'Dark/Light theme support with smooth transitions'
    ],
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Vite'],
    downloadsCount: 540,
    tags: ['E-commerce', 'Online Store', 'Shop', 'Tech', 'Hardware', 'Cart', 'Products', 'Checkout']
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Personal portfolio template',
    priceNGN: 24000,
    priceUSD: 12,
    badge: 'Sale',
    rating: 4.7,
    reviewCount: 94,
    description: 'A striking creative developer and designer portfolio with bold typography, interactive project showcases, interactive biography, and direct contact inquiry form.',
    category: 'Portfolio',
    image: PORTFOLIO_IMG,
    galleryImages: [PORTFOLIO_IMG, HERO_IMAGE, FASHION_IMG],
    features: [
      'Bold editorial display typography & dark atmosphere',
      'Interactive project modal showcases with live tags',
      'Developer biography and interactive skill stack list',
      'Working contact form with simulated submission feedback',
      'Smooth micro-interactions and hover animations',
      'Resume/CV download link integration'
    ],
    technologies: ['React', 'Tailwind CSS', 'Motion', 'JavaScript'],
    downloadsCount: 420,
    tags: ['Portfolio', 'Personal', 'Developer', 'Designer', 'Resume', 'Creative', 'Agency', 'Freelance']
  },
  {
    id: 'business-corporate-pro',
    title: 'Corporate Business',
    subtitle: 'Enterprise corporate web template',
    priceNGN: 58000,
    priceUSD: 29,
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 156,
    description: 'A trustworthy corporate presence template engineered for consulting firms, agencies, and B2B tech organizations.',
    category: 'Business',
    image: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, PORTFOLIO_IMG, RESTAURANT_IMG],
    features: [
      'Executive leadership and team bio showcase',
      'Client case studies with measurable ROI metrics',
      'Interactive service tier pricing calculator',
      'Compliance and certification trust badges',
      'Multi-step consultation booking calendar trigger',
      'Fully accessible WCAG AA compliant layout'
    ],
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js'],
    downloadsCount: 310,
    tags: ['Business', 'Corporate', 'Agency', 'Consulting', 'B2B', 'Enterprise', 'Finance', 'Services']
  },
  {
    id: 'custom-react-app',
    title: 'Custom React Web App',
    subtitle: 'Advanced dynamic application template',
    priceNGN: 98000,
    priceUSD: 49,
    badge: 'New',
    rating: 5.0,
    reviewCount: 78,
    description: 'Production-ready React application starter with authenticated user dashboard, real-time analytics graphs, and dark mode interface.',
    category: 'React',
    image: ECOMMERCE_IMG,
    galleryImages: [ECOMMERCE_IMG, PORTFOLIO_IMG, HERO_IMAGE],
    features: [
      'Interactive dashboard shell with multi-view routes',
      'SVG data visualization charts with time filters',
      'Responsive data table with filtering and export',
      'Modular state management architecture',
      'TypeScript strict typing throughout',
      'Ready-to-deploy Vite build setup'
    ],
    technologies: ['React 19', 'Tailwind CSS', 'TypeScript', 'Vite'],
    downloadsCount: 260,
    tags: ['React', 'Web App', 'Dashboard', 'SaaS', 'Analytics', 'TypeScript', 'Vite', 'App']
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'business-website-service',
    title: 'Business Website',
    description: 'Corporate & brand websites',
    startingPriceNGN: 50000,
    startingPriceUSD: 80,
    deliveryTime: '3-5 business days',
    image: HERO_IMAGE,
    features: ['Custom brand styling', 'Up to 5 pages', 'Lead generation forms', 'Mobile responsive', 'Fast loading speed']
  },
  {
    id: 'ecommerce-website-service',
    title: 'E-commerce Website',
    description: 'Online stores with secure payment integration',
    startingPriceNGN: 100000,
    startingPriceUSD: 160,
    deliveryTime: '7-10 business days',
    image: ECOMMERCE_IMG,
    features: ['Paystack / Flutterwave / Stripe setup', 'Product catalog & cart', 'Inventory management', 'Order tracking', 'Customer portal']
  },
  {
    id: 'restaurant-website-service',
    title: 'Restaurant Website',
    description: 'Showcase your menu and attract more customers',
    startingPriceNGN: 80000,
    startingPriceUSD: 130,
    deliveryTime: '5-7 business days',
    image: RESTAURANT_IMG,
    features: ['Digital interactive menu', 'Table reservation system', 'WhatsApp direct ordering', 'Google Maps integration', 'Special offers banner']
  },
  {
    id: 'fashion-website-service',
    title: 'Fashion Website',
    description: 'Stylish and modern designs for fashion brands',
    startingPriceNGN: 60000,
    startingPriceUSD: 100,
    deliveryTime: '5-7 business days',
    image: FASHION_IMG,
    features: ['Editorial lookbook', 'Size recommendation guides', 'Instagram feed sync', 'Wishlist functionality', 'Discount code engine']
  },
  {
    id: 'portfolio-website-service',
    title: 'Portfolio Website',
    description: 'Stand out with a stunning personal or business portfolio',
    startingPriceNGN: 60000,
    startingPriceUSD: 100,
    deliveryTime: '3-5 business days',
    image: PORTFOLIO_IMG,
    features: ['Interactive case studies', 'Resume/CV download', 'Custom typography', 'Client testimonial carousel', 'Contact form automation']
  },
  {
    id: 'custom-react-service',
    title: 'Custom React Website',
    description: 'Advanced web applications with React JS',
    startingPriceNGN: 150000,
    startingPriceUSD: 240,
    deliveryTime: '10-14 business days',
    image: HERO_IMAGE,
    features: ['Full custom React & Vite build', 'REST / GraphQL API integration', 'User auth & protected routes', 'Performance optimization', 'Source code & docs transfer']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8941',
    customerName: 'Ayomide A.',
    customerEmail: 'ayomide.a@example.com',
    packageName: 'E-commerce Template',
    amountNGN: 30000,
    amountUSD: 50,
    status: 'Paid',
    date: '2026-10-14',
    type: 'Template'
  },
  {
    id: 'ORD-8940',
    customerName: 'Blessing E.',
    customerEmail: 'blessing.e@agency.ng',
    packageName: 'Website Design',
    amountNGN: 150000,
    amountUSD: 240,
    status: 'Pending',
    date: '2026-10-13',
    type: 'Custom Project'
  },
  {
    id: 'ORD-8939',
    customerName: 'Samuel K.',
    customerEmail: 'samuel.k@tastebites.com',
    packageName: 'Restaurant Template',
    amountNGN: 15000,
    amountUSD: 25,
    status: 'Paid',
    date: '2026-10-12',
    type: 'Template'
  },
  {
    id: 'ORD-8938',
    customerName: 'Precious O.',
    customerEmail: 'precious.art@designer.co',
    packageName: 'Portfolio Website',
    amountNGN: 10000,
    amountUSD: 18,
    status: 'Paid',
    date: '2026-10-11',
    type: 'Template'
  }
];

export const SALES_CHART_DATA = [
  { month: 'Jan', sales: 420000 },
  { month: 'Feb', sales: 610000 },
  { month: 'Mar', sales: 580000 },
  { month: 'Apr', sales: 1100000 },
  { month: 'May', sales: 940000 },
  { month: 'Jun', sales: 1280000 },
  { month: 'Jul', sales: 1450000 },
];

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currencySymbol: '₦', currencyCode: 'NGN' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currencySymbol: '$', currencyCode: 'USD' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currencySymbol: '£', currencyCode: 'GBP' }
];

export const NIGERIA_PACKAGES: PricingPackage[] = [
  {
    id: 'pkg-basic',
    name: 'Basic',
    priceNGN: '₦50k–₦100k',
    priceUSD: '$150–$400',
    priceGBP: '£100–£300',
    bestFor: 'Individuals and small businesses',
    popular: false,
    timeline: '3–5 business days',
    features: [
      'One-page website',
      'Responsive mobile design',
      'About and services sections',
      'Contact information',
      'WhatsApp button',
      'Basic animations'
    ]
  },
  {
    id: 'pkg-standard',
    name: 'Standard',
    priceNGN: '₦100k–₦200k',
    priceUSD: '$400–$900',
    priceGBP: '£300–£700',
    bestFor: 'Small businesses',
    popular: false,
    timeline: '5–7 business days',
    features: [
      'Up to 5 pages',
      'Professional UI/UX design',
      'Mobile and tablet responsiveness',
      'Contact form',
      'WhatsApp integration',
      'Basic SEO setup',
      'Smooth animations'
    ]
  },
  {
    id: 'pkg-professional',
    name: 'Professional',
    priceNGN: '₦200k–₦400k',
    priceUSD: '$900–$2,000',
    priceGBP: '£700–£1,500',
    bestFor: 'Growing businesses',
    popular: true,
    timeline: '7–10 business days',
    features: [
      'Up to 8 pages',
      'Custom website design',
      'Advanced animations and interactions',
      'Contact and enquiry forms',
      'Google Maps integration',
      'SEO setup',
      'Social media integration',
      'Performance optimisation'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Premium',
    priceNGN: '₦400k–₦800k+',
    priceUSD: '$2,000–$5,000+',
    priceGBP: '£1,500–£3,500+',
    bestFor: 'Established brands',
    popular: false,
    timeline: '10–14 business days',
    features: [
      'Up to 12 pages',
      'Premium, customised UI/UX',
      'Advanced animations and transitions',
      'Booking or enquiry functionality',
      'CMS integration where needed',
      'Advanced SEO setup',
      'Analytics integration',
      'Performance optimisation',
      'Priority support for 30 days'
    ]
  },
  {
    id: 'pkg-ecommerce',
    name: 'E-commerce',
    priceNGN: '₦300k–₦1,000,000+',
    priceUSD: '$1,500–$4,000+',
    priceGBP: '£1,200–£3,200+',
    bestFor: 'Businesses selling products online',
    popular: false,
    timeline: '10–18 business days',
    features: [
      'Complete online store & product catalog',
      'Secure payment gateway (Paystack / Flutterwave / Stripe)',
      'Product variants, inventory & stock management',
      'Shopping cart & optimized checkout flow',
      'Automated email receipts & order notifications',
      'Customer order history & accounts portal'
    ]
  },
  {
    id: 'pkg-custom-app',
    name: 'Custom Web Application',
    priceNGN: '₦800k–₦3,000,000+',
    priceUSD: '$3,500–$10,000+',
    priceGBP: '£2,800–£8,000+',
    bestFor: 'Businesses needing advanced functionality',
    popular: false,
    timeline: '3–6 weeks',
    features: [
      'Full-Stack modern architecture (React 19, TypeScript, Node)',
      'Custom database schema & API integrations',
      'Role-based user authentication & permissions (RBAC)',
      'Dynamic real-time interactive dashboards',
      'Enterprise cloud deployment & security hardening',
      'Dedicated project manager & SLA agreement'
    ]
  }
];

export const COUNTRY_PACKAGES = NIGERIA_PACKAGES;

export const TEMPLATE_CATEGORY_RATES: TemplateCategoryRate[] = [
  { category: 'Restaurant Website', priceNGN: '₦25k–₦80k', priceUSD: '$39–$99', priceGBP: '£30–£85' },
  { category: 'Fashion Website', priceNGN: '₦30k–₦100k', priceUSD: '$49–$129', priceGBP: '£40–£109' },
  { category: 'Portfolio Website', priceNGN: '₦15k–₦50k', priceUSD: '$19–$69', priceGBP: '£15–£55' },
  { category: 'Business Website', priceNGN: '₦35k–₦100k', priceUSD: '$49–$149', priceGBP: '£40–£125' },
  { category: 'Real Estate Website', priceNGN: '₦40k–₦120k', priceUSD: '$69–$179', priceGBP: '£55–£149' },
  { category: 'E-commerce Website', priceNGN: '₦80k–₦250k', priceUSD: '$99–$299', priceGBP: '£79–£249' },
  { category: 'Hotel Booking Website', priceNGN: '₦80k–₦250k', priceUSD: '$99–$349', priceGBP: '£79–£299' },
  { category: 'School Website', priceNGN: '₦40k–₦120k', priceUSD: '$59–$179', priceGBP: '£49–£149' },
  { category: 'Music Streaming UI', priceNGN: '₦50k–₦150k', priceUSD: '$79–$249', priceGBP: '£65–£199' },
  { category: 'Admin Dashboard', priceNGN: '₦40k–₦150k', priceUSD: '$49–$199', priceGBP: '£39–£159' }
];

export const INITIAL_TEMPLATE_REVIEWS: TemplateReview[] = [
  {
    id: 'rev-1',
    templateTitle: 'Restaurant Website',
    author: 'Chief Emeka N.',
    role: 'Owner, Saffron Bistro',
    location: 'Victoria Island, Lagos',
    countryFlag: '🇳🇬',
    rating: 5,
    comment: 'The online reservation system and chef tasting menu converted instantly! Our bookings doubled in the very first weekend after deployment. Clean code and super easy to customize.',
    date: '2026-10-12',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    templateTitle: 'Fashion Store',
    author: 'Ayomide Adeyemi',
    role: 'Creative Director, TerraStreet',
    location: 'Ikeja, Lagos',
    countryFlag: '🇳🇬',
    rating: 5,
    comment: 'We integrated Paystack in less than 20 minutes with zero issues. The mobile thumb navigation and lookbook layouts increased our checkout conversion by 42%. Outstanding engineering!',
    date: '2026-10-10',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    templateTitle: 'Portfolio Website',
    author: 'Oliver Sterling',
    role: 'Principal Product Designer',
    location: 'Shoreditch, London',
    countryFlag: '🇬🇧',
    rating: 5,
    comment: 'The dark editorial atmosphere and typography pairings are top tier. I landed two international enterprise contracts within 2 weeks of launching my new showcase.',
    date: '2026-10-08',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    templateTitle: 'E-commerce Store',
    author: 'Marcus Vance',
    role: 'Hardware Retail Founder',
    location: 'Austin, Texas',
    countryFlag: '🇺🇸',
    rating: 5,
    comment: 'The tech specs breakdown table and multi-angle product gallery look like something Apple or Bang & Olufsen designed. Absolutely worth every dollar.',
    date: '2026-10-05',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    templateTitle: 'Custom React Web App',
    author: 'Precious Okonjo',
    role: 'Senior Frontend Lead',
    location: 'Manchester, UK',
    countryFlag: '🇬🇧',
    rating: 5,
    comment: 'Pure TypeScript excellence. No bloated third-party libraries, pristine component hierarchy, and instant Vite compilation. A masterclass in modern React.',
    date: '2026-09-28',
    verifiedPurchase: true
  }
];
