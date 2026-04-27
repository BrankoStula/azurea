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
    <section className="bg-brand-black border-b border-white/10 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end py-16 md:py-20 border-b border-white/10"
        >
          <div>
            <p className="label-caps mb-5 flex items-center gap-4" style={{ color: GOLD }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD }} />
              Why Now
            </p>
            <h2
              className="font-display text-cream leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", letterSpacing: "var(--tracking-heading)" }}
            >
              Why Early Investors<br />Enter at This Stage
            </h2>
          </div>
          <p className="text-cream/50 text-base md:text-lg leading-relaxed">
            This phase is reserved for a limited number of investors before Azurea enters public marketing. Those who commit early gain structural advantages unavailable once the wider market opens.
          </p>
        </motion.div>

        {/* Reason rows */}
        {REASONS.map((r, i) => (
          <motion.div
            key={r.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className="grid grid-cols-12 gap-6 md:gap-12 items-start py-10 md:py-12 border-b border-white/[0.06] group relative"
          >
            {/* Hover accent line on left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-px overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#C9A55A]/0 to-transparent group-hover:via-[#C9A55A]/50 transition-all duration-500" />
            </div>

            {/* Number */}
            <div className="col-span-2 md:col-span-1 pt-1">
              <span
                className="font-display leading-none select-none"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: `${GOLD}28` }}
              >
                {r.num}
              </span>
            </div>

            {/* Title */}
            <div className="col-span-10 md:col-span-4 lg:col-span-3 pt-1">
              <h3
                className="font-display text-cream leading-tight group-hover:text-[#C9A55A] transition-colors duration-300"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                {r.title}
              </h3>
            </div>

            {/* Body */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8 md:pt-1">
              <p className="text-cream/45 leading-relaxed text-sm md:text-base max-w-2xl">
                {r.body}
              </p>
            </div>
          </motion.div>
        ))}

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12 md:py-14"
        >
          <p className="text-cream/30 text-sm max-w-md">
            This phase is limited to a small number of qualified buyers. Unit availability is allocated on a first-confirmed basis.
          </p>
          <button
            onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 px-8 py-3.5 font-display text-sm uppercase tracking-widest text-brand-black transition-colors duration-200 whitespace-nowrap"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8904a")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            Request VIP Access
          </button>
        </motion.div>

      </div>
    </section>
  );
}
