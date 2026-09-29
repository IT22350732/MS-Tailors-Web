"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-obsidian-border text-silk-silver text-xs pb-20 sm:pb-10 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info & Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-blue/40 shadow-blue-glow shrink-0 bg-black">
                <Image
                  src="/images/ms-tailors-logo.jpg"
                  alt="MS Tailors Logo"
                  fill
                  className="object-cover"
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
                className="w-8 h-8 rounded-sm bg-obsidian-surface border border-blue/40 text-blue flex items-center justify-center hover:bg-blue hover:text-white transition-colors shadow-blue-glow"
                title="Telephone Hotline"
              >
                <Phone className="w-4 h-4" />
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
                <span className="leading-tight">142, Galle Road, Panadura, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue shrink-0" />
                <span>{MS_TAILORS_CONTACT.hotlineMobileDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue shrink-0" />
                <span>{MS_TAILORS_CONTACT.email}</span>
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
