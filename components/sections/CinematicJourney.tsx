// components/sections/project/CinematicJourney.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Home, BedDouble, Bath, Waves, Car, TrendingUp, BarChart3, Clock, Wallet } from "lucide-react";

// ─── Data & Configuration ──────────────────────────────────────────────────

const u = (id: string, w = 1920) =>
  `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=${w}&fit=crop`;

type Hotspot = { top: string; left: string; label: string };

type Chapter = {
  id: "vision" | "architecture" | "villa" | "investment";
  num: string;
  label: string;
  heading: string;
  body: string;
  imgMain: string;
  imgTopLeft?: string;
  imgBottomLeft?: string;
  hotspots?: Hotspot[];
};

const CHAPTERS: Chapter[] = [
  {
    id: "vision",
    num: "01",
    label: "The Vision",
    heading: "A Private Coastal Enclave",
    body: "Eight boutique residences in Seseh, Bali — where the Indian Ocean meets an unspoiled stretch of black-sand coast and lush rice terraces.",
    imgMain: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp", 
    imgTopLeft: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_12.webp", 
    imgBottomLeft: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_11.webp", 
  },
  {
    id: "architecture",
    num: "02",
    label: "The Architecture",
    heading: "Mediterranean Meets Tropical",
    body: "Clean geometric volumes, natural stone, and floor-to-ceiling glazing create spaces that breathe — a timeless dialogue between European elegance and island living.",
    imgMain: u("1600596542815-ffad4c1539a9"), 
    hotspots: [
      { top: "65%", left: "30%", label: "Polished Concrete" },
      { top: "45%", left: "65%", label: "Teak Accents" },
      { top: "80%", left: "75%", label: "Tropical Landscaping" },
    ],
  },
  {
    id: "villa",
    num: "03",
    label: "The Villa",
    heading: "Designed for Refined Living",
    body: "Three ensuite bedrooms, a private pool with natural stone finish, premium kitchen, and private carport — all within 155.8 m² of thoughtfully arranged built space.",
    imgMain: "https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_4.webp", 
    hotspots: [
      { top: "70%", left: "50%", label: "Natural Stone Pool" },
      { top: "40%", left: "20%", label: "Enclosed Living" },
    ],
  },
  {
    id: "investment",
    num: "04",
    label: "The Investment",
    heading: "Built to Perform",
    body: "Prime Bali delivers exceptional yields and sustained capital appreciation. Limited supply in Seseh combined with surging international demand makes Azurea a rare acquisition.",
    imgMain: "", 
  },
];

// ─── Sub-Components for Rich Content ───

const VisionStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 border-t border-white/10 pt-8">
    {[
      { icon: MapPin, label: "Location", val: "Seseh, Bali" },
      { icon: Home, label: "Total Units", val: "8 Private Villas" },
      { icon: Calendar, label: "Delivery", val: "Q4 2026" },
    ].map((s, i) => (
      <div key={i} className="flex flex-col gap-2">
        <s.icon size={16} className="text-[#C9A55A]" />
        <p className="text-cream/40 text-[10px] uppercase tracking-widest">{s.label}</p>
        <p className="text-cream font-medium">{s.val}</p>
      </div>
    ))}
  </div>
);

