"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { ParallaxBackground, Card3D } from "@/components/Motion3D";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Ranil Senanayake",
      role: "Wedding Groom • Colombo",
      suit: "Three-Piece Royal Blue Wedding Suit",
      cloth: "Vitale Barberis Canonico Super 130s",
      rating: 5,
      review:
        "MS Tailors crafted my three-piece wedding suit. The baste fitting process was identical to the Savile Row tailoring houses I visited in London. The drape, chest canvas, and shoulder line were immaculate.",
    },
    {
      name: "Kavinda Wickramasinghe",
      role: "Corporate Executive • Panadura",
      suit: "Black-Tie Gala Tuxedo Rental",
      cloth: "Satin Peak Lapel Evening Wear",
      rating: 5,
      review:
        "Rented a tuxedo for the annual chamber gala. It felt completely bespoke, adjusted to my exact sleeve and trouser length. Impeccable pressing and prompt service right here in Panadura.",
    },
    {
      name: "Mahesh Perera",
      role: "Managing Director • Kalutara",
      suit: "Bespoke Business Wardrobe (5 Suits)",
      cloth: "English Huddersfield Worsted Wool",
      rating: 5,
      review:
        "I have commissioned five two-piece suits over the last two years. The floating horsehair canvas breathes effortlessly in Sri Lanka's tropical climate. Their craftsmanship and archived patterns make re-ordering a breeze.",
    },
  ];

  return (
    <section id="testimonials" className="py-28 bg-black relative overflow-hidden border-t border-b border-obsidian-border">
      {/* 3D Visible Parallax Atelier Fitting Room Background */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2600&q=90"
        opacity={0.70}
        speed={0.18}
        overlayGradient="from-black/85 via-black/55 to-black/90"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3"
          >
            Client Endorsements • Mr. Murphy Inspired Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white drop-shadow-md"
          >
            Words From Distinguished Gentlemen
          </motion.h2>
          <div className="w-20 h-0.5 bg-blue mx-auto mt-6 shadow-blue-glow" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-silk-silver text-sm sm:text-base font-light"
          >
            Discover why grooms, executives, and diplomats across the Western Province and Sri Lanka trust MS Tailors for their most memorable occasions.
          </motion.p>
        </div>

        {/* 3 Testimonials Cards Grid with Pop-Up Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 320, damping: 24, delay: idx * 0.1 }}
            >
              <Card3D
                zoomScale={1.05}
                popY={-8}
                className="card-luxury p-8 rounded-2xl flex flex-col justify-between h-full bg-black/85 backdrop-blur-xl border border-white/10 hover:border-blue/80 hover:shadow-blue-glow group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-blue">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-blue text-blue" />
                      ))}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-obsidian-surface border border-blue/30 flex items-center justify-center text-blue group-hover:border-blue transition-colors">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-silk-silver text-sm font-light leading-relaxed mb-6 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-display font-bold text-base group-hover:text-blue transition-colors">
                      {t.name}
                    </h4>
                    <CheckCircle2 className="w-4 h-4 text-blue shrink-0" />
                  </div>
                  <p className="text-xs text-blue font-semibold mb-2">
                    {t.role}
                  </p>
                  <div className="text-[11px] text-silk-muted">
                    <span className="text-silk-silver">{t.suit}</span> • {t.cloth}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
