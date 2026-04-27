// components/sections/CinematicJourney/index.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FinancialDashboard from "./FinancialDashboard";
import { VisionStats, MaterialSwatches, VillaFeatures } from "./ChapterExtras";

// ─── Types & Data ────────────────────────────────────────────────────────────

type Hotspot = { top: string; left: string; label: string };

type Chapter = {
  id: "vision" | "architecture" | "villa" | "investment";
  num: string;
  label: string;
  heading: string;
  body: string;
  imgMain: string;
  imgTopLeft?: string;
  imgBottomLeft?: string;
  hotspots?: Hotspot[];
};

const CHAPTERS: Chapter[] = [
  {
    id: "vision",
    num: "01",
    label: "The Vision",
    heading: "A Refined Coastal Address in Seseh",
    body: "Eight boutique villas in Seseh, Bali, positioned just minutes from Canggu's most active lifestyle and rental zones. Azurea combines immediate access to the coastline and key demand drivers with a more private, residential environment designed for both living and long-term performance.",
    imgMain:       "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp",
    imgTopLeft:    "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_12.webp",
    imgBottomLeft: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_11.webp",
  },
  {
    id: "architecture",
    num: "02",
    label: "The Architecture",
    heading: "Mediterranean Elegance. Tropical Flow.",
    body: "Clean geometric volumes, natural stone, and full-height glazing create spaces designed for Bali's climate. The architecture prioritizes airflow, natural cooling, and durability while maintaining a refined, timeless aesthetic suited for both private use and rental performance.",
    imgMain: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_6.webp",
    hotspots: [
      { top: "65%", left: "30%", label: "Travertine Stone" },
      { top: "45%", left: "65%", label: "Teak Timber"      },
      { top: "80%", left: "75%", label: "Polished Concrete"},
    ],
  },
  {
    id: "investment",
    num: "03",
    label: "The Investment",
    heading: "Built to Perform",
    body: "Prime Bali delivers exceptional yields and sustained capital appreciation. Limited supply in Seseh combined with surging international demand makes Azurea a rare acquisition.",
    imgMain: "",
  },
  {
    id: "villa",
    num: "04",
    label: "The Villa",
    heading: "Designed for Private Living and High-Performing Rentals",
    body: "Each villa is configured with three ensuite bedrooms, a private pool, enclosed living areas, and a rooftop terrace, designed to meet the expectations of both residents and short-term guests. The layout prioritizes privacy, functionality, and comfort within 155.8 m² of optimized built space.",
    imgMain: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_4.webp",
    hotspots: [
      { top: "70%", left: "50%", label: "Natural Stone Pool" },
      { top: "40%", left: "20%", label: "Enclosed Living"    },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

// ─── Mobile Financial Summary ────────────────────────────────────────────────

function MobileFinancials() {
  return (
    <div className="mt-8 border-t border-white/10 pt-8">
      <div className="grid grid-cols-2 gap-5 mb-8">
        {[
          { label: "Purchase Price",   val: "$400,000", gold: false },
          { label: "Year 1 Net Rent",  val: "$59,400",  gold: false },
          { label: "Projected ROI",    val: "14.85%",   gold: true  },
          { label: "Leasehold",        val: "25 Years", gold: false },
        ].map((m, i) => (
          <div key={i}>
            <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">{m.label}</p>
            <p
              className="font-display text-xl"
              style={{ color: m.gold ? GOLD : "var(--color-cream)" }}
            >
              {m.val}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 mb-4">Return Scenarios</p>
      <div className="flex flex-col gap-2">
        {[
          { label: "5-Year",  roi: "16.89%", total: "$337,754"   },
          { label: "10-Year", roi: "15.31%", total: "$612,223"   },
          { label: "25-Year", roi: "12.98%", total: "$1,313,378" },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between border border-white/10 px-4 py-3 bg-white/[0.02]">
            <span className="text-cream/50 text-xs uppercase tracking-widest">{s.label}</span>
            <span className="text-cream/70 text-xs">{s.total} total</span>
            <span className="text-xs font-semibold" style={{ color: GOLD }}>{s.roi}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-cream/25 text-[9px] leading-relaxed">
        Projections based on operating assumptions. Not guaranteed returns.
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CinematicJourney() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionEl   = useRef<HTMLElement>(null);
  const activeIdxRef = useRef(0);
  const navigating   = useRef(false);

  const isInvestment = activeIdx === 2;

  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
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
      if (isDown && cur >= CHAPTERS.length - 1) return;
      if (!isDown && cur <= 0) return;

      const target = isDown ? cur + 1 : cur - 1;
      const targetEl = sectionRefs.current[target];
      if (!targetEl) return; // panels hidden on mobile — don't intercept scroll

      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;

      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { navigating.current = false; }, 1000);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [isDesktop]);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="project" ref={sectionEl} className="relative w-full bg-brand-black text-cream border-b border-white/10">

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  (lg:hidden)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* Section intro */}
        <div className="px-6 pt-16 pb-10 border-b border-white/10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="label-caps mb-4 flex items-center gap-3"
            style={{ color: GOLD }}
          >
            <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
            The Azurea Project
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-3xl text-cream leading-tight"
          >
            Four Chapters.<br />One Investment.
          </motion.h2>
        </div>

        {/* Chapter cards */}
        {CHAPTERS.map((chapter, i) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="border-b border-white/10"
          >
            {/* Image */}
            {chapter.imgMain && (
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chapter.imgMain} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-brand-black/70 via-transparent to-transparent" />
                {/* Large ghost chapter number over image */}
                <div className="absolute bottom-4 left-5">
                  <span
                    className="font-display leading-none select-none"
                    style={{ fontSize: "clamp(3rem, 18vw, 6rem)", color: `${GOLD}40` }}
                  >
                    {chapter.num}
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-8">
              {/* Chapter number for investment (no image) */}
              {!chapter.imgMain && (
                <span
                  className="font-display leading-none block mb-4 select-none"
                  style={{ fontSize: "clamp(4rem, 22vw, 7rem)", color: `${GOLD}25` }}
                >
                  {chapter.num}
                </span>
              )}

              <p className="label-caps mb-5 flex items-center gap-3" style={{ color: GOLD }}>
                <span className="w-4 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
                {chapter.label}
              </p>
              <h3
                className="font-display text-cream leading-tight mb-4"
                style={{ fontSize: "clamp(1.5rem, 6vw, 2.25rem)" }}
              >
                {chapter.heading}
              </h3>
              <p className="text-cream/60 leading-relaxed text-sm">
                {chapter.body}
              </p>

              {chapter.id === "vision"       && <VisionStats />}
              {chapter.id === "architecture" && <MaterialSwatches />}
              {chapter.id === "villa"        && <VillaFeatures />}
              {chapter.id === "investment"   && <MobileFinancials />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden lg:flex)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-row">

        {/* ── LEFT PANE — sticky media ── */}
        <motion.div
          animate={{
            width:   isInvestment ? "0%"  : "50%",
            opacity: isInvestment ? 0     : 1,
          }}
          transition={{ duration: 1.2, ease: EASE }}
          className="sticky top-0 h-screen overflow-hidden shrink-0 border-r border-white/10"
        >
          <div className="relative w-full h-full bg-brand-black">

            {/* Layer 0: Vision collage */}
            <motion.div
              animate={{ opacity: activeIdx === 0 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 z-10 ${activeIdx === 0 ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <motion.path
                  animate={{ pathLength: activeIdx === 0 ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d="M 30% 25% L 75% 50% L 35% 75%"
                  stroke={GOLD} strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="opacity-50"
                />
                {[[30, 25], [75, 50], [35, 75]].map(([x, y], i) => (
                  <circle key={i} cx={`${x}%`} cy={`${y}%`} r="4" fill={GOLD} className="animate-pulse" />
                ))}
              </svg>
              <div className="absolute top-[10%] left-[5%] w-[40%] h-[30%] border border-white/10 shadow-2xl bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CHAPTERS[0].imgTopLeft} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[25%] right-[5%] w-[55%] h-[50%] z-20 border border-white/10 shadow-2xl bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CHAPTERS[0].imgMain} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-[10%] left-[15%] w-[35%] h-[35%] border border-white/10 shadow-2xl bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CHAPTERS[0].imgBottomLeft} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Layers 1 & 3: Architecture + Villa framed image */}
            {[1, 3].map((idx) => {
              const isThisActive = activeIdx === idx;
              const chapter = CHAPTERS[idx];
              return (
                <motion.div
                  key={chapter.id}
                  animate={{ opacity: isThisActive ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute inset-0 z-20 flex items-center justify-center p-12 xl:p-24 ${isThisActive ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <div className="relative w-full max-w-xl" style={{ height: "min(72vh, 700px)" }}>
                    {["-top-3 -left-3 w-8 h-px", "-top-3 -left-3 w-px h-8", "-top-3 -right-3 w-8 h-px", "-top-3 -right-3 w-px h-8",
                      "-bottom-3 -left-3 w-8 h-px", "-bottom-3 -left-3 w-px h-8", "-bottom-3 -right-3 w-8 h-px", "-bottom-3 -right-3 w-px h-8",
                    ].map((cls, j) => (
                      <div key={j} className={`absolute ${cls} bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? "opacity-100" : "opacity-0"}`} />
                    ))}
                    <motion.div
                      initial={false}
                      animate={{ scale: isThisActive ? 1 : 0.95 }}
                      transition={{ duration: 1.2, ease: EASE }}
                      className="absolute inset-0 overflow-hidden shadow-2xl border border-white/10 bg-white/5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={chapter.imgMain} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-brand-black/20" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}

            <div className="absolute bottom-10 left-10 z-50 flex items-center gap-4 pointer-events-none">
              <div className="w-12 h-px bg-[#C9A55A]" />
              <p className="text-[#C9A55A] text-[10px] tracking-[0.3em] uppercase drop-shadow-md">Azurea Estate</p>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT PANE — scrolling content ── */}
        <motion.div
          animate={{ width: isInvestment ? "100%" : "50%" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="w-[50%] shrink-0"
        >
          {/* Sticky progress nav */}
          <div className="flex sticky top-1/2 -translate-y-1/2 h-0 right-10 w-full justify-end z-50 pointer-events-none">
            <div className="flex flex-col gap-4 pointer-events-auto relative">
              <div className={`absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/10 -z-10 transition-opacity duration-700 ${isInvestment ? "opacity-0" : "opacity-100"}`} />
              {CHAPTERS.map((_, i) => (
                <button key={i} onClick={() => scrollTo(i)} className="w-12 h-12 flex justify-center items-center group relative z-10">
                  <span className={`w-0.5 transition-all duration-500 ease-out rounded-full ${i === activeIdx ? "h-8 bg-[#C9A55A]" : "h-2 bg-white/20 group-hover:bg-white/50 group-hover:h-4"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Chapter panels */}
          {CHAPTERS.map((chapter, i) => (
            <div
              key={chapter.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="w-full h-dvh flex items-center px-12 lg:px-24 relative overflow-hidden"
            >
              <div className={`w-full ${isInvestment && i === 2 ? "lg:grid lg:grid-cols-[1fr_2.2fr] lg:gap-20 items-center" : ""}`}>

                {/* Text content */}
                <motion.div
                  initial={false}
                  animate={{ opacity: activeIdx === i ? 1 : 0, y: activeIdx === i ? 0 : 30, scale: activeIdx === i ? 1 : 0.98 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="relative z-10 flex flex-col justify-center"
                >
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 font-display text-[24rem] leading-none text-white/5 select-none pointer-events-none">
                    {chapter.num}
                  </div>

                  <p className="label-caps mb-6 flex items-center gap-4" style={{ color: GOLD }}>
                    <span className="text-white/40">{chapter.num}</span>
                    <span className="w-6 h-px inline-block bg-[#C9A55A]/50" />
                    {chapter.label}
                  </p>

                  <h2 className="font-display text-cream leading-tight block pb-2 mb-8" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", letterSpacing: "var(--tracking-heading)" }}>
                    {chapter.heading}
                  </h2>

                  <p className="text-cream/60 text-lg leading-relaxed max-w-md">
                    {chapter.body}
                  </p>

                  {chapter.id === "vision"       && <VisionStats />}
                  {chapter.id === "architecture" && <MaterialSwatches />}
                  {chapter.id === "villa"        && <VillaFeatures />}
                </motion.div>

                {/* Financial dashboard — investment chapter only */}
                {chapter.id === "investment" && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: activeIdx === i ? 1 : 0, y: activeIdx === i ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    className="w-full h-full mt-12 lg:mt-0 flex flex-col justify-center overflow-y-auto no-scrollbar"
                  >
                    <FinancialDashboard />
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
