import type { Metadata, Viewport } from 'next';
import '../src/index.css';

const siteUrl = 'https://anthira-ng.vercel.app';
const siteTitle = 'ANTHIRA | Custom Website Design & Premium Templates';
const siteDescription =
  'Get your business a professional website with ANTHIRA. Explore custom website design, website development, and premium website templates for businesses worldwide.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | ANTHIRA',
  },
  description: siteDescription,
  applicationName: 'ANTHIRA',
  authors: [{ name: 'ANTHIRA' }],
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'OVqGgqqOPn0pHDjb7YpwY-h2sWehIWVXKddKnqW2RCs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description:
      'Build your online presence with ANTHIRA. Get a custom website or explore premium website templates.',
    siteName: 'ANTHIRA',
    type: 'website',
    url: '/',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description:
      'Build your online presence with ANTHIRA. Get a custom website or discover premium website templates.',
  },
  other: {
    'color-scheme': 'dark light',
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0d10',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'ANTHIRA',
      url: `${siteUrl}/`,
      description:
        'Custom website design, website development, and premium website templates for businesses.',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'ANTHIRA',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#0b0d10] text-[#f1f3f7] antialiased selection:bg-[#ff5722] selection:text-white">
        {children}
      </body>
    </html>
  );
}
