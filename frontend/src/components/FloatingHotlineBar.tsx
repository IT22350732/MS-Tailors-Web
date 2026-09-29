"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

interface FloatingHotlineBarProps {
  onOpenBooking: () => void;
}

export default function FloatingHotlineBar({ onOpenBooking }: FloatingHotlineBarProps) {
  return (
    <aside aria-label="Quick contact hotline bar" className="fixed bottom-0 left-0 right-0 z-40 bg-obsidian-card/95 backdrop-blur-md border-t border-gold/30 px-4 py-2.5 shadow-2xl sm:hidden">
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        <a
          href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
          className="flex-1 py-2 px-2.5 rounded-sm bg-obsidian-surface border border-gold/30 text-silk-ivory text-center text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-gold transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-gold" />
          <span>Call Hotline</span>
        </a>

        <a
          href={getWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-2.5 rounded-sm bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-center text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-900/60 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2 px-2.5 rounded-sm bg-gold-gradient text-obsidian text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>
    </aside>
  );
}
