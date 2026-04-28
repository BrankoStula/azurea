// components/sections/ProjectGallery.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// CSS imports (Now safely typed via global.d.ts)
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const LUXURY = [0.16, 1, 0.3, 1] as const;
const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";
const GOLD = "#C9A55A";

type Category = "All" | "Exterior" | "Living & Dining" | "Kitchen" | "Pool & Outdoor" | "Bedrooms" | "Bathrooms" | "Rooftop";

type GalleryItem = { src: string; label: string; category: Category };

const GALLERY: GalleryItem[] = [
  // ── Exterior ──
  { src: `${CDN}/azurea_gallery_13.webp`, label: "Villa Exterior",        category: "Exterior"        },
  { src: `${CDN}/azurea_gallery_23.webp`, label: "Entry Courtyard",       category: "Exterior"        },
  { src: `${CDN}/azurea_gallery_24.webp`, label: "Living Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_26.webp`, label: "Rooftop",               category: "Exterior"        },
  // ── Living & Dining ──
  { src: `${CDN}/azurea_gallery_3.webp`,  label: "Living Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_4.webp`,  label: "Dining Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_5.webp`,  label: "Kitchen & Living",      category: "Kitchen"         },
  { src: `${CDN}/azurea_gallery_10.webp`, label: "Dining Area",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_11.webp`, label: "Kitchen & Living",      category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_28.webp`, label: "Rooftop",               category: "Exterior"        },
  { src: `${CDN}/azurea_gallery_29.webp`, label: "Bathroom",              category: "Bathrooms"       },
  // ── Kitchen ──
  { src: `${CDN}/azurea_gallery_2.webp`,  label: "Kitchen",               category: "Kitchen"         },
  { src: `${CDN}/azurea_gallery_8.webp`,  label: "Kitchen Island",        category: "Kitchen"         },
  { src: `${CDN}/azurea_gallery_12.webp`, label: "Kitchen Counter",       category: "Kitchen"         },
  // ── Pool & Outdoor ──
  { src: `${CDN}/azurea_gallery_1.webp`,  label: "Rooftop",               category: "Exterior"  },
  { src: `${CDN}/azurea_gallery_6.webp`,  label: "Private Pool",          category: "Pool & Outdoor"  },
  { src: `${CDN}/azurea_gallery_7.webp`,  label: "Pool Terrace",          category: "Pool & Outdoor"  },
  { src: `${CDN}/azurea_gallery_9.webp`,  label: "Pool & Garden",         category: "Pool & Outdoor"  },
  { src: `${CDN}/azurea_gallery_22.webp`, label: "Bedroom",               category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_25.webp`, label: "Bedroom",               category: "Bedrooms"        },
  // ── Bedrooms ──
  { src: `${CDN}/azurea_gallery_16.webp`, label: "Living Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_27.webp`, label: "Rooftop Terrace",       category: "Exterior"        },
  // ── Bathrooms ──
  { src: `${CDN}/azurea_gallery_17.webp`, label: "Bedroom",               category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_18.webp`, label: "Bedroom Desk",          category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_20.webp`, label: "Bedroom",               category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_21.webp`, label: "Bedroom",               category: "Bedrooms"        },
  // ── Rooftop ──
  { src: `${CDN}/azurea_gallery_19.webp`, label: "Bedroom",               category: "Bedrooms"        },
];

// FIX: Moved "All" to the start of the list for better UX
const CATEGORIES: Category[] = ["All", "Exterior", "Living & Dining", "Kitchen", "Pool & Outdoor", "Bedrooms", "Bathrooms"];

// Animation Directions
const DIRS = ["up", "right", "down", "left", "up"];

const getClipPath = (dir: string) => {
  switch (dir) {
    case "up":    return "inset(100% 0% 0% 0%)";
    case "down":  return "inset(0% 0% 100% 0%)";
    case "left":  return "inset(0% 0% 0% 100%)";
    case "right": return "inset(0% 100% 0% 0%)";
    default:      return "inset(100% 0% 0% 0%)";
  }
};

const itemVariants = {
  hidden: (dir: string) => ({ clipPath: getClipPath(dir), opacity: 0 }),
  visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition: { duration: 1.1, ease: LUXURY } },
  exit:    (dir: string) => ({ clipPath: getClipPath(dir), opacity: 0, transition: { duration: 0.5, ease: LUXURY } }),
};

const imgVariants = {
  hidden:  { scale: 1.12 },
  visible: { scale: 1,    transition: { duration: 1.1, ease: LUXURY } },
  exit:    { scale: 1.05, transition: { duration: 0.5, ease: LUXURY } },
};

export default function ProjectGallery() {
  // FIX: Changed default to "All" since I reordered the array, but you could use
  // "Exterior" if you want to explicitly start with that chapter.
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Filter items based on active category
  const items = activeCategory === "All"
    ? GALLERY
    : GALLERY.filter(i => i.category === activeCategory);

  const count = items.length;

  // Track viewport size (React 18 compliant media query check)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    handleMediaChange(mq); 

    mq.addEventListener("change", handleMediaChange);
    return () => mq.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className="bg-brand-black border-t border-cream/10 overflow-hidden relative">

      {/* ── Header ── */}
      <div className="px-6 md:px-12 lg:px-16 pt-20 lg:pt-28 pb-8 flex justify-between items-end gap-6 relative z-10">
        <div>
          <p className="label-caps mb-4 flex items-center gap-4" style={{ color: GOLD }}>
            <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
            The Collection
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-cream tracking-tight">
            Visual Gallery
          </h2>
        </div>
        <p className="text-cream/30 text-[10px] tracking-widest uppercase hidden sm:block">
          {String(count).padStart(2, "0")} images
        </p>
      </div>

      {/* ── Category Tabs (Pill Buttons) ── */}
      <div className="px-6 md:px-12 lg:px-16 mb-10 relative z-10">
        <div className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const catCount = cat === "All" ? GALLERY.length : GALLERY.filter(i => i.category === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => {
                  setThumbsSwiper(null); 
                  setActiveCategory(cat);
                }}
                className={`relative shrink-0 flex items-center gap-2 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 border rounded-sm ${
                  isActive
                    ? "bg-[#C9A55A]/10 border-[#C9A55A] text-[#C9A55A] shadow-sm shadow-[#C9A55A]/5"
                    : "bg-white/[0.03] border-cream/10 text-cream/60 hover:text-cream hover:border-cream/30 hover:bg-white/10"
                }`}
              >
                {cat}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-sm leading-none transition-colors duration-300 ${
                    isActive ? "bg-[#C9A55A]/20 text-[#C9A55A]" : "bg-white/10 text-cream/40"
                  }`}
                >
                  {catCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Gallery & Thumbnails Layout ── */}
      <div className="w-full px-6 md:px-12 lg:px-16 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: LUXURY }}
            className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[50vh] sm:h-[65vh] lg:h-[75vh] max-h-[800px]"
          >
            
            {/* 1. Main Large Image Swiper (Left / Top) */}
            <div className="w-full lg:w-[80%] h-[80%] lg:h-full relative group rounded-sm overflow-hidden border border-cream/10 shadow-2xl">
              <Swiper
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper.el ? thumbsSwiper : null }}
                navigation={{
                  prevEl: ".gallery-prev",
                  nextEl: ".gallery-next",
                }}
                slidesPerView={1}
                spaceBetween={0}
                className="w-full h-full"
              >
                {items.map((item, i) => (
                  <SwiperSlide key={`main-${item.src}-${i}`}>
                    <div className="w-full h-full relative">
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 80vw"
                        priority={i === 0}
                      />
                      {/* FIX: Removed the Gradient for text readability */}
                      
                      {/* Inner Text overlay */}
                      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-10 pointer-events-none">
                        <p className="text-cream/90 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium drop-shadow-md">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Prominent Overlay Navigation Arrows */}
              <button className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-brand-black/50 backdrop-blur-md border border-cream/20 text-cream hover:bg-[#C9A55A] hover:border-[#C9A55A] hover:text-brand-black transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 shadow-xl cursor-pointer">
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <button className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-brand-black/50 backdrop-blur-md border border-cream/20 text-cream hover:bg-[#C9A55A] hover:border-[#C9A55A] hover:text-brand-black transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 shadow-xl cursor-pointer">
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* 2. Thumbnail Preview Swiper (Right / Bottom) */}
            <div className="w-full lg:w-[20%] h-[20%] lg:h-full">
              <Swiper
                key={isDesktop ? "vertical" : "horizontal"}
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Navigation, Thumbs]}
                direction={isDesktop ? "vertical" : "horizontal"}
                slidesPerView={3}
                spaceBetween={16}
                freeMode={true}
                watchSlidesProgress={true}
                className="w-full h-full"
              >
                {items.map((item, i) => (
                  <SwiperSlide 
                    key={`thumb-${item.src}-${i}`} 
                    className="cursor-pointer rounded-sm overflow-hidden relative border-2 border-transparent transition-all duration-300 opacity-40 hover:opacity-80 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-[#C9A55A]"
                  >
                    <Image 
                      src={item.src} 
                      fill 
                      className="object-cover" 
                      alt={`${item.label} thumbnail`} 
                      sizes="(max-width: 1024px) 33vw, 20vw" 
                    />
                    <div className="absolute inset-0 bg-[#C9A55A]/10 opacity-0 transition-opacity duration-300 [.swiper-slide-thumb-active_&]:opacity-100 pointer-events-none" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}