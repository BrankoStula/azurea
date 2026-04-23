// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { id: "01", label: "Project", href: "/project", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", tagline: "Discover the Vision" },
  { id: "02", label: "Location", href: "/location", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop", tagline: "Bali, Indonesia" },
  { id: "03", label: "Villas", href: "/product", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", tagline: "Curated Luxury" },
  { id: "04", label: "Plans", href: "/plans", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop", tagline: "Architectural Detail" },
  { id: "05", label: "Promotions", href: "/promotions", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop", tagline: "Exclusive Offers" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  // Auto-hide on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) setHoveredLabel(null);
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setHoveredLabel(null);
  };

  const activeLink = navLinks.find(link => link.label === hoveredLabel) || navLinks[0];

  return (
    <>
      {/* ─── NAVBAR MAIN HEADER (COMPACT) ─── */}
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden && !isOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-0 left-0 w-full h-24 px-6 md:px-12 flex items-start pt-6 justify-between z-50 bg-transparent overflow-visible pointer-events-none"
      >
        {/* Left: Hamburger Menu (Scaled Down Slightly) */}
        <button
          onClick={toggleMenu}
          className="p-2 -ml-2 text-brand-green hover:text-brand-green-dk transition-colors z-50 focus:outline-none flex-shrink-0 pointer-events-auto"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={36} strokeWidth={1.5} /> : <Menu size={36} strokeWidth={1.5} />}
        </button>

        {/* Middle: Integrated Brand Name & Logo (Scaled Down) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-50 w-max top-6 pointer-events-auto">
          <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2 md:gap-3 group mix-blend-difference text-cream">
            <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.1em] uppercase group-hover:opacity-80 transition-opacity">
              THE VILLA
            </span>
            <span className="text-brand-green text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-display leading-none mt-[-4px] md:mt-[-6px] group-hover:scale-105 transition-transform duration-500 mix-blend-normal">
              V
            </span>
            <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.1em] uppercase group-hover:opacity-80 transition-opacity">
              COLLECTION
            </span>
          </Link>
        </div>

        {/* Right: Custom Animated Contact CTA (Scaled Down) */}
        <div className="z-50 flex-shrink-0 pointer-events-auto mt-1 md:mt-0">
          <motion.div initial="hidden" animate="visible" whileHover="hover" className="relative flex items-center justify-center px-6 md:px-8 py-2 md:py-3 group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 overflow-hidden z-0">
              <motion.div className="absolute inset-0 bg-brand-green" variants={{ hidden: { y: "100%" }, visible: { y: "100%" }, hover: { y: "0%" } }} transition={{ duration: 0.3, ease: "easeInOut" }} />
            </div>

            {/* Borders */}
            <motion.div className="absolute right-0 bottom-0 h-[2px] bg-brand-green z-10" variants={{ hidden: { width: 0 }, visible: { width: "100%" }, hover: { width: 0 } }} transition={{ duration: 0.25, ease: "linear" }} />
            <motion.div className="absolute left-0 bottom-0 w-[2px] h-full bg-brand-green origin-bottom z-10" variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 }, hover: { scaleY: 0 } }} transition={{ duration: 0.2, delay: 0.25, ease: "linear" }} />
            <motion.div className="absolute left-0 top-0 w-full h-[2px] bg-brand-green origin-left z-10" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 }, hover: { scaleX: 0 } }} transition={{ duration: 0.25, delay: 0.45, ease: "linear" }} />
            <motion.div className="absolute left-full top-0 h-[2px] bg-brand-green origin-left pointer-events-none z-10" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 }, hover: { scaleX: 0 } }} style={{ width: "100vw" }} transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }} />

            <Link href="/contact" onClick={handleLinkClick} className="relative z-20 font-display text-lg md:text-xl lg:text-2xl uppercase tracking-widest text-cream transition-colors whitespace-nowrap">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── FULL SCREEN OVERLAY MENU (Unchanged logic, just scaling) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.2 } }} transition={{ duration: 0.4 }} className="fixed inset-0 z-40 bg-cream overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div key={activeLink.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} className="absolute inset-0 z-0 pointer-events-none">
                <Image src={activeLink.image} alt={activeLink.label} fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-32 right-6 md:right-12 z-20 mix-blend-difference text-cream text-right pointer-events-none overflow-hidden">
              <motion.div key={`top-${activeLink.id}`} initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }} animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 15% 0 0)", "inset(0 0% 0 0)"], opacity: 1 }} transition={{ duration: 0.65, times: [0, 0.5, 0.7, 1], ease: "easeInOut" }} className="font-display text-lg md:text-xl tracking-widest uppercase whitespace-nowrap">
                {activeLink.id} / {activeLink.label}
              </motion.div>
            </div>

            <div className="absolute bottom-12 right-6 md:right-12 z-20 mix-blend-difference text-cream text-right pointer-events-none overflow-hidden">
              <motion.div key={`bottom-${activeLink.id}`} initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }} animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 20% 0 0)", "inset(0 0% 0 0)"], opacity: 1 }} transition={{ duration: 0.65, delay: 0.1, times: [0, 0.5, 0.7, 1], ease: "easeInOut" }} className="text-xs md:text-sm uppercase tracking-[0.2em] whitespace-nowrap">
                {activeLink.tagline}
              </motion.div>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 overflow-visible">
              <motion.nav initial="closed" animate="open" exit="closed" variants={{ open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }, closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } }} className="flex flex-col gap-2 md:gap-4 items-start">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -150 } }} transition={{ type: "spring", stiffness: 100, damping: 15 }} className="py-2 md:py-4 relative w-full">
                    <Link href={link.href} onClick={handleLinkClick} onMouseEnter={() => setHoveredLabel(link.label)} onMouseLeave={() => setHoveredLabel(null)} className="relative inline-flex items-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-black hover:text-brand-green transition-colors uppercase tracking-widest leading-none mix-blend-difference text-cream text-left group/link">
                      <motion.span className="absolute right-[calc(100%+1.5rem)] top-1/2 h-[2px] bg-cream origin-right" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} style={{ width: "100vw" }} />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}