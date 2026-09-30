import { ServiceItem, LookbookItem, FabricSwatch, Appointment, Inquiry } from "./types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Contact details for MS Tailors Panadura
export const MS_TAILORS_CONTACT = {
  brandName: "MS Tailors",
  tagline: "Mastery in Every Stitch",
  sinceYear: "1985",
  address: "No. 28, Station Road, Panadura, Western Province, Sri Lanka",
  addressShort: "No. 28 Station Rd, Panadura",
  phoneDisplay: "038 223 6154",
  phoneRaw: "+94382236154",
  hotlineMobileDisplay: "076 407 0182",
  hotlineMobileRaw: "+94764070182",
  whatsappNumber: "94764070182",
  email: "Mstailorspdura@gmail.com",
  facebookUrl: "https://www.facebook.com/share/1FXcN4gSXS/?mibextid=wwXIfr",
  instagramUrl: "https://www.instagram.com/mstailors_insta?stkn=MXY3aXUzdm4yd2ZyMA%3D%3D&utm_source=qr",
  hours: "Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 10:00 AM – 4:00 PM (By Appointment)",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.336048123282!2d79.9048386!3d6.7130838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2462e0854d687%3A0x67db918c0cfa0b86!2sPanadura!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
};

export function getWhatsAppInquiryUrl(message?: string): string {
  const defaultMsg = "Hello MS Tailors, I would like to inquire about bespoke tailoring / suit consultation at your Panadura atelier.";
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${MS_TAILORS_CONTACT.whatsappNumber}?text=${text}`;
}

export function formatLkr(amount: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Fallback initial data in case backend server is initializing
export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    title: "Bespoke Two-Piece & Three-Piece Suits",
    slug: "bespoke-suits",
    category: "Bespoke",
    tagline: "Individually drafted patterns, hand-canvassed construction, and artisanal drape.",
    description: "Our quintessential bespoke suit is drafted from a unique individual paper pattern cut exclusively for your posture and measurements. Crafted with full floating horsehair canvas, hand-stitched pick lapels, horn buttons, and silk linings.",
    detailedFeatures: [
      "Full or Half Floating Canvas Construction",
      "30+ anatomical body measurements taken",
      "Multiple basted fittings for millimeter precision",
      "Choice of 500+ European Super 120s–160s wools",
      "Functional hand-cut surgeon cuff buttonholes",
      "Personalized hand-embroidered monogram"
    ],
    startingPriceLkr: 85000,
    estimatedDays: 21,
    imageUrl: "/images/lookbook/ms_lookbook_charcoal_suit.jpg",
    iconName: "Scissors",
    isActive: true,
    order: 1
  },
  {
    title: "Groom & Wedding Ensembles",
    slug: "wedding-groom-suits",
    category: "Wedding",
    tagline: "Sartorial majesty for your momentous occasion in Sri Lanka and abroad.",
    description: "A masterclass in celebratory tailoring. Whether you desire an opulent English morning suit, an Italian velvet smoking jacket, or a modern tropical linen wedding three-piece, our atelier ensures you command the celebration with effortless poise.",
    detailedFeatures: [
      "Complete groom party coordination & color matching",
      "Tuxedos, dinner jackets, double-breasted and 3-piece suites",
      "Fabric weights tailored for Sri Lankan tropical climate",
      "Matching waistcoats, bespoke silk ties, and pocket squares",
      "Emergency alteration guarantee before the wedding day"
    ],
    startingPriceLkr: 95000,
    estimatedDays: 28,
    imageUrl: "/images/lookbook/ms_lookbook_black_tie_suit.jpg",
    iconName: "Gem",
    isActive: true,
    order: 2
  },
  {
    title: "Luxury Suit Rentals (Grooms & Black-Tie)",
    slug: "suit-rentals",
    category: "Rentals",
    tagline: "Premium designer tuxedos and suits tailored to fit for high-society events.",
    description: "High-end rental service for weddings, formal galas, school socials, and corporate awards. Every rental suit is precision-altered to your exact frame by our master tailors and sanitized with clinical dry-cleaning before release.",
    detailedFeatures: [
      "Complimentary sleeve and trouser hem customization",
      "Available in slim-cut modern and classic British silhouettes",
      "Complete package: Jacket, Trouser, Shirt, Bowtie/Tie, Cufflinks",
      "Flexible 3-day to 7-day rental return periods",
      "Corporate & wedding groomsmen group rental packages"
    ],
    startingPriceLkr: 12500,
    estimatedDays: 3,
    imageUrl: "/images/lookbook/ms_lookbook_tuxedo_profile.jpg",
    iconName: "Sparkles",
    isActive: true,
    order: 3
  },
  {
    title: "Handcrafted Bespoke Shirts & Trousers",
    slug: "shirts-and-trousers",
    category: "Bespoke",
    tagline: "Crisp Egyptian cottons, mother-of-pearl buttons, and tailored comfort.",
    description: "The foundation of executive daily luxury. Handcrafted shirts cut with single-needle French seams, reinforced collar stays, and bespoke trousers with side tab adjusters and sartorial pleats.",
    detailedFeatures: [
      "100% Giza Egyptian and Sea Island Cotton selections",
      "18 collar styles and 12 cuff variations",
      "Side-adjuster Gurkha or Hollywood waistband trousers",
      "Hand-sewn genuine Mother-of-Pearl buttons",
      "Pre-washed to eliminate shrinkage variance"
    ],
    startingPriceLkr: 14500,
    estimatedDays: 10,
    imageUrl: "/images/lookbook/ms_lookbook_bespoke_shirt.jpg",
    iconName: "Shirt",
    isActive: true,
    order: 4
  },
  {
    title: "Corporate & Institutional Uniforms",
    slug: "corporate-uniforms",
    category: "Uniforms",
    tagline: "Prestige institutional attire for luxury hotels, banks, and airlines.",
    description: "Contract tailoring for premier Sri Lankan corporations, luxury resorts, private security details, and aviation personnel. High-durability stain-resistant blends manufactured to exacting brand guidelines.",
    detailedFeatures: [
      "Bulk on-site measurement service across Western Province",
      "High-tensile, wrinkle-resistant performance fabrics",
      "Custom embroidered corporate insignia",
      "Dedicated account manager and serialized fitting cards",
      "Scalable delivery pipeline from 10 to 1,000+ units"
    ],
    startingPriceLkr: 22000,
    estimatedDays: 14,
    imageUrl: "/images/lookbook/ms_lookbook_executive_shirt.jpg",
    iconName: "Building2",
    isActive: true,
    order: 5
  }
];

export const FALLBACK_LOOKBOOK: LookbookItem[] = [
  {
    id: "1",
    title: "The Panadura Bespoke Charcoal Suit",
    category: "Bespoke",
    description: "Signature handcrafted charcoal two-piece suit tailored for modern distinguished gentlemen. Cut from super-fine Italian wool with structured natural shoulders, pick stitching, and tapered trousers.",
    fabricDetails: "Vitale Barberis Canonico Super 130s Pure Wool (260 GSM, Biella, Italy)",
    lapelStyle: "Modern Notch Lapel",
    fitType: "Sartorial Slim Drape",
    priceLkr: 115000,
    isRental: false,
    availableSizes: ["Custom Bespoke Pattern", "38R", "40R", "42R"],
    imageUrl: "/images/lookbook/ms_lookbook_charcoal_suit.jpg",
    galleryUrls: [
      "/images/lookbook/ms_lookbook_charcoal_suit.jpg",
      "/images/lookbook/ms_lookbook_tuxedo_profile.jpg",
      "/images/lookbook/ms_lookbook_black_tie_suit.jpg"
    ],
    tags: ["Bespoke", "Charcoal Suit", "Panadura Atelier", "Italian Wool"],
    isFeatured: true,
    order: 1
  },
  {
    id: "2",
    title: "Black-Tie Ceremonial Evening Suit",
    category: "Tuxedos",
    description: "Flawless black-tie formal suit featuring hand-finished lapels, tailored slim fit, and executive necktie pairing. Available for bespoke commission or luxury rental.",
    fabricDetails: "Scabal Savile Row Collection Super 140s Wool (280 GSM, Huddersfield, England)",
    lapelStyle: "Narrow Notch / Peak Lapel",
    fitType: "Slim British Silhouette",
    priceLkr: 125000,
    isRental: true,
    rentalPricePerDayLkr: 15000,
    availableSizes: ["38R", "40R", "42R", "44R"],
    imageUrl: "/images/lookbook/ms_lookbook_black_tie_suit.jpg",
    galleryUrls: [
      "/images/lookbook/ms_lookbook_black_tie_suit.jpg",
      "/images/lookbook/ms_lookbook_tuxedo_profile.jpg"
    ],
    tags: ["Black Tie", "Groom", "Tuxedo", "Ceremonial"],
    isFeatured: true,
    order: 2
  },
  {
    id: "3",
    title: "Executive Pure Cotton Shirt & Trousers",
    category: "Bespoke",
    description: "Handcrafted executive dress shirt in 100% Egyptian cotton paired with midnight bespoke tailored trousers. Designed for effortless authority and day-long breathability.",
    fabricDetails: "100% Giza Egyptian Cotton (120/2 Two-Ply) & English Worsted Wool",
    lapelStyle: "Spread Collar with Reinforced Stays",
    fitType: "Precision Tailored",
    priceLkr: 28000,
    isRental: false,
    availableSizes: ["Custom Bespoke Pattern", "15.5", "16", "16.5"],
    imageUrl: "/images/lookbook/ms_lookbook_bespoke_shirt.jpg",
    galleryUrls: [
      "/images/lookbook/ms_lookbook_bespoke_shirt.jpg",
      "/images/lookbook/ms_lookbook_executive_shirt.jpg"
    ],
    tags: ["Bespoke Shirt", "Egyptian Cotton", "Pleated Trouser", "Executive"],
    isFeatured: true,
    order: 3
  },
  {
    id: "4",
    title: "Sartorial Midnight Profile Dinner Suit",
    category: "Wedding",
    description: "Sleek architectural silhouette with precision-cut sleeves, horn buttons, and hand-basted canvas. Perfect for grooms and high-profile evening celebrations.",
    fabricDetails: "Loro Piana Tasmanian Super 150s (250 GSM, Quarona, Italy)",
    lapelStyle: "Slim Peak Lapel",
    fitType: "Modern Italian Cut",
    priceLkr: 130000,
    isRental: true,
    rentalPricePerDayLkr: 16500,
    availableSizes: ["38R", "40R", "42R"],
    imageUrl: "/images/lookbook/ms_lookbook_tuxedo_profile.jpg",
    galleryUrls: [
      "/images/lookbook/ms_lookbook_tuxedo_profile.jpg",
      "/images/lookbook/ms_lookbook_charcoal_suit.jpg"
    ],
    tags: ["Groom Suit", "Wedding", "Sartorial", "Midnight Black"],
    isFeatured: true,
    order: 4
  },
  {
    id: "5",
    title: "Tailored Smart Executive Ensemble",
    category: "Rentals",
    description: "Contemporary bespoke shirting and charcoal trouser ensemble tailored to precise client anatomy. Ideal for modern wedding parties, smart-casual receptions, and executive comfort.",
    fabricDetails: "Egyptian Cotton Poplin & Super 120s Lightweight Wool Blend",
    lapelStyle: "Semi-Spread Collar",
    fitType: "Contemporary Tailored",
    priceLkr: 32000,
    isRental: true,
    rentalPricePerDayLkr: 12500,
    availableSizes: ["38R", "40R", "42R", "44R"],
    imageUrl: "/images/lookbook/ms_lookbook_executive_shirt.jpg",
    galleryUrls: [
      "/images/lookbook/ms_lookbook_executive_shirt.jpg",
      "/images/lookbook/ms_lookbook_bespoke_shirt.jpg"
    ],
    tags: ["Rental Ready", "Executive", "Smart Casual", "Reception"],
    isFeatured: true,
    order: 5
  }
];

export const FALLBACK_FABRICS: FabricSwatch[] = [
  {
    id: "1",
    name: "VBC Perennial Super 110s Midnight Navy Twill",
    code: "VBC-110-NAV",
    millOrigin: "Vitale Barberis Canonico (Biella)",
    country: "Italy",
    composition: "100% Super 110s Virgin Wool",
    weave: "2/2 Twill",
    weightGsm: 260,
    season: "All Seasons",
    colorHex: "#121A2B",
    colorFamily: "Navy",
    inStock: true,
    isFeatured: true,
    description: "The undisputed benchmark for daily luxury suits. Fluid drape with natural crease-recovery and refined luster.",
    textureImageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    name: "Scabal Londoner Charcoal Glen Check",
    code: "SCB-LDN-09",
    millOrigin: "Scabal (Huddersfield)",
    country: "United Kingdom",
    composition: "100% Super 140s Pure New Wool",
    weave: "Glenurquhart Check",
    weightGsm: 280,
    season: "All Seasons",
    colorHex: "#333A42",
    colorFamily: "Charcoal",
    inStock: true,
    isFeatured: true,
    description: "Woven in the heart of Yorkshire. A subtle, commanding check pattern for executives who appreciate British sartorial heritage.",
    textureImageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Loro Piana Zelander Tropical Worsted",
    code: "LP-ZEL-104",
    millOrigin: "Loro Piana (Quarona)",
    country: "Italy",
    composition: "100% Selected New Zealand Merino Wool",
    weave: "Plain Weave Tropical",
    weightGsm: 230,
    season: "Tropical / Warm Climate",
    colorHex: "#1B2232",
    colorFamily: "Navy",
    inStock: true,
    isFeatured: true,
    description: "Exceptionally lightweight and open-weave for optimal air permeability in Sri Lankan heat while holding razor-sharp creases.",
    textureImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    name: "Spence Bryson Natural Oatmeal Irish Linen",
    code: "SB-LIN-220",
    millOrigin: "Spence Bryson (Belfast)",
    country: "Ireland",
    composition: "100% Master of Linen Pure Flax",
    weave: "Plain Linen",
    weightGsm: 290,
    season: "Spring/Summer",
    colorHex: "#D7C4A5",
    colorFamily: "Earth",
    inStock: true,
    isFeatured: true,
    description: "Heavy, crisp Irish linen that softens gracefully over years of wear, developing the characteristic dignified linen rumple.",
    textureImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    name: "Dormeuil Amadeus 365 Royal Oxford Black",
    code: "DOR-AMA-01",
    millOrigin: "Dormeuil",
    country: "United Kingdom",
    composition: "100% Pure Compact Worsted Wool",
    weave: "Sateen Oxford",
    weightGsm: 310,
    season: "All Seasons",
    colorHex: "#0C0D10",
    colorFamily: "Black",
    inStock: true,
    isFeatured: false,
    description: "The ultimate black-tie fabric. Deep optical black saturation with a secret proprietary British finishing method.",
    textureImageUrl: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=600&q=80"
  }
];

// Public API Calls
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE}/services`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch services");
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_SERVICES;
  } catch (err) {
    console.warn("Using fallback services:", err);
    return FALLBACK_SERVICES;
  }
}

