// components/sections/ProcessJourney.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { KeyRound, FileCheck, Building2, PackageCheck, BarChart3, type LucideIcon } from "lucide-react";

const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";
const EASE = [0.16, 1, 0.3, 1] as const;
const SNAP: [number, number, number, number] = [0.4, 0, 0.2, 1];
const GOLD = "#C9A55A";

type Step = { num: string; label: string; heading: string; body: string; Icon: LucideIcon; img: string };

const STEPS: Step[] = [
  {
    num: "01", label: "Reservation",
    heading: "Secure Your Preferred Villa",
    body: "Choose your unit and lock it in — preferred selection, deposit structure, and reservation agreement handled from day one.",
    Icon: KeyRound,
    img: `${CDN}/azurea_gallery_5.webp`,
  },
  {
    num: "02", label: "Legal Structuring",
    heading: "PT PMA & Leasehold Setup",
    body: "Full guidance through company formation, leasehold execution, and legal review tailored for foreign investors entering Indonesia.",
    Icon: FileCheck,
    img: `${CDN}/azurea_gallery_13.webp`,
  },
  {
    num: "03", label: "Construction Delivery",
    heading: "Professional Build Management",
    body: "Milestone reporting and on-site execution oversight from groundbreak through completion — your capital works without demanding your time.",
    Icon: Building2,
    img: `${CDN}/azurea_gallery_12.webp`,
  },
  {
    num: "04", label: "Turnkey Handover",
    heading: "Ready to Rent on Day One",
    body: "Furniture, finishes, and rental readiness fully prepared before handover. Your villa arrives guest-ready with no delays.",
    Icon: PackageCheck,
    img: `${CDN}/azurea_gallery_6.webp`,
  },
  {
    num: "05", label: "Rental Management",
    heading: "Income Without the Operations",
    body: "Guest acquisition, OTA optimisation, housekeeping, maintenance, and monthly income reporting — all handled for you.",
    Icon: BarChart3,
    img: `${CDN}/azurea_gallery_9.webp`,
  },
];

// ─── MOBILE ACCORDION ────────────────────────────────────────────────────────

