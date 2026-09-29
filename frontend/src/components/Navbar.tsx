"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Calendar, Menu, X, Scissors, ShieldCheck } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Craftsmanship", href: "#craftsmanship" },
    { name: "Lookbook", href: "#lookbook" },
    { name: "Fabric Mills", href: "#fabrics" },
    { name: "Suit Rentals", href: "#rentals" },
    { name: "The Process", href: "#process" },
    { name: "Panadura Atelier", href: "#contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar - Pure Black with Electric Blue accents */}
      <div className="bg-obsidian border-b border-obsidian-border text-silk-muted text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue font-semibold">
              <Scissors className="w-3.5 h-3.5 rotate-45 text-blue" />
              <span className="tracking-[0.2em] uppercase text-white font-medium text-[11px]">
                MS TAILORS — BESPOKE TAILOR SHOP & ATELIER
              </span>
            </span>
            <span className="hidden md:inline text-obsidian-border">•</span>
            <span className="hidden md:inline text-silk-muted">142 Galle Road, Panadura, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
              className="flex items-center gap-1.5 hover:text-blue text-silk-silver transition-colors"
            >
              <Phone className="w-3 h-3 text-blue" />
              <span>Hotline: {MS_TAILORS_CONTACT.hotlineMobileDisplay}</span>
            </a>
            <span className="text-obsidian-border">•</span>
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 text-emerald-400 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
            <span className="hidden lg:inline text-obsidian-border">•</span>
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1 text-silk-muted hover:text-blue transition-colors text-[11px]"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-blue/30 shadow-2xl py-2.5"
            : "bg-black/80 backdrop-blur-sm border-b border-white/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-sm overflow-hidden border border-blue/40 shadow-blue-glow group-hover:border-blue transition-all bg-black shrink-0">
              <Image
                src="/images/ms-tailors-logo.jpg"
                alt="MS Tailors Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] text-white block leading-none group-hover:text-blue transition-colors">
                MS TAILORS
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-blue font-bold block mt-1">
                WEAR YOUR DREAMS • PANADURA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-sm font-medium tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-blue transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 text-xs font-semibold tracking-wider transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Quick Inquiry</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-5 py-2.5 rounded-sm bg-blue-gradient text-white font-bold text-xs tracking-widest uppercase shadow-blue-glow hover:shadow-blue-glow-lg transition-all"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Fitting</span>
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
          <div className="xl:hidden bg-black/98 border-b border-blue/30 px-6 py-6 transition-all">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-blue text-base tracking-wider py-1 border-b border-obsidian-border"
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
                  className="w-full py-3 bg-blue-gradient text-white font-bold tracking-widest uppercase text-center rounded-sm shadow-blue-glow"
                >
                  Book Private Fitting
                </button>
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 text-center rounded-sm font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp (+94 77 555 1888)
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
