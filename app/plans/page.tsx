import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floor Plans",
  description: "Site plan and individual floor plans for all three villas in The Villa V Collection.",
};

export default function PlansPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — plans-hero
          Page hero with title "Floor Plans". Dark foliage background.
          ─────────────────────────────────────────────────────────────────────
          ASSET READY: /brand_assets_-008.jpg (dark foliage illustration)
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="plans-hero"
        aria-label="Floor plans page hero"
        className="relative w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: "url('/brand_assets_-008.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        <div className="absolute inset-0 bg-brand-black/65" />
        <div className="relative section-wrapper text-cream pb-16">
          <p className="label-caps text-brand-green mb-3">Site & Residences</p>
          <h1 style={{ fontSize: "var(--text-h1)", letterSpacing: "var(--tracking-heading)" }}>
            Floor Plans
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — site-plan
          Full-width site masterplan image. Shows all 3 villas in context of
          the land boundary and shared infrastructure.
          ─────────────────────────────────────────────────────────────────────
          ASSET REQUIRED (blocker D-04):
            /public/renders/exterior/site-masterplan.jpg
            This must be supplied by the architect or developer.
          Suggested treatment: full-bleed image with zoom-on-hover or lightbox.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="site-plan"
        data-placeholder
        aria-label="Site masterplan"
        className="section-wrapper"
      >
        <h2>[ SITE MASTERPLAN ]</h2>
        <p>
          Overall site plan image required (D-04).<br />
          Shows all 3 villas, land boundary, shared access.<br />
          Path: /public/renders/exterior/site-masterplan.jpg
        </p>
        <div className="w-full aspect-video bg-gray-lt rounded-xl mt-6" aria-hidden="true" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTIONS 3–5 — villa-[1/2/3]-plans
          Per-villa floor plan sets. One sub-section per villa.
          Each set includes ground floor, upper floor (if applicable), and
          optional 3D axonometric view.
          ─────────────────────────────────────────────────────────────────────
          ASSETS REQUIRED (blocker D-03):
            /public/renders/villa-1/floor-plan-ground.jpg
            /public/renders/villa-1/floor-plan-upper.jpg
            /public/renders/villa-2/floor-plan-ground.jpg
            /public/renders/villa-2/floor-plan-upper.jpg
            /public/renders/villa-3/floor-plan-ground.jpg
            /public/renders/villa-3/floor-plan-upper.jpg
          Supply architect drawings or rendered plan images.
      ════════════════════════════════════════════════════════════════════════ */}
      {[
        { id: "villa-1-plans", villa: "villa-1", label: "Villa 1" },
        { id: "villa-2-plans", villa: "villa-2", label: "Villa 2" },
        { id: "villa-3-plans", villa: "villa-3", label: "Villa 3" },
      ].map(({ id, villa, label }, index) => (
        <section
          key={id}
          id={id}
          aria-label={`${label} floor plans`}
          className={`section-wrapper ${index % 2 === 1 ? "bg-surface" : ""}`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="label-caps text-brand-green mb-2">{label}</p>
              {/*
               * PLACEHOLDER — replace with confirmed villa name (B-06)
               * e.g. "Villa Sayan — Ground Floor"
               */}
              <h2
                className="font-display"
                style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-heading)" }}
              >
                [Villa Name TBC] — Floor Plans
              </h2>
            </div>
            <a href={`/product/${villa}`} className="label-caps text-brand-green shrink-0">
              View Villa Details →
            </a>
          </div>

          {/* PLAN PLACEHOLDERS — replace with <Image> once files exist (D-03) */}
          <div
            data-placeholder
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <h2>[ GROUND FLOOR PLAN ]</h2>
              <p>
                Path: /public/renders/{villa}/floor-plan-ground.jpg (D-03)
              </p>
              <div className="w-full aspect-square bg-gray-lt rounded-lg mt-4" aria-hidden="true" />
            </div>
            <div>
              <h2>[ UPPER FLOOR PLAN ]</h2>
              <p>
                Path: /public/renders/{villa}/floor-plan-upper.jpg (D-03)<br />
                If single-storey, remove this column.
              </p>
              <div className="w-full aspect-square bg-gray-lt rounded-lg mt-4" aria-hidden="true" />
            </div>
          </div>
        </section>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — plans-download
          Optional downloadable brochure CTA. PDF button.
          ─────────────────────────────────────────────────────────────────────
          ASSET REQUIRED (blocker E-07):
            /public/downloads/villa-v-collection-brochure.pdf
          If no brochure exists, remove this section entirely.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="plans-download"
        data-placeholder
        aria-label="Brochure download"
        className="section-wrapper bg-brand-green text-cream"
      >
        <h2>[ BROCHURE DOWNLOAD ]</h2>
        <p>
          Downloadable investor/buyer brochure PDF required (E-07).<br />
          Path: /public/downloads/villa-v-collection-brochure.pdf<br />
          Remove this section if no brochure is produced.
        </p>
      </section>
    </>
  );
}
