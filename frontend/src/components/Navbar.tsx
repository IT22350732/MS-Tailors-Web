"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      {/* Top Sartorial Announcement Bar */}
      <div className="bg-obsidian-card border-b border-obsidian-border/60 text-silk-muted text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gold">
              <Scissors className="w-3 h-3 rotate-45" />
              <span className="tracking-widest uppercase font-medium">Bespoke Savile Row Excellence</span>
            </span>
            <span className="hidden md:inline text-obsidian-border">•</span>
            <span className="hidden md:inline text-silk-muted/80">Panadura Atelier, Western Province, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span>Hotline: {MS_TAILORS_CONTACT.hotlineMobileDisplay}</span>
            </a>
            <span className="text-obsidian-border">•</span>
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 text-emerald-500 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
            <span className="hidden lg:inline text-obsidian-border">•</span>
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1 text-silk-muted/60 hover:text-gold transition-colors text-[11px]"
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
            ? "bg-obsidian/95 backdrop-blur-md border-b border-gold/20 shadow-2xl py-3"
            : "bg-obsidian/70 backdrop-blur-sm border-b border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian-surface group-hover:border-gold group-hover:shadow-gold-glow transition-all">
              <span className="font-display font-bold text-gold text-lg tracking-wider">MS</span>
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] text-silk-ivory block leading-none group-hover:text-gold transition-colors">
                MS TAILORS
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 block mt-1 font-sans">
                Bespoke Atelier • Panadura
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-sm font-medium tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-silk-pearl/80 hover:text-gold transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-400 text-xs font-medium tracking-wider transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Quick Inquiry</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-4 py-2 rounded-sm bg-gold-gradient text-obsidian font-semibold text-xs tracking-wider uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
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
              className="sm:hidden px-2.5 py-1.5 text-xs bg-gold text-obsidian font-semibold uppercase tracking-wider rounded-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-silk-pearl hover:text-gold focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-obsidian-surface/98 border-b border-gold/20 px-6 py-6 transition-all">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-silk-ivory hover:text-gold text-base tracking-wider py-1 border-b border-obsidian-border/40"
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
                  className="w-full py-3 bg-gold-gradient text-obsidian font-bold tracking-wider uppercase text-center rounded-sm shadow-gold-glow"
                >
                  Book Private Fitting
                </button>
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-emerald-500/50 bg-emerald-950/20 text-emerald-400 text-center rounded-sm font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp (+94 77 555 1888)
                </a>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs text-silk-muted/70 hover:text-gold py-1"
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
