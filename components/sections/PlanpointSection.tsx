// components/sections/PlanpointSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";
const PLANPOINT_URL = "https://app.planpoint.io/azurea/william";

export default function PlanpointSection() {
  const [loaded, setLoaded] = useState(false);

  // Inject preconnect hints early so DNS + TLS resolve before iframe renders
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

  // Fallback: hide skeleton after 12s even if onLoad doesn't fire cleanly
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 12000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="masterplan" className="bg-brand-black border-t border-white/10 overflow-hidden">

      {/* ─── Header ─── */}
      <div className="px-6 md:px-12 lg:px-24 pt-20 lg:pt-28 pb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[10px] uppercase tracking-[0.3em] mb-5 flex items-center gap-4"
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
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", letterSpacing: "var(--tracking-heading)" }}
          >
            Explore the Estate
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-cream/50 text-base leading-relaxed max-w-sm lg:text-right"
        >
          Navigate the estate, explore individual villa layouts, and view real-time availability.
        </motion.p>
      </div>

      {/* ─── Full-bleed Viewer ─── */}
      <div
        className="relative w-full"
        style={{ height: "85vh", minHeight: "600px" }}
      >
        {/* Border top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10 z-10" />

        {/* Gold corner accents */}
        <div className="absolute top-3 left-6 z-20 pointer-events-none">
          <div className="w-8 h-px" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
          <div className="w-px h-8" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
        </div>
        <div className="absolute top-3 right-6 z-20 pointer-events-none flex flex-col items-end">
          <div className="w-8 h-px" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
          <div className="w-px h-8" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
        </div>

        {/* Label overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <p className="text-[9px] uppercase tracking-[0.3em] text-cream/25 whitespace-nowrap">
            Azurea · Seseh, Bali · 8 Villas
          </p>
        </div>

        {/* Fullscreen hint */}
        <div className="absolute bottom-5 right-6 z-20 pointer-events-none flex items-center gap-2">
          <Maximize2 size={11} className="text-cream/25" />
          <span className="text-[9px] uppercase tracking-widest text-cream/25">Fullscreen available</span>
        </div>

        {/* Loading skeleton — fades out on load */}
        <motion.div
          animate={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-brand-black flex flex-col items-center justify-center gap-4 z-10"
        >
          <div className="w-6 h-6 rounded-full border-2 border-[#C9A55A]/20 border-t-[#C9A55A] animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30">Loading masterplan</p>
        </motion.div>

        {/* Iframe — clean URL, no speculative params */}
        <iframe
          src={PLANPOINT_URL}
          className="w-full h-full border-0"
          style={{ background: "#08204D" }}
          allowFullScreen
          allow="autoplay; fullscreen; vr"
          title="Azurea Interactive Masterplan"
          onLoad={() => setLoaded(true)}
        />
      </div>

    </section>
  );
}
