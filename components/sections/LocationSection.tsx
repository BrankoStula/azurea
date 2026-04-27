// components/sections/LocationSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Waves, Coffee, Utensils, Wind, Plane, type LucideIcon } from "lucide-react";
import type { Camera, POI, POIType } from "@/components/ui/MapboxMap";

// ─── Types ────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────

const GOLD = "#C9A55A";
const EASE = [0.16, 1, 0.3, 1] as const;

const POI_ICONS: Record<POIType, LucideIcon> = {
  project:    MapPin,
  beach:      Waves,
  cafe:       Coffee,
  restaurant: Utensils,
  surf:       Wind,
  airport:    Plane,
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=1400&fit=crop`;

const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";

// ─── Route data ───────────────────────────────────────────────────────────

const DIRECTIONS_ROUTE: [number, number][] = [
  [115.168190, -8.746512],
  [115.174528, -8.743160],
  [115.179331, -8.736021],
  [115.183311, -8.722684],
  [115.180459, -8.716183],
  [115.173856, -8.700142],
  [115.167888, -8.682662],
  [115.164344, -8.672855],
  [115.160012, -8.663114],
  [115.153401, -8.653456],
  [115.145823, -8.646211],
  [115.138125, -8.636102],
  [115.133214, -8.624151],
  [115.129046, -8.610440],
];

// ─── Section data ─────────────────────────────────────────────────────────

const SUBSECTIONS: SubSection[] = [
  {
    id: "overview",
    label: "01 — Overview",
    title: "A Private Coastal Enclave",
    body: "Azurea is located in Seseh, one of Bali's fastest-growing coastal areas, offering a more private and residential environment just minutes from Canggu. This positioning provides direct access to the island's most active lifestyle and rental zones while maintaining a quieter, more refined setting.",
    images: [`${CDN}/azurea_gallery_13.webp`, `${CDN}/azurea_gallery_12.webp`, `${CDN}/azurea_gallery_3.webp`],
    camera: { longitude: 115.129046, latitude: -8.610440, zoom: 14.5, pitch: 50, bearing: 0 },
    pois: [
      { label: "Azurea", longitude: 115.129046, latitude: -8.610440, type: "project", images: [`${CDN}/azurea_gallery_1.webp`] },
    ],
  },
  {
    id: "coastline",
    label: "02 — The Coastline",
    title: "Minutes From Bali's Most Sought-After Beaches",
    body: "Located in Seseh, Azurea is just 4–6 minutes from Seseh Beach and within 10 minutes of Pererenan's coastline. Canggu's main beachfront and beach clubs are accessible within 15–20 minutes.",
    images: [`${CDN}/canggu_beach.webp`, `${CDN}/finns-beach-club.webp`, `${CDN}/canggu_beach_club.webp`],
    camera: { longitude: 115.130364, latitude: -8.659627, zoom: 12.5, pitch: 35, bearing: -12 },
    pois: [
      { label: "Azurea",        longitude: 115.129046, latitude: -8.610440, type: "project",    images: [`${CDN}/azurea_gallery_3.webp`, `${CDN}/azurea_gallery_5.webp`] },
      { label: "Canggu Beach",  longitude: 115.130364, latitude: -8.659627, type: "beach",      images: [`${CDN}/canggu_beach.webp`, `${CDN}/canggu_beach_club.webp`] },
      { label: "FINNS Beach Club", longitude: 115.139521, latitude: -8.665889, type: "restaurant", images: [`${CDN}/finns-beach-club.webp`] },
    ],
  },
  {
    id: "canggu",
    label: "03 — Active Lifestyle",
    title: "Access to Canggu's Leading Lifestyle Infrastructure",
    body: "Azurea benefits from immediate proximity to Omni Gym, with additional access to Canggu's top fitness, wellness, and social hubs within 10–15 minutes. This ecosystem consistently attracts long-stay guests and high-value renters.",
    images: [`${CDN}/azurea_gallery_3.webp`, `${CDN}/canggu_1.webp`, `${CDN}/canggu_2.webp`],
    camera: { longitude: 115.148, latitude: -8.638, zoom: 14, pitch: 60, bearing: 18 },
    pois: [
      { label: "OMNI",                  longitude: 115.12326167791198, latitude: -8.622796844965022, type: "surf", images: [`${CDN}/nirvana_life_fitness.webp`] },
      { label: "Bali MMA",             longitude: 115.155898,          latitude: -8.641557,           type: "surf", images: [`${CDN}/bali_mma.webp`] },
      { label: "Jungle Padel",         longitude: 115.139880,          latitude: -8.634579,           type: "surf", images: [`${CDN}/jungle_padel_canggu.webp`] },
      { label: "THE BLOCK",            longitude: 115.138541,          latitude: -8.633828,           type: "surf", images: [`${CDN}/the_block_canggu.webp`] },
    ],
  },
  {
    id: "directions",
    label: "04 — Getting Here",
    title: "Easy Access from Bali International Airport",
    body: "Connected to 50+ global cities, Azurea is a scenic 25-minute coastal drive from the airport — perfectly positioned for effortless arrivals while remaining a sanctuary away from the crowds.",
    images: [`${CDN}/denpasar_airport.webp`, `${CDN}/azurea_gallery_6.webp`, `${CDN}/bali_road.webp`],
    camera: { longitude: 115.145, latitude: -8.683, zoom: 11, pitch: 0, bearing: 0 },
    pois: [
      { label: "Ngurah Rai Airport", longitude: 115.168190, latitude: -8.746512, type: "airport" as POIType, images: [u("1583212292454-1dea0f959c21")] },
      { label: "Azurea",            longitude: 115.129046, latitude: -8.610440, type: "project" as POIType, images: ["/brand_assets_-002.jpg"] },
    ],
  },
];

// ─── Dynamic map (SSR-safe) ────────────────────────────────────────────────

const MapboxMap = dynamic(() => import("@/components/ui/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brand-black/60 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-[#C9A55A]/30 border-t-[#C9A55A] animate-spin" />
    </div>
  ),
});

// ─── Directions card (shared between mobile + desktop) ────────────────────

function DirectionsCard() {
  return (
    <div className="border border-white/10 p-5">
      <div className="flex items-start gap-3 mb-3">
        <Plane size={15} style={{ color: GOLD }} className="mt-0.5 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-cream text-[13px] font-medium leading-snug">Ngurah Rai International</p>
          <p className="text-cream/40 text-[11px] tracking-wide">Denpasar, Bali — DPS</p>
        </div>
      </div>
      <div className="ml-1.75 flex flex-col gap-1.5 mb-3">
        {["Via Kuta", "Via Seminyak", "Via Canggu"].map(step => (
          <div key={step} className="flex items-center gap-2.5">
            <div className="w-px h-4 bg-[#C9A55A]/25 ml-px" />
            <span className="text-cream/35 text-[10px] tracking-widest uppercase">{step}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 mb-4">
        <MapPin size={15} style={{ color: GOLD }} className="mt-0.5 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-cream text-[13px] font-medium leading-snug">Azurea</p>
          <p className="text-cream/40 text-[11px] tracking-wide">Munggu, Bali</p>
        </div>
      </div>
      <div className="border-t border-white/8 pt-4 flex gap-6">
        {[{ val: "25", label: "min by car" }, { val: "28", label: "km coastal" }, { val: "50+", label: "direct routes" }].map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-6">
            <div>
              <p className="font-display text-2xl leading-none" style={{ color: GOLD }}>{s.val}</p>
              <p className="text-cream/35 text-[10px] uppercase tracking-widest mt-1">{s.label}</p>
            </div>
            {i < arr.length - 1 && <div className="w-px h-8 bg-white/8" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────

export default function LocationSection() {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [selectedPOI, setSelectedPOI] = useState<SubPOI | null>(null);
  const [isDesktop, setIsDesktop]     = useState(false);
  const sectionRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const sectionEl    = useRef<HTMLElement>(null);
  const activeIdxRef = useRef(0);
  const navigating   = useRef(false);

  const active = SUBSECTIONS[activeIdx];

  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setActiveIdx(i); setSelectedPOI(null); }
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return; // never hijack scroll on mobile
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
      const target = isDown ? cur + 1 : cur - 1;
      const targetEl = sectionRefs.current[target];
      if (!targetEl) return;
      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { navigating.current = false; }, 900);
    };
    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [isDesktop]);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayImages: string[] = selectedPOI?.images.length ? selectedPOI.images : active.images;
  const mapCamera: Camera = selectedPOI
    ? { longitude: selectedPOI.longitude, latitude: selectedPOI.latitude, zoom: 15, pitch: 45, bearing: 10 }
    : active.camera;
  const mapPOIs: POI[] = active.pois.map(({ label, longitude, latitude, type }) => ({ label, longitude, latitude, type }));
  const activeRoute = active.id === "directions" ? DIRECTIONS_ROUTE : undefined;
  const interactivePOIs = active.id === "directions" ? [] : active.pois.filter(p => p.type !== "project");

  return (
    <section
      ref={sectionEl}
      id="why-bali"
      aria-label="Location — Why Bali"
      className="relative bg-brand-black text-cream"
    >

      {/* ── Intro header ── */}
      <div className="flex flex-col items-center text-center py-20 lg:py-24 px-6 border-b border-white/8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="label-caps mb-5 flex items-center gap-4"
          style={{ color: GOLD }}
        >
          <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
          Why Bali
          <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-cream leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "var(--tracking-heading)" }}
        >
          The World&apos;s Most Sought-After Island
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-cream/55 text-base lg:text-lg leading-relaxed max-w-2xl"
        >
          From pristine black-sand coastlines to vibrant creative districts, Bali&apos;s Munggu corridor
          has emerged as the most coveted address in Southeast Asia — where natural beauty, world-class
          infrastructure, and extraordinary lifestyle converge in one place.
        </motion.p>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT — tab navigation + immersive cards
      ════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* Tab row */}
        <div className="border-b border-white/8 px-5">
          <div className="flex overflow-x-auto scrollbar-hide -mb-px">
            {SUBSECTIONS.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveIdx(i); setSelectedPOI(null); }}
                  className="relative shrink-0 px-4 py-4 text-[9px] uppercase tracking-[0.2em] transition-colors duration-200"
                  style={{ color: isActive ? GOLD : "rgba(255,255,255,0.35)" }}
                >
                  {s.label}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-loc-tab"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: GOLD }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active section content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Hero image */}
            <div className="relative w-full overflow-hidden" style={{ height: "58vw", minHeight: "220px", maxHeight: "340px" }}>
              <Image
                src={active.images[0]}
                alt={active.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={activeIdx === 0}
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-brand-black/70" />
              {/* Counter */}
              <div className="absolute top-4 right-4 bg-brand-black/60 backdrop-blur-sm px-2.5 py-1">
                <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: GOLD }}>
                  {String(activeIdx + 1).padStart(2, "0")} / 04
                </span>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span className="w-3 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.6 }} />
                <span className="text-[9px] uppercase tracking-[0.3em] text-cream/50">{active.label}</span>
              </div>
            </div>

            {/* Text content */}
            <div className="px-5 pt-8 pb-6">
              <h2
                className="font-display text-cream leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 6.5vw, 2.4rem)", letterSpacing: "var(--tracking-heading)" }}
              >
                {active.title}
              </h2>
              <p className="text-cream/55 text-sm leading-relaxed mb-7">
                {active.body}
              </p>

              {/* POI chips */}
              {interactivePOIs.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-7">
                  {interactivePOIs.map(poi => {
                    const Icon = POI_ICONS[poi.type];
                    return (
                      <div
                        key={poi.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-cream/50 text-[9px] uppercase tracking-widest"
                      >
                        <Icon size={11} strokeWidth={1.8} style={{ color: GOLD, opacity: 0.7 }} />
                        {poi.label}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Directions card */}
              {active.id === "directions" && <DirectionsCard />}
            </div>

            {/* Secondary images strip */}
            {active.images.length > 1 && (
              <div className="px-5 pb-10 flex gap-2">
                {active.images.slice(1).map((img, j) => (
                  <div key={j} className="flex-1 relative overflow-hidden" style={{ height: "26vw", minHeight: "90px" }}>
                    <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                    <div className="absolute inset-0 bg-brand-black/10" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT — scroll panels + sticky map/images
      ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-12">

        {/* LEFT — 4× min-h-screen panels */}
        <div className="lg:col-span-4">
          {SUBSECTIONS.map((s, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={s.id}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className="min-h-screen flex flex-col justify-center px-12 py-28 border-b border-white/5 last:border-b-0"
              >
                <motion.p
                  animate={{ opacity: isActive ? 1 : 0.25, x: isActive ? 0 : -8 }}
                  transition={{ duration: 0.5 }}
                  className="label-caps mb-6 flex items-center gap-3"
                  style={{ color: GOLD }}
                >
                  <span className="w-5 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
                  {s.label}
                </motion.p>

                <div className="overflow-hidden mb-6">
                  <motion.h2
                    animate={{ y: isActive ? "0%" : "110%" }}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="font-display text-cream leading-tight"
                    style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)", letterSpacing: "var(--tracking-heading)" }}
                  >
                    {s.title}
                  </motion.h2>
                </div>

                <motion.p
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  transition={{ duration: 0.7, delay: isActive ? 0.15 : 0 }}
                  className="text-cream/60 leading-relaxed text-lg max-w-sm mb-8"
                >
                  {s.body}
                </motion.p>

                {interactivePOIs.length > 0 && isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex flex-wrap gap-2"
                  >
                    {interactivePOIs.map(poi => {
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

                {s.id === "directions" && isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-2"
                  >
                    <DirectionsCard />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT — sticky map + images */}
        <div className="lg:col-span-8">
          <div className="sticky top-0 h-screen flex flex-col border-l border-white/5">

            {/* Nav dots */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
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

            {/* Top half — map */}
            <div className="flex-1 relative min-h-0">
              <MapboxMap camera={mapCamera} pois={mapPOIs} route={activeRoute} />
              <div className="absolute top-5 left-5 z-10 bg-brand-black/80 backdrop-blur-sm px-3 py-1.5 pointer-events-none">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: GOLD }}>
                  {String(activeIdx + 1).padStart(2, "0")} / {String(SUBSECTIONS.length).padStart(2, "0")}
                </span>
              </div>
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

            {/* Bottom half — image strip */}
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
                      <Image src={img} alt="" fill className="object-cover" sizes="25vw" priority={activeIdx === 0 && i === 0} />
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
