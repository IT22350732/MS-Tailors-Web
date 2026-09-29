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
  const card3DRotate = useTransform(springScroll, [0, 1], [0, -18]);
  const card3DY = useTransform(springScroll, [0, 1], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1200 }}
    >
      {/* 3D PARALLAX BACKGROUND: HIGH VISIBILITY BESPOKE ATELIER PHOTOGRAPHY */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute -inset-12 bg-cover bg-center transition-all duration-300"
        >
          {/* Main high-impact imagery with 75% opacity so cloth textures and tailor atelier are vividly clear */}
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-110 brightness-95"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2400&q=90')`,
              opacity: 0.75,
            }}
          />
        </motion.div>

        {/* Sophisticated gradient mask: darkens slightly on the left for crisp typography while right side stays bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/75" />
        
        {/* Ambient electric blue light pools */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-light/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* FOREGROUND 3D CONTENT CONTAINER */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Brand Story, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* Official Brand Crest with Logo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-blue/50 bg-black/85 backdrop-blur-md mb-6 shadow-blue-glow group hover:border-blue transition-all"
            >
              <div className="relative w-7 h-7 rounded-sm overflow-hidden border border-blue/60 shrink-0 bg-black">
                <Image
                  src="/images/ms-tailors-logo.jpg"
                  alt="MS Tailors"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
              <span className="text-white tracking-[0.25em] text-xs font-bold uppercase">
                MS TAILORS • <span className="text-blue font-extrabold">WEAR YOUR DREAMS</span>
              </span>
            </motion.div>

            {/* Master Heading with 3D Depth */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] tracking-tight max-w-2xl drop-shadow-2xl"
            >
              Mastery in Every Stitch. <br />
              <span className="text-blue-gradient italic font-serif">Wear Your Dreams</span> in Panadura.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-silk-silver max-w-xl font-light leading-relaxed drop-shadow-lg"
            >
              Hand-drafted paper patterns, floating horsehair canvas construction, and the world&apos;s finest European wools. Handcrafted sartorial excellence for distinguished gentlemen across Sri Lanka.
            </motion.p>

            {/* Interactive CTAs */}
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
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <a
                href="#lookbook"
                className="px-7 py-4 border border-blue/50 hover:border-blue bg-black/75 hover:bg-black backdrop-blur-md text-white hover:text-blue font-medium tracking-widest uppercase text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Explore Lookbook</span>
              </a>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 font-semibold tracking-wider text-xs sm:text-sm rounded-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Holographic Atelier Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              style={{ rotateY: card3DRotate, y: card3DY }}
              className="relative w-full max-w-md mx-auto"
            >
              <Card3D
                intensity={20}
                className="card-luxury p-8 rounded-sm border border-blue/50 shadow-blue-glow-lg bg-black/85 backdrop-blur-xl"
              >
                {/* 3D Holographic Header */}
                <div className="flex items-center justify-between border-b border-obsidian-border pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-blue/60 shadow-blue-glow shrink-0 bg-black">
                      <Image
                        src="/images/ms-tailors-logo.jpg"
                        alt="MS Tailors Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-lg leading-tight">
                        MS TAILORS
                      </h3>
                      <p className="text-[10px] text-blue font-bold tracking-[0.2em] uppercase">
                        WEAR YOUR DREAMS
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-sm bg-blue/15 border border-blue/40 text-blue text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    Live Atelier
                  </span>
                </div>

                {/* 3D Interactive Feature Matrix */}
                <div className="space-y-4 mb-6 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-sm bg-obsidian-surface/90 border border-obsidian-border">
                    <span className="text-silk-muted">Location:</span>
                    <span className="text-white font-semibold">142 Galle Rd, Panadura</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-sm bg-obsidian-surface/90 border border-obsidian-border">
                    <span className="text-silk-muted">Canvas Architecture:</span>
                    <span className="text-blue font-bold">100% Floating Horsehair</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-sm bg-obsidian-surface/90 border border-obsidian-border">
                    <span className="text-silk-muted">Turnaround Speed:</span>
                    <span className="text-white font-semibold">Bespoke 21d • Rental 3d</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-sm bg-obsidian-surface/90 border border-obsidian-border">
                    <span className="text-silk-muted">European Mills:</span>
                    <span className="text-white font-semibold">VBC • Scabal • Loro Piana</span>
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
