// components/sections/project/ProjectGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Elegant easing curve for luxury feel
const LUXURY = [0.16, 1, 0.3, 1] as const;

const GALLERY = [
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_1.webp",  label: "Outdoor Terrace" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_2.webp",  label: "Kitchen" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_3.webp",  label: "Living Room" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_4.webp",  label: "Dining Room" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_5.webp",  label: "Open-Plan Living" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_6.webp",  label: "Private Pool" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_7.webp",  label: "Pool Terrace" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_8.webp",  label: "Kitchen Island" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_9.webp",  label: "Pool & Garden" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_10.webp", label: "Dining Room" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_11.webp", label: "Kitchen & Living" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_12.webp", label: "Kitchen" },
  { src: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp", label: "Villa Exterior" },
];

const ITEMS_PER_PAGE = 5;

// ─── Animation Logic ─────────────────────────────────────────────────────────

// Helper to determine where the curtain starts/ends based on direction
const getClipPath = (direction: string) => {
  switch (direction) {
    case "up":    return "inset(100% 0% 0% 0%)"; // Reveals from bottom to top
    case "down":  return "inset(0% 0% 100% 0%)"; // Reveals from top to bottom
    case "left":  return "inset(0% 0% 0% 100%)"; // Reveals from right to left
    case "right": return "inset(0% 100% 0% 0%)"; // Reveals from left to right
    default:      return "inset(100% 0% 0% 0%)";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: (dir: string) => ({ 
    clipPath: getClipPath(dir),
  }),
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: LUXURY },
  },
  exit: (dir: string) => ({
    clipPath: getClipPath(dir),
    transition: { duration: 0.6, ease: LUXURY },
  }),
};

const imageVariants = {
  hidden: { scale: 1.15 },
  visible: { scale: 1, transition: { duration: 1.2, ease: LUXURY } },
  exit: { scale: 1.05, transition: { duration: 0.6, ease: LUXURY } },
};

// ─── Grid Layout Mapping (Matches Reference Image) ───────────────────────────

const getBentoConfig = (index: number) => {
  switch (index % ITEMS_PER_PAGE) {
    case 0: return { class: "md:col-span-1 md:row-span-2 col-span-2 row-span-1", dir: "up" };
    case 1: return { class: "md:col-span-2 md:row-span-1 col-span-2 row-span-1", dir: "right" };
    case 2: return { class: "md:col-span-1 md:row-span-2 col-span-1 row-span-1", dir: "down" };
    case 3: return { class: "md:col-span-1 md:row-span-1 col-span-1 row-span-1", dir: "left" };
    case 4: return { class: "md:col-span-1 md:row-span-1 col-span-2 row-span-1", dir: "up" };
    default: return { class: "", dir: "up" };
  }
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ProjectGallery() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(GALLERY.length / ITEMS_PER_PAGE);

  const nextPage = () => setPage((p) => (p + 1) % totalPages);
  const prevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  const currentItems = GALLERY.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <div className="bg-brand-black border-t border-white/10 py-24 lg:py-32 overflow-hidden">
      
      {/* ── Header & Pagination (Kept inside standard container) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="label-caps text-[#C9A55A] mb-4 flex items-center gap-4">
            <span className="w-6 h-px bg-[#C9A55A]/50 inline-block" />
            The Collection
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-cream tracking-tight">
            Visual Gallery
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-cream/50 text-[10px] tracking-[0.25em] uppercase font-medium">
            {String(page + 1).padStart(2, "0")} <span className="mx-1 text-white/20">/</span> {String(totalPages).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevPage}
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-cream hover:bg-[#C9A55A] hover:border-[#C9A55A] hover:text-brand-black transition-all duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button 
              onClick={nextPage}
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-cream hover:bg-[#C9A55A] hover:border-[#C9A55A] hover:text-brand-black transition-all duration-300"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Edge-to-Edge Bento Grid ── */}
      <div className="w-full px-2 md:px-4 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={containerVariants}
            initial="hidden"
            // FIX: Changed animate to whileInView so it waits for scroll!
            whileInView="visible"
            // FIX: Added viewport to ensure it only triggers once the user sees it
            viewport={{ once: true, amount: 0.1 }}
            exit="exit"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[250px] md:auto-rows-[350px] lg:auto-rows-[400px]"
          >
            {currentItems.map((item, i) => {
              const config = getBentoConfig(i);

              return (
                <motion.div
                  key={item.src}
                  custom={config.dir}
                  variants={itemVariants}
                  className={`relative group overflow-hidden bg-brand-black/50 ${config.class}`}
                >
                  <motion.div variants={imageVariants} className="absolute inset-0 w-full h-full">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                  </motion.div>

                  {/* Editorial Text Overlay */}
                  <div className="absolute bottom-6 left-6 z-10">
                    <p className="text-[#C9A55A] font-display text-2xl lg:text-3xl italic leading-none mb-1 shadow-black drop-shadow-md">
                      {String((page * ITEMS_PER_PAGE) + i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-cream/70 text-[10px] uppercase tracking-widest shadow-black drop-shadow-md">
                      {item.label}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}