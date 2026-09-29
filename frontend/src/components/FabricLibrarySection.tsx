"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FabricSwatch } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { getWhatsAppInquiryUrl } from "@/lib/api";

interface FabricLibrarySectionProps {
  fabrics: FabricSwatch[];
  onOpenBooking: () => void;
}

export default function FabricLibrarySection({ fabrics, onOpenBooking }: FabricLibrarySectionProps) {
  const [selectedColor, setSelectedColor] = useState<string>("All");

  const colorFilters = ["All", "Navy", "Charcoal", "Black", "Earth"];

  const filteredFabrics = selectedColor === "All"
    ? fabrics
    : fabrics.filter((f) => f.colorFamily.toLowerCase() === selectedColor.toLowerCase());

  return (
    <section id="fabrics" className="py-24 bg-black relative border-t border-b border-obsidian-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3">
              European Mill Partnerships
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
              The Fabric & Mill Library
            </h2>
            <p className="mt-4 text-silk-muted max-w-xl text-sm sm:text-base font-light">
              We import directly from Biella, Huddersfield, and Belfast. Experience Super 110s to 150s virgin wools, Irish linens, and velvet weaves curated for elegance and tropical drape.
            </p>
          </div>

          {/* Color Family Filters */}
          <div className="flex flex-wrap gap-2">
            {colorFilters.map((col) => (
              <button
                key={col}
                onClick={() => setSelectedColor(col)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all ${
                  selectedColor === col
                    ? "bg-blue text-white shadow-blue-glow font-bold"
                    : "bg-obsidian border border-obsidian-border text-silk-silver hover:border-blue/50 hover:text-white"
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Fabric Swatch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFabrics.map((fabric, idx) => {
            return (
              <motion.div
                key={fabric.code || fabric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="card-luxury rounded-sm overflow-hidden flex flex-col justify-between group hover:border-blue/60 hover:shadow-blue-glow"
              >
                {/* Texture Visual */}
                <div className="relative h-48 overflow-hidden bg-obsidian-elevated">
                  <img
                    src={fabric.textureImageUrl}
                    alt={fabric.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Mill Stamp */}
                  <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md px-3 py-1 rounded-sm border border-blue/40 text-blue text-[10px] uppercase font-bold tracking-widest shadow-blue-glow">
                    {fabric.country}
                  </div>

                  {/* Color Swatch Dot */}
                  <div
                    className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white/40 shadow-md"
                    style={{ backgroundColor: fabric.colorHex }}
                    title={`Color: ${fabric.colorFamily}`}
                  />

                  {/* Technical Badge Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-silk-silver">
                    <span className="bg-black/90 backdrop-blur-md px-2 py-0.5 rounded-sm border border-white/10 font-mono">
                      {fabric.code}
                    </span>
                    <span className="bg-black/90 backdrop-blur-md px-2 py-0.5 rounded-sm border border-blue/40 text-blue font-semibold">
                      {fabric.weightGsm} GSM • {fabric.season}
                    </span>
                  </div>
                </div>

                {/* Swatch Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-blue uppercase tracking-wider font-bold mb-1">
                      {fabric.millOrigin}
                    </div>
                    <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-blue transition-colors">
                      {fabric.name}
                    </h3>

                    <p className="text-xs text-silk-muted font-light leading-relaxed mb-4">
                      {fabric.description}
                    </p>

                    <div className="bg-black p-3 rounded-sm border border-obsidian-border space-y-1.5 text-xs text-silk-silver mb-4">
                      <div className="flex justify-between">
                        <span className="text-silk-muted">Composition:</span>
                        <span className="font-medium text-white">{fabric.composition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-silk-muted">Weave Type:</span>
                        <span className="font-medium text-white">{fabric.weave}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-obsidian-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available in Atelier</span>
                    </div>

                    <a
                      href={getWhatsAppInquiryUrl(
                        `Hello MS Tailors, I would like to see the cloth swatch for "${fabric.name}" (Code: ${fabric.code}) during my consultation.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue hover:text-white flex items-center gap-1 transition-colors font-semibold"
                    >
                      <span>Inquire Swatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mill Trust Banner */}
        <div className="mt-16 p-8 rounded-sm bg-obsidian-surface border border-blue/40 shadow-blue-glow text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-display font-bold text-white mb-1">
              Desire a Specific Mill or Pattern?
            </h4>
            <p className="text-xs sm:text-sm text-silk-muted font-light">
              We can source specialty cloth books directly from England and Italy for high-profile commissions.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-blue-gradient text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all shrink-0"
          >
            Schedule Swatch Viewing
          </button>
        </div>
      </div>
    </section>
  );
}
