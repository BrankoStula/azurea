// components/sections/PlanpointSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Download, ArrowLeft } from "lucide-react";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";
const PLANPOINT_BASE_URL = "https://app.planpoint.io/azurea/william?transparent=true";

type VillaStatus = "Available" | "Reserved" | "Sold";

type Villa = {
  id: string;
  planpointId: string;
  built: string;
  land: string;
  beds: number;
  baths: number;
  status: VillaStatus;
  image: string;
};

const VILLAS: Villa[] = [
  { id: "01", planpointId: "69ea4796e802aa174bc2ca7c", built: "155.8 m²", land: "162 m²", beds: 3, baths: 3, status: "Sold",      image: "/floorplans/villa_1.jpg" },
  { id: "02", planpointId: "69ea47d1e802aa174bc2d6ee", built: "155.8 m²", land: "157 m²", beds: 3, baths: 3, status: "Available", image: "/floorplans/villa_2.jpg" },
  { id: "03", planpointId: "69ea47d8d49cbdc688e15cf7", built: "155.8 m²", land: "154 m²", beds: 3, baths: 3, status: "Available", image: "/floorplans/villa_3.jpg" },
  { id: "04", planpointId: "69ea47dd9e8ac7a07667f593", built: "155.8 m²", land: "151 m²", beds: 3, baths: 3, status: "Reserved",  image: "/floorplans/villa_4.jpg" },
  { id: "05", planpointId: "69ea47e148ba5cb0e493ebc4", built: "155.8 m²", land: "151 m²", beds: 3, baths: 3, status: "Sold",      image: "/floorplans/villa_5.jpg" },
  { id: "06", planpointId: "69ea47e6d49cbdc688e15d13", built: "157.9 m²", land: "164 m²", beds: 3, baths: 3, status: "Available", image: "/floorplans/villa_6.jpg" },
  { id: "07", planpointId: "69ea47ecf3eb27d6ae167ff6", built: "157.9 m²", land: "150 m²", beds: 3, baths: 3, status: "Available", image: "/floorplans/villa_7_8.jpg" },
  { id: "08", planpointId: "69ea47f1873b1ce46c076f0c", built: "157.9 m²", land: "150 m²", beds: 3, baths: 3, status: "Available", image: "/floorplans/villa_7_8.jpg" },
];

