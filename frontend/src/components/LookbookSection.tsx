"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LookbookItem } from "@/lib/types";
import { formatLkr, getWhatsAppInquiryUrl } from "@/lib/api";
import { Eye, MessageCircle, X } from "lucide-react";

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
    <section id="lookbook" className="py-24 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-gold tracking-[0.25em] text-xs font-semibold uppercase block mb-3">
              Curated Sartorial Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-silk-ivory">
              The Lookbook Collection
            </h2>
            <p className="mt-4 text-silk-muted max-w-xl text-sm sm:text-base font-light">
              Explore bespoke commissions, wedding party attire, black-tie dinner suits, and designer rentals crafted at our Panadura atelier.
            </p>
          </div>

          {/* Category Tabs */}
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

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
            return (
              <motion.div
                key={item.id || item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="card-luxury rounded-sm overflow-hidden group cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                {/* Image Container */}
                <div className="relative h-96 overflow-hidden bg-obsidian-elevated">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-2.5 py-1 rounded-sm bg-obsidian/90 backdrop-blur-md border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    {item.isRental && (
                      <span className="px-2.5 py-1 rounded-sm bg-blue-950/90 backdrop-blur-md border border-blue-500/40 text-blue-300 text-[10px] font-bold uppercase tracking-widest">
                        Rental Ready
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-obsidian/40 backdrop-blur-[2px]">
                    <div className="px-4 py-2 bg-gold-gradient text-obsidian text-xs font-bold uppercase tracking-wider rounded-sm shadow-gold-glow flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>View Specifications</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="p-5 bg-obsidian-card">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-silk-ivory text-lg group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-silk-muted font-light line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-obsidian-border text-xs">
                    <span className="text-silk-silver font-serif italic text-xs">
                      {item.fabricDetails.split("(")[0]}
                    </span>
                    {item.priceLkr && (
                      <span className="text-gold font-bold font-display">
                        {formatLkr(item.priceLkr)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Look Detail Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-luxury w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm border border-gold/40 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-obsidian-card border border-gold/30 text-silk-silver hover:text-gold flex items-center justify-center transition-colors"
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
                    <span className="px-3 py-1 bg-obsidian/90 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider rounded-sm">
                      {activeModalItem.category}
                    </span>
                  </div>
                </div>

                {/* Modal Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-silk-ivory mb-2">
                      {activeModalItem.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      {activeModalItem.priceLkr && (
                        <div className="text-xl font-display font-bold text-gold">
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
                        <span className="text-silk-ivory font-medium text-right max-w-[200px]">
                          {activeModalItem.fabricDetails}
                        </span>
                      </div>
                      {activeModalItem.lapelStyle && (
                        <div className="flex items-center justify-between">
                          <span className="text-silk-muted">Lapel Style:</span>
                          <span className="text-silk-ivory font-medium">{activeModalItem.lapelStyle}</span>
                        </div>
                      )}
                      {activeModalItem.fitType && (
                        <div className="flex items-center justify-between">
                          <span className="text-silk-muted">Cut & Silhouette:</span>
                          <span className="text-silk-ivory font-medium">{activeModalItem.fitType}</span>
                        </div>
                      )}
                      {activeModalItem.availableSizes && activeModalItem.availableSizes.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-silk-muted">Sizes Available:</span>
                          <span className="text-gold font-medium">
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
                      className="flex-1 py-3 bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider rounded-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
                    >
                      Book Consultation for This Look
                    </button>

                    <a
                      href={getWhatsAppInquiryUrl(
                        `Hello MS Tailors, I'm inquiring about the "${activeModalItem.title}" shown in your lookbook catalog.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 font-medium text-xs rounded-sm transition-all flex items-center justify-center gap-2"
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
