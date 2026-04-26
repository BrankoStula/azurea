"use client";

import { motion, AnimatePresence } from "framer-motion";

const u = (id: string, w = 1920) => `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=${w}&fit=crop`;

// Updated with 3 images per spec: Main View, Material 1 (top left), Material 2 (bottom left)
export const PROJECT_SPECS = [
  { 
    id: "foundation", label: "Foundation", brief: "Reinforce concrete", detail: "Deep driven piles with reinforced concrete ring beams, ensuring maximum seismic stability and longevity in tropical soil conditions.", 
    imgMain: u("1541888086-2d0bb2d8479e"), imgMat1: u("1518640467708-65b124a5202c"), imgMat2: u("1589939705384-5185137a7f0f") 
  },
  { 
    id: "structure", label: "Structure", brief: "Reinforce concrete", detail: "Heavy-duty reinforced concrete framework optimized for open-plan spans and structural integrity.", 
    imgMain: u("1503387762-592deb58ef4e"), imgMat1: u("1536444855212-cb4275084920"), imgMat2: u("1518005020951-eccb11030b42") 
  },
  { 
    id: "roof", label: "Roof", brief: "Reinforce concrete slab", detail: "Flat concrete slab with multi-layer waterproofing and thermal insulation, designed for rooftop terrace use.", 
    imgMain: u("1613553258832-7561f52da700"), imgMat1: u("1603565816281-b5860d5c80db"), imgMat2: u("1622396089568-dceeb441bdab") 
  },
  { 
    id: "walls", label: "Walls", brief: "Lightweight brick with plaster finish", detail: "Hebel lightweight concrete blocks finished with premium skim coat plaster for acoustic and thermal efficiency.", 
    imgMain: u("1513694203232-719a280e022f"), imgMat1: u("1586022879555-5be0ebce0477"), imgMat2: u("1602330105315-77983ea1c54e") 
  },
  { 
    id: "flooring", label: "Flooring", brief: "Premium tiles", detail: "Large format imported porcelain tiles in living areas, with slip-resistant natural stone variants in wet areas.", 
    imgMain: u("1581093450021-4a7360e9a6b5"), imgMat1: u("1505404919723-002ec28122db"), imgMat2: u("1600585154340-be6161a56a0c") 
  },
  { 
    id: "doors", label: "Doors & Windows", brief: "Aluminum frame with tempered glass", detail: "Custom extruded aluminum profiles with 8mm tempered glass. Floor-to-ceiling sliding systems to maximize indoor-outdoor flow.", 
    imgMain: u("1497362643225-3b4e1837a9d7"), imgMat1: u("1616423640778-28d1b53229bd"), imgMat2: u("1521193089946-b63dc29fa757") 
  },
  { 
    id: "kitchen", label: "Kitchen", brief: "Built-in with premium appliances", detail: "Custom teak cabinetry, quartz countertops, and integrated European appliances engineered for durability.", 
    imgMain: u("1556910103-1c02745aae4d"), imgMat1: u("1591873956972-e567f815041a"), imgMat2: u("1615529182904-1422eb7a13d8") 
  },
  { 
    id: "bathrooms", label: "Bathrooms", brief: "Premium sanitary ware and fittings", detail: "High-end fixtures, natural stone vanity tops, and seamless walk-in rainfall showers.", 
    imgMain: u("1584622650111-993a426fbf0a"), imgMat1: u("1620623253308-0130f1d1dc49"), imgMat2: u("1604147706283-d7119b6b713b") 
  },
  { 
    id: "pool", label: "Pool", brief: "Private pool with natural stone finish", detail: "Sukabumi natural green stone lining, featuring an automated low-maintenance filtration system.", 
    imgMain: u("1576013462273-d1a4a2ac36b5"), imgMat1: u("1519803138815-5e6080352ffb"), imgMat2: u("1581335967917-ceb8a245089c") 
  },
];

export default function InteractiveSpecifications({ activeSpecId, onSelect }: { activeSpecId: string, onSelect: (id: string) => void }) {
  const activeData = PROJECT_SPECS.find(s => s.id === activeSpecId) || PROJECT_SPECS[0];

  return (
    // TIGHTENED VERTICAL SPACING (mt-6, pt-6, mb-6, gap-y-3) TO FIT ON SCREEN
    <div className="mt-6 border-t border-white/10 pt-6 w-full">

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
        {PROJECT_SPECS.map(s => {
          const isActive = activeSpecId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="text-left group flex flex-col relative pl-3 transition-all duration-300"
            >
              {/* Active Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300 ${isActive ? 'bg-[#C9A55A]' : 'bg-transparent group-hover:bg-white/20'}`} />
              
              <span className={`text-[10px] uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-cream' : 'text-cream/60 group-hover:text-cream/80'}`}>
                {s.label}
              </span>
              <span className={`text-xs mt-0.5 truncate w-full transition-colors duration-300 ${isActive ? 'text-cream/90' : 'text-cream/40 group-hover:text-cream/60'}`}>
                {s.brief}
              </span>
            </button>
          );
        })}
      </div>

      {/* Deep Dive Detail Box (Animated) */}
      <div className="bg-white/[0.02] border border-white/10 p-4 min-h-[90px] flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A55A]" />
              <span className="text-[#C9A55A] text-[10px] uppercase tracking-widest">
                {activeData.label} Detail
              </span>
            </div>
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">
              {activeData.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}