"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Calendar, Menu, X, Scissors, ShieldCheck, MapPin, Clock } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link spy
      const sections = ["services", "craftsmanship", "process", "lookbook", "fabrics", "rentals", "testimonials", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
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
    { name: "HOME", href: "#" },
    { name: "SERVICES", href: "#services" },
    { name: "CRAFTSMANSHIP", href: "#craftsmanship" },
    { name: "PROCESS", href: "#process" },
    { name: "LOOKBOOK", href: "#lookbook" },
    { name: "FABRIC MILLS", href: "#fabrics" },
    { name: "RENTALS", href: "#rentals" },
    { name: "REVIEWS", href: "#testimonials" },
    { name: "ATELIER", href: "#contact" },
  ];

  return (
    <>
      {/* Top Utility Bar - Mr. Murphy Bespoke Tailoring Style */}
      <div className="bg-black border-b border-white/10 text-silk-muted text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Location & Atelier Fitting Hours */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-silk-silver">
              <MapPin className="w-3.5 h-3.5 text-blue" />
              <span>142 Galle Road, Panadura, Sri Lanka</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-silk-silver">
              <Clock className="w-3.5 h-3.5 text-blue" />
              <span>Mon – Sat: 9:00 AM – 7:30 PM (Sun: by Appt)</span>
            </span>
          </div>

          {/* Right: Phone Hotline & WhatsApp Concierge */}
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
              className="flex items-center gap-1.5 text-silk-silver hover:text-blue transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue" />
              <span>Hotline: <strong className="text-white font-semibold">{MS_TAILORS_CONTACT.hotlineMobileDisplay}</strong></span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Chat</span>
            </a>
            <span className="hidden lg:inline text-white/20">•</span>
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1 text-silk-muted hover:text-blue transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Header Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-blue/40 shadow-2xl py-3"
            : "bg-black/90 backdrop-blur-md border-b border-white/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Logo Emblem */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-blue/50 shadow-blue-glow group-hover:border-blue transition-all bg-black shrink-0">
              <Image
                src="/images/ms-tailors-logo.jpg"
                alt="MS Tailors Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.25em] text-white block leading-none group-hover:text-blue transition-colors">
                MS TAILORS
              </span>
              <span className="text-[10px] tracking-[0.28em] uppercase text-blue font-bold block mt-1">
                CUSTOM TAILORING & BESPOKE ATELIER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Mr. Murphy Centered Layout) */}
          <nav className="hidden xl:flex items-center space-x-6 text-[12px] font-bold tracking-[0.2em]">
            {navLinks.map((link) => {
              const isActive =
                (link.href === "#" && activeSection === "home") ||
                link.href === `#${activeSection}`;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-all py-1.5 relative group uppercase ${
                    isActive ? "text-blue font-extrabold" : "text-white/80 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Active / Hover Laser Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue transition-all duration-300 shadow-blue-glow ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action CTAs (Mr. Murphy Iconic Style with Pop-up Zoom) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-sm border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 text-xs font-semibold tracking-wider transition-all shadow-sm hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp Inquire</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-5 py-2.5 rounded-sm bg-blue-gradient text-white font-bold text-xs tracking-widest uppercase shadow-blue-glow hover:shadow-blue-glow-lg transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Scissors className="w-3.5 h-3.5 text-white" />
                <span>Book Appointment</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs bg-blue text-white font-bold uppercase tracking-wider rounded-sm shadow-blue-glow"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-blue focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-black/98 border-b border-blue/40 px-6 py-6 transition-all shadow-2xl">
            <div className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-blue text-sm tracking-[0.18em] py-2 border-b border-white/10 font-bold"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 bg-blue-gradient text-white font-bold tracking-widest uppercase text-center rounded-sm shadow-blue-glow text-xs flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Book Atelier Appointment</span>
                </button>
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 text-center rounded-sm font-semibold flex items-center justify-center gap-2 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+94 77 555 1888)</span>
                </a>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs text-silk-muted hover:text-blue py-1"
                >
                  Atelier Admin Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

