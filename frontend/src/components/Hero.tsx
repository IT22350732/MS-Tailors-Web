"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

const HERO_CONTENT = {
  crestSubtitle: "SINCE 1985 • ATELIER",
  welcome: "Hello and Welcome",
  title: "Your Personal Tailor",
  tagline: "Mastery in Every Stitch • No. 28 Station Road, Panadura",
  buttonText: "SHOP NOW",
};

const HERO_BACKGROUNDS = [
  {
    url: "/images/hero/ms_hero_spotlight_bw.jpg",
    alt: "MS Tailors Atelier - Spotlight Bespoke Portrait",
  },
  {
    url: "/images/hero/ms_hero_arms_crossed.jpg",
    alt: "MS Tailors Atelier - Executive Handcrafted Shirt",
  },
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBg, setCurrentBg] = useState(0);

  // Auto-cycle through the background photos every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // 3D Parallax & Depth transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const bgY = useTransform(springScroll, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(springScroll, [0, 1], [1, 1.08]);
  const heroContentY = useTransform(springScroll, [0, 1], ["0%", "14%"]);
  const heroContentOpacity = useTransform(springScroll, [0, 0.8], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* FULL-BLEED BESPOKE PHOTOS (AUTHENTIC MS TAILORS PHOTOSHOOT BACKGROUNDS) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute -inset-10 transition-all duration-300"
        >
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <motion.div
              key={bg.url}
              initial={false}
              animate={{
                opacity: currentBg === idx ? 1 : 0,
                scale: currentBg === idx ? 1.04 : 1,
              }}
              transition={{
                opacity: { duration: 1.6, ease: "easeInOut" },
                scale: { duration: 7, ease: "easeOut" },
              }}
              className="absolute inset-0 bg-cover bg-[center_20%] sm:bg-center filter contrast-110 brightness-[0.82]"
              style={{
                backgroundImage: `url('${bg.url}')`,
              }}
            />
          ))}
        </motion.div>

        {/* Cinematic Dark Vignette & Subtle Blue Ambient Tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-black/85" />

        {/* Ambient Royal Blue Light Pools */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-blue/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* CENTER-STAGED FOREGROUND CONTENT (EXACT MATCH FOR MR. MURPHY THEME) */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center"
        >
          {/* 1. Official MS Tailors Logo Emblem */}
          <div className="mb-6 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-500 flex flex-col items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-blue/50 shadow-blue-glow-lg bg-black/95 p-2 backdrop-blur-md">
              <Image
                src="/logo.jpg"
                alt="MS Tailors — Wear Your Dreams"
                width={220}
                height={220}
                priority
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-blue font-bold mt-3 block font-sans">
              {HERO_CONTENT.crestSubtitle}
            </span>
          </div>

          {/* 2. Cursive / Italic Serif Greeting */}
          <p className="font-serif italic text-blue-light/95 text-xl sm:text-2xl lg:text-3xl tracking-wide font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-2">
            {HERO_CONTENT.welcome}
          </p>

          {/* 3. Majestic Grand Serif Headline */}
          <h1 className="font-display font-semibold sm:font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-3xl drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)]">
            {HERO_CONTENT.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-silk-silver/90 font-light tracking-[0.2em] uppercase max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {HERO_CONTENT.tagline}
          </p>

          {/* 4. Rectangular Outlined Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Primary Outlined Button matching Mr. Murphy [ SHOP NOW ] */}
            <button
              onClick={onOpenBooking}
              className="group relative px-9 sm:px-12 py-3.5 sm:py-4 border-2 border-blue bg-black/40 hover:bg-blue text-white text-xs sm:text-sm font-bold uppercase tracking-[0.28em] transition-all duration-300 backdrop-blur-md shadow-blue-glow hover:shadow-blue-glow-lg hover:scale-105 rounded-full"
            >
              <span className="flex items-center gap-2">
                <span>{HERO_CONTENT.buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Secondary Outlined Button */}
            <a
              href="#lookbook"
              className="px-8 sm:px-10 py-3.5 sm:py-4 border border-white/40 hover:border-white bg-black/30 hover:bg-white/10 text-white/90 hover:text-white text-xs sm:text-sm font-medium uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-sm rounded-full"
            >
              VIEW LOOKBOOK
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Background Photo Switcher Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_BACKGROUNDS.map((bg, idx) => (
          <button
            key={bg.url}
            onClick={() => setCurrentBg(idx)}
            aria-label={`Switch to background photo ${idx + 1}`}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              currentBg === idx
                ? "w-8 bg-blue shadow-blue-glow"
                : "w-2.5 bg-white/30 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
