"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Gem, Sparkles, Shirt, Building2, Clock, Check, ArrowRight, MessageCircle } from "lucide-react";
import { ServiceItem } from "@/lib/types";
import { formatLkr, getWhatsAppInquiryUrl } from "@/lib/api";
import { ParallaxBackground, Card3D } from "./Motion3D";

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenBookingWithService: (serviceName: string) => void;
}

export default function ServicesSection({ services, onOpenBookingWithService }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Bespoke", "Wedding", "Rentals", "Uniforms"];

  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "gem":
        return Gem;
      case "sparkles":
        return Sparkles;
      case "shirt":
        return Shirt;
      case "building2":
        return Building2;
      default:
        return Scissors;
    }
  };

  return (
    <section id="services" className="py-28 bg-black relative overflow-hidden">
      {/* 3D PARALLAX BACKGROUND: HIGH VISIBILITY ATELIER SUITING WORKSHOP */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=2400&q=85"
        opacity={0.72}
        speed={0.25}
        overlayGradient="from-black/85 via-black/55 to-black/90"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3"
            >
              Atelier Commissions & Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-display font-bold text-white"
            >
              Tailored For Distinction
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-silk-muted max-w-xl text-sm sm:text-base font-light"
            >
              From one-of-a-kind wedding suits to ceremonial rentals and institutional attire, every garment is crafted with uncompromising sartorial discipline.
            </motion.p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue text-white shadow-blue-glow font-bold"
                    : "bg-black/80 border border-obsidian-border text-silk-silver hover:border-blue/50 hover:text-white backdrop-blur-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            const Icon = getIcon(service.iconName);
            const whatsappMsg = `Hello MS Tailors, I'm interested in inquiring about "${service.title}" at your Panadura atelier.`;

            return (
              <motion.div
                key={service.slug || service.title}
                initial={{ opacity: 0, y: 25, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 24, delay: idx * 0.1 }}
              >
                <Card3D
                  zoomScale={1.05}
                  popY={-8}
                  className="card-luxury rounded-sm flex flex-col justify-between overflow-hidden group hover:border-blue/80 hover:shadow-blue-glow bg-black/85 backdrop-blur-xl h-full"
                >
                  {/* Visual Header with rich photography */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-105 brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    
                    {/* Category & Turnaround Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-sm bg-black/90 backdrop-blur-md border border-blue/50 text-blue text-[10px] uppercase font-bold tracking-widest shadow-blue-glow">
                        {service.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-silk-silver">
                      <div className="flex items-center gap-1.5 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-blue" />
                        <span>{service.estimatedDays} Days Turnaround</span>
                      </div>
                      <div className="text-right bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-blue/50">
                        <span className="text-[10px] text-silk-muted block">Starting From</span>
                        <span className="text-blue font-bold font-display">{formatLkr(service.startingPriceLkr)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-sm bg-obsidian-elevated border border-blue/40 flex items-center justify-center text-blue shadow-blue-glow">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-blue transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-silk-muted text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 mb-6 border-t border-obsidian-border pt-4">
                        {service.detailedFeatures.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-silk-silver">
                            <Check className="w-3.5 h-3.5 text-blue shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-obsidian-border flex items-center gap-2">
                      <button
                        onClick={() => onOpenBookingWithService(service.title)}
                        className="flex-1 py-3 px-3 bg-blue-gradient text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-blue-glow transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Book Fitting</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={getWhatsAppInquiryUrl(whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-400 rounded-sm transition-all"
                        title="Quick Inquiry on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