const MaterialSwatches = () => (
  <div className="flex flex-col gap-4 mt-8 border-t border-white/10 pt-8">
    {[
      { name: "Travertine Stone", imgUrl: "https://d1pjqs5r0ua4f1.cloudfront.net/material_travertine.webp", desc: "Natural cooling properties" },
      { name: "Teak Timber",      imgUrl: "https://d1pjqs5r0ua4f1.cloudfront.net/material_teak.webp",       desc: "Sustainably sourced" },
      { name: "Polished Concrete",imgUrl: "https://d1pjqs5r0ua4f1.cloudfront.net/material_concrete.webp",   desc: "Seamless brutalist foundation" },
    ].map((m, i) => (
      <div key={i} className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.imgUrl} alt={m.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/10 shadow-lg" />
        <div>
          <p className="text-cream text-sm font-medium">{m.name}</p>
          <p className="text-cream/40 text-xs">{m.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const VillaAmenities = () => (
  <div className="grid grid-cols-2 gap-4 mt-8 border-t border-white/10 pt-8">
    {[
      { icon: BedDouble, label: "3 Bedrooms" },
      { icon: Bath, label: "3 Bathrooms" },
      { icon: Waves, label: "Private Pool" },
      { icon: Car, label: "Private Carport" },
    ].map((a, i) => (
      <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3">
        <a.icon size={16} className="text-[#C9A55A]" />
        <span className="text-cream/80 text-xs tracking-wide">{a.label}</span>
      </div>
    ))}
  </div>
);

// ─── Financial Dashboard Takeover ───

function FinancialDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col justify-center h-full pt-20 lg:pt-0"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A55A] animate-pulse" />
          <p className="text-[#C9A55A] text-[10px] uppercase tracking-[0.2em] font-semibold">Live Projections</p>
        </div>
        <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em]">Canggu Region · Leasehold (25 Yrs)</p>
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Purchase Price</p>
          <p className="font-display text-3xl text-cream">$400,000</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Year 1 Net Rent</p>
          <p className="font-display text-3xl text-cream">$59,400</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Break-Even</p>
          <p className="font-display text-3xl text-cream">6.7 Yrs</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Year 1 ROI</p>
          <p className="font-display text-3xl text-[#C9A55A]">14.85%</p>
        </div>
      </div>

      {/* Middle Section: Operations & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        {/* Year 1 Breakdown Table */}
        <div className="lg:col-span-5">
          <h4 className="text-white text-[11px] uppercase tracking-widest mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
            <Wallet size={14} className="text-[#C9A55A]"/> Year 1 Operations
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between"><span className="text-white/40">Gross Rev (81% Occ):</span> <span className="text-white font-medium">$74,249</span></div>
            <div className="flex justify-between"><span className="text-white/40">Management & Utilities (20%):</span> <span className="text-white font-medium">-$14,850</span></div>
            <div className="flex justify-between pt-3 border-t border-white/5">
              <span className="text-[#C9A55A] font-semibold">Net Rental Revenue:</span> 
              <span className="text-[#C9A55A] font-semibold">$59,400</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-white/40">Postbuild Value Apprec:</span> 
              <span className="text-white font-medium">+$40,000 <span className="text-[#C9A55A] text-[10px] ml-1">(10%)</span></span>
            </div>
          </div>
        </div>

        {/* Animated Area Chart */}
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-4">
            <span>Net Rent Accumulation</span>
            <span>$1,713,378 (25 Yrs)</span>
          </div>
          <div className="relative w-full h-32 border-b border-l border-white/20">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A55A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C9A55A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
                d="M 0 100 L 0 90 Q 25 70 50 45 T 100 5 L 100 100 Z" fill="url(#chartGrad)"
              />
              <motion.path
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                d="M 0 90 Q 25 70 50 45 T 100 5" fill="none" stroke="#C9A55A" strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Section: Three Scenarios side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 5 Year */}
        <div className="border border-white/10 p-5 bg-white/[0.02]">
          <h5 className="text-[#C9A55A] text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={12} /> 5-Year Scenario
          </h5>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between"><span className="text-white/40">Net Rent:</span> <span className="text-white">$309,115</span></div>
            <div className="flex justify-between"><span className="text-white/40">Property Residual:</span> <span className="text-white">$388,636</span></div>
            <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/60">Total Return:</span> <span className="text-white font-medium">$337,754</span></div>
            <div className="flex justify-between mt-1"><span className="text-[#C9A55A] font-semibold">Yearly ROI:</span> <span className="text-[#C9A55A] font-semibold">16.89%</span></div>
          </div>
        </div>

        {/* 10 Year */}
        <div className="border border-white/10 p-5 bg-white/[0.02]">
          <h5 className="text-[#C9A55A] text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={12} /> 10-Year Scenario
          </h5>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between"><span className="text-white/40">Net Rent:</span> <span className="text-white">$650,409</span></div>
            <div className="flex justify-between"><span className="text-white/40">Property Residual:</span> <span className="text-white">$321,814</span></div>
            <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/60">Total Return:</span> <span className="text-white font-medium">$612,223</span></div>
            <div className="flex justify-between mt-1"><span className="text-[#C9A55A] font-semibold">Yearly ROI:</span> <span className="text-[#C9A55A] font-semibold">15.31%</span></div>
          </div>
        </div>

        {/* Long Term */}
        <div className="border border-white/10 p-5 bg-white/[0.02]">
          <h5 className="text-[#C9A55A] text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={12} /> Long Term (25 Yrs)
          </h5>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between"><span className="text-white/40">Net Rent:</span> <span className="text-white">$1,713,378</span></div>
            <div className="flex justify-between"><span className="text-white/40">Property Residual:</span> <span className="text-white">$0</span></div>
            <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/60">Total Profit:</span> <span className="text-white font-medium">$1,313,378</span></div>
            <div className="flex justify-between mt-1"><span className="text-[#C9A55A] font-semibold">Yearly ROI:</span> <span className="text-[#C9A55A] font-semibold">12.98%</span></div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CinematicJourney() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionEl = useRef<HTMLElement>(null);
  const activeIdxRef = useRef(0);
  const navigating = useRef(false);

  const isInvestment = activeIdx === 3;

  // Sync ref for wheel listener
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  // Track desktop breakpoint so width animations don't fire on mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  // RESTORED: Snappy scroll-hijacking
  useEffect(() => {
    const section = sectionEl.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const viewMid = window.innerHeight / 2;
      
      // Only hijack scroll if we are looking at this specific section
      if (viewMid < rect.top || viewMid > rect.bottom) return;

      const cur = activeIdxRef.current;
      const isDown = e.deltaY > 0;

      // Allow natural scrolling to leave the component boundaries
      if (isDown && cur >= CHAPTERS.length - 1) return;
      if (!isDown && cur <= 0) return;

      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;

      const target = isDown ? cur + 1 : cur - 1;
      sectionRefs.current[target]?.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Cooldown timer prevents hyper-scrolling
      setTimeout(() => { navigating.current = false; }, 1000);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section ref={sectionEl} className="relative w-full bg-brand-black text-cream border-b border-white/10 flex flex-col lg:flex-row">
      
      {/* ════════════════════════════════════════════════════════════════════
          LEFT PANE — THE LAYER CAKE MEDIA CONTAINER
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        animate={{
          width: isDesktop ? (isInvestment ? "0%" : "50%") : "0%",
          opacity: isDesktop ? (isInvestment ? 0 : 1) : 0,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block sticky top-0 h-screen overflow-hidden shrink-0 border-r border-white/10"
      >
        <div className="relative w-full h-full bg-brand-black">
          
          {/* Layer 0: The Vision Collage */}
          <motion.div 
            animate={{ opacity: activeIdx === 0 ? 1 : 0 }} 
            transition={{ duration: 0.8 }} 
            className={`absolute inset-0 z-10 ${activeIdx === 0 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              <motion.path 
                animate={{ pathLength: activeIdx === 0 ? 1 : 0 }} 
                transition={{ duration: 1.5, ease: "easeInOut" }} 
                d="M 30% 25% L 75% 50% L 35% 75%" 
                stroke="#C9A55A" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="opacity-50" 
              />
              {[[30, 25], [75, 50], [35, 75]].map(([x, y], i) => (
                <circle key={i} cx={`${x}%`} cy={`${y}%`} r="4" fill="#C9A55A" className="animate-pulse" />
              ))}
            </svg>
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[30%] border border-white/10 shadow-2xl bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHAPTERS[0].imgTopLeft} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[25%] right-[5%] w-[55%] h-[50%] z-20 border border-white/10 shadow-2xl bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHAPTERS[0].imgMain} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[10%] left-[15%] w-[35%] h-[35%] border border-white/10 shadow-2xl bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHAPTERS[0].imgBottomLeft} alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Layer 1 & 2: Architectural Framed Image */}
          {[1, 2].map((idx) => {
            const isThisActive = activeIdx === idx;
            const chapter = CHAPTERS[idx];

            return (
              <motion.div 
                key={chapter.id}
                animate={{ opacity: isThisActive ? 1 : 0 }} 
                transition={{ duration: 0.8 }} 
                className={`absolute inset-0 z-20 flex items-center justify-center p-12 xl:p-24 ${isThisActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                {/* The Frame */}
                <div className="relative w-full h-full max-w-xl max-h-[800px]">
                  <div className={`absolute -top-3 -left-3 w-8 h-px bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 translate-x-4'}`} />
                  <div className={`absolute -top-3 -left-3 w-px h-8 bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 translate-y-4'}`} />
                  <div className={`absolute -top-3 -right-3 w-8 h-px bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 -translate-x-4'}`} />
                  <div className={`absolute -top-3 -right-3 w-px h-8 bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 translate-y-4'}`} />
                  <div className={`absolute -bottom-3 -left-3 w-8 h-px bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 translate-x-4'}`} />
                  <div className={`absolute -bottom-3 -left-3 w-px h-8 bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} />
                  <div className={`absolute -bottom-3 -right-3 w-8 h-px bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 -translate-x-4'}`} />
                  <div className={`absolute -bottom-3 -right-3 w-px h-8 bg-[#C9A55A]/60 transition-all duration-700 ${isThisActive ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} />

                  {/* Inner Image Container */}
                  <motion.div 
                    initial={false}
                    animate={{ scale: isThisActive ? 1 : 0.95 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 overflow-hidden shadow-2xl border border-white/10 bg-white/5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={chapter.imgMain} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brand-black/20" />
                    
                    {/* Hotspots */}
                    {chapter.hotspots?.map((spot, i) => (
                      <div key={i} className="absolute group cursor-pointer" style={{ top: spot.top, left: spot.left }}>
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="absolute inset-0 bg-[#C9A55A] rounded-full animate-ping opacity-50" />
                          <div className="relative w-2 h-2 bg-[#C9A55A] rounded-full" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-brand-black/80 px-3 py-1.5 rounded-sm absolute left-6 top-0 whitespace-nowrap">
                          <span className="text-[10px] tracking-widest uppercase text-cream">{spot.label}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          <div className="absolute bottom-10 left-10 z-50 flex items-center gap-4 pointer-events-none">
            <div className="w-12 h-px bg-[#C9A55A]" />
            <p className="text-[#C9A55A] text-[10px] tracking-[0.3em] uppercase drop-shadow-md">Azurea Estate</p>
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          RIGHT PANE — SCROLLING CONTENT
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        animate={{ width: isDesktop ? (isInvestment ? "100%" : "50%") : "100%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[50%] shrink-0"
      >
        {/* Sticky Progress Navigation inside the scrolling column */}
        <div className="hidden lg:flex sticky top-1/2 -translate-y-1/2 h-0 right-10 w-full justify-end z-50 pointer-events-none">
          <div className="flex flex-col gap-4 pointer-events-auto relative">
            <div className={`absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/10 -z-10 transition-opacity duration-700 ${isInvestment ? 'opacity-0' : 'opacity-100'}`} />
            {CHAPTERS.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className="w-12 h-12 flex justify-center items-center group relative z-10">
                <span className={`w-[2px] transition-all duration-500 ease-out rounded-full ${i === activeIdx ? "h-8 bg-[#C9A55A]" : "h-2 bg-white/20 group-hover:bg-white/50 group-hover:h-4"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Text Blocks */}
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="min-h-screen flex items-center px-8 sm:px-12 lg:px-24 py-16 lg:py-0 relative overflow-hidden"
          >
            {/* The layout ratio shifts here dynamically: 1fr to 2.2fr */}
            <div className={`w-full ${isInvestment ? 'lg:grid lg:grid-cols-[1fr_2.2fr] lg:gap-20 items-center' : ''}`}>

              {/* Mobile chapter image — left pane is desktop-only */}
              {chapter.imgMain && (
                <div className="lg:hidden w-full aspect-video overflow-hidden mb-8 border border-white/10 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={chapter.imgMain} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Text Layout with SNAP-IN Animation */}
              <motion.div 
                initial={false}
                animate={{ 
                  opacity: activeIdx === i ? 1 : 0, 
                  y: activeIdx === i ? 0 : 30,
                  scale: activeIdx === i ? 1 : 0.98
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col justify-center"
              >
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 font-display text-[16rem] lg:text-[24rem] leading-none text-white/5 select-none pointer-events-none">
                  {chapter.num}
                </div>

                <p className="label-caps text-[#C9A55A] mb-6 flex items-center gap-4">
                  <span className="text-white/40">{chapter.num}</span>
                  <span className="w-6 h-px bg-[#C9A55A]/50" />
                  {chapter.label}
                </p>

                <h2 className="font-display text-cream leading-tight block pb-2 mb-8" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", letterSpacing: "var(--tracking-heading)" }}>
                  {chapter.heading}
                </h2>

                <p className="text-cream/60 text-lg leading-relaxed max-w-md">
                  {chapter.body}
                </p>

                {/* Sub-content */}
                {chapter.id === "vision" && <VisionStats />}
                {chapter.id === "architecture" && <MaterialSwatches />}
                {chapter.id === "villa" && <VillaAmenities />}
              </motion.div>

              {/* Financial Dashboard snaps in on last section */}
              {chapter.id === "investment" && (
                <motion.div 
                  initial={false}
                  animate={{ opacity: activeIdx === i ? 1 : 0, y: activeIdx === i ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block w-full h-full mt-12 lg:mt-0"
                >
                  <FinancialDashboard />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}