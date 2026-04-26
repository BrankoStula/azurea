"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Waves, Coffee, Utensils, Wind, Plane, type LucideIcon } from "lucide-react";
import type { Camera, POI, POIType } from "@/components/ui/MapboxMap";

// ─── Types ─────────────────────────────────────────────────────────────────

type SubPOI = {
  label: string;
  longitude: number;
  latitude: number;
  type: POIType;
  images: string[];
};

type SubSection = {
  id: string;
  label: string;
  title: string;
  body: string;
  images: string[];
  camera: Camera;
  pois: SubPOI[];
};

// ─── Icon map ──────────────────────────────────────────────────────────────

const POI_ICONS: Record<POIType, LucideIcon> = {
  project:    MapPin,
  beach:      Waves,
  cafe:       Coffee,
  restaurant: Utensils,
  surf:       Wind,
  airport:    Plane,
};

// ─── Stock image helper ────────────────────────────────────────────────────

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=1400&fit=crop`;

// ─── Directions route (airport → Azurea via coastal road) ─────────────────

const DIRECTIONS_ROUTE: [number, number][] = [
  [115.168190, -8.746512], // Ngurah Rai Airport
  [115.175,  -8.738],      // Airport exit north
  [115.168,  -8.720],      // Kuta
  [115.158,  -8.700],      // Seminyak
  [115.143,  -8.672],      // Berawa
  [115.135,  -8.658],      // Canggu
  [115.129046, -8.610440], // Azurea (Munggu)
];

// ─── Data ──────────────────────────────────────────────────────────────────

const SUBSECTIONS: SubSection[] = [
  {
    id: "overview",
    label: "01 — Overview",
    title: "A Private Coastal Enclave",
    body: "Azurea is located in Seseh, one of Bali’s fastest-growing coastal areas, offering a more private and residential environment just minutes from Canggu. This positioning provides direct access to the island’s most active lifestyle and rental zones while maintaining a quieter, more refined setting.",
    images: [
      "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp",
      "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_12.webp", 
      "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_3.webp"
    ],
    camera: { longitude: 115.129046, latitude: -8.610440, zoom: 14.5, pitch: 50, bearing: 0 },
    pois: [
      {
        label: "Azurea",
        longitude: 115.129046,
        latitude: -8.610440,
        type: "project",
        images: ["https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_1.webp"],
      },
    ],
  },
  {
    id: "coastline",
    label: "02 — The Coastline",
    title: "Minutes From Bali’s Most Sought-After Beaches",
    body: "Located in Seseh, Azurea is just 4–6 minutes from Seseh Beach and within 10 minutes of Pererenan’s coastline. Canggu’s main beachfront and beach clubs are accessible within 15–20 minutes, offering direct access to Bali’s most active coastal zones while maintaining a more private setting",
    images: ["https://d1pjqs5r0ua4f1.cloudfront.net/canggu_beach.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/finns-beach-club.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/canggu_beach_club.webp"],
    camera: { longitude: 115.130364, latitude: -8.659627, zoom: 12.5, pitch: 35, bearing: -12 },
    pois: [
      {
        label: "Azurea",
        longitude: 115.129046,
        latitude: -8.610440,
        type: "project",
         images: [
      "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_3.webp",
      "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_5.webp", 
      "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_7.webp"
    ],
      },
      {
        label: "Canggu Beach",
        longitude: 115.130364,
        latitude: -8.659627,
        type: "beach",
                images: ["https://d1pjqs5r0ua4f1.cloudfront.net/canggu_beach.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/canggu_beach_club.webp"],

      },
      {
        label: "FINNS Beach Club",
        longitude: 115.139521,
        latitude: -8.665889,
        type: "restaurant",
        images: ["https://d1pjqs5r0ua4f1.cloudfront.net/finns-beach-club.webp"],
      },
    ],
  },
  {
    id: "canggu",
    label: "03 — Active Lifestyle",
    title: "Access to Canggu’s Leading Lifestyle Infrastructure",
    body: "Azurea benefits from immediate proximity to Omni Gym, with additional access to Canggu’s top fitness, wellness, and social hubs within 10–15 minutes. This ecosystem consistently attracts long-stay guests and high-value renters, supporting stable occupancy throughout the year.",
    images: ["https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_3.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/canggu_1.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/canggu_2.webp"],
    camera: { longitude: 115.148, latitude: -8.638, zoom: 14, pitch: 60, bearing: 18 },
    pois: [
      {
        label: "OMNI",
        longitude: 115.12326167791198,
        latitude: -8.622796844965022,
        type: "surf",
        images: ["https://d1pjqs5r0ua4f1.cloudfront.net/nirvana_life_fitness.webp"],
      },
      {
        label: "Bali MMA",
        longitude: 115.155898,
        latitude: -8.641557,
        type: "surf",
        images: ["https://d1pjqs5r0ua4f1.cloudfront.net/bali_mma.webp"],
      },
      {
        label: "Jungle Padel Pererenan",
        longitude: 115.139880,
        latitude: -8.634579,
        type: "surf",
        images: ["https://d1pjqs5r0ua4f1.cloudfront.net/jungle_padel_canggu.webp"],
      },
      {
        label: "THE BLOCK",
        longitude: 115.138541,
        latitude: -8.633828,
        type: "surf",
        images: ["https://d1pjqs5r0ua4f1.cloudfront.net/the_block_canggu.webp"],
      },
    ],
  },
  {
    id: "directions",
    label: "04 — Getting Here",
    title: "Easy Access from Bali International Airport",
    body: "Connected to 50+ global cities, Azurea is a scenic 40-minute coastal drive from the airport—perfectly positioned for effortless arrivals while remaining a sanctuary away from the crowds.",
    images: ["https://d1pjqs5r0ua4f1.cloudfront.net/denpasar_airport.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_6.webp", "https://d1pjqs5r0ua4f1.cloudfront.net/bali_road.webp"],
    camera: { longitude: 115.145, latitude: -8.683, zoom: 11, pitch: 0, bearing: 0 },
    pois: [
      {
        label: "Ngurah Rai Airport",
        longitude: 115.168190,
        latitude: -8.746512,
        type: "airport" as POIType,
        images: [u("1583212292454-1dea0f959c21")],
      },
      {
        label: "Azurea",
        longitude: 115.129046,
        latitude: -8.610440,
        type: "project" as POIType,
        images: ["/brand_assets_-002.jpg"],
      },
    ],
  },
];
// ─── Dynamic map import (SSR-safe) ─────────────────────────────────────────

const MapboxMap = dynamic(() => import("@/components/ui/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brand-black/60 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-[#C9A55A]/30 border-t-[#C9A55A] animate-spin" />
    </div>
  ),
});

// ─── Component ─────────────────────────────────────────────────────────────

export default function LocationSection() {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [selectedPOI, setSelectedPOI] = useState<SubPOI | null>(null);
  const sectionRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const sectionEl    = useRef<HTMLElement>(null);
  const activeIdxRef = useRef(0);
  const navigating   = useRef(false);

  const active = SUBSECTIONS[activeIdx];

  // Keep ref in sync — wheel handler must not close over stale state
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  // IntersectionObserver — which panel is centred in global viewport
  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { 
          if (entry.isIntersecting) {
            setActiveIdx(i);
            setSelectedPOI(null); // <-- FIX: Reset the POI exactly when the section changes
          } 
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  // Snap-scroll — intercept wheel only when location section owns viewport centre
  useEffect(() => {
    const section = sectionEl.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const rect    = section.getBoundingClientRect();
      const viewMid = window.innerHeight / 2;
      if (viewMid < rect.top || viewMid > rect.bottom) return;

      const cur    = activeIdxRef.current;
      const isDown = e.deltaY > 0;

      if (isDown && cur >= SUBSECTIONS.length - 1) return;
      if (!isDown && cur <= 0) return;

      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;

      const target = isDown ? cur + 1 : cur - 1;
      sectionRefs.current[target]?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { navigating.current = false; }, 900);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Computed values based on selection
  const displayImages: string[] = selectedPOI?.images.length
    ? selectedPOI.images
    : active.images;

  const mapCamera: Camera = selectedPOI
    ? { longitude: selectedPOI.longitude, latitude: selectedPOI.latitude, zoom: 15, pitch: 45, bearing: 10 }
    : active.camera;

  // Strip extra fields before passing to MapboxMap
  const mapPOIs: POI[] = active.pois.map(({ label, longitude, latitude, type }) => ({
    label, longitude, latitude, type,
  }));

  // Route drawn on map only for the directions section
  const activeRoute = active.id === "directions" ? DIRECTIONS_ROUTE : undefined;

  // Interactable POI buttons — exclude project + directions section (shows journey card instead)
  const interactivePOIs = active.id === "directions"
    ? []
    : active.pois.filter(p => p.type !== "project");

  return (
    <section
      ref={sectionEl}
      id="why-bali"
      aria-label="Location — Why Bali"
      className="relative bg-brand-black text-cream"
    >

      {/* ════════════════════════════════════════════════════════════════════
          INTRO — full-width title block above the scroll journey
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-center text-center py-24 px-8 border-b border-white/8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="label-caps text-[#C9A55A] mb-5 flex items-center gap-4"
        >
          <span className="w-8 h-px bg-[#C9A55A]/40 inline-block" />
          Why Bali
          <span className="w-8 h-px bg-[#C9A55A]/40 inline-block" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-cream leading-tight mb-7"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "var(--tracking-heading)" }}
        >
          The World&apos;s Most Sought-After Island
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-cream/55 text-lg leading-relaxed max-w-2xl"
        >
          From pristine black-sand coastlines to vibrant creative districts, Bali&apos;s Munggu corridor
          has emerged as the most coveted address in Southeast Asia — where natural beauty, world-class
          infrastructure, and extraordinary lifestyle converge in one extraordinary place.
        </motion.p>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SCROLL JOURNEY — left text panels + sticky right media
      ════════════════════════════════════════════════════════════════════ */}
      <div className="lg:grid lg:grid-cols-12">

        {/* LEFT — 4 × min-h-screen panels */}
        <div className="lg:col-span-4">
          {SUBSECTIONS.map((s, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={s.id}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className="min-h-screen flex flex-col justify-center px-8 md:px-10 lg:px-12 py-16 lg:py-28 border-b border-white/5 last:border-b-0"
              >
                {/* Label */}
                <motion.p
                  animate={{ opacity: isActive ? 1 : 0.25, x: isActive ? 0 : -8 }}
                  transition={{ duration: 0.5 }}
                  className="label-caps text-[#C9A55A] mb-6 flex items-center gap-3"
                >
                  <span className="w-5 h-px bg-[#C9A55A]/50 inline-block" />
                  {s.label}
                </motion.p>

                {/* Title */}
                <div className="overflow-hidden mb-6">
                  <motion.h2
                    animate={{ y: isActive ? "0%" : "110%" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-cream leading-tight"
                    style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)", letterSpacing: "var(--tracking-heading)" }}
                  >
                    {s.title}
                  </motion.h2>
                </div>

                {/* Body */}
                <motion.p
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  transition={{ duration: 0.7, delay: isActive ? 0.15 : 0 }}
                  className="text-cream/60 leading-relaxed text-lg max-w-sm mb-8"
                >
                  {s.body}
                </motion.p>

                {/* POI interactive buttons */}
                {interactivePOIs.length > 0 && isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex flex-wrap gap-2"
                  >
                    {(i === activeIdx ? interactivePOIs : s.pois.filter(p => p.type !== "project")).map((poi) => {
                      const Icon = POI_ICONS[poi.type];
                      const isSelected = selectedPOI?.label === poi.label;
                      return (
                        <button
                          key={poi.label}
                          onClick={() => setSelectedPOI(isSelected ? null : poi)}
                          className={[
                            "flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer",
                            isSelected
                              ? "bg-[#C9A55A] text-brand-black font-semibold"
                              : "border border-white/15 text-cream/55 hover:border-[#C9A55A]/60 hover:text-cream",
                          ].join(" ")}
                        >
                          <Icon size={12} strokeWidth={1.8} />
                          {poi.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* Journey card — directions section only */}
                {s.id === "directions" && isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="border border-white/10 p-5 mt-2"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Plane size={15} className="text-[#C9A55A] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-cream text-[13px] font-medium leading-snug">Ngurah Rai International</p>
                        <p className="text-cream/40 text-[11px] tracking-wide">Denpasar, Bali — DPS</p>
                      </div>
                    </div>

                    <div className="ml-[7px] flex flex-col gap-1.5 mb-3">
                      {["Via Kuta", "Via Seminyak", "Via Canggu"].map((step) => (
                        <div key={step} className="flex items-center gap-2.5">
                          <div className="w-px h-4 bg-[#C9A55A]/25 ml-px" />
                          <span className="text-cream/35 text-[10px] tracking-widest uppercase">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <MapPin size={15} className="text-[#C9A55A] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-cream text-[13px] font-medium leading-snug">Azurea</p>
                        <p className="text-cream/40 text-[11px] tracking-wide">Munggu, Bali</p>
                      </div>
                    </div>

                    <div className="border-t border-white/8 pt-4 flex gap-6">
                      <div>
                        <p className="font-display text-[#C9A55A] text-2xl leading-none">25</p>
                        <p className="text-cream/35 text-[10px] uppercase tracking-widest mt-1">min by car</p>
                      </div>
                      <div className="w-px bg-white/8" />
                      <div>
                        <p className="font-display text-[#C9A55A] text-2xl leading-none">28</p>
                        <p className="text-cream/35 text-[10px] uppercase tracking-widest mt-1">km coastal</p>
                      </div>
                      <div className="w-px bg-white/8" />
                      <div>
                        <p className="font-display text-[#C9A55A] text-2xl leading-none">50+</p>
                        <p className="text-cream/35 text-[10px] uppercase tracking-widest mt-1">direct routes</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* CTA — last section only */}
                {i === SUBSECTIONS.length - 1 && (
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: isActive ? 0.3 : 0 }}
                    className="mt-10"
                  >
                    <Link
                      href="/location"
                      className="inline-flex items-center gap-3 label-caps text-[#C9A55A] border-b border-[#C9A55A]/30 pb-1.5 hover:border-[#C9A55A] transition-colors duration-300"
                    >
                      Explore in Full
                      <span className="text-sm">→</span>
                    </Link>
                  </motion.div>
                )}

                {/* Mobile image strip — desktop has sticky right pane */}
                <div className="lg:hidden mt-8 flex overflow-hidden rounded-sm" style={{ height: "42vw" }}>
                  {s.images.slice(0, 2).map((img, j) => (
                    <div key={j} className="flex-1 relative overflow-hidden">
                      <Image src={img} alt="" fill className="object-cover" sizes="50vw" priority={i === 0 && j === 0} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — sticky media pane */}
        <div className="hidden lg:block lg:col-span-8">
          <div className="sticky top-0 h-screen flex flex-col border-l border-white/5">

            {/* Nav dots */}
            <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
              {SUBSECTIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Jump to section ${i + 1}`}
                  className="group flex items-center justify-center w-5 h-5"
                >
                  <span
                    className={[
                      "block rounded-full transition-all duration-300",
                      i === activeIdx
                        ? "w-1.5 h-7 bg-[#C9A55A]"
                        : "w-1 h-2 bg-white/20 group-hover:bg-white/40 group-hover:h-3",
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>

            {/* Top half — Mapbox */}
            <div className="flex-1 relative min-h-0">
              <MapboxMap camera={mapCamera} pois={mapPOIs} route={activeRoute} />

              {/* Counter badge */}
              <div className="absolute top-5 left-5 z-10 bg-brand-black/80 backdrop-blur-sm px-3 py-1.5 pointer-events-none">
                <span className="text-[#C9A55A] text-[10px] tracking-[0.2em] uppercase font-semibold">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(SUBSECTIONS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Selected POI label badge */}
              <AnimatePresence>
                {selectedPOI && (
                  <motion.div
                    key={selectedPOI.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-5 right-5 z-10 bg-[#C9A55A] px-3 py-1.5 pointer-events-none"
                  >
                    <span className="text-brand-black text-[10px] tracking-[0.2em] uppercase font-semibold">
                      {selectedPOI.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 shrink-0" />

            {/* Bottom half — image strip (1–3 images side by side) */}
            <div className="flex-1 relative min-h-0 overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={displayImages.join("|")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 flex"
                >
                  {displayImages.map((img, i) => (
                    <div key={i} className="flex-1 relative overflow-hidden">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        priority={activeIdx === 0 && i === 0}
                      />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-6 z-10">
                    <p className="text-cream/40 text-[10px] tracking-[0.25em] uppercase">
                      {selectedPOI ? selectedPOI.label : active.label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}
