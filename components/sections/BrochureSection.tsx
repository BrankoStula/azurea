// components/sections/BrochureSection.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import Image from "next/image";

// The Flipbook remains dynamically loaded to prevent SSR errors
const DynamicMagazine = dynamic(() => import("@/components/ui/Magazine"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <p className="font-display text-xl tracking-widest text-brand-green animate-pulse uppercase">
        Opening Edition...
      </p>
    </div>
  ),
});

export default function BrochureSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const brochurePages = Array.from({ length: 88 }, (_, i) => 
    `/brochure/page-${String(i + 1).padStart(2, "0")}.jpg`
  );

  return (
    <section id="brochure" className="relative w-full min-h-screen bg-brand-black flex items-center overflow-hidden px-6 md:px-12 py-24">
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: "url('/brand_assets_-008.jpg')", backgroundSize: 'cover' }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-[var(--container-max)] mx-auto w-full">
        
        {/* LEFT COLUMN: Writing */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <p className="label-caps text-brand-green tracking-[0.4em] mb-6">
            The Villa V Collection
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream uppercase leading-[0.9] mb-8">
            The Digital<br />Brochure
          </h2>
          <p className="text-cream/60 text-lg md:text-xl font-light max-w-lg mb-12 leading-relaxed">
            Immerse yourself in 88 pages of curated luxury. Explore our vision for Munggu, Bali, including floor plans, investment yields, and the architectural inspiration behind the collection.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-4 text-cream hover:text-brand-green transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-brand-green transition-colors">
              <Maximize2 size={20} />
            </div>
            <span className="label-caps tracking-[0.2em]">Open Interactive Reader</span>
          </button>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Teaser Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Decorative Back Layer */}
          <div className="absolute -inset-4 border border-brand-green/20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
          
          {/* Cover Preview Image */}
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden shadow-2xl">
            <Image 
              src="/brochure/page-01.jpg" 
              alt="Brochure Cover" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <p className="label-caps text-cream tracking-[0.3em] border-b border-cream pb-2">Click to flip</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FULL SCREEN MODAL / READER */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center p-4 md:p-12"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-cream/50 hover:text-cream z-[110] transition-colors flex items-center gap-3 group"
            >
              <span className="label-caps text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Close Reader</span>
              <X size={32} strokeWidth={1} />
            </button>

            {/* Magazine Logic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full max-w-[1400px] flex items-center justify-center"
            >
              <DynamicMagazine pages={brochurePages} />
            </motion.div>

            {/* Helper Footer */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
               <p className="text-[10px] tracking-[0.3em] text-cream/30 uppercase animate-pulse">Drag or swipe to turn pages</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}