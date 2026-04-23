import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Villas",
  description: "Explore the three luxury villas in The Villa V Collection — Bali, Indonesia.",
};

export default function ProductPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — product-hero
          Page hero. Title "The Villas" with a short overview statement.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED: Overview statement (1–2 sentences describing the
                         collection as a whole).
          ASSET: Use /brand_assets_-008.jpg (dark foliage) as background, or
                 a still frame from renders/RENDERS 3 VILLA.mov once transcoded.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="product-hero"
        aria-label="Villas overview hero"
        className="relative w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: "url('/brand_assets_-008.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "55vh",
        }}
      >
        <div className="absolute inset-0 bg-brand-black/60" />
        <div className="relative section-wrapper text-cream pb-16">
          <p className="label-caps text-brand-green mb-3">The Collection</p>
          <h1 style={{ fontSize: "var(--text-h1)", letterSpacing: "var(--tracking-heading)" }}>
            The Villas
          </h1>
          {/* PLACEHOLDER — overview statement copy required */}
          <p className="mt-4 text-gray-lt max-w-lg" style={{ fontSize: "var(--text-body-lg)" }}>
            Three distinct residences. One address in Bali.{" "}
            <em>[Replace with confirmed overview copy]</em>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — villa-grid
          3-column card grid. Each card links to /product/villa-[id].
          Displays: villa name, thumbnail image, bed/bath count, price.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blockers B-06, B-07, B-09):
            Individual villa names, bedroom/bathroom/sqm specs, price per villa.
          ASSETS REQUIRED (blocker D-02):
            Thumbnail stills: /public/renders/villa-[1/2/3]/thumb.jpg
            Extract from ZIP archives or pull still frames from .mov files.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villa-grid"
        aria-label="Villa selection grid"
        className="section-wrapper"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: "villa-1", label: "Villa 1" },
            { id: "villa-2", label: "Villa 2" },
            { id: "villa-3", label: "Villa 3" },
          ].map(({ id, label }) => (
            <article
              key={id}
              className="flex flex-col border border-gray-lt rounded-xl overflow-hidden bg-surface hover:shadow-lg transition-shadow"
            >
              {/*
               * THUMBNAIL PLACEHOLDER
               * Replace with <Image src={`/renders/${id}/thumb.jpg`} .../>
               * once render archives are extracted (blocker D-02).
               */}
              <div className="w-full aspect-video bg-gray-lt" aria-hidden="true" />

              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="label-caps text-brand-green">{label}</p>
                {/*
                 * PLACEHOLDER NAME — replace with confirmed villa name (B-06).
                 * e.g. "Villa Sayan" / "Villa Ubud" / etc.
                 */}
                <h2
                  className="font-display"
                  style={{ fontSize: "var(--text-h3)", fontWeight: 600 }}
                >
                  [Villa Name TBC]
                </h2>

                {/* SPEC ROW — replace with confirmed specs (B-07) */}
                <div className="flex gap-4 text-sm text-gray-md">
                  <span>[ ] Bed</span>
                  <span>[ ] Bath</span>
                  <span>[ ] sqm</span>
                </div>

                {/* PRICE — replace with confirmed pricing (B-09) */}
                <p className="text-sm text-gray-md">
                  From <strong className="text-brand-black">[Price TBC]</strong>
                </p>

                <a
                  href={`/product/${id}`}
                  className="mt-auto inline-flex items-center gap-2 label-caps text-brand-green"
                  aria-label={`View details for ${label}`}
                >
                  View Villa →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
