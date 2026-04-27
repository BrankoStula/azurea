// components/sections/Hero.tsx
"use client";

import { motion, Variants, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

const PROOF_ITEMS = ["8 Villas", "3 Bedrooms", "Private Pool", "Rooftop Terrace", "Est. 14.85% Yield", "25-Year Leasehold"];

const maskReveal: Variants = {
  hidden:   { y: "115%", opacity: 0 },
  visible:  { y: "0%", opacity: 1, transition: { duration: 1.4, ease: EASE } },
};

const maskRevealDelay: Variants = {
  hidden:   { y: "115%", opacity: 0 },
  visible:  { y: "0%", opacity: 1, transition: { duration: 1.4, ease: EASE, delay: 0.2 } },
};

const staggerContainer: Variants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

export default function Hero() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 150, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 150, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsPointerFine(e.matches);
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  const scrollToInquiry = () => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" });
  const scrollToProject = () => document.querySelector("#project")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={`relative w-full h-svh min-h-150 overflow-hidden bg-brand-black ${isPointerFine ? "cursor-none" : ""}`}>

      {/* Custom cursor — pointer devices only */}
      {isPointerFine && (
        <motion.div
          style={{ x: cursorXSpring, y: cursorYSpring }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-cream/80 mix-blend-difference pointer-events-none z-9999"
        />
      )}

      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        poster="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.75 }}
      >
        <source src="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_render_web.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays — mobile needs stronger bottom coverage */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-brand-black/50 via-transparent to-brand-black/95 md:to-brand-black/85" />
      <div className="absolute inset-0 z-0 bg-linear-to-r from-brand-black/30 via-transparent to-transparent md:hidden" />

      {/* ── TOP ROW — location badge ── */}
      <div className="absolute top-0 left-0 right-0 z-10 px-5 md:px-12 pt-28 md:pt-32 flex justify-between items-start pointer-events-none">

        {/* Mobile: compact left badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="md:hidden flex items-center gap-2"
        >
          <span className="w-4 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.6 }} />
          <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Seseh, Bali</span>
        </motion.div>

        {/* Desktop: right-anchored with extending accent line */}
        <div className="hidden md:flex ml-auto text-right relative">
          <motion.div
            className="absolute left-full top-[45%] h-0.5 origin-left ml-8"
            style={{ backgroundColor: GOLD, width: "100vw", opacity: 0.4 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <div className="overflow-hidden mb-1">
              <motion.p variants={maskReveal} className="text-[10px] tracking-[0.4em] uppercase" style={{ color: `${GOLD}CC` }}>Location</motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={maskRevealDelay} className="font-display text-2xl md:text-3xl uppercase tracking-[0.2em] text-cream">Seseh, Bali</motion.h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT — bottom-anchored ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-12 pb-10 md:pb-14 pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col max-w-4xl"
        >
          {/* Left accent line — desktop only */}
          <motion.div
            className="hidden md:block absolute right-full top-[30%] h-0.5 origin-right mr-8"
            style={{ backgroundColor: GOLD, width: "100vw", opacity: 0.4 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          />

          {/* Eyebrow — desktop only (mobile has top badge) */}
          <div className="hidden md:block overflow-hidden mb-5">
            <motion.p variants={maskReveal} className="text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD }}>
              Seseh, Bali · Private Residences
            </motion.p>
          </div>

          {/* Heading */}
          <div className="overflow-hidden mb-4 md:mb-6">
            <motion.h1
              variants={maskReveal}
              className="font-display leading-[1.08] tracking-tight text-cream font-light"
              style={{ fontSize: "clamp(2rem, 6.5vw, 4.5rem)" }}
            >
              Own a Fully Managed<br className="hidden sm:block" />
              {" "}3-Bedroom Villa in<br className="hidden sm:block" />
              {" "}Seseh, Bali
            </motion.h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-6 md:mb-8">
            <motion.p
              variants={maskRevealDelay}
              className="text-sm md:text-base font-light leading-relaxed max-w-sm md:max-w-xl"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              A boutique collection of 8 private villas with rooftop living, private pools, and projected high-yield rental performance.
            </motion.p>
          </div>

          {/* Proof strip */}
          <motion.div variants={maskRevealDelay} className="mb-7 md:mb-9">
            {/* Mobile: 2-col grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:hidden">
              {PROOF_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: GOLD, opacity: 0.6 }} />
                  <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {/* Desktop: inline with dividers */}
            <div className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2">
              {PROOF_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-5 text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {i > 0 && <span className="w-px h-3 inline-block" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />}
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={maskRevealDelay} className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
            <button
              onClick={scrollToInquiry}
              className="w-full sm:w-auto px-7 py-4 sm:py-3.5 font-display text-sm uppercase tracking-wide sm:tracking-widest transition-colors duration-200 text-brand-black whitespace-nowrap"
              style={{ backgroundColor: GOLD }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8904a")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
            >
              Request Investment Deck
            </button>
            <button
              onClick={scrollToProject}
              className="w-full sm:w-auto px-7 py-4 sm:py-3.5 border border-white/30 text-cream font-display text-sm uppercase tracking-widest hover:border-white/60 hover:bg-white/5 transition-all duration-200"
            >
              Explore the Project
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR — mobile only ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:hidden pointer-events-none"
      >
        <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.3)" }} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* ── GOLD CORNER ACCENT — mobile only ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
        className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none sm:hidden"
        style={{
          background: `radial-gradient(circle at bottom right, ${GOLD}20 0%, transparent 70%)`,
        }}
      />

    </section>
  );
}
