// components/sections/project/PlanpointSection.tsx
"use client";

import { motion } from "framer-motion";

export default function PlanpointSection() {
  return (
    <section id="masterplan" className="bg-brand-black border-t border-white/10 py-24 lg:py-32 overflow-hidden">
      
      {/* ─── Header ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-caps text-[#C9A55A] mb-4 flex items-center justify-center gap-4"
        >
          <span className="w-6 h-px bg-[#C9A55A]/50 inline-block" />
          Interactive Masterplan
          <span className="w-6 h-px bg-[#C9A55A]/50 inline-block" />
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl lg:text-5xl text-cream tracking-tight mb-6 max-w-2xl"
        >
          Explore Azurea
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-cream/60 max-w-xl mx-auto"
        >
          Navigate the estate, explore individual villa layouts, and view real-time availability in our immersive 3D environment.
        </motion.p>
      </div>

      {/* ─── Embedded Viewer ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full  mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative w-full h-[70vh] min-h-[600px] border border-white/10 bg-white/[0.02] shadow-2xl p-2 rounded-sm">
          
          {/* Delicate Gold Corner Accents */}
          <div className="absolute -top-2 -left-2 w-8 h-px bg-[#C9A55A]/60" />
          <div className="absolute -top-2 -left-2 w-px h-8 bg-[#C9A55A]/60" />
          
          <div className="absolute -top-2 -right-2 w-8 h-px bg-[#C9A55A]/60" />
          <div className="absolute -top-2 -right-2 w-px h-8 bg-[#C9A55A]/60" />
          
          <div className="absolute -bottom-2 -left-2 w-8 h-px bg-[#C9A55A]/60" />
          <div className="absolute -bottom-2 -left-2 w-px h-8 bg-[#C9A55A]/60" />
          
          <div className="absolute -bottom-2 -right-2 w-8 h-px bg-[#C9A55A]/60" />
          <div className="absolute -bottom-2 -right-2 w-px h-8 bg-[#C9A55A]/60" />

          {/* Planpoint Iframe */}
          <iframe
            src="https://app.planpoint.io/azurea/william"
            className="w-full h-full border-0 bg-brand-black"
            allowFullScreen
            allow="autoplay; fullscreen; vr"
            title="Azurea Interactive Masterplan"
          />
        </div>
      </motion.div>
      
    </section>
  );
}