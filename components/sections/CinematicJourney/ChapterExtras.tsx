// components/sections/CinematicJourney/ChapterExtras.tsx
import { MapPin, Calendar, Home, BedDouble, Bath, Waves, Car } from "lucide-react";

const GOLD = "#C9A55A";

export function VisionStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 border-t border-white/10 pt-8">
      {[
        { icon: MapPin,    label: "Location",    val: "Seseh, Bali"      },
        { icon: Home,      label: "Total Units", val: "8 Private Villas" },
        { icon: Calendar,  label: "Delivery",    val: "Q4 2026"          },
      ].map((s, i) => (
        <div key={i} className="flex flex-col gap-2">
          <s.icon size={16} style={{ color: GOLD }} />
          <p className="text-cream/40 text-[10px] uppercase tracking-widest">{s.label}</p>
          <p className="text-cream font-medium">{s.val}</p>
        </div>
      ))}
    </div>
  );
}

export function MaterialSwatches() {
  return (
    <div className="flex flex-col gap-4 mt-8 border-t border-white/10 pt-8">
      {[
        { name: "Travertine Stone",  imgUrl: "https://d1pjqs5r0ua4f1.cloudfront.net/polished_concreete.webp", desc: "Natural cooling properties, ideal for tropical climates"   },
        { name: "Teak Timber",       imgUrl: "https://d1pjqs5r0ua4f1.cloudfront.net/teak-timber.webp",        desc: "Durable, humidity-resistant, and sustainably sourced"      },
        { name: "Polished Concrete", imgUrl: "https://d1pjqs5r0ua4f1.cloudfront.net/concreete_finish.webp",   desc: "Low-maintenance finish designed for long-term use"          },
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
}

export function VillaFeatures() {
  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 mb-6">
        Optimized for groups · Built for privacy · Configured for short-term rental demand
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          { icon: BedDouble, label: "3 Ensuite Bedrooms" },
          { icon: Bath,      label: "3 Bathrooms"        },
          { icon: Waves,     label: "Private Pool"       },
          { icon: Car,       label: "Private Carport"    },
          { icon: Home,      label: "Rooftop Terrace"    },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3">
            <a.icon size={16} style={{ color: GOLD }} />
            <span className="text-cream/80 text-xs tracking-wide">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
