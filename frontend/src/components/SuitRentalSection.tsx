"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, ShieldCheck, Users, MessageCircle } from "lucide-react";
import { formatLkr, getWhatsAppInquiryUrl } from "@/lib/api";

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
    <section id="rentals" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3">
            Prestige Rental Service
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
            Luxury Suit Rentals <br />
            <span className="text-blue-gradient italic font-serif">Tailored to Your Frame</span>
          </h2>
          <div className="w-20 h-0.5 bg-blue mx-auto mt-6 shadow-blue-glow" />
          <p className="mt-6 text-silk-muted text-base sm:text-lg font-light leading-relaxed">
            Never compromise on fit. Unlike ordinary costume rentals, every rental garment at MS Tailors is pinned and custom-adjusted by our master tailors before you walk out the door.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rentalPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`card-luxury rounded-sm p-7 flex flex-col justify-between relative group hover:border-blue/60 hover:shadow-blue-glow ${
                idx === 0 ? "border-blue/50 shadow-blue-glow" : ""
              }`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-blue/15 border border-blue/40 text-blue text-[10px] font-bold uppercase tracking-wider rounded-sm">
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

                <div className="mb-6 p-4 rounded-sm bg-obsidian-surface border border-obsidian-border">
                  <div className="text-xs text-silk-muted mb-0.5">Package Rate</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-blue">
                      {formatLkr(pkg.rateLkr)}
                    </span>
                    <span className="text-xs text-silk-silver font-light">/ {pkg.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-silk-silver">
                      <Check className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-obsidian-border">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-blue-gradient text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-blue-glow transition-all"
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
            </motion.div>
          ))}
        </div>

        {/* 3 Promises Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-sm bg-obsidian-surface border border-obsidian-border">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-black border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
              <ShieldCheck className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Master Tailor Alteration</h4>
              <p className="text-xs text-silk-muted">Trouser length & sleeve cuffs tuned to your posture</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-black border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
              <Sparkles className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Pristine Hygiene Standard</h4>
              <p className="text-xs text-silk-muted">Sterilized and pressed in individual garment covers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-black border border-blue/30 flex items-center justify-center text-blue shadow-blue-glow">
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
