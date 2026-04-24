// components/sections/project/VillaDetails.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Bath, Waves, Car, Home, ChefHat, type LucideIcon } from "lucide-react";

const u = (id: string, w = 1920) => `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=${w}&fit=crop`;
const LUXURY = [0.16, 1, 0.3, 1] as const;

const FEATURES: { Icon: LucideIcon; label: string; detail: string }[] = [
  { Icon: BedDouble, label: "3 Bedrooms",          detail: "Spacious private suites"              },
  { Icon: Bath,      label: "3 Bathrooms",          detail: "Premium sanitary ware and fittings"   },
  { Icon: Waves,     label: "Private Pool",         detail: "Natural stone finish"                 },
  { Icon: Car,       label: "Private Carport",      detail: "Secure covered parking"               },
  { Icon: Home,      label: "Enclosed Living Area", detail: "Floor-to-ceiling glazing"             },
  { Icon: ChefHat,   label: "Premium Kitchen",      detail: "Built-in with premium appliances"     },
];

function ImageMosaic() {
  const imgs = [ u("1571902943202-507ec2618e8f"), u("1495474472287-4d71bcdd2085"), u("1583212292454-1dea0f959c21") ];
  return (
    <div className="flex flex-col gap-3 h-full">
      <motion.div initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: LUXURY }} className="relative overflow-hidden" style={{ flex: 3 }}>
        <Image src={imgs[0]} alt="Azurea villa" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </motion.div>
      <div className="flex gap-3" style={{ flex: 2 }}>
        {imgs.slice(1).map((src, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, delay: 0.12 + i * 0.1, ease: LUXURY }} className="flex-1 relative overflow-hidden">
            <Image src={src} alt="Azurea villa" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function VillaDetails() {
  return (
    <div id="villas" className="bg-brand-black">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
        <div className="px-8 md:px-12 lg:px-16 py-20 lg:py-28 flex flex-col justify-center order-2 lg:order-1">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="text-brand-green text-[10px] uppercase tracking-[0.3em] mb-6">The Villa</motion.p>
          <div className="overflow-hidden mb-6">
            <motion.h3 initial={{ y: "105%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: LUXURY }} className="font-display text-cream leading-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "var(--tracking-heading)" }}>Designed for Refined Living</motion.h3>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.12 }} className="text-cream/50 leading-relaxed mb-10 max-w-lg">Eight private 3-bedroom villas — each with private pool, enclosed living area, and a thoughtful layout that balances comfort, privacy, and investment performance across 155.8 m² of built space.</motion.p>
          <ul className="space-y-4 mb-12">
            {FEATURES.map((f, i) => {
              const Icon = f.Icon;
              return (
                <motion.li key={f.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: LUXURY }} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 border border-white/10 group-hover:border-brand-green/60 group-hover:bg-brand-green/8 flex items-center justify-center shrink-0 transition-all duration-300">
                    <Icon size={14} className="text-brand-green" strokeWidth={1.5} />
                  </div>
                  <span className="text-cream text-[13px] font-medium min-w-35">{f.label}</span>
                  <span className="text-cream/35 text-[12px]">· {f.detail}</span>
                </motion.li>
              );
            })}
          </ul>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.2 }} className="border-t border-white/8 pt-8 flex gap-14">
            {[ { val: "155.8 m²", label: "Built Area" }, { val: "162 m²", label: "Max Land" } ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-brand-green leading-none mb-2" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.6rem)", letterSpacing: "var(--tracking-heading)" }}>{s.val}</p>
                <p className="text-cream/35 text-[10px] uppercase tracking-[0.18em]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="relative order-1 lg:order-2" style={{ minHeight: "min(75vh, 680px)" }}>
          <div className="absolute inset-0 p-6 lg:p-10"><ImageMosaic /></div>
        </div>
      </div>
    </div>
  );
}