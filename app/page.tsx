// app/page.tsx
import Hero from "@/components/sections/Hero";
import BrochureSection from "@/components/sections/BrochureSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrochureSection />
      
      {/* Existing Location Teaser */}
      <section id="location-teaser" className="relative w-full min-h-[60vh] overflow-hidden flex items-center justify-center bg-brand-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60" 
          style={{ backgroundImage: "url('/brand_assets_-002.jpg')" }}
        />
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-5xl md:text-7xl text-cream uppercase tracking-widest mb-6">Munggu, Bali</h2>
          <a href="/location" className="label-caps border-b border-cream text-cream pb-1 hover:text-brand-green hover:border-brand-green transition-colors">
            Discover the Location
          </a>
        </div>
      </section>

      {/* Other sections... */}
    </>
  );
}