"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Scissors, ShieldCheck, MapPin, Menu, X } from "lucide-react";
import { MS_TAILORS_CONTACT } from "@/lib/api";

interface NavbarProps {
  onOpenBooking: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function TailorCrest({
  className = "w-36 h-28",
  monogram = "MS",
  title = "MS. TAILORS",
  subtitle = "SINCE 1985 • ATELIER",
  variant = "blue",
}: {
  className?: string;
  monogram?: string;
  title?: string;
  subtitle?: string;
  variant?: "blue" | "gold" | "white";
}) {
  const primaryColor = variant === "blue" ? "#3877F6" : variant === "gold" ? "#D4AF37" : "#FFFFFF";
  const accentColor = variant === "blue" ? "#60A5FA" : variant === "gold" ? "#F5E6A3" : "#E2E8F0";

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Laurel Flourish Shield */}
      <svg viewBox="0 0 160 105" className="w-full h-auto" fill="none">
        {/* Top Flourish Finial */}
        <path d="M80 12 C76 6, 84 6, 80 2 C76 6, 84 6, 80 12 Z" fill={primaryColor} />
        <circle cx="80" cy="4" r="1.5" fill={accentColor} />

        {/* Laurel wreath left */}
        <g fill={primaryColor}>
          <path d="M52 44 C44 38, 46 25, 61 20 C59 27, 49 32, 55 41 Z" />
          <path d="M44 58 C36 50, 40 37, 54 34 C52 41, 44 45, 48 54 Z" />
          <path d="M42 74 C34 66, 40 53, 54 51 C50 58, 44 62, 46 72 Z" />
          <path d="M50 88 C44 81, 50 70, 61 70 C56 77, 52 81, 54 88 Z" />
        </g>

        {/* Laurel wreath right */}
        <g fill={primaryColor}>
          <path d="M108 44 C116 38, 114 25, 99 20 C101 27, 111 32, 105 41 Z" />
          <path d="M116 58 C124 50, 120 37, 106 34 C108 41, 116 45, 112 54 Z" />
          <path d="M118 74 C126 66, 120 53, 106 51 C110 58, 116 62, 114 72 Z" />
          <path d="M110 88 C116 81, 110 70, 99 70 C104 77, 108 81, 106 88 Z" />
        </g>

        {/* Central Oval Shield */}
        <ellipse cx="80" cy="50" rx="23" ry="29" fill="#0A0E17" stroke={primaryColor} strokeWidth="1.8" />
        <ellipse cx="80" cy="50" rx="20" ry="26" fill="none" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2,2" />

        {/* Center Monogram */}
        <text
          x="80"
          y="57"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize={monogram.length > 1 ? "18" : "22"}
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.05em"
        >
          {monogram}
        </text>
      </svg>

      {/* Brand Title */}
      <span className="font-display tracking-[0.25em] text-white font-bold text-sm sm:text-base -mt-1 block uppercase">
        {title}
      </span>
      <span className="text-[9px] tracking-[0.3em] uppercase text-blue font-semibold block mt-0.5">
        {subtitle}
      </span>
    </div>
  );
}

