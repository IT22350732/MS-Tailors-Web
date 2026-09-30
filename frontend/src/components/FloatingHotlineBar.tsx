"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl } from "@/lib/api";

interface FloatingHotlineBarProps {
  onOpenBooking: () => void;
}

export default function FloatingHotlineBar({ onOpenBooking }: FloatingHotlineBarProps) {
  return (
    <>
      {/* MR. MURPHY ICONIC FLOATING "Chat with us!" PILL (BOTTOM-RIGHT) */}
      <aside aria-label="Floating WhatsApp Inquiry" className="fixed bottom-6 right-6 z-50">
        <a
          href={getWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-white text-black font-semibold text-sm pl-4 pr-1.5 py-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-black/10 hover:shadow-[0_15px_35px_rgba(56,119,246,0.3)] hover:scale-105 transition-all duration-300 select-none"
        >
          <span className="font-display tracking-tight text-gray-900 group-hover:text-blue transition-colors">
            Chat with us!
          </span>
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          </div>
        </a>
      </aside>

      {/* MOBILE BOTTOM HOTLINE BAR */}
      <div aria-label="Quick contact hotline bar" className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-blue/40 px-4 py-2.5 shadow-2xl sm:hidden">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          <a
            href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
            className="flex-1 py-2 px-2.5 rounded-xl bg-obsidian-surface border border-blue/40 text-white text-center text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-blue transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue" />
            <span>Call</span>
          </a>

          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-center text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-900/60 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex-1 py-2 px-2.5 rounded-xl bg-blue-gradient text-white text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-blue-glow"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>
        </div>
      </div>
    </>
  );
}
