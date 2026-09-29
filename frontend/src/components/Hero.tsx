"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Scissors } from "lucide-react";
import { TailorCrest } from "@/components/Navbar";

interface HeroProps {
  onOpenBooking: () => void;
}

const SLIDES = [
  {
    crestSubtitle: "SINCE 2026 • ATELIER",
    welcome: "Hello and Welcome",
    title: "Your Personal Tailor",
    tagline: "Mastery in Every Stitch • 142 Galle Rd, Panadura",
    buttonText: "SHOP NOW",
  },
  {
    crestSubtitle: "BESPOKE SARTORIAL EXCELLENCE",
    welcome: "Crafted for Distinction",
    title: "Luxury Bespoke Suits",
    tagline: "Authentic Horsehair Canvas • 30+ Precision Measurements",
    buttonText: "BOOK APPOINTMENT",
  },
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax & Depth transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const bgY = useTransform(springScroll, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(springScroll, [0, 1], [1, 1.1]);
  const heroContentY = useTransform(springScroll, [0, 1], ["0%", "14%"]);
  const heroContentOpacity = useTransform(springScroll, [0, 0.8], [1, 0.15]);

  const slide = SLIDES[currentSlide];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* FULL-BLEED MR. MURPHY BACKGROUND (GENTLEMAN IN BESPOKE COAT & RUSTIC WOOD) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute -inset-10 bg-cover bg-center transition-all duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-110 brightness-[0.88]"
            style={{
              backgroundImage: `url('/images/mr_murphy_hero_bg.jpg')`,
            }}
          />
        </motion.div>

        {/* Cinematic Dark Vignette & Subtle Blue Ambient Tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/70" />

        {/* Ambient Royal Blue Light Pools */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-blue/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* CENTER-STAGED FOREGROUND CONTENT (EXACT MATCH FOR MR. MURPHY THEME) */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center"
          >
            {/* 1. Laurel Monogram Crest */}
            <div className="mb-4 sm:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500">
              <TailorCrest
                className="w-44 sm:w-52 md:w-60"
                monogram="MS"
                title="MS. TAILORS"
                subtitle={slide.crestSubtitle}
                variant="blue"
              />
            </div>

            {/* 2. Cursive / Italic Serif Greeting */}
            <p className="font-serif italic text-blue-light/95 text-xl sm:text-2xl lg:text-3xl tracking-wide font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-2">
              {slide.welcome}
            </p>

            {/* 3. Majestic Grand Serif Headline */}
            <h1 className="font-display font-semibold sm:font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-3xl drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)]">
              {slide.title}
            </h1>

            {/* Tagline / Subtitle */}
            <p className="mt-3 text-xs sm:text-sm md:text-base text-silk-silver/90 font-light tracking-[0.2em] uppercase max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {slide.tagline}
            </p>

            {/* 4. Rectangular Outlined Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* Primary Outlined Button matching Mr. Murphy [ SHOP NOW ] */}
              <button
                onClick={onOpenBooking}
                className="group relative px-9 sm:px-12 py-3.5 sm:py-4 border-2 border-blue bg-black/40 hover:bg-blue text-white text-xs sm:text-sm font-bold uppercase tracking-[0.28em] transition-all duration-300 backdrop-blur-md shadow-blue-glow hover:shadow-blue-glow-lg hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Secondary Outlined Button */}
              <a
                href="#lookbook"
                className="px-8 sm:px-10 py-3.5 sm:py-4 border border-white/40 hover:border-white bg-black/30 hover:bg-white/10 text-white/90 hover:text-white text-xs sm:text-sm font-medium uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-sm"
              >
                VIEW LOOKBOOK
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* RIGHT-EDGE VERTICAL SLIDER PAGINATION INDICATORS (■ / □) */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
        {SLIDES.map((_, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-3.5 h-3.5 transition-all duration-300 ${
                isActive
                  ? "bg-blue shadow-blue-glow scale-110"
                  : "bg-transparent border border-white/50 hover:border-white hover:scale-110"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
