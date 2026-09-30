"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-obsidian-border text-silk-silver text-xs pb-20 sm:pb-10 pt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info & Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-blue/40 shadow-blue-glow shrink-0 bg-black p-1">
                <Image
                  src="/logo.jpg"
                  alt="MS Tailors — Wear Your Dreams"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-[0.2em] text-white block leading-none">
                  MS TAILORS
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-blue font-bold block mt-1 font-sans">
                  WEAR YOUR DREAMS • PANADURA
                </span>
              </div>
            </div>

            <p className="text-silk-muted text-xs leading-relaxed max-w-sm font-light">
              Panadura&apos;s premier destination for bespoke suits, celebratory wedding attire, floating horsehair canvas tailoring, and designer suit rentals. Handcrafting garments with European distinction since 1985.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-obsidian-surface border border-emerald-500/40 text-emerald-400 flex items-center justify-center hover:bg-emerald-950/40 transition-colors"
                title={`WhatsApp (${MS_TAILORS_CONTACT.hotlineMobileDisplay})`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
                className="w-8 h-8 rounded-xl bg-obsidian-surface border border-blue/40 text-blue flex items-center justify-center hover:bg-blue hover:text-white transition-colors shadow-blue-glow"
                title={`Hotline: ${MS_TAILORS_CONTACT.hotlineMobileDisplay}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={MS_TAILORS_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-obsidian-surface border border-blue/40 text-blue flex items-center justify-center hover:bg-blue hover:text-white transition-colors shadow-blue-glow"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={MS_TAILORS_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-obsidian-surface border border-pink-500/40 text-pink-400 flex items-center justify-center hover:bg-pink-900/40 hover:text-pink-300 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sartorial Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-obsidian-border pb-2">
              Bespoke Services
            </h4>
            <ul className="space-y-2 text-silk-muted">
              <li>
                <a href="#services" className="hover:text-blue transition-colors">
                  Bespoke 2-Piece & 3-Piece
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue transition-colors">
                  Wedding & Groom Attire
                </a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-blue transition-colors">
                  Black-Tie Suit Rentals
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue transition-colors">
                  Bespoke Shirts & Trousers
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue transition-colors">
                  Institutional Uniforms
                </a>
              </li>
            </ul>
          </div>

          {/* European Fabrics */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-obsidian-border pb-2">
              Cloth Heritage
            </h4>
            <ul className="space-y-2 text-silk-muted">
              <li>
                <a href="#fabrics" className="hover:text-blue transition-colors">
                  Vitale Barberis Canonico
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-blue transition-colors">
                  Scabal Savile Row
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-blue transition-colors">
                  Loro Piana Australis
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-blue transition-colors">
                  Spence Bryson Irish Linen
                </a>
              </li>
              <li>
                <a href="#fabrics" className="hover:text-blue transition-colors">
                  Dormeuil Black-Tie Wools
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Coordinates */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-obsidian-border pb-2">
              Panadura Atelier
            </h4>
            <div className="space-y-3 text-silk-muted">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                <span className="leading-tight">{MS_TAILORS_CONTACT.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs leading-relaxed">
                  <a href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`} className="hover:text-blue transition-colors text-white/90 font-medium">
                    Hotline: {MS_TAILORS_CONTACT.hotlineMobileDisplay}
                  </a>
                  <a href={`tel:${MS_TAILORS_CONTACT.phoneRaw}`} className="hover:text-blue transition-colors text-silk-muted text-[11px]">
                    Fixed: {MS_TAILORS_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue shrink-0" />
                <a href={`mailto:${MS_TAILORS_CONTACT.email}`} className="hover:text-blue transition-colors break-all">
                  {MS_TAILORS_CONTACT.email}
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-silk-silver hover:text-blue transition-colors font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue" />
                  <span>Atelier Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-obsidian-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-silk-muted">
          <div>
            © {new Date().getFullYear()} MS Tailors (Panadura). Wear Your Dreams. Handcrafted in Sri Lanka.
          </div>
          <div className="flex items-center gap-6 text-silk-silver">
            <span>Western Province Atelier</span>
            <span>•</span>
            <span className="text-blue font-semibold">Wear Your Dreams</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