function MobileProcessJourney() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="block lg:hidden bg-brand-black border-y border-cream/8">
      {/* Header */}
      <div className="px-6 pt-14 pb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] mb-5 flex items-center gap-4" style={{ color: GOLD }}>
          <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD }} />
          From Purchase to Income · Fully Managed
        </p>
        <h2
          className="font-display text-cream leading-tight"
          style={{ fontSize: "clamp(2rem, 10vw, 3rem)", letterSpacing: "var(--tracking-heading)" }}
        >
          Your Next Steps
        </h2>
        {/* Step counter */}
        <p className="text-[10px] uppercase tracking-widest mt-3" style={{ color: GOLD }}>
          {String(activeIdx + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Accordion rows */}
      <div className="border-t border-cream/10">
        {STEPS.map((step, i) => {
          const isActive = i === activeIdx;
          const Icon = step.Icon;
          return (
            <div key={step.num} className="relative border-b border-cream/10">

              {/* Gold left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
                style={{ backgroundColor: GOLD }}
                animate={{ scaleY: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />

              {/* Row header button */}
              <button
                onClick={() => setActiveIdx(i)}
                className="w-full flex items-center gap-5 py-5 px-6 text-left cursor-pointer"
              >
                {/* Ghost number */}
                <span
                  className="font-display text-3xl leading-none w-10 shrink-0 transition-all duration-300"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1px ${isActive ? "rgba(201,165,90,0.5)" : "rgba(201,165,90,0.15)"}`,
                  }}
                >
                  {step.num}
                </span>

                {/* Label */}
                <span
                  className={`flex-1 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                    isActive ? "text-cream" : "text-cream/40"
                  }`}
                >
                  {step.label}
                </span>

                {/* Icon + toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <Icon
                    size={14}
                    style={{ color: isActive ? GOLD : "rgba(255,255,255,0.2)" }}
                    strokeWidth={1.5}
                  />
                  <motion.span
                    className="text-cream/30 text-xl leading-none"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    +
                  </motion.span>
                </div>
              </button>

              {/* Expandable body */}
              <motion.div
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                initial={false}
                transition={{ duration: 0.55, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-10 flex flex-col gap-6">

                  {/* Contained image */}
                  <div className="h-52 border border-cream/10 overflow-hidden">
                    <motion.img
                      src={step.img}
                      alt={step.label}
                      className="w-full h-full object-cover"
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.04 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                    />
                  </div>

                  {/* Step label row */}
                  <div className="flex items-center gap-3">
                    <Icon size={14} style={{ color: GOLD }} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                      Step {step.num} · {step.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3
                    className="font-display text-cream leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)", letterSpacing: "var(--tracking-heading)" }}
                  >
                    {step.heading}
                  </h3>

                  {/* Body */}
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {step.body}
                  </p>

                  {/* Progress bar */}
                  <div className="h-px bg-cream/10 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 h-full transition-all duration-500"
                      style={{ backgroundColor: GOLD, width: `${((i + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── DESKTOP SCROLL-DRIVEN ────────────────────────────────────────────────────

export default function ProcessJourney() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  const active = STEPS[activeIdx];

  return (
    <>
      <MobileProcessJourney />
    {/* 600vh total scroll height: 100vh visible + 500vh scroll travel */}
    <div ref={containerRef} className="hidden lg:block relative bg-brand-black border-y border-cream/8 h-[500vh] lg:h-[600vh]">
      
      {/* 100svh prevents jumping on mobile Safari when the address bar hides */}
      <div className="sticky top-0 h-[100svh] flex overflow-hidden">

        {/* ── MOBILE BACKGROUND IMAGES (Hidden on desktop) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden lg:hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={`mobile-bg-${step.num}`}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === activeIdx ? 1 : 0, scale: i === activeIdx ? 1 : 1.05 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          {/* Heavy gradient overlay to ensure text is perfectly legible */}
          <div className="absolute inset-0 bg-brand-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/90 to-transparent" />
        </div>

        {/* ══ LEFT — Content Column ══════════════════════════════════════════ */}
        <motion.div
          layout
          style={{ order: activeIdx % 2 === 0 ? 1 : 2 }}
          transition={{ duration: 0.25, ease: SNAP }}
          className={`relative z-10 flex flex-col w-full lg:w-[55%] px-6 md:px-12 lg:px-16 ${activeIdx % 2 === 0 ? "lg:border-r border-cream/8" : "lg:border-l border-cream/8"}`}
        >

          {/* ── DESKTOP BACKGROUND DECORATION (Hidden on mobile) ── */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/left_plant_bottom_1.jpg" 
              alt="" 
              className="absolute -top-12 -right-24 w-[44rem] opacity-20 object-contain object-top object-right transform -scale-x-100"
              style={{ mixBlendMode: 'multiply' }} 
            />
            {/* Animated Sweeping Abstract Gold Lines */}
            <div className="absolute top-[20%] left-0 w-full h-[80%]">
              <svg viewBox="0 0 800 1000" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g stroke={GOLD} strokeWidth="1.2" fill="none">
                  {Array.from({ length: 4 }).map((_, i) => {
                    const y1 = 200 + (i * 25);
                    const peak = 400 + (i * 15);
                    const y2 = 800 + (i * 20);
                    return (
                      <motion.path 
                        key={i} 
                        d={`M-100,${y1} C200,${peak} 500,${peak - 100} 900,${y2}`} 
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 - (i * 0.04) }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, delay: 0.2 + (i * 0.15), ease: EASE }}
                      />
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* Re-formatted Header with Animated Full-Width Border */}
          {/* Re-formatted Header with Animated Full-Width Border */}
          <div className="relative z-10 pt-10 pb-6 lg:pt-16 lg:pb-8 shrink-0 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 flex items-center gap-4" style={{ color: GOLD }}>
              <span className="w-6 lg:w-8 h-px inline-block" style={{ backgroundColor: GOLD }} />
              From Purchase to Income · Fully Managed
            </p>
            <h2 className="font-display text-cream leading-tight drop-shadow-xl" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "var(--tracking-heading)" }}>
              Your Next Steps
            </h2>

            {/* Edge-to-edge Animated Bottom Border */}
            <motion.div 
              className="absolute bottom-0 -left-6 md:-left-12 lg:-left-16 -right-6 md:-right-12 lg:-right-16 h-px bg-cream/20 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE }}
            />
          </div>

          {/* Step nav list with Animated Full-Width Border */}
          <div className="relative z-10 shrink-0 w-full">
            <div className="flex gap-6 lg:gap-10 py-5 lg:py-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {STEPS.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => containerRef.current?.scrollTo({
                    top: (containerRef.current?.offsetTop ?? 0) + (i / STEPS.length) * (containerRef.current?.scrollHeight ?? 0),
                  })}
                  className="flex items-center gap-3 shrink-0 group drop-shadow-sm cursor-pointer py-2"
                >
                 <span
                    className={`transition-all duration-300 rounded-full ${
                      i === activeIdx 
                        ? "bg-[#C9A55A] shadow-[0_0_4px_rgba(201,165,90,0.5)]" 
                        : "bg-cream/40"
                    }`}
                    style={{
                      width: i === activeIdx ? "28px" : "12px",
                      height: "2px",
                    }}
                  />
                  <span
                    className={`text-xs lg:text-sm uppercase tracking-widest font-medium transition-colors duration-300 whitespace-nowrap ${
                      i === activeIdx ? "text-[#C9A55A]" : "text-cream hover:text-cream/80"
                    }`}
                  >
                    Step {s.num}
                  </span>
                </button>
              ))}
            </div>

            {/* Edge-to-edge Animated Bottom Border */}
            <motion.div 
              className="absolute bottom-0 -left-6 md:-left-12 lg:-left-16 -right-6 md:-right-12 lg:-right-16 h-px bg-cream/20 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
            />
          </div>


          {/* Active step content */}
          <div className="flex-1 flex flex-col justify-end pb-16 lg:justify-center lg:pb-0 relative overflow-hidden">
             
            {/* ── GHOST NUMBER CONTAINER ── */}
            {/* ── GHOST NUMBER CONTAINER ── */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
              {STEPS.map((step, i) => (
                <motion.div
                  key={`ghost-${step.num}`}
                  // CHANGED: Removed the negative positioning (-2%). 
                  // Anchored it safely inside using right-4 (mobile) and right-8 (desktop).
                  className="absolute bottom-0 right-4 lg:right-8 flex flex-col items-end transition-all duration-500"
                  initial={false}
                  animate={{ 
                    opacity: i === activeIdx ? 1 : 0, 
                    y: i === activeIdx ? 0 : 40,
                    scale: i === activeIdx ? 1 : 0.95
                  }}
                  transition={{ duration: 0.35, ease: SNAP }}
                >
                  <span 
                    // CHANGED: Added pb-4 so the bottom curve of the large numbers doesn't get clipped by the container edge.
                    className="font-display block leading-none tracking-tighter pb-4"
                    style={{ 
                      fontSize: "clamp(12rem, 32vw, 24rem)", 
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(201, 165, 90, 0.25)",
                    }}
                  >
                    {step.num}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Step Details */}
            {STEPS.map((step, i) => {
              const Icon = step.Icon;
              const isActive = i === activeIdx;
              return (
                <motion.div
                  key={step.num}
                  className="absolute inset-x-0 bottom-16 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 flex flex-col z-10 lg:pr-8"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : i > activeIdx ? 40 : -24,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ duration: 0.18, ease: SNAP }}
                >
                  {/* Label */}
                  <div className="flex items-center gap-3 mb-5 lg:mb-8 relative z-10 drop-shadow-md">
                    <Icon size={16} style={{ color: GOLD }} strokeWidth={1.5} />
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                      Step {step.num} · {step.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3
                    className="font-display text-white lg:text-cream leading-tight mb-4 lg:mb-6 relative z-10 drop-shadow-lg pr-4"
                    style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)", letterSpacing: "var(--tracking-heading)" }}
                  >
                    {step.heading}
                  </h3>

                  {/* Body */}
                  <p className="text-white/80 lg:text-cream/60 text-sm md:text-base leading-relaxed max-w-md mb-8 lg:mb-10 relative z-10 drop-shadow-md pr-4">
                    {step.body}
                  </p>

                  {/* Progress bar */}
                  <div className="relative z-10 max-w-[220px]">
                    <div className="h-px bg-white/20 lg:bg-white/10 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 h-full transition-all duration-500 shadow-[0_0_8px_rgba(201,165,90,0.5)]"
                        style={{ backgroundColor: GOLD, width: `${((i + 1) / STEPS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ══ RIGHT — Image Column (Desktop only) ════════════════════════════ */}
        <motion.div
          layout
          style={{ order: activeIdx % 2 === 0 ? 2 : 1 }}
          transition={{ duration: 0.25, ease: SNAP }}
          className="hidden lg:flex relative flex-1 overflow-hidden"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === activeIdx ? 1 : 0, scale: i === activeIdx ? 1 : 1.05 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}

          {/* Vertical section label */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none z-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-cream/90 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {active.label}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
    </>
  );
}