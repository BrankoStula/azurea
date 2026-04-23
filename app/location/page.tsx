import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location",
  description: "The Villa V Collection is situated in Bali, Indonesia — discover the surroundings.",
};

export default function LocationPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — location-hero
          Full-width aerial image with location title overlay.
          ─────────────────────────────────────────────────────────────────────
          ASSET READY:   /brand_assets_-002.jpg (aerial waterfall drone shot)
          COPY REQUIRED (blocker B-12): Confirm exact area name —
                         Canggu / Ubud / Seminyak / Pererenan / other.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="location-hero"
        aria-label="Location hero"
        className="relative w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: "url('/brand_assets_-002.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          minHeight: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-brand-black/40" />
        <div className="relative section-wrapper text-cream pb-16">
          <p className="label-caps text-brand-green mb-3">
            {/* PLACEHOLDER — replace with confirmed area name (B-12) */}
            [Area Name], Bali, Indonesia
          </p>
          <h1 style={{ fontSize: "var(--text-h1)", letterSpacing: "var(--tracking-heading)" }}>
            The Location
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — location-panorama
          Edge-to-edge panoramic jungle canopy image. No text overlay.
          ─────────────────────────────────────────────────────────────────────
          ASSET READY: /brand_assets_-003.jpg (aerial panoramic jungle, wide crop)
          No content dependencies — implement immediately once design is ready.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="location-panorama"
        aria-label="Bali jungle panorama"
        className="w-full overflow-hidden"
        style={{ maxHeight: "40vh" }}
      >
        {/* Replace with Next.js <Image> component, fill layout, object-cover */}
        <div
          className="w-full h-64 bg-brand-black/20"
          style={{
            backgroundImage: "url('/brand_assets_-003.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "260px",
          }}
          role="img"
          aria-label="Aerial view of Bali jungle canopy"
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — location-context
          Text section: region description, key distances to landmarks.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-12): Area name, region description.
          COPY REQUIRED (blocker B-13): 6–10 nearby POIs with drive time/distance.
                         Example format: "Tanah Lot Temple — 12 min drive"
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="location-context"
        data-placeholder
        aria-label="Location context and distances"
        className="section-wrapper"
      >
        <h2>[ LOCATION CONTEXT ]</h2>
        <p>
          Area name and region description (B-12).<br />
          Nearby POI list with drive times (B-13): 6–10 items.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — location-map
          Embedded interactive map with a pin at the villa site coordinates.
          ─────────────────────────────────────────────────────────────────────
          REQUIRED (blocker C-01): GPS coordinates of the villa site.
          REQUIRED (blocker C-02): Google Maps or Mapbox API key → add to .env.local
                         as NEXT_PUBLIC_MAPS_API_KEY.
          IMPLEMENTATION NOTE: Use a 'use client' wrapper component for the map
                         embed — the map SDK requires browser APIs.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="location-map"
        data-placeholder
        aria-label="Interactive location map"
        className="w-full"
        style={{ minHeight: "480px" }}
      >
        <h2>[ INTERACTIVE MAP ]</h2>
        <p>
          GPS coordinates required (C-01).<br />
          Maps API key required (C-02) → NEXT_PUBLIC_MAPS_API_KEY in .env.local
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — location-nearby
          Grid or list of nearby points of interest. Icon, name, distance/time.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-13): POI list and distances.
          Suggested categories: beaches, temples, restaurants, airport, hospital.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="location-nearby"
        data-placeholder
        aria-label="Nearby attractions"
        className="section-wrapper bg-surface"
      >
        <h2>[ NEARBY ATTRACTIONS ]</h2>
        <p>
          6–10 nearby POIs with category, name, and drive time/distance (B-13).
        </p>
      </section>
    </>
  );
}
