"use client";

import { motion } from "framer-motion";
import { MessageSquare, Ruler, Layers, Scissors, CheckCircle2 } from "lucide-react";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      icon: MessageSquare,
      title: "Sartorial Consultation",
      subtitle: "Defining your aesthetic blueprint",
      desc: "We discuss your personal style, event context, silhouette preferences, and whether your garment requires tropical breathability or executive weight.",
    },
    {
      num: "02",
      icon: Ruler,
      title: "The 30+ Measurement Master",
      subtitle: "Anatomical mapping",
      desc: "Our master tailor captures over thirty precise measurements, documenting shoulder slope, chest arch, posture angle, and wrist rotation for an uncompromised fit.",
    },
    {
      num: "03",
      icon: Layers,
      title: "Cloth & Accents Curation",
      subtitle: "The world's premier mills",
      desc: "Select from over 500 hand-curated swatches from Vitale Barberis Canonico, Scabal, Loro Piana, and Irish Linens, paired with custom silk jacquards and genuine horn buttons.",
    },
    {
      num: "04",
      icon: Scissors,
      title: "The Basted Skeleton Fitting",
      subtitle: "Millimeter precision sculpting",
      desc: "Before finishing, you try on a temporary garment basted with white cotton thread and floating horsehair canvas. We drape, adjust, and re-sculpt directly on your frame.",
    },
    {
      num: "05",
      icon: CheckCircle2,
      title: "Final Handcrafted Delivery",
      subtitle: "Perfection unveiled",
      desc: "Your suit is completed with hand-sewn buttonholes, hand-pressed contours, and packaged in our luxury breathable garment case, with your pattern archived in Panadura.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-black relative border-t border-b border-obsidian-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3">
            The Bespoke Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
            The 5-Stage Sartorial Journey
          </h2>
          <div className="w-20 h-0.5 bg-blue mx-auto mt-6 shadow-blue-glow" />
          <p className="mt-6 text-silk-muted text-base sm:text-lg font-light">
            Every garment from MS Tailors is born through a time-honored five-step bespoke ritual, ensuring a silhouette that feels like a natural second skin.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Horizontal Connection Hairline (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue/50 to-transparent -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="card-luxury p-6 rounded-sm flex flex-col justify-between relative group hover:border-blue/60 hover:shadow-blue-glow"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display font-bold text-2xl text-blue/40 group-hover:text-blue transition-colors">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-sm bg-obsidian-elevated border border-blue/40 flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all shadow-blue-glow">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <h4 className="text-xs text-blue uppercase tracking-wider font-semibold mb-3">
                      {step.subtitle}
                    </h4>
                    <p className="text-xs text-silk-muted font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-obsidian-border text-[11px] text-blue font-semibold uppercase tracking-wider">
                    Atelier Standard
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
