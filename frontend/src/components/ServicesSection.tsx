"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Gem, Sparkles, Shirt, Building2, Clock, Check, ArrowRight, MessageCircle } from "lucide-react";
import { ServiceItem } from "@/lib/types";
import { formatLkr, getWhatsAppInquiryUrl } from "@/lib/api";

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
    <section id="services" className="py-24 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-gold tracking-[0.25em] text-xs font-semibold uppercase block mb-3">
              Atelier Commissions & Services
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-silk-ivory">
              Tailored For Distinction
            </h2>
            <p className="mt-4 text-silk-muted max-w-xl text-sm sm:text-base font-light">
              From one-of-a-kind wedding suits to ceremonial rentals and institutional attire, every garment is crafted with uncompromising sartorial discipline.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gold text-obsidian font-bold shadow-gold-glow"
                    : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40 hover:text-silk-ivory"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            const Icon = getIcon(service.iconName);
            const whatsappMsg = `Hello MS Tailors, I'm interested in inquiring about "${service.title}" at your Panadura atelier.`;

            return (
              <motion.div
                key={service.slug || service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card-luxury rounded-sm flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                  
                  {/* Category & Turnaround Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-sm bg-obsidian/85 backdrop-blur-md border border-gold/30 text-gold text-[10px] uppercase font-bold tracking-widest">
                      {service.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-silk-silver">
                    <div className="flex items-center gap-1.5 bg-obsidian/85 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{service.estimatedDays} Days Turnaround</span>
                    </div>
                    <div className="text-right bg-obsidian/85 backdrop-blur-md px-2.5 py-1 rounded-sm border border-gold/30">
                      <span className="text-[10px] text-silk-muted block">Starting From</span>
                      <span className="text-gold font-bold font-display">{formatLkr(service.startingPriceLkr)}</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-sm bg-obsidian-elevated border border-gold/30 flex items-center justify-center text-gold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-silk-ivory group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-silk-muted text-xs sm:text-sm font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6 border-t border-obsidian-border/60 pt-4">
                      {service.detailedFeatures.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-silk-silver/90">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-obsidian-border flex items-center gap-2">
                    <button
                      onClick={() => onOpenBookingWithService(service.title)}
                      className="flex-1 py-2.5 px-3 bg-gold-gradient text-obsidian text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-gold-glow transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Book Fitting</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getWhatsAppInquiryUrl(whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 rounded-sm transition-all"
                      title="Quick Inquiry on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
