// components/sections/InquirySection/index.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import InquiryForm from "./InquiryForm";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

const CONTACTS = [
  { Icon: Mail,    label: "Email",        value: "Admin@royalbalidevelopments.com", href: "mailto:Admin@royalbalidevelopments.com" },
  { Icon: Phone,   label: "Direct Line",  value: "+62 859 5677 9721",              href: "tel:+6285956779721"                    },
  { Icon: MapPin,  label: "Project Site", value: "Munggu, Bali · Indonesia",       href: null                                    },
];

export default function InquirySection() {
  return (
    <section id="inquiry" className="relative w-full min-h-screen flex flex-col lg:flex-row bg-brand-black text-cream overflow-hidden">

      {/* Architectural line overlays */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: EASE }}
          className="absolute top-0 bottom-0 left-[41.666%] w-px bg-white/10"
        />
        {[{ top: "top-24", delay: 0.2 }, { top: "bottom-24", delay: 0.4 }].map(({ top, delay }, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay, ease: EASE }}
            className={`absolute ${top} left-0 right-0 h-px bg-white/10`}
          />
        ))}
      </div>

      {/* Left column — image + contact info */}
      <div className="relative w-full lg:w-5/12 min-h-[60vh] lg:min-h-screen flex flex-col justify-center p-8 sm:p-12 lg:p-24 overflow-hidden">

        {/* Background image */}
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp"
            alt="Luxury Villa"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/80 to-brand-black/20" />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none"
            style={{ backgroundImage: "url('/backgroundpattern.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-caps mb-6 flex items-center gap-4" style={{ color: GOLD }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
              Investment Package
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 tracking-tight leading-[1.1]">
              Request the Azurea<br />Investment Package
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-sm">
              Receive the full villa details, investment assumptions, availability, payment structure, and next-step process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {CONTACTS.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 group">
                <div
                  className="w-10 h-10 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:text-brand-black transition-colors duration-300"
                  style={{ color: GOLD }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-white/80 hover:text-white transition-colors">{value}</a>
                  ) : (
                    <p className="text-white/80">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right column — form */}
      <div className="relative w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-24 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[120%] bg-[#C9A55A]/5 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-xl relative z-10"
        >
          <InquiryForm />
        </motion.div>
      </div>

    </section>
  );
}
