"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scissors, Award, Sparkles, Feather } from "lucide-react";
import { ParallaxBackground, Card3D } from "./Motion3D";

export default function CraftsmanshipStory() {
  const pillars = [
    {
      icon: Scissors,
      title: "Individual Paper Patterns",
      desc: "We never cut from generic factory blocks. Every commission begins with drafting a bespoke paper pattern unique to your posture, shoulder slope, and silhouette.",
    },
    {
      icon: Sparkles,
      title: "Floating Horsehair Canvas",
      desc: "Our garments feature natural horsehair and wool chest canvas hand-stitched into the jacket. The canvas molds to your body over time, breathing effortlessly in tropical warmth.",
    },
    {
      icon: Feather,
      title: "Hand-Crafted Milanese Details",
      desc: "Finishing defines the gentleman: hand-stitched pick lapels (AMF stitching), silk-wound Milanese buttonholes, and genuine buffalo horn or mother-of-pearl buttons.",
    },
    {
      icon: Award,
      title: "Archived Anatomical Records",
      desc: "Your fitting specs and stylistic nuances are permanently documented in our Panadura atelier archive, making subsequent bespoke orders effortless.",
    },
  ];

  return (
    <section id="craftsmanship" className="py-28 bg-black relative border-t border-b border-obsidian-border overflow-hidden">
      {/* 3D PARALLAX BACKGROUND: HIGH VISIBILITY ATELIER HANDCRAFT PHOTOGRAPHY */}
      <ParallaxBackground
        imageUrl="/images/lookbook/ms_lookbook_charcoal_suit.jpg"
        opacity={0.45}
        speed={0.2}
        overlayGradient="from-black/90 via-black/60 to-black/90"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3"
          >
            The Bespoke Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white"
          >
            Where Savile Row Tradition <br />
            <span className="text-blue-gradient italic font-serif">Meets Panadura Artistry</span>
          </motion.h2>
          <div className="w-24 h-0.5 bg-blue mx-auto mt-6 shadow-blue-glow" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-silk-silver text-base sm:text-lg leading-relaxed font-light"
          >
            True bespoke is not merely tailored clothing—it is an intimate architectural dialogue between the master craftsman and the patron.
          </motion.p>
        </div>

        {/* Dual Split Showcase with 3D Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Storytelling with 3D Tilt Card */}
          <div className="lg:col-span-5 relative">
            <Card3D intensity={12} className="relative rounded-sm overflow-hidden border border-blue/50 shadow-2xl group">
              <img
                src="/images/lookbook/ms_lookbook_black_tie_suit.jpg"
                alt="MS Tailors Master Craftsmanship"
                className="w-full h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              
              {/* Floating Atelier Badge with Logo */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-sm bg-black/90 backdrop-blur-md border border-blue/50 shadow-blue-glow">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden border border-blue/60 shrink-0 bg-black shadow-blue-glow p-1">
                    <Image
                      src="/logo.jpg"
                      alt="MS Tailors — Wear Your Dreams"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-sm tracking-wide">MS Tailors — Panadura</h4>
                    <p className="text-xs text-blue font-bold tracking-wider">WEAR YOUR DREAMS</p>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Right Column: The 4 Pillars as Interactive 3D Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 25, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 320, damping: 24, delay: idx * 0.1 }}
                >
                  <Card3D
                    zoomScale={1.05}
                    popY={-8}
                    className="card-luxury p-7 rounded-sm relative overflow-hidden group hover:border-blue/80 hover:shadow-blue-glow bg-black/85 backdrop-blur-md"
                  >
                    <div className="w-12 h-12 rounded-sm bg-obsidian-elevated border border-blue/40 flex items-center justify-center text-blue mb-5 group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all shadow-blue-glow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-blue transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-silk-muted text-sm leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue/5 rounded-bl-full pointer-events-none group-hover:bg-blue/15 transition-colors" />
                  </Card3D>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
