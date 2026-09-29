"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Scissors, Sparkles, MessageCircle, ChevronDown, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { getWhatsAppInquiryUrl } from "@/lib/api";
import { Card3D } from "./Motion3D";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Scroll-linked Parallax and Transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  
  // Background image 3D parallax depth and subtle zoom
  const bgY = useTransform(springScroll, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(springScroll, [0, 1], [1, 1.15]);
  const heroContentY = useTransform(springScroll, [0, 1], ["0%", "18%"]);
  const heroContentOpacity = useTransform(springScroll, [0, 0.75], [1, 0.2]);
  const card3DY = useTransform(springScroll, [0, 1], [0, 40]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* HIGH-VISIBILITY BESPOKE TAILOR SHOP ATELIER BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute -inset-12 bg-cover bg-center transition-all duration-300"
        >
          {/* Master Tailor Shop Photography - 90% Opacity for High Visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-110 brightness-100"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=2600&q=90')`,
              opacity: 0.90,
            }}
          />
        </motion.div>

        {/* Tailored Vignette Overlay - Keeps Tailor Shop Background Distinct & Highlighted */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
        
        {/* Subtle electric blue ambient pools */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-light/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* FOREGROUND CONTENT CONTAINER */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Brand Story, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* Official Tailor Shop Brand Crest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-blue/60 bg-black/85 backdrop-blur-md mb-6 shadow-blue-glow group hover:border-blue transition-all"
            >
              <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-blue/60 shrink-0 bg-black">
                <Image
                  src="/images/ms-tailors-logo.jpg"
                  alt="MS Tailors"
                  fill
                  className="object-cover"
                />
              </div>
              <Scissors className="w-4 h-4 text-blue animate-pulse" />
              <span className="text-white tracking-[0.22em] text-xs font-bold uppercase">
                MS TAILORS • <span className="text-blue font-extrabold">BESPOKE TAILOR SHOP & ATELIER</span>
              </span>
            </motion.div>

            {/* Master Heading with High Visibility Contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.08] tracking-tight max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            >
              Panadura&apos;s Luxury <br />
              <span className="text-blue-gradient italic font-serif">Bespoke Tailor Shop</span> & Suit House.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-silk-silver max-w-xl font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
            >
              Welcome to MS Tailors. Every suit is individually hand-crafted with over 30 precision measurements, authentic floating horsehair canvas, and the world&apos;s finest European wools.
            </motion.p>

            {/* Tailor Shop Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 flex flex-wrap gap-2.5 text-xs"
            >
              <span className="px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-1.5 shadow-md">
                ✂️ Hand-Cut Bespoke Suits
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-1.5 shadow-md">
                📏 30+ Anatomical Fitting Points
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-blue-950/80 backdrop-blur-md border border-blue-500/50 text-blue-300 font-semibold flex items-center gap-1.5 shadow-blue-glow">
                🤵 Wedding & Tuxedo Rentals
              </span>
            </motion.div>

            {/* Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <button
                onClick={onOpenBooking}
                className="group relative overflow-hidden px-8 py-4 bg-blue-gradient text-white font-bold tracking-widest uppercase text-xs sm:text-sm rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-white" />
                  <span>Book Fitting & Measurement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <a
                href="#lookbook"
                className="px-7 py-4 border border-blue/50 hover:border-blue bg-black/85 hover:bg-black backdrop-blur-md text-white hover:text-blue font-medium tracking-widest uppercase text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <span>View Suit Lookbook</span>
              </a>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 border border-emerald-500/50 bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-400 font-semibold tracking-wider text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Hotline</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Tailor Shop Atelier Showcase Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              style={{ y: card3DY }}
              className="relative w-full max-w-md mx-auto"
            >
              <Card3D
                zoomScale={1.05}
                popY={-10}
                className="card-luxury p-7 rounded-sm border border-blue/50 shadow-blue-glow-lg bg-black/90 backdrop-blur-xl"
              >
                {/* Visual Atelier Showcase Preview Image */}
                <div className="relative h-44 rounded-sm overflow-hidden mb-5 border border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85"
                    alt="Bespoke Tailor Shop Panadura"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-blue/50 text-[10px] text-blue font-bold uppercase tracking-wider shadow-blue-glow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Master Tailor In Atelier</span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold drop-shadow">
                    142 Galle Road, Panadura
                  </div>
                </div>

                {/* Brand Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-sm overflow-hidden border border-blue/60 shadow-blue-glow shrink-0 bg-black">
                      <Image
                        src="/images/ms-tailors-logo.jpg"
                        alt="MS Tailors Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base leading-tight">
                        MS TAILORS
                      </h3>
                      <p className="text-[10px] text-blue font-bold tracking-[0.2em] uppercase">
                        WEAR YOUR DREAMS
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-sm bg-blue/15 border border-blue/40 text-blue text-[10px] font-bold uppercase tracking-wider">
                    Est. Panadura
                  </span>
                </div>

                {/* Tailor Shop Specifications */}
                <div className="space-y-2.5 mb-5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-black/70 border border-white/10">
                    <span className="text-silk-muted">Tailoring Service:</span>
                    <span className="text-white font-semibold">Bespoke Suits & Tuxedo Rentals</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-black/70 border border-white/10">
                    <span className="text-silk-muted">Chest Construction:</span>
                    <span className="text-blue font-bold">100% Floating Horsehair Canvas</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-black/70 border border-white/10">
                    <span className="text-silk-muted">Fabric Selection:</span>
                    <span className="text-white font-semibold">VBC • Scabal • Loro Piana</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-black/70 border border-white/10">
                    <span className="text-silk-muted">Delivery Turnaround:</span>
                    <span className="text-emerald-400 font-semibold">Express 3-Day Suits & Rentals</span>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-blue-gradient text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Reserve Atelier Fitting Slot</span>
                </button>
              </Card3D>
            </motion.div>
          </div>
        </div>

        {/* Heritage Trust Badges with 3D Depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/15 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-silk-muted"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-obsidian-card border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow">
              <CheckCircle2 className="w-5 h-5 text-blue" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">30+ Measurements</div>
              <div className="text-xs text-silk-muted">Anatomical precision cut</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-obsidian-card border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow">
              <Sparkles className="w-5 h-5 text-blue" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">500+ Fine Fabrics</div>
              <div className="text-xs text-silk-muted">VBC, Scabal & Loro Piana</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-obsidian-card border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow">
              <Scissors className="w-5 h-5 text-blue" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Floating Canvas</div>
              <div className="text-xs text-silk-muted">Artisanal horsehair drape</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-obsidian-card border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow">
              <ShieldCheck className="w-5 h-5 text-blue" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Panadura & Islandwide</div>
              <div className="text-xs text-silk-muted">Studio & traveling tailor</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gentle Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-silk-muted hover:text-blue flex flex-col items-center gap-1 transition-colors z-20 group"
      >
        <span className="text-[10px] uppercase tracking-widest text-silk-silver group-hover:text-blue">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-blue" />
      </a>
    </section>
  );
}
