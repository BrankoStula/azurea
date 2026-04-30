// components/sections/EarlyInvestorSection.tsx
"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

const REASONS = [
  {
    num: "01",
    title: "Best Unit Selection",
    body: "Choose your preferred orientation, privacy level, and views before public launch. Early investors access positions not available once marketing opens to the wider market.",
  },
  {
    num: "02",
    title: "Lowest Entry Price",
    body: "VIP investors secure units at pre-market pricing — before appreciation driven by public launch activity and broader market exposure.",
  },
  {
    num: "03",
    title: "Flexible Payment Structure",
    body: "Early-stage buyers benefit from phased payment terms and structured commitments not available to post-launch purchasers.",
  },
  {
    num: "04",
    title: "Priority Allocation",
    body: "Secure your position before public competition begins. Once the open marketing phase launches, selection is limited to remaining inventory.",
  },
];

export default function EarlyInvestorSection() {
  return (
    <section className="relative bg-brand-black border-b border-cream/10 overflow-hidden">
      
      {/* ── TOP RIGHT PALM SHADOW ── */}
      <div className="absolute top-0 right-0 w-full max-w-lg md:max-w-2xl h-[500px] pointer-events-none z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/leafs_transparent_top_right.png" 
          alt=""
          className="absolute -top-10 -right-10 w-full h-auto object-contain opacity-30"
          style={{ mixBlendMode: 'multiply' }} 
        />
      </div>

      {/* ── Content (z-10 ensures it stays above the waves and shadows) ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">

        {/* ── Header ── */}
        <div className="py-16 md:py-20 border-b border-cream/10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-20 items-end">

            <div>
              <motion.p
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="label-caps mb-5 flex items-center gap-4"
                style={{ color: GOLD }}
              >
                <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD }} />
                Why Now
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="font-display text-cream leading-tight"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", letterSpacing: "var(--tracking-heading)" }}
              >
                Why Early Investors<br />Enter at This Stage
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="text-cream/50 text-base md:text-lg leading-relaxed"
            >
              This phase is reserved for a limited number of investors before Azurea enters public marketing. Those who commit early gain structural advantages unavailable once the wider market opens.
            </motion.p>
          </div>
        </div>

        {/* ── Reason cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/[0.06] border border-cream/[0.06] my-2">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              className="relative bg-brand-black px-8 md:px-12 py-12 flex flex-col items-center text-center group"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-[2px] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.09 + 0.2, ease: EASE }}
                style={{ backgroundColor: `${GOLD}40` }}
              />

              <span
                className="font-display leading-none select-none tabular-nums mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: `${GOLD}30` }}
              >
                {r.num}
              </span>

              <h3
                className="font-display text-cream leading-tight mb-4 group-hover:text-[#C9A55A] transition-colors duration-300"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
              >
                {r.title}
              </h3>

              <p className="text-cream/45 leading-relaxed text-sm md:text-base max-w-sm">
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12 md:py-14"
        >
          <p className="text-cream/30 text-sm max-w-md">
            This phase is limited to a small number of qualified buyers. Unit availability is allocated on a first-confirmed basis.
          </p>
          <motion.button
            onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 px-8 py-3.5 font-display text-sm uppercase tracking-widest text-brand-black transition-colors duration-200 whitespace-nowrap backdrop-blur-md"
            style={{ backgroundColor: GOLD }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8904a")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            Request VIP Access
          </motion.button>
        </motion.div>

      </div>

      {/* ── ADVANCED, ASYMMETRIC PURE CSS SVG WAVE OVERLAY ── */}
      <div className="absolute bottom-0 left-0 w-full h-64 md:h-[32rem] pointer-events-none z-0">
        <svg 
          viewBox="0 0 1440 300" 
          preserveAspectRatio="none" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.4">
            {Array.from({ length: 22 }).map((_, i) => {
              const baseStackY = 280 - (i * 4);
              const peakHeight = 120 + i * 5; 
              
              const pathData = `M-50,${baseStackY} 
                                C240,${peakHeight} 
                                1080,${peakHeight + 100} 
                                1500,${260 + (i*0.4) - (i * 4)}`; 

              const lineOpacity = 0.5 - (i * 0.015); 

              return (
                <path
                  key={i}
                  d={pathData}
                  opacity={Math.max(0.08, lineOpacity)} 
                />
              );
            })}
          </g>
        </svg>
      </div>

    </section>
  );
}