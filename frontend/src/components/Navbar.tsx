"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scissors, ShieldCheck, MapPin, ChevronDown, Menu, X } from "lucide-react";
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
  subtitle = "SINCE 2026 • ATELIER",
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
    { name: "Home", href: "#", hasDropdown: true, key: "home" },
    { name: "Features", href: "#services", hasDropdown: true, key: "services" },
    { name: "About Me", href: "#craftsmanship", hasDropdown: false, key: "craftsmanship" },
    { name: "Services", href: "#services", hasDropdown: true, key: "services-list" },
    { name: "My Works", href: "#lookbook", hasDropdown: true, key: "lookbook" },
    { name: "News", href: "#testimonials", hasDropdown: true, key: "testimonials" },
    { name: "Shop", href: "#rentals", hasDropdown: false, key: "rentals" },
    { name: "Contacts", href: "#contact", hasDropdown: false, key: "contact" },
  ];

  return (
    <>
      {/* VERTICAL LEFT SIDEBAR (MR. MURPHY ICONIC NAVIGATION) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        {/* Main Sidebar Drawer Area */}
        <div className="w-72 bg-[#0c1017] text-white border-r border-white/10 flex flex-col justify-between overflow-y-auto select-none shadow-2xl relative">
          <div>
            {/* Top Close Button (Desktop & Mobile) */}
            <div className="flex justify-end p-4">
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-full border border-white/10 bg-black/60 text-white/80 hover:text-white hover:border-blue flex items-center justify-center transition-all"
                title="Collapse Menu"
              >
                <X className="w-4 h-4 text-blue" />
              </button>
            </div>

            {/* Mr. Murphy / MS Tailors Monogram Crest */}
            <Link href="/" className="px-6 py-2 block">
              <TailorCrest className="w-full" />
            </Link>

            {/* Vertical Menu Navigation List */}
            <nav className="mt-8 flex flex-col">
              {navLinks.map((link) => {
                const isActive = activeSection === link.key || (link.key === "home" && activeSection === "home");

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) toggleSidebar();
                    }}
                    className={`flex items-center justify-between px-8 py-3.5 text-sm sm:text-base font-display font-medium transition-all ${
                      isActive
                        ? "bg-blue text-white font-bold shadow-blue-glow border-l-4 border-white"
                        : "text-white/85 hover:bg-white/5 hover:text-blue hover:pl-9"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 opacity-70 ${isActive ? "text-white" : "text-blue"}`} />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Area */}
          <div className="p-6 border-t border-white/10 space-y-3 bg-black/40">
            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-blue-gradient text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Scissors className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="pt-2 text-center text-xs text-silk-muted space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-white/90">
                <MapPin className="w-3.5 h-3.5 text-blue" />
                <span>142 Galle Rd, Panadura</span>
              </div>
              <a
                href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
                className="block text-blue font-semibold hover:underline"
              >
                Hotline: {MS_TAILORS_CONTACT.hotlineMobileDisplay}
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-[11px] text-silk-muted hover:text-blue pt-2 transition-colors"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Attached Vertical MENU Toggle Tab Strip (always visible on screen) */}
        <div
          className="flex flex-col items-center justify-between py-6 px-2.5 bg-black/95 border-r border-blue/40 cursor-pointer text-white shadow-2xl hover:bg-black transition-colors"
          onClick={toggleSidebar}
        >
          <button
            aria-label="Toggle Navigation Sidebar"
            className="w-8 h-8 rounded-sm bg-obsidian-surface border border-blue/50 flex items-center justify-center text-blue shadow-blue-glow hover:scale-105 transition-all"
          >
            {sidebarOpen ? <X className="w-4 h-4 text-blue" /> : <Menu className="w-4 h-4 text-blue" />}
          </button>

          {/* Vertical Rotated Text: ≡ MENU */}
          <div className="my-auto py-8 [writing-mode:vertical-rl] rotate-180 text-[11px] font-bold tracking-[0.35em] text-white hover:text-blue transition-colors flex items-center gap-2">
            <span>MENU</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          </div>

          <Scissors className="w-4 h-4 text-blue rotate-45" />
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

