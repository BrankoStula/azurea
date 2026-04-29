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
    // 600vh: 100vh visible + 500vh scroll travel (100vh per step)
    <div ref={containerRef} style={{ height: "600vh" }} className="relative bg-brand-black border-y border-cream/8">
      <div className="sticky top-0 h-screen flex overflow-hidden">

        {/* ══ LEFT — content column ══════════════════════════════════════════ */}
        <motion.div
          layout
          style={{ order: activeIdx % 2 === 0 ? 1 : 2 }}
          transition={{ duration: 0.25, ease: SNAP }}
          className={`relative flex flex-col w-full lg:w-[55%] px-8 md:px-12 lg:px-16 ${activeIdx % 2 === 0 ? "border-r" : "border-l"} border-cream/8`}
        >

          {/* ── BACKGROUND DECORATION (Locked inside the text column) ── */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            
            {/* Plant shadow anchored to the RIGHT edge and horizontally flipped */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/left_plant_bottom_1.jpg" 
              alt="" 
              className="absolute -top-12 -right-24 w-80 lg:w-[44rem] opacity-20 object-contain object-top object-right transform -scale-x-100"
              style={{ mixBlendMode: 'multiply' }} 
            />

            {/* Sweeping Abstract Gold Lines with increased opacity */}
            <div className="absolute top-[20%] left-0 w-full h-[80%] opacity-60">
              <svg viewBox="0 0 800 1000" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g stroke={GOLD} strokeWidth="1.2" fill="none">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const y1 = 200 + (i * 25);
                    const peak = 400 + (i * 15);
                    const y2 = 800 + (i * 20);
                    return (
                      <path 
                        key={i} 
                        d={`M-100,${y1} C200,${peak} 500,${peak - 100} 900,${y2}`} 
                        opacity={0.8 - (i * 0.04)} 
                      />
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between py-7 border-b border-cream/8 shrink-0">
            <p className="text-[20px] uppercase tracking-[0.3em] text-cream/30 drop-shadow-md">
              From Purchase to Income · Fully Managed
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
              {STEPS.map((s, i) => (
                <motion.span
                  key={s.num}
                  className="block"
                  style={{ position: i === 0 ? "relative" : "absolute", right: i === 0 ? undefined : "1rem" }}
                  initial={false}
                  animate={{ opacity: i === activeIdx ? 1 : 0, y: i === activeIdx ? 0 : 5 }}
                  transition={{ duration: 0.18, ease: SNAP }}
                >
                  <span style={{ color: GOLD }} className="drop-shadow-md">{s.num}</span>
                </motion.span>
              ))}
              <span className="text-cream/20 ml-6">/ 05</span>
            </div>
          </div>

          {/* Step nav list */}
          <div className="relative z-10 flex gap-6 py-5 border-b border-cream/8 shrink-0 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                onClick={() => containerRef.current?.scrollTo({
                  top: (containerRef.current?.offsetTop ?? 0) + (i / STEPS.length) * (containerRef.current?.scrollHeight ?? 0),
                })}
                className="flex items-center gap-2 shrink-0 group drop-shadow-sm"
              >
                <span
                  className="transition-all duration-300 rounded-full shadow-[0_0_4px_rgba(201,165,90,0.5)]"
                  style={{
                    width: i === activeIdx ? "20px" : "6px",
                    height: "2px",
                    backgroundColor: i === activeIdx ? GOLD : "rgba(255,255,255,0.18)",
                  }}
                />
                <span
                  className="text-[11px] uppercase tracking-widest transition-colors duration-300"
                  style={{ color: i === activeIdx ? GOLD : "rgba(255,255,255,0.4)" }}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Active step content */}
          <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
            {STEPS.map((step, i) => {
              const Icon = step.Icon;
              const isActive = i === activeIdx;
              return (
                <motion.div
                  key={step.num}
                  className="absolute inset-0 flex flex-col justify-center z-10"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : i > activeIdx ? 40 : -24,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ duration: 0.18, ease: SNAP }}
                >
                  {/* Ghost number background */}
                  <span
                    className="absolute right-0 bottom-8 font-display leading-none text-white/[0.02] select-none pointer-events-none drop-shadow-sm"
                    style={{ fontSize: "clamp(10rem, 18vw, 18rem)" }}
                  >
                    {step.num}
                  </span>

                  {/* Label */}
                  <div className="flex items-center gap-3 mb-8 relative z-10 drop-shadow-md">
                    <Icon size={14} style={{ color: GOLD }} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                      {step.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h2
                    className="font-display text-cream leading-tight mb-6 relative z-10 drop-shadow-lg"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)", letterSpacing: "var(--tracking-heading)" }}
                  >
                    {step.heading}
                  </h2>

                  {/* Body */}
                  <p className="text-cream/60 text-base leading-relaxed max-w-md mb-10 relative z-10 drop-shadow-sm">
                    {step.body}
                  </p>

                  {/* Progress bar */}
                  <div className="relative z-10 max-w-[220px]">
                    <div className="h-px bg-white/10 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 h-full transition-all duration-500 shadow-[0_0_8px_rgba(201,165,90,0.5)]"
                        style={{ backgroundColor: GOLD, width: `${((i + 1) / STEPS.length) * 100}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[9px] text-cream/30 tracking-widest drop-shadow-md">{i + 1} of 5</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ══ RIGHT — image column (desktop only) ════════════════════════════ */}
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
              animate={{ opacity: i === activeIdx ? 1 : 0 }}
              transition={{ duration: 0.2, ease: SNAP }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}

          {/* Ghost number on image */}
          <div className="absolute bottom-6 right-6 pointer-events-none select-none z-10">
            {STEPS.map((step, i) => (
              <motion.span
                key={step.num}
                className="font-display text-[#C9A55A] block absolute bottom-0 right-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                style={{ fontSize: "clamp(8rem, 14vw, 16rem)", lineHeight: 0.9 }}
                initial={false}
                animate={{ opacity: i === activeIdx ? 1 : 0, x: i === activeIdx ? 0 : 30 }}
                transition={{ duration: 0.28, ease: SNAP }}
              >
                {step.num}
              </motion.span>
            ))}
          </div>

          {/* Vertical section label */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none z-10">
            <p className="text-[9px] uppercase tracking-[0.4em] text-cream/40 whitespace-nowrap drop-shadow-lg">
              {active.label}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}