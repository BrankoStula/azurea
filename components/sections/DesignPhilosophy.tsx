// components/sections/project/DesignPhilosophy.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Hexagon, Leaf, DoorOpen, type LucideIcon } from "lucide-react";

const u = (id: string, w = 1920) => `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=${w}&fit=crop`;
const LUXURY = [0.16, 1, 0.3, 1] as const;

const PILLARS: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: Building2, title: "Mediterranean Tropical",         body: "Inspired coastal architecture"  },
  { Icon: Hexagon,   title: "Clean Geometric Volumes",        body: "Timeless structural elegance"   },
  { Icon: Leaf,      title: "Natural Material Palette",       body: "Stone, timber, raw concrete"    },
  { Icon: DoorOpen,  title: "Seamless Indoor-Outdoor Living", body: "Full glazing meets open air"    },
];

export default function DesignPhilosophy() {
  const b2ImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: b2Y } = useScroll({ target: b2ImgRef, offset: ["start end", "end start"] });
  const imgParallax = useTransform(b2Y, [0, 1], ["5%", "-5%"]);

  return (
    <div className="bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12">
        <div ref={b2ImgRef} className="lg:col-span-5 relative overflow-hidden" style={{ minHeight: "min(75vh, 680px)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: LUXURY }}
            className="absolute inset-0"
            style={{ y: imgParallax, scale: 1.12 }}
          >
            <Image src={u("1507525428034-b723cf961d3e")} alt="Azurea architecture" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-cream/15 pointer-events-none" />
          </motion.div>
        </div>

        <div className="lg:col-span-7 px-8 md:px-12 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-brand-green text-[10px] uppercase tracking-[0.3em] mb-6"
          >
            Design Philosophy
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h3
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: LUXURY }}
              className="font-display text-brand-black leading-tight"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "var(--tracking-heading)" }}
            >
              Mediterranean Meets Tropical
            </motion.h3>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#28282B]/55 leading-relaxed mb-12 max-w-lg"
          >
            Azurea blends timeless Mediterranean influences with tropical living — clean geometric volumes, a natural material palette, and seamless indoor-outdoor spaces that respond to Bali&apos;s climate and character.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const Icon = p.Icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 + i * 0.09, ease: LUXURY }} className="border border-gray-lt/50 hover:border-brand-green/50 transition-colors duration-300 p-5 group cursor-default">
                  <div className="w-8 h-8 bg-brand-green/8 border border-brand-green/20 group-hover:bg-brand-green/14 transition-colors duration-300 flex items-center justify-center mb-3">
                    <Icon size={14} className="text-brand-green" strokeWidth={1.5} />
                  </div>
                  <p className="text-brand-black text-[13px] font-medium mb-1">{p.title}</p>
                  <p className="text-gray-md text-[12px]">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}