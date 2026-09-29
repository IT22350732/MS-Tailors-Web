"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LookbookItem } from "@/lib/types";
import { formatLkr, getWhatsAppInquiryUrl } from "@/lib/api";
import { Eye, MessageCircle, X } from "lucide-react";
import { ParallaxBackground, Card3D } from "@/components/Motion3D";

interface LookbookSectionProps {
  items: LookbookItem[];
  onOpenBookingWithLook: (lookTitle: string) => void;
}

export default function LookbookSection({ items, onOpenBookingWithLook }: LookbookSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalItem, setActiveModalItem] = useState<LookbookItem | null>(null);

  const categories = ["All", "Bespoke", "Wedding", "Tuxedos", "Rentals"];

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="lookbook" className="py-28 bg-black relative overflow-hidden border-t border-b border-obsidian-border">
      {/* 3D Visible Parallax Sartorial Background */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2200&q=85"
        alt="MS Tailors Atelier Lookbook"
        opacity={0.65}
        speed={0.16}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3">
              Curated Sartorial Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white drop-shadow-md">
              The Lookbook Collection
            </h2>
            <p className="mt-4 text-silk-silver max-w-xl text-sm sm:text-base font-light">
              Explore bespoke commissions, wedding party attire, black-tie dinner suits, and designer rentals crafted at our Panadura atelier.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue text-white shadow-blue-glow font-bold"
                    : "bg-black/80 backdrop-blur-md border border-white/20 text-silk-silver hover:border-blue hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
            return (
              <Card3D
                key={item.id || item.title}
                intensity={8}
                glare={true}
                className="h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="card-luxury rounded-sm overflow-hidden group cursor-pointer hover:border-blue/80 hover:shadow-blue-glow h-full flex flex-col justify-between bg-black/85 backdrop-blur-md"
                  onClick={() => setActiveModalItem(item)}
                >
                  {/* Image Container with High Visibility */}
                  <div className="relative h-96 overflow-hidden bg-obsidian-elevated">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-2.5 py-1 rounded-sm bg-black/90 backdrop-blur-md border border-blue/50 text-blue text-[10px] font-bold uppercase tracking-widest shadow-blue-glow">
                        {item.category}
                      </span>
                      {item.isRental && (
                        <span className="px-2.5 py-1 rounded-sm bg-blue-950/90 backdrop-blur-md border border-blue-500/60 text-blue-300 text-[10px] font-bold uppercase tracking-widest">
                          Rental Ready
                        </span>
                      )}
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="px-5 py-2.5 bg-blue-gradient text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-blue-glow flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-4 h-4" />
                        <span>View Specifications</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Info */}
                  <div className="p-5 bg-black/90 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg group-hover:text-blue transition-colors mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-silk-silver/90 font-light line-clamp-2 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                      <span className="text-silk-silver font-serif italic text-xs">
                        {item.fabricDetails.split("(")[0]}
                      </span>
                      {item.priceLkr && (
                        <span className="text-blue font-bold font-display text-sm">
                          {formatLkr(item.priceLkr)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            );
          })}
        </div>
      </div>

      {/* Look Detail Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-luxury w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm border border-blue/40 shadow-blue-glow relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-obsidian-card border border-blue/40 text-silk-silver hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
                {/* Modal Image */}
                <div className="relative rounded-sm overflow-hidden h-80 sm:h-full min-h-[350px]">
                  <img
                    src={activeModalItem.imageUrl}
                    alt={activeModalItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/90 backdrop-blur-md border border-blue/40 text-blue text-xs font-bold uppercase tracking-wider rounded-sm shadow-blue-glow">
                      {activeModalItem.category}
                    </span>
                  </div>
                </div>

                {/* Modal Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                      {activeModalItem.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      {activeModalItem.priceLkr && (
                        <div className="text-xl font-display font-bold text-blue">
                          {formatLkr(activeModalItem.priceLkr)}
                          <span className="text-xs text-silk-muted font-sans font-normal ml-1">Bespoke Commission</span>
                        </div>
                      )}
                      {activeModalItem.isRental && activeModalItem.rentalPricePerDayLkr && (
                        <div className="px-2.5 py-1 bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs rounded-sm">
                          Rental: {formatLkr(activeModalItem.rentalPricePerDayLkr)} / day
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-silk-silver font-light leading-relaxed mb-6">
                      {activeModalItem.description}
                    </p>

                    {/* Technical Specs */}
                    <div className="bg-obsidian-surface p-4 rounded-sm border border-obsidian-border space-y-2.5 text-xs mb-6">
                      <div className="flex items-start justify-between">
                        <span className="text-silk-muted">Cloth & Mill:</span>
                        <span className="text-white font-medium text-right max-w-[200px]">
                          {activeModalItem.fabricDetails}
                        </span>
                      </div>
                      {activeModalItem.lapelStyle && (
                        <div className="flex items-center justify-between">
                          <span className="text-silk-muted">Lapel Style:</span>
                          <span className="text-white font-medium">{activeModalItem.lapelStyle}</span>
                        </div>
                      )}
                      {activeModalItem.fitType && (
                        <div className="flex items-center justify-between">
                          <span className="text-silk-muted">Cut & Silhouette:</span>
                          <span className="text-white font-medium">{activeModalItem.fitType}</span>
                        </div>
                      )}
                      {activeModalItem.availableSizes && activeModalItem.availableSizes.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-silk-muted">Sizes Available:</span>
                          <span className="text-blue font-semibold">
                            {activeModalItem.availableSizes.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {activeModalItem.tags && activeModalItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {activeModalItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-obsidian-elevated border border-obsidian-border text-[11px] text-silk-muted"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-obsidian-border">
                    <button
                      onClick={() => {
                        const title = activeModalItem.title;
                        setActiveModalItem(null);
                        onOpenBookingWithLook(title);
                      }}
                      className="flex-1 py-3 bg-blue-gradient text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all"
                    >
                      Book Consultation for This Look
                    </button>

                    <a
                      href={getWhatsAppInquiryUrl(
                        `Hello MS Tailors, I'm inquiring about the "${activeModalItem.title}" shown in your lookbook catalog.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 font-semibold text-xs rounded-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
