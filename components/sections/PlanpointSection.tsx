"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2, Download } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";
const PLANPOINT_URL = "https://app.planpoint.io/azurea/william?transparent=true";

// ─── Mock Data for Availability List ───────────────────────────────────────
type VillaStatus = "Available" | "Reserved" | "Sold";

const VILLAS = [
  { id: "01", size: "155.8 m²", beds: 3, baths: 3, status: "Sold" as VillaStatus },
  { id: "02", size: "155.8 m²", beds: 3, baths: 3, status: "Available" as VillaStatus },
  { id: "03", size: "155.8 m²", beds: 3, baths: 3, status: "Available" as VillaStatus },
  { id: "04", size: "155.8 m²", beds: 3, baths: 3, status: "Reserved" as VillaStatus },
  { id: "05", size: "155.8 m²", beds: 3, baths: 3, status: "Sold" as VillaStatus },
  { id: "06", size: "155.8 m²", beds: 3, baths: 3, status: "Available" as VillaStatus },
  { id: "07", size: "155.8 m²", beds: 3, baths: 3, status: "Available" as VillaStatus },
  { id: "08", size: "155.8 m²", beds: 3, baths: 3, status: "Available" as VillaStatus },
];

export default function PlanpointSection() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  // Inject preconnect hints early
  useEffect(() => {
    const hints: [string, string][] = [
      ["preconnect", "https://app.planpoint.io"],
      ["dns-prefetch", "https://app.planpoint.io"],
    ];
    hints.forEach(([rel, href]) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  // Fallback loader removal
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 12000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="masterplan" className="bg-brand-black border-t border-white/10 flex flex-col">
      
      {/* ─── Header ─── */}
      <div className="px-6 md:px-12 lg:px-16 py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-white/10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-4"
            style={{ color: GOLD }}
          >
            <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
            Interactive Masterplan
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-display text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)", letterSpacing: "var(--tracking-heading)" }}
          >
            Explore the Estate
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row gap-4 items-start md:items-center"
        >
          <p className="text-cream/50 text-sm max-w-xs md:text-right">
            Navigate the 3D estate to view real-time availability and individual villa positioning.
          </p>
          <button className="hidden lg:flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-[#C9A55A]/50 hover:bg-white/5 transition-colors duration-300 rounded-sm group">
            <Download size={14} className="text-[#C9A55A] group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest text-cream">Floorplans</span>
          </button>
        </motion.div>
      </div>

      {/* ─── Split Screen Layout ─── */}
      <div className="flex flex-col lg:flex-row w-full border-b border-white/10" style={{ height: "80vh", minHeight: "650px" }}>
        
        {/* 1. LEFT: 3D Viewer (65%) */}
        <div className="w-full lg:w-[65%] h-[50vh] lg:h-full relative shrink-0">
          
          {/* Overlays */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 drop-shadow-md">Azurea</span>
            <span className="text-[9px] uppercase tracking-widest text-cream/40 drop-shadow-md">Seseh, Bali</span>
          </div>
          
          <div className="absolute bottom-5 right-5 z-20 pointer-events-none flex items-center gap-2 bg-brand-black/50 px-3 py-1.5 backdrop-blur-md border border-white/10 rounded-sm">
            <Maximize2 size={12} className="text-cream/60" />
            <span className="text-[9px] uppercase tracking-widest text-cream/70">Interactive 3D</span>
          </div>

          {/* Loading Skeleton */}
          <motion.div
            animate={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-brand-black flex flex-col items-center justify-center gap-4 z-10"
          >
            <div className="w-6 h-6 rounded-full border-2 border-[#C9A55A]/20 border-t-[#C9A55A] animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30">Loading Masterplan</p>
          </motion.div>

          {/* Iframe */}
          <iframe
            src={PLANPOINT_URL}
            className="w-full h-full border-0"
            style={{ background: "transparent" }} // Swapped from "#08204D" to "transparent"
            allowTransparency={true} // Tells the browser to allow the parent background through
            allowFullScreen
            allow="autoplay; fullscreen; vr"
            title="Azurea Interactive Masterplan"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* 2. RIGHT: Availability List (35%) */}
        <div className="w-full lg:w-[35%] h-[50vh] lg:h-full bg-brand-black border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col relative">
          
          {/* Table Header */}
          <div className="sticky top-0 bg-brand-black/95 backdrop-blur-md z-10 px-6 py-4 border-b border-white/10 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-cream/40">
            <div className="w-16">Unit</div>
            <div className="flex-1">Details</div>
            <div className="w-24 text-right">Status</div>
          </div>

          {/* Scrollable List */}
          {/* Custom slim scrollbar styles applied via Tailwind arbitrary variants */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            {VILLAS.map((villa) => {
              const isAvailable = villa.status === "Available";
              const isReserved = villa.status === "Reserved";
              const isSold = villa.status === "Sold";

              return (
                <div
                  key={villa.id}
                  onMouseEnter={() => setHoveredUnit(villa.id)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  className={`px-6 py-5 border-b border-white/5 flex items-center justify-between transition-colors duration-300 cursor-default ${
                    hoveredUnit === villa.id ? "bg-white/[0.03]" : "bg-transparent"
                  } ${isSold ? "opacity-60" : "opacity-100"}`}
                >
                  {/* Unit Number */}
                  <div className="w-16 flex flex-col">
                    <span className="text-cream font-display text-lg">V{villa.id}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-1">
                    <span className={`text-sm ${isSold ? "text-cream/50 line-through decoration-white/20" : "text-cream/90"}`}>
                      {villa.size}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-cream/40">
                      {villa.beds} Bed · {villa.baths} Bath
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="w-24 flex justify-end">
                    <div className={`px-2.5 py-1 text-[9px] uppercase tracking-widest rounded-sm border backdrop-blur-sm flex items-center gap-1.5 ${
                      isAvailable 
                        ? "border-[#C9A55A]/30 text-[#C9A55A] bg-[#C9A55A]/5" 
                        : isReserved
                        ? "border-amber-200/20 text-amber-200/80 bg-amber-200/5"
                        : "border-white/10 text-white/40 bg-white/5"
                    }`}>
                      {isAvailable && <div className="w-1 h-1 rounded-full bg-[#C9A55A] animate-pulse" />}
                      {isReserved && <div className="w-1 h-1 rounded-full bg-amber-200/60" />}
                      {villa.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom Fade Gradient for List */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-brand-black to-transparent pointer-events-none" />
        </div>
        
      </div>
    </section>
  );
}