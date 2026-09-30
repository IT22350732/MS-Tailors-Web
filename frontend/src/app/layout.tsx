import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mstailors.lk"),
  title: "MS Tailors — Luxury Bespoke Tailoring & Suit Rentals | Panadura, Sri Lanka",
  description:
    "Mastery in every stitch. Panadura's premier bespoke tailoring house, crafting hand-canvassed suits, wedding ensembles, luxury tuxedo rentals, and corporate uniforms from fine European fabrics.",
  keywords: [
    "MS Tailors",
    "Bespoke Tailoring Panadura",
    "Custom Suits Sri Lanka",
    "Wedding Suit Rental Panadura",
    "Tuxedo Rental Sri Lanka",
    "Groom Attire Sri Lanka",
    "Savile Row Style Sri Lanka",
    "Italian Wool Suits Panadura",
  ],
  openGraph: {
    title: "MS Tailors — Sartorial Bespoke Tailoring House",
    description: "Handcrafted bespoke suits, wedding ensembles, and luxury suit rentals in Panadura, Sri Lanka.",
    url: "https://mstailors.lk",
    siteName: "MS Tailors",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 600,
        height: 600,
        alt: "MS Tailors — Wear Your Dreams",
      },
    ],
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${inter.variable} font-sans bg-obsidian text-silk-pearl antialiased selection:bg-gold/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
