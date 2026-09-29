"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scissors, Sparkles, MessageCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { getWhatsAppInquiryUrl } from "@/lib/api";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Photography with Pure Black & Electric Blue Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-10000 opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        {/* Layered Pitch Black & Sartorial Blue Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div className="absolute inset-0 bg-radial-highlight opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-start justify-center">
        {/* Official Brand Crest with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-blue/40 bg-black/80 backdrop-blur-md mb-6 shadow-blue-glow"
        >
          <div className="relative w-7 h-7 rounded-sm overflow-hidden border border-blue/50 shrink-0">
            <Image
              src="/images/ms-tailors-logo.jpg"
              alt="MS Tailors"
              fill
              className="object-cover"
            />
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          <span className="text-blue tracking-[0.25em] text-xs font-bold uppercase">
            WEAR YOUR DREAMS • BESPOKE PANADURA
          </span>
        </motion.div>

        {/* Master Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] tracking-tight max-w-4xl"
        >
          Mastery in Every Stitch. <br />
          <span className="text-blue-gradient italic font-serif">Wear Your Dreams</span> in Panadura.
        </motion.h1>

        {/* Subtitle / Story Hook */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-silk-silver max-w-2xl font-light leading-relaxed"
        >
          Individually drafted patterns, floating horsehair canvas construction, and the world&apos;s finest Italian & English wools. Crafted for modern gentlemen across Sri Lanka.
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
            className="group relative overflow-hidden px-8 py-4 bg-blue-gradient text-white font-bold tracking-widest uppercase text-xs sm:text-sm rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-white" />
              <span>Book Private Consultation</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <a
            href="#lookbook"
            className="px-7 py-4 border border-blue/40 hover:border-blue bg-black/60 hover:bg-black/90 backdrop-blur-md text-white hover:text-blue font-medium tracking-widest uppercase text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2"
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
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
              <CheckCircle2 className="w-4 h-4 text-blue" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">30+ Measurements</div>
              <div className="text-xs text-silk-muted">Anatomical precision cut</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
              <Sparkles className="w-4 h-4 text-blue" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">500+ Fine Fabrics</div>
              <div className="text-xs text-silk-muted">VBC, Scabal & Loro Piana</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
              <Scissors className="w-4 h-4 text-blue" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Floating Canvas</div>
              <div className="text-xs text-silk-muted">Artisanal horsehair drape</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-obsidian-card border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
              <span className="font-display font-bold text-xs text-blue">MS</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Panadura & Islandwide</div>
              <div className="text-xs text-silk-muted">Studio & traveling tailor</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gentle Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-silk-muted hover:text-blue flex flex-col items-center gap-1 transition-colors z-20 group"
      >
        <span className="text-[10px] uppercase tracking-widest text-silk-muted group-hover:text-blue">Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-blue" />
      </a>
    </section>
  );
}