export default function PlanpointSection() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [floorplanVilla, setFloorplanVilla] = useState<Villa | null>(null);

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

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const handleVillaClick = (villa: Villa) => {
    setFloorplanVilla(prev => (prev?.id === villa.id ? null : villa));
  };

  return (
    <section id="masterplan" className="relative bg-brand-black border-t border-cream/10 flex flex-col">

      {/* ─── Background Decoration ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Radiating Architectural Contour Lines (Bottom Left to Top Right) */}
        <div className="absolute bottom-0 left-0 w-full h-[150%] opacity-60">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g stroke={GOLD} strokeWidth="0.7" fill="none">
              {Array.from({ length: 18 }).map((_, i) => {
                const startY = 1000 + (i * 20);
                const controlX1 = 200 + (i * 50);
                const controlY1 = 800 - (i * 30);
                const controlX2 = 600 + (i * 10);
                const controlY2 = 200 - (i * 40);
                const endX = 1200;
                const endY = -100 + (i * 60);

                return (
                  <path 
                    key={i} 
                    d={`M-100,${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`} 
                    opacity={0.5 - (i * 0.02)} 
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Massive Top Right Plant */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/top_right_leaves_3.jpg" 
          alt="" 
          className="absolute -top-24 -right-24 w-80 lg:w-[50rem] opacity-15 object-contain object-top object-right transform rotate-[15deg]"
          style={{ mixBlendMode: 'multiply' }} 
        />
      </div>

      {/* ─── Header ─── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-cream/10">
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
            className="font-display text-cream leading-tight drop-shadow-xl"
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
          <p className="text-cream/50 text-sm max-w-xs md:text-right drop-shadow-md">
            Select a villa to view its floorplan, or explore the 3D estate for real-time availability.
          </p>
          <button className="hidden lg:flex items-center gap-2 px-5 py-3 border border-cream/10 hover:border-[#C9A55A]/50 hover:bg-white/5 transition-colors duration-300 rounded-sm group cursor-pointer backdrop-blur-sm bg-black/20">
            <Download size={14} className="text-[#C9A55A] group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest text-cream">Floorplans</span>
          </button>
        </motion.div>
      </div>

      {/* ─── Split Screen Layout ─── */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full border-b border-cream/10" style={{ height: "80vh", minHeight: "650px" }}>

        {/* LEFT: 3D Viewer or Floorplan (65%) */}
        <div className="w-full lg:w-[65%] h-[50vh] lg:h-full relative shrink-0 overflow-hidden bg-brand-black/50 backdrop-blur-md">
          <AnimatePresence mode="wait">
            {floorplanVilla ? (

              /* ── Floorplan Image View ── */
              <motion.div
                key={`fp-${floorplanVilla.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: "#f5f0e8" }}
              >
                <Image
                  src={floorplanVilla.image}
                  alt={`Villa ${floorplanVilla.id} Floorplan`}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />

                {/* Back button */}
                <button
                  onClick={() => setFloorplanVilla(null)}
                  className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-brand-black/80 hover:bg-brand-black px-4 py-2.5 backdrop-blur-md border border-cream/20 hover:border-[#C9A55A]/50 transition-all rounded-sm cursor-pointer"
                >
                  <ArrowLeft size={12} className="text-cream/80" />
                  <span className="text-[9px] uppercase tracking-widest text-cream/90">Back to 3D View</span>
                </button>

              </motion.div>

            ) : (

              /* ── 3D Iframe View ── */
              <motion.div
                key="iframe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
              >
                {/* Location label */}
                <div className="absolute top-5 left-5 z-20 pointer-events-none flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 drop-shadow-md">Azurea</span>
                  <span className="text-[9px] uppercase tracking-widest text-cream/40 drop-shadow-md">Seseh, Bali</span>
                </div>

                {/* Interactive badge */}
                <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 bg-brand-black/50 px-3 py-1.5 backdrop-blur-md border border-cream/10 rounded-sm">
                    <Maximize2 size={12} className="text-cream/60" />
                    <span className="text-[9px] uppercase tracking-widest text-cream/70">Interactive 3D</span>
                  </div>
                </div>

                {/* Loading skeleton */}
                <motion.div
                  animate={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#C9A55A]/20 border-t-[#C9A55A] animate-spin" />
                  <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30">Loading Masterplan</p>
                </motion.div>

                <iframe
                  src={PLANPOINT_BASE_URL}
                  className="w-full h-full border-0"
                  style={{ background: "transparent" }}
                  allowTransparency={true}
                  allowFullScreen
                  allow="autoplay; fullscreen; vr"
                  title="Azurea Interactive Masterplan"
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Availability List (35%) */}
        <div className="w-full lg:w-[35%] h-[50vh] lg:h-full bg-brand-black/80 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-cream/10 flex flex-col relative">

          {/* Table Header */}
          <div
            className="sticky top-0 backdrop-blur-md z-10 px-6 py-4 border-b border-cream/10 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-cream/40"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-brand-black) 80%, transparent)",
            }}
          >
            <div className="w-16">Unit</div>
            <div className="flex-1">Built Area</div>
            <div className="w-24 text-right">Status</div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            {VILLAS.map((villa) => {
              const isAvailable = villa.status === "Available";
              const isReserved  = villa.status === "Reserved";
              const isSold      = villa.status === "Sold";
              const isSelected  = floorplanVilla?.id === villa.id;

              return (
                <div
                  key={villa.id}
                  onMouseEnter={() => setHoveredUnit(villa.id)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => handleVillaClick(villa)}
                  className={`px-6 py-5 border-b flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#C9A55A]/10 border-[#C9A55A]/40"
                      : hoveredUnit === villa.id
                        ? "bg-white/[0.05] border-cream/20"
                        : "bg-transparent border-cream/5"
                  } ${isSold ? "opacity-60 grayscale" : "opacity-100"}`}
                >
                  {/* Unit Number */}
                  <div className="w-16 flex flex-col gap-0.5">
                    <span className={`font-display text-lg transition-colors ${isSelected ? "text-[#C9A55A]" : "text-cream"}`}>
                      V{villa.id}
                    </span>
                    {isSelected && (
                      <span className="text-[8px] uppercase tracking-widest text-[#C9A55A]/60">Floorplan</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-1 pointer-events-none">
                    <span className={`text-sm ${isSold ? "text-cream/50 line-through decoration-white/20" : "text-cream/90"}`}>
                      {villa.built}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-cream/40">
                      {villa.beds} Bed · {villa.baths} Bath
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="w-24 flex justify-end pointer-events-none">
                    <div className={`px-2.5 py-1 text-[9px] uppercase tracking-widest rounded-sm border flex items-center gap-1.5 ${
                      isAvailable
                        ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/10"
                        : isReserved
                        ? "border-amber-200/30 text-amber-200/90 bg-amber-200/10"
                        : "border-cream/20 text-white/50 bg-white/10"
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

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-brand-black to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}