"use client";

import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-obsidian-border text-silk-silver text-xs pb-20 sm:pb-10 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian-surface">
                <span className="font-display font-bold text-gold text-lg">MS</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-[0.2em] text-silk-ivory block leading-none">
                  MS TAILORS
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 block mt-1 font-sans">
                  Bespoke Sartorial House • Panadura
                </span>
              </div>
            </div>

            <p className="text-silk-muted text-xs leading-relaxed max-w-sm font-light">
              Panadura&apos;s premier destination for bespoke suits, celebratory wedding attire, floating horsehair canvas tailoring, and designer suit rentals. Handcrafting garments with European distinction since 2005.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-obsidian-surface border border-emerald-500/40 text-emerald-400 flex items-center justify-center hover:bg-emerald-950/40 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
                className="w-8 h-8 rounded-sm bg-obsidian-surface border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-obsidian transition-colors"
                title="Telephone Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sartorial Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-silk-ivory uppercase tracking-wider mb-4 border-b border-obsidian-border/80 pb-2">
              Bespoke Services
            </h4>
            <ul className="space-y-2 text-silk-muted">
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  Bespoke 2-Piece & 3-Piece
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  Wedding & Groom Attire
                </a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-gold transition-colors">
                  Black-Tie Suit Rentals
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  Bespoke Shirts & Trousers
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  Institutional Uniforms
                </a>
              </li>
            </ul>
          </div>

          {/* European Fabrics */}
          <div>
            <h4 className="font-display font-bold text-sm text-silk-ivory uppercase tracking-wider mb-4 border-b border-obsidian-border/80 pb-2">
              Cloth Heritage
            </h4>
            <ul className="space-y-2 text-silk-muted">
              <li>
                <a href="#fabrics" className="hover:text-gold transition-colors">
                  Vitale Barberis Canonico
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-gold transition-colors">
                  Scabal Savile Row
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-gold transition-colors">
                  Loro Piana Australis
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-gold transition-colors">
                  Spence Bryson Irish Linen
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-gold transition-colors">
                  Dormeuil Black-Tie Wools
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Coordinates */}
          <div>
            <h4 className="font-display font-bold text-sm text-silk-ivory uppercase tracking-wider mb-4 border-b border-obsidian-border/80 pb-2">
              Panadura Atelier
            </h4>
            <div className="space-y-3 text-silk-muted">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span className="leading-tight">142, Galle Road, Panadura, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{MS_TAILORS_CONTACT.hotlineMobileDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{MS_TAILORS_CONTACT.email}</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-silk-silver hover:text-gold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Atelier Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-obsidian-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-silk-muted/70">
          <div>
            © {new Date().getFullYear()} MS Tailors (Panadura). All rights reserved. Handcrafted in Sri Lanka.
          </div>
          <div className="flex items-center gap-6">
            <span>Western Province Atelier</span>
            <span>•</span>
            <span>Bespoke Sartorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
