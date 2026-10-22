import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://anthira-ng.vercel.app/"),

  title: {
    default: "ANTHIRA | Custom Website Design & Premium Templates",
    template: "%s | ANTHIRA",
  },

  description:
    "Get your business a professional website with ANTHIRA. Explore custom website design, website development, and premium website templates for businesses worldwide.",

  applicationName: "ANTHIRA",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "ANTHIRA | Custom Website Design & Premium Templates",
    description:
      "Build your online presence with ANTHIRA. Get a custom website or explore premium website templates.",
    siteName: "ANTHIRA",
    type: "website",
    url: "/",
  },
};