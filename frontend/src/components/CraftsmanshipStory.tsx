"use client";

import { motion } from "framer-motion";
import { Scissors, Award, Sparkles, Feather } from "lucide-react";

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
    <section id="craftsmanship" className="py-24 bg-obsidian-surface relative border-t border-b border-obsidian-border/80">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-highlight opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold tracking-[0.25em] text-xs font-semibold uppercase block mb-3">
            The Bespoke Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-silk-ivory">
            Where Savile Row Tradition <br />
            <span className="text-gold-gradient italic font-serif">Meets Panadura Artistry</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold/50 mx-auto mt-6" />
          <p className="mt-6 text-silk-silver text-base sm:text-lg leading-relaxed font-light">
            True bespoke is not merely tailored clothing—it is an intimate architectural dialogue between the master craftsman and the patron.
          </p>
        </div>

        {/* Dual Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80"
                alt="MS Tailors Master Craftsmanship"
                className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
              
              {/* Floating Atelier Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-sm bg-obsidian-card/90 backdrop-blur-md border border-gold/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-bold text-sm">
                    MS
                  </div>
                  <div>
                    <h4 className="text-silk-ivory font-display font-bold text-sm">Panadura Sartorial Heritage</h4>
                    <p className="text-xs text-gold font-light">Over two decades of bespoke excellence in Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The 4 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card-luxury p-6 rounded-sm relative overflow-hidden group"
                >
                  <div className="w-12 h-12 rounded-sm bg-obsidian-elevated border border-gold/20 flex items-center justify-center text-gold mb-5 group-hover:border-gold/60 group-hover:shadow-gold-glow transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-silk-ivory mb-2 group-hover:text-gold transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-silk-muted text-sm leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