export async function getLookbook(category?: string, isRental?: boolean): Promise<LookbookItem[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (isRental !== undefined) params.append("isRental", String(isRental));

    const res = await fetch(`${API_BASE}/lookbook?${params.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch lookbook");
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_LOOKBOOK;
  } catch (err) {
    console.warn("Using fallback lookbook:", err);
    let filtered = [...FALLBACK_LOOKBOOK];
    if (category && category !== "All") {
      filtered = filtered.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (isRental !== undefined) {
      filtered = filtered.filter((i) => i.isRental === isRental);
    }
    return filtered;
  }
}

export async function getFabrics(colorFamily?: string): Promise<FabricSwatch[]> {
  try {
    const params = new URLSearchParams();
    if (colorFamily && colorFamily !== "All") params.append("colorFamily", colorFamily);

    const res = await fetch(`${API_BASE}/fabrics?${params.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch fabrics");
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_FABRICS;
  } catch (err) {
    console.warn("Using fallback fabrics:", err);
    let filtered = [...FALLBACK_FABRICS];
    if (colorFamily && colorFamily !== "All") {
      filtered = filtered.filter((f) => f.colorFamily.toLowerCase() === colorFamily.toLowerCase());
    }
    return filtered;
  }
}

export async function createAppointment(data: Partial<Appointment>): Promise<{ success: boolean; data?: Appointment; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to book appointment");
    }
    const appointment = await res.json();
    return { success: true, data: appointment };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

export async function createInquiry(data: Partial<Inquiry>): Promise<{ success: boolean; data?: Inquiry; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to send inquiry");
    }
    const inquiry = await res.json();
    return { success: true, data: inquiry };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
