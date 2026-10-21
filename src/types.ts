export type Currency = 'NGN' | 'USD';

export interface Template {
  id: string;
  title: string;
  subtitle: string;
  priceNGN: number;
  priceUSD: number;
  badge?: 'Popular' | 'New' | 'Best Seller' | 'Sale';
  rating: number;
  reviewCount: number;
  description: string;
  category: 'Business' | 'E-commerce' | 'Restaurant' | 'Fashion' | 'Portfolio' | 'React';
  image: string;
  galleryImages: string[];
  features: string[];
  technologies: string[];
  demoUrl?: string;
  downloadsCount: number;
  tags?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  startingPriceNGN: number;
  startingPriceUSD: number;
  deliveryTime: string;
  image: string;
  features: string[];
}

export interface CartItem {
  template: Template;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  packageName: string;
  amountNGN: number;
  amountUSD: number;
  status: 'Paid' | 'Pending' | 'Completed';
  date: string;
  type: 'Template' | 'Custom Project';
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  websiteType: string;
  projectDetails: string;
  budgetRange?: string;
  createdAt: string;
}

export interface QuoteNotificationChannel {
  sent: boolean;
  error?: string;
}

export interface QuoteNotificationResult {
  email: QuoteNotificationChannel;
  whatsapp: QuoteNotificationChannel;
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  sentAt: string;
  paymentStatus: 'Received' | 'Pending';
  transactionId: string;
  items: { title: string; price: string }[];
  totalAmount: string;
  body: string;
}


export type CountryCode = 'NG' | 'US' | 'GB';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  priceNGN: string;
  priceUSD: string;
  priceGBP: string;
  bestFor: string;
  popular?: boolean;
  features: string[];
  timeline: string;
}

export interface TemplateReview {
  id: string;
  templateId?: string;
  templateTitle: string;
  author: string;
  role: string;
  location: string;
  countryFlag: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface TemplateCategoryRate {
  category: string;
  priceNGN: string;
  priceUSD: string;
  priceGBP: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  isAdmin?: boolean;
  avatarInitials: string;
  joinedDate: string;
  company?: string;
  country?: string;
}

