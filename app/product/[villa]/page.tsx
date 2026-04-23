import type { Metadata } from "next";

/*
 * Valid villa slugs. generateStaticParams pre-renders these 3 routes at build
 * time — no dynamic server lookup required. Expand this list if more villas
 * are added (blocker F-03: confirm final unit count).
 */
const VILLAS = ["villa-1", "villa-2", "villa-3"] as const;
type VillaSlug = (typeof VILLAS)[number];

/*
 * Per-villa display data. Replace all placeholder values with confirmed content.
 * Blockers: B-06 (names), B-07 (specs), B-09 (pricing).
 */
const VILLA_DATA: Record<VillaSlug, {
  label: string;
  videoSrc: string;     /* path inside /public/videos/ — requires D-01 transcoding */
  posterSrc: string;    /* still frame from render — requires D-02 extraction */
}> = {
  "villa-1": {
    label: "Villa 1",
    videoSrc: "/videos/villa-1.mp4",
    posterSrc: "/renders/villa-1/hero-poster.jpg",
  },
  "villa-2": {
    label: "Villa 2",
    videoSrc: "/videos/villa-2.mp4",
    posterSrc: "/renders/villa-2/hero-poster.jpg",
  },
  "villa-3": {
    label: "Villa 3",
    videoSrc: "/videos/villa-3.mp4",
    posterSrc: "/renders/villa-3/hero-poster.jpg",
  },
};

export async function generateStaticParams() {
  return VILLAS.map((villa) => ({ villa }));
}

export async function generateMetadata(props: {
  params: Promise<{ villa: string }>;
}): Promise<Metadata> {
  const { villa } = await props.params;
  const data = VILLA_DATA[villa as VillaSlug];
  if (!data) return { title: "Villa Not Found" };
  return {
    title: data.label,
    description: `Explore ${data.label} — part of The Villa V Collection, Bali, Indonesia.`,
  };
}

