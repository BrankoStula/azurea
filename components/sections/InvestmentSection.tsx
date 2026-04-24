// components/sections/project/InvestmentSection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TrendingUp, BarChart3, Package, UserCog, Star, Globe, ShieldCheck, Hammer, Scale, Layers, ArrowUpRight, type LucideIcon } from "lucide-react";

const LUXURY = [0.16, 1, 0.3, 1] as const;

const HIGHLIGHTS: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: TrendingUp, title: "High Rental Yield",  body: "+12.8% in prime Bali areas"       },
  { Icon: BarChart3,  title: "Capital Growth",      body: "~5% p.a. long-term appreciation" },
  { Icon: Globe,      title: "Strong Demand",       body: "7M+ international arrivals"       },
  { Icon: Package,    title: "Limited Supply",      body: "Only 8 boutique residences"       },
  { Icon: UserCog,    title: "Property Management", body: "Full A-Z service provided"        },
  { Icon: Star,       title: "Lifestyle + Returns", body: "Personal use meets income"        },
];

const WHY_BALI = [
  { num: 1,    prefix: "#", suffix: "",   decimals: 0, label: "TripAdvisor ranking" },
  { num: 12.8, prefix: "+", suffix: "%",  decimals: 1, label: "Villa rental yield"  },
  { num: 5,    prefix: "~", suffix: "%",  decimals: 0, label: "Annual growth rate"  },
  { num: 7.05, prefix: "",  suffix: "M+", decimals: 2, label: "Arrivals in 2025"    },
];

const CREDS: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: ShieldCheck, title: "10-Year Warranty",     body: "Full structural guarantee"        },
  { Icon: Hammer,      title: "30+ Years Experience", body: "Proven development track record"  },
  { Icon: Globe,       title: "Dubai Broker Network", body: "Global sales & partnerships"      },
  { Icon: Scale,       title: "Legal Team",           body: "End-to-end legal support"         },
  { Icon: Star,        title: "Airbnb Superhost",     body: "Managed rental programme"         },
  { Icon: Layers,      title: "A-Z Process",          body: "Turnkey ownership experience"     },
];

function CountUp({ prefix = "", target, decimals = 0, suffix = "", duration = 2000 }: { prefix?: string; target: number; decimals?: number; suffix?: string; duration?: number; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let rafId: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(parseFloat(((1 - Math.pow(1 - p, 3)) * target).toFixed(decimals)));
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration, decimals]);

  return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>;
}

export default function InvestmentSection() {
  return (
    <>
      <div className="bg-[#04152E]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 px-6 md:px-12 lg:px-16 py-20 lg:py-28 border-b border-white/6">
          <div className="flex flex-col justify-center lg:pr-16">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="text-brand-green text-[10px] uppercase tracking-[0.3em] mb-6">The Investment</motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h3 initial={{ y: "105%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: LUXURY }} className="font-display text-cream leading-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "var(--tracking-heading)" }}>Built to Perform</motion.h3>
            </div>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-cream/45 leading-relaxed max-w-lg">Bali&apos;s prime real estate delivers exceptional yields with strong long-term capital appreciation. Limited supply in Seseh combined with surging international demand makes Azurea a rare and compelling acquisition.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: LUXURY }} className="flex items-center justify-center mt-12 lg:mt-0">
            <div className="border border-brand-green/25 px-12 py-10 text-center">
              <p className="font-display text-brand-green leading-none mb-3" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "var(--tracking-heading)" }}><CountUp prefix="+" target={12.8} decimals={1} suffix="%" duration={2200} /></p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.25em]">Villa rental yield · Prime Bali areas</p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 lg:py-20 border-b border-white/6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.Icon;
              return (
                <motion.div key={h.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: (i % 3) * 0.09, ease: LUXURY }} className="border border-white/6 hover:bg-[#0c2561]/60 transition-colors duration-300 p-6 group cursor-default">
                  <div className="w-9 h-9 bg-brand-green/10 border border-brand-green/20 group-hover:bg-brand-green/18 transition-colors duration-300 flex items-center justify-center mb-5"><Icon size={15} className="text-brand-green" strokeWidth={1.5} /></div>
                  <p className="text-cream text-[14px] font-medium mb-2">{h.title}</p>
                  <p className="text-cream/40 text-[12px] leading-relaxed">{h.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/6">
          {WHY_BALI.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="px-8 py-12 text-center">
              <p className="font-display text-brand-green leading-none mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "var(--tracking-heading)" }}><CountUp prefix={s.prefix} target={s.num} decimals={s.decimals} suffix={s.suffix} /></p>
              <p className="text-cream/35 text-[10px] uppercase tracking-[0.2em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#06183D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 lg:py-28">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="text-brand-green text-[10px] uppercase tracking-[0.3em] mb-12 flex items-center gap-4"><span className="w-8 h-px bg-brand-green/30 inline-block" />Why Invest With Us</motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CREDS.map((c, i) => {
              const Icon = c.Icon;
              return (
                <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: LUXURY }} className="flex gap-5">
                  <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0 mt-0.5"><Icon size={15} className="text-brand-green" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-cream text-[14px] font-medium mb-1">{c.title}</p>
                    <p className="text-cream/40 text-[12px]">{c.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="border-t border-cream/6 px-6 md:px-12 lg:px-16 py-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <p className="font-display text-cream/75 italic" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "var(--tracking-heading)" }}>&ldquo;Refined living. Exceptional returns.&rdquo;</p>
            <div className="flex items-center gap-4 shrink-0">
              <Link href="#brochure" className="inline-flex items-center gap-2 px-6 py-3.5 border border-brand-green/60 hover:border-brand-green text-brand-green text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group hover:bg-brand-green/5">Request the Brochure<ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" /></Link>
              <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-green hover:bg-brand-green-dk text-brand-black text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 group">Schedule a Viewing<ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" /></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}