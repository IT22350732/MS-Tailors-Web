"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, ShieldCheck, Users, MessageCircle } from "lucide-react";
import { formatLkr, getWhatsAppInquiryUrl } from "@/lib/api";
import { ParallaxBackground, Card3D } from "./Motion3D";

interface SuitRentalSectionProps {
  onOpenBooking: () => void;
}

export default function SuitRentalSection({ onOpenBooking }: SuitRentalSectionProps) {
  const rentalPackages = [
    {
      title: "Gala Black-Tie Tuxedo Rental",
      rateLkr: 15000,
      period: "3 Days / Event",
      desc: "Impeccable satin shawl or peak lapel black tuxedo with satin-trimmed trousers, crisp wingtip tuxedo shirt, and silk bow tie.",
      features: [
        "Jacket, Trouser & Wingtip Formal Shirt",
        "Satin Bow Tie & Mother-of-Pearl Studs",
        "Complimentary custom sleeve & hem pinning",
        "Hospital-grade ozone dry-cleaning certified",
      ],
      badge: "Most Popular",
    },
    {
      title: "Groom & Groomsmen Wedding Suite",
      rateLkr: 13500,
      period: "3-5 Days Rental",
      desc: "Coordinated royal blue, navy, or charcoal three-piece suits for the groom and groomsmen with matching waistcoats and ties.",
      features: [
        "Jacket, Trouser, Vest & Formal Necktie",
        "Group color coordination guarantee",
        "Free trial fitting 1 week prior to the wedding",
        "Discounted rates for wedding parties of 4+",
      ],
      badge: "Wedding Favorite",
    },
    {
      title: "Corporate & Social Formal Suit",
      rateLkr: 12500,
      period: "2-3 Days Rental",
      desc: "Modern slim-cut charcoal or navy two-piece suits ideal for graduation ceremonies, university balls, and corporate banquets.",
      features: [
        "Tailored Single-Breasted Two-Piece",
        "Executive formal shirt included",
        "Sizes from 36R to 48R in stock",
        "Same-day emergency fitting available",
      ],
      badge: "Executive",
    },
  ];

  return (
    <section id="rentals" className="py-28 bg-black relative overflow-hidden">
      {/* 3D PARALLAX BACKGROUND: HIGH VISIBILITY EVENING BLACK-TIE & SARTORIAL PHOTOGRAPHY */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2400&q=85"
        opacity={0.72}
        speed={0.25}
        overlayGradient="from-black/85 via-black/55 to-black/90"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3"
          >
            Prestige Rental Service
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white"
          >
            Luxury Suit Rentals <br />
            <span className="text-blue-gradient italic font-serif">Tailored to Your Frame</span>
          </motion.h2>
          <div className="w-24 h-0.5 bg-blue mx-auto mt-6 shadow-blue-glow" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-silk-muted text-base sm:text-lg font-light leading-relaxed"
          >
            Never compromise on fit. Unlike ordinary costume rentals, every rental garment at MS Tailors is pinned and custom-adjusted by our master tailors before you walk out the door.
          </motion.p>
        </div>

        {/* 3 Packages Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {rentalPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 35, rotateY: idx === 0 ? -8 : idx === 2 ? 8 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card3D
                intensity={18}
                className={`card-luxury rounded-sm p-8 flex flex-col justify-between relative group hover:border-blue/70 hover:shadow-blue-glow-lg bg-black/85 backdrop-blur-xl h-full ${
                  idx === 0 ? "border-blue/60 shadow-blue-glow" : ""
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue/20 border border-blue/50 text-blue text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-blue-glow">
                    {pkg.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-blue transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-silk-muted font-light leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  <div className="mb-6 p-4 rounded-sm bg-obsidian-surface/90 border border-obsidian-border">
                    <div className="text-xs text-silk-muted mb-0.5">Package Rate</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-display font-bold text-blue">
                        {formatLkr(pkg.rateLkr)}
                      </span>
                      <span className="text-xs text-silk-silver font-light">/ {pkg.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-silk-silver">
                        <Check className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-obsidian-border">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3.5 bg-blue-gradient text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-blue-glow-lg transition-all"
                  >
                    Reserve Fitting Date
                  </button>
                  <a
                    href={getWhatsAppInquiryUrl(
                      `Hello MS Tailors, I would like to reserve a suit rental: "${pkg.title}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 text-xs font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Reservation</span>
                  </a>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* 3 Promises Bar with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-sm bg-black/85 backdrop-blur-xl border border-blue/30 shadow-blue-glow">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-sm bg-black border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Master Tailor Alteration</h4>
              <p className="text-xs text-silk-muted">Trouser length & sleeve cuffs tuned to your posture</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-sm bg-black border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow shrink-0">
              <Sparkles className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Pristine Hygiene Standard</h4>
              <p className="text-xs text-silk-muted">Sterilized and pressed in individual garment covers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-sm bg-black border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow shrink-0">
              <Users className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Groomsmen Party Fittings</h4>
              <p className="text-xs text-silk-muted">Accommodating wedding parties of all sizes with ease</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