export default async function VillaDetailPage(props: {
  params: Promise<{ villa: string }>;
}) {
  const { villa } = await props.params;
  const data = VILLA_DATA[villa as VillaSlug];

  if (!data) {
    /*
     * This branch only reachable if a slug outside generateStaticParams is
     * requested at runtime (e.g. /product/villa-4). Return a minimal fallback.
     */
    return (
      <section className="section-wrapper" data-placeholder>
        <h2>Villa not found</h2>
        <p>
          The requested villa does not exist. <a href="/product">View all villas</a>.
        </p>
      </section>
    );
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — villa-video-hero
          Full-bleed autoplay muted video loop. Poster image shown until video
          loads or on devices that block autoplay.
          ─────────────────────────────────────────────────────────────────────
          ASSETS REQUIRED (blocker D-01):
            {data.videoSrc}         ← transcode from VILLA [N] HORIZONTAL.mov
            /videos/villa-[n].webm  ← VP9 encode for bandwidth efficiency
            {data.posterSrc}        ← still frame from render ZIPs (D-02)
          TARGET FILE SIZE: ≤80 MB per villa walkthrough video.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-video-hero"
        aria-label={`${data.label} video hero`}
        className="relative w-full h-screen overflow-hidden bg-brand-black"
      >
        {/*
         * Replace this placeholder div with:
         * <video
         *   autoPlay muted loop playsInline
         *   poster={data.posterSrc}
         *   className="absolute inset-0 w-full h-full object-cover"
         * >
         *   <source src={data.videoSrc} type="video/mp4" />
         *   <source src={data.videoSrc.replace('.mp4', '.webm')} type="video/webm" />
         * </video>
         */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div data-placeholder className="text-cream">
            <h2>[ {data.label.toUpperCase()} VIDEO ]</h2>
            <p>Source: renders/{data.label} HORIZONTAL.mov → {data.videoSrc}</p>
          </div>
        </div>

        {/* Title overlay — sits above video */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-black/80 to-transparent">
          <p className="label-caps text-brand-green mb-2">{data.label}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — villa-intro
          Villa name, confirmed tagline, key specification highlights.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blockers B-06, B-07, B-09):
            Villa name (branded, not "Villa 1"), tagline, bedroom count,
            bathroom count, build area (sqm), land area (sqm), pool type, price.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-intro"
        data-placeholder
        aria-label={`${data.label} introduction and specifications`}
        className="section-wrapper"
      >
        <h2>[ VILLA INTRO — {data.label.toUpperCase()} ]</h2>
        <p>
          Villa name (B-06), tagline, specs: beds/baths/build sqm/land sqm/pool (B-07),
          pricing (B-09).
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — villa-gallery
          Photo gallery — interior and exterior render stills.
          ─────────────────────────────────────────────────────────────────────
          ASSETS REQUIRED (blocker D-02):
            /public/renders/{villa}/ — minimum 6 images, target 10–12.
            Extract from ZIP archives in /renders/. Sort by shot type:
              exterior-01.jpg, exterior-02.jpg,
              living-room.jpg, kitchen.jpg, bedroom-master.jpg,
              pool.jpg, bathroom.jpg, etc.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-gallery"
        aria-label={`${data.label} photo gallery`}
        className="section-wrapper"
      >
        <h2
          className="font-display mb-8"
          style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-heading)" }}
        >
          Gallery
        </h2>
        {/* PLACEHOLDER GRID — replace cells with <Image> once renders extracted */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`bg-gray-lt rounded-lg ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}
              aria-hidden="true"
              title={`Render placeholder ${i + 1} — populate from /public/renders/${villa}/`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — villa-features
          Amenity and feature list. Icon + label grid layout.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-08):
            Amenity list per villa — kitchen spec, outdoor areas, pool type,
            smart-home features, parking, staff accommodation, etc.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-features"
        data-placeholder
        aria-label={`${data.label} features and amenities`}
        className="section-wrapper bg-surface"
      >
        <h2>[ FEATURES &amp; AMENITIES ]</h2>
        <p>
          Per-villa amenity list required (B-08): kitchen spec, pool type,
          outdoor areas, inclusions, smart-home, parking.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — villa-floorplan-preview
          Thumbnail floor plan image with a CTA to the full /plans page.
          ─────────────────────────────────────────────────────────────────────
          ASSETS REQUIRED (blocker D-03):
            /public/renders/{villa}/floor-plan-ground.jpg
            /public/renders/{villa}/floor-plan-upper.jpg  (if applicable)
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-floorplan-preview"
        data-placeholder
        aria-label={`${data.label} floor plan preview`}
        className="section-wrapper"
      >
        <h2>[ FLOOR PLAN PREVIEW ]</h2>
        <p>
          Floor plan image(s) required (D-03): ground floor + upper floor if applicable.<br />
          Path: /public/renders/{villa}/floor-plan-[ground|upper].jpg
        </p>
        <a href="/plans" className="label-caps text-brand-green underline mt-4 inline-block">
          View All Floor Plans →
        </a>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — villa-cta
          Enquiry call-to-action. Enquire button + WhatsApp direct link.
          ─────────────────────────────────────────────────────────────────────
          REQUIRED (blocker E-02): WhatsApp business number.
          REQUIRED (blocker E-03): Primary contact email.
          WhatsApp link format: https://wa.me/[COUNTRY_CODE][NUMBER]
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-cta"
        aria-label="Villa enquiry call to action"
        className="section-wrapper bg-brand-green text-cream text-center"
      >
        <h2
          className="font-display mb-4"
          style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-heading)" }}
        >
          Enquire About {data.label}
        </h2>
        <p className="mb-8 text-cream/80" style={{ fontSize: "var(--text-body-lg)" }}>
          {/* PLACEHOLDER — replace with confirmed CTA copy */}
          Contact our sales team to request a full information pack.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-cream text-brand-black font-semibold rounded-full transition-opacity hover:opacity-90"
          >
            Enquire Now
          </a>
          {/*
           * PLACEHOLDER WhatsApp link — replace [WHATSAPP_NUMBER] with
           * confirmed WhatsApp business number once supplied (blocker E-02).
           * Format: https://wa.me/61400000000 (no spaces, include country code)
           */}
          <a
            href="https://wa.me/[WHATSAPP_NUMBER]"
            className="inline-flex items-center justify-center px-8 py-4 border border-cream text-cream font-semibold rounded-full transition-opacity hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </>
  );
}