export default function Navbar({ onOpenBooking, isSidebarOpen = true, onToggleSidebar }: NavbarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const sidebarOpen = onToggleSidebar !== undefined ? isSidebarOpen : internalOpen;
  const toggleSidebar = onToggleSidebar || (() => setInternalOpen(!internalOpen));

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "craftsmanship", "process", "lookbook", "fabrics", "rentals", "testimonials", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#", key: "home" },
    { name: "Features", href: "#services", key: "services" },
    { name: "About Me", href: "#craftsmanship", key: "craftsmanship" },
    { name: "Services", href: "#services", key: "services-list" },
    { name: "My Works", href: "#lookbook", key: "lookbook" },
    { name: "News", href: "#testimonials", key: "testimonials" },
    { name: "Shop", href: "#rentals", key: "rentals" },
    { name: "Contacts", href: "#contact", key: "contact" },
  ];

  return (
    <>
      {/* 1. MOBILE TOP STICKY HEADER (Visible ONLY on mobile/tablet < lg) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-blue/40 px-4 py-2.5 flex items-center justify-between shadow-2xl safe-area-inset-top">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-blue/40 bg-black shadow-blue-glow p-0.5 shrink-0">
            <Image
              src="/logo.jpg"
              alt="MS Tailors Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
            />
          </div>
          <div>
            <span className="font-display tracking-[0.2em] text-white font-bold text-xs sm:text-sm block uppercase leading-none">
              MS TAILORS
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-blue font-bold block mt-0.5">
              PANADURA • BESPOKE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 bg-blue-gradient text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg shadow-blue-glow flex items-center gap-1.5"
          >
            <Scissors className="w-3 h-3" />
            <span>Book</span>
          </button>

          <button
            onClick={toggleSidebar}
            aria-label="Open Navigation Menu"
            className="w-9 h-9 rounded-lg bg-obsidian-surface border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow hover:bg-blue/20 transition-all"
          >
            <Menu className="w-4 h-4 text-blue" />
          </button>
        </div>
      </header>

      {/* 2. DESKTOP COLLAPSED VERTICAL TAB STRIP (Visible ONLY on desktop lg:flex when collapsed) */}
      <aside
        onClick={toggleSidebar}
        className={`hidden lg:flex fixed top-0 bottom-0 left-0 z-40 w-12 bg-black/95 border-r border-blue/40 text-white shadow-2xl flex-col items-center justify-between py-6 cursor-pointer hover:bg-black transition-all duration-300 ${
          sidebarOpen ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
        title="Open Navigation Menu"
      >
        <button
          aria-label="Open Navigation Menu"
          className="w-8 h-8 rounded-lg bg-obsidian-surface border border-blue/50 flex items-center justify-center text-blue shadow-blue-glow hover:scale-105 transition-all"
        >
          <Menu className="w-4 h-4 text-blue" />
        </button>

        {/* Small thumbnail logo in the collapsed strip */}
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue/40 my-3 shadow-blue-glow bg-black p-0.5">
          <Image
            src="/logo.jpg"
            alt="MS Tailors Logo"
            width={32}
            height={32}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Vertical Rotated Text: ≡ MENU */}
        <div className="my-auto py-6 [writing-mode:vertical-rl] rotate-180 text-[11px] font-bold tracking-[0.35em] text-white hover:text-blue transition-colors flex items-center gap-2">
          <span>MENU</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
        </div>

        <Scissors className="w-4 h-4 text-blue rotate-45" />
      </aside>

      {/* 3. FULL EXPANDED SIDEBAR DRAWER (Slide-over on mobile, pinned or collapsible on desktop) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] bg-[#0c1017] text-white border-r border-white/10 shadow-2xl transition-transform duration-300 flex flex-col h-full select-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header: Close button + Official Logo (Fixed height, shrink-0) */}
        <div className="shrink-0 p-4 pb-2 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-blue font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              <span>Atelier Panadura</span>
            </span>
            <button
              onClick={toggleSidebar}
              className="w-7 h-7 rounded-full border border-white/15 bg-black/60 text-white/80 hover:text-white hover:border-blue hover:bg-blue/20 flex items-center justify-center transition-all"
              title="Collapse Menu"
            >
              <X className="w-3.5 h-3.5 text-blue" />
            </button>
          </div>

          {/* Official MS Tailors Logo & Brand */}
          <Link href="/" className="block group text-center py-1">
            <div className="relative mx-auto w-24 h-24 rounded-xl overflow-hidden border border-blue/40 bg-black shadow-blue-glow group-hover:border-blue group-hover:shadow-blue-glow-lg transition-all duration-300 p-1.5 flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="MS Tailors — Wear Your Dreams"
                width={120}
                height={120}
                priority
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <span className="font-display tracking-[0.25em] text-white font-bold text-sm block uppercase group-hover:text-blue transition-colors">
                MS TAILORS
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-blue font-semibold block mt-0.5 font-sans">
                PANADURA • BESPOKE
              </span>
            </div>
          </Link>
        </div>

        {/* Middle Navigation List (Scrollable if screen height is constrained) */}
        <nav className="flex-1 overflow-y-auto min-h-0 py-2 px-3 space-y-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.key || (link.key === "home" && activeSection === "home");

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-display font-medium tracking-wider uppercase transition-all ${
                  isActive
                    ? "bg-blue text-white font-bold shadow-blue-glow border-l-2 border-white"
                    : "text-white/80 hover:bg-white/5 hover:text-blue hover:pl-6"
                }`}
              >
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Pinned Footer: Book Appointment & Contact (Fixed height, shrink-0, NEVER cut off) */}
        <div className="shrink-0 p-4 border-t border-white/10 space-y-2.5 bg-[#080b10]">
          <button
            onClick={onOpenBooking}
            className="w-full py-2.5 bg-blue-gradient text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-blue-glow hover:shadow-blue-glow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>

          <div className="pt-1 text-center text-[11px] text-silk-muted space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-white/90">
              <MapPin className="w-3 h-3 text-blue shrink-0" />
              <span className="truncate">{MS_TAILORS_CONTACT.addressShort}</span>
            </div>
            <a
              href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
              className="block text-blue font-semibold hover:underline"
            >
              Hotline: {MS_TAILORS_CONTACT.hotlineMobileDisplay}
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-[10px] text-silk-muted hover:text-blue pt-1 transition-colors"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  );
}

