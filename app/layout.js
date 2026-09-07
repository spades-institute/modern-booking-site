import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const siteDescription =
  "Precision barbering in Abuja, with in-studio appointments and home visits across Kubwa, Arab Road, and nearby areas.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": "#ab-cuts",
  name: "AB ~ Cuts",
  description: siteDescription,
  telephone: "+2349064753818",
  email: "yusufabel42@gmail.com",
  priceRange: "₦6,000–₦26,000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kubwa",
    addressRegion: "Abuja",
    addressCountry: "NG",
  },
  areaServed: [
    { "@type": "Place", name: "Kubwa" },
    { "@type": "Place", name: "Arab Road" },
    { "@type": "City", name: "Abuja" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
  makesOffer: [
    "Signature Cut",
    "Skin Fade",
    "Beard Sculpt",
    "Cut + Beard",
    "Hot Towel Shave",
    "Junior Cut",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "AB ~ Cuts | Barbering in Abuja",
    template: "%s | AB ~ Cuts",
  },
  description: siteDescription,
  applicationName: "AB ~ Cuts",
  authors: [{ name: "AB ~ Cuts" }],
  creator: "AB ~ Cuts",
  publisher: "AB ~ Cuts",
  category: "Barber shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "AB ~ Cuts",
    title: "AB ~ Cuts | Barbering in Abuja",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "AB ~ Cuts | Barbering in Abuja",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#101012",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
