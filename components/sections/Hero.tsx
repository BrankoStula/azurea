// components/sections/Hero.tsx
"use client";

import { motion, Variants, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // components/sections/Hero.tsx
useEffect(() => {
  // Coupling the state update to a microtask prevents the cascading render error
  const checkDevice = () => {
    const isMouseDevice = window.matchMedia("(pointer: fine)").matches;
    if (isMouseDevice) setIsDesktop(true);
  };

  checkDevice(); // Direct call is usually fine here, but if the error persists:
  // requestAnimationFrame(checkDevice); 

  const moveCursor = (e: MouseEvent) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
  };

  window.addEventListener("mousemove", moveCursor);
  return () => window.removeEventListener("mousemove", moveCursor);
}, [cursorX, cursorY]);

  const maskReveal: Variants = {
    hidden: { y: "120%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const maskRevealDelay: Variants = {
    hidden: { y: "120%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-brand-black cursor-none">
      {isDesktop && (
        <motion.div
          style={{ x: cursorXSpring, y: cursorYSpring }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-cream/80 mix-blend-difference pointer-events-none z-[9999]"
        />
      )}

      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
        <source src="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_render_web.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-black/30 via-transparent to-brand-black/80" />

      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pb-12 pt-36 pointer-events-none">
        <div className="flex justify-end w-full">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-right relative">
            {/* Accent line extending to the right — mirrors the left-side Exhale line */}
            <motion.div
              className="absolute left-full top-[45%] h-[2px] bg-brand-green origin-left ml-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100vw" }}
            />
            <div className="overflow-hidden mb-1">
              <motion.p variants={maskReveal} className="text-[10px] sm:text-xs tracking-[0.4em] text-brand-green/80 uppercase">Location</motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={maskRevealDelay} className="font-display text-xl md:text-3xl uppercase tracking-[0.2em] text-cream">Seseh, Bali</motion.h2>
            </div>
          </motion.div>
        </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col relative max-w-4xl">
            <motion.div
              className="absolute right-full top-[30%] h-[2px] bg-brand-green origin-right mr-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100vw" }}
            />

            <div className="overflow-hidden mb-4 md:mb-5">
              <motion.p variants={maskReveal} className="text-[10px] sm:text-xs tracking-[0.4em] text-brand-green uppercase">Seseh, Bali · Private Residences</motion.p>
            </div>

            <div className="overflow-hidden mb-4 md:mb-6">
              <motion.h1 variants={maskReveal} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.05] tracking-tight text-cream font-light">
                Own a Fully Managed 3-Bedroom Villa in Seseh, Bali
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8 md:mb-10">
              <motion.p variants={maskRevealDelay} className="text-sm md:text-base text-cream/60 font-light leading-relaxed max-w-xl">
                A boutique collection of 8 private villas with rooftop living, private pools, and projected high-yield rental performance.
              </motion.p>
            </div>

            {/* Proof strip */}
            <motion.div variants={maskRevealDelay} className="flex flex-wrap gap-x-4 gap-y-2 mb-8 md:mb-10">
              {["8 Villas", "3 Bedrooms", "Private Pool", "Rooftop Terrace", "Est. 14.85% Yield", "25-Year Leasehold"].map((item, i) => (
                <span key={i} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-cream/50">
                  {i > 0 && <span className="w-[1px] h-3 bg-cream/20 -ml-2 hidden sm:block" />}
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={maskRevealDelay} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto">
              <button
                onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 bg-brand-green text-brand-black font-display text-sm uppercase tracking-widest hover:bg-brand-green/90 transition-colors duration-200"
              >
                Request Investment Deck
              </button>
              <button
                onClick={() => document.querySelector("#villas")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 border border-cream/30 text-cream font-display text-sm uppercase tracking-widest hover:border-cream/60 hover:bg-cream/5 transition-all duration-200"
              >
                View Villa Availability
              </button>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
}