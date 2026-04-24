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
              <motion.h2 variants={maskRevealDelay} className="font-display text-xl md:text-3xl uppercase tracking-[0.2em] text-cream">Munggu, Bali</motion.h2>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-16 md:gap-0">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col relative">
            <motion.div
              className="absolute right-full top-[45%] h-[2px] bg-brand-green origin-right mr-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100vw" }}
            />

            <div className="overflow-hidden">
              <motion.h1 variants={maskReveal} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[8rem] uppercase leading-none tracking-tight text-cream whitespace-nowrap font-light">
                Exhale & Discover
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-4 md:mt-6">
              <motion.p variants={maskRevealDelay} className="text-xs sm:text-sm tracking-[0.4em] text-brand-green uppercase md:ml-2">Your Next Escape</motion.p>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-left md:text-right flex flex-col items-start md:items-end relative">
            {/* Accent line extending to the right */}
            <motion.div
              className="absolute left-full top-[15%] h-[2px] bg-brand-green origin-left ml-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100vw" }}
            />
            <div className="overflow-hidden mb-2">
              <motion.p variants={maskReveal} className="text-[10px] sm:text-xs tracking-[0.4em] text-brand-green/80 uppercase">Est. Yield</motion.p>
            </div>
            <div className="overflow-hidden mb-3">
              <motion.h3 variants={maskRevealDelay} className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-none font-light">
                $47,250<span className="text-sm md:text-lg font-body opacity-50 font-light tracking-wide">/YR</span>
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.p variants={maskRevealDelay} className="text-xs md:text-sm text-cream/60 font-light max-w-[240px] md:ml-auto leading-relaxed">
                High-yield rental income with a 15% exit profit potential.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}