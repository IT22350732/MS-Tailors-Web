"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, MessageCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { getWhatsAppInquiryUrl } from "@/lib/api";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background Photography with Sophisticated Dark Luxury Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        {/* Layered Sartorial Gradients for Obsidian & Deep Navy Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
        <div className="absolute inset-0 bg-radial-highlight opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-start justify-center">
        {/* Atelier Heritage Crest / Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian-card/80 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold tracking-[0.25em] text-xs font-semibold uppercase">
            Panadura&apos;s Premier Bespoke Tailoring House
          </span>
        </motion.div>

        {/* Master Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-silk-ivory leading-[1.08] tracking-tight max-w-4xl"
        >
          Mastery in Every Stitch. <br />
          <span className="text-gold-gradient italic font-serif">Sartorial Grandeur</span> Tailored for You.
        </motion.h1>

        {/* Subtitle / Story Hook */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-silk-silver/90 max-w-2xl font-light leading-relaxed"
        >
          Individually drafted patterns, floating horsehair canvas construction, and the world&apos;s finest Italian & English wools. Serving Panadura, Colombo, and distinguished gentlemen across Sri Lanka.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
        >
          <button
            onClick={onOpenBooking}
            className="group relative overflow-hidden px-8 py-4 bg-gold-gradient text-obsidian font-bold tracking-widest uppercase text-xs sm:text-sm rounded-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <span>Book Private Consultation</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <a
            href="#lookbook"
            className="px-7 py-4 border border-gold/40 hover:border-gold bg-obsidian-surface/60 hover:bg-obsidian-surface backdrop-blur-md text-silk-ivory hover:text-gold font-medium tracking-widest uppercase text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2"
          >
            <span>Explore Lookbook</span>
          </a>

          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-4 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 font-medium tracking-wider text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Atelier</span>
          </a>
        </motion.div>

        {/* Heritage Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-silk-muted"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-gold/20 flex items-center justify-center text-gold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-silk-ivory font-semibold text-sm">30+ Measurements</div>
              <div className="text-xs text-silk-muted">Anatomical precision cut</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-gold/20 flex items-center justify-center text-gold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-silk-ivory font-semibold text-sm">500+ Fine Fabrics</div>
              <div className="text-xs text-silk-muted">VBC, Scabal & Loro Piana</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-gold/20 flex items-center justify-center text-gold">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <div className="text-silk-ivory font-semibold text-sm">Floating Canvas</div>
              <div className="text-xs text-silk-muted">Artisanal horsehair drape</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-gold/20 flex items-center justify-center text-gold">
              <span className="font-display font-bold text-xs">LK</span>
            </div>
            <div>
              <div className="text-silk-ivory font-semibold text-sm">Panadura & Islandwide</div>
              <div className="text-xs text-silk-muted">Studio & traveling tailor</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gentle Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-silk-muted hover:text-gold flex flex-col items-center gap-1 transition-colors z-20 group"
      >
        <span className="text-[10px] uppercase tracking-widest">Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold" />
      </a>
    </section>
  );
}
