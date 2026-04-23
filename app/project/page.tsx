import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Project",
  description: "An overview of the Villa V Collection development — vision, developer, and current promotions.",
};

export default function ProjectPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — project-hero
          Full-width page hero. Title overlay on aerial image or video still.
          ─────────────────────────────────────────────────────────────────────
          ASSET READY:   /brand_assets_-002.jpg (aerial waterfall)
          ASSET OPTION:  transcode still from renders/RENDERS 3 VILLA.mov
          COPY REQUIRED: Page H1 — confirm exact wording for "The Project" title.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="project-hero"
        aria-label="Project page hero"
        className="relative w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: "url('/brand_assets_-002.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          minHeight: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-brand-black/50" />
        <div className="relative section-wrapper text-cream pb-16">
          <p className="label-caps text-brand-green mb-3">Bali, Indonesia</p>
          <h1 style={{ fontSize: "var(--text-h1)", letterSpacing: "var(--tracking-heading)" }}>
            The Project
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — project-overview
          Two-column layout: headline left, body copy right.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blockers B-04, B-05):
            200–400 word project description.
            One-sentence vision/positioning statement.
            Total unit count (confirm: 3 villas?).
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="project-overview"
        data-placeholder
        aria-label="Project overview"
        className="section-wrapper"
      >
        <h2>[ PROJECT OVERVIEW ]</h2>
        <p>
          Project description copy (B-04): 200–400 words.<br />
          Vision statement (B-05): one-sentence positioning line.<br />
          Unit count (F-03): confirm 3 villas.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — project-promoter
          Developer / promoter bio card. Photo left, credentials right.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-10): Developer/promoter name, bio, credentials.
          ASSET REQUIRED (blocker D-06): Promoter headshot or company logo.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="project-promoter"
        data-placeholder
        aria-label="Promoter profile"
        className="section-wrapper bg-surface"
      >
        <h2>[ PROMOTER PROFILE ]</h2>
        <p>
          Promoter name, bio, credentials (B-10).<br />
          Promoter headshot or company logo (D-06).
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — project-promotion
          Current deal / offer highlight strip. Pricing tier intro, payment plan
          summary, link to /promotions for full terms.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-11): Promotion terms, early-bird pricing,
                         payment plan structure, expiry date.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="project-promotion"
        data-placeholder
        aria-label="Promotion highlight"
        className="section-wrapper bg-brand-green text-cream"
      >
        <h2>[ PROMOTION HIGHLIGHT ]</h2>
        <p>
          Promotion deal overview (B-11): early-bird pricing, payment plan,
          inclusions, offer expiry date.
        </p>
        <a href="/promotions" className="label-caps underline mt-4 inline-block">
          View All Promotions →
        </a>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — project-gallery
          Masonry or grid gallery of exterior renders and site views.
          ─────────────────────────────────────────────────────────────────────
          ASSETS REQUIRED (blocker D-02):
            Extract ZIP archives in /renders/ and sort into /public/renders/.
            This section targets exterior/site-overview shots.
          TARGET: 6–12 images minimum for a meaningful gallery.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="project-gallery"
        data-placeholder
        aria-label="Project render gallery"
        className="section-wrapper"
      >
        <h2>[ PROJECT GALLERY ]</h2>
        <p>
          Exterior render images from ZIP archives (D-02).<br />
          Extract to /public/renders/exterior/ — 6–12 images minimum.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video bg-gray-lt rounded-lg"
              aria-hidden="true"
            />
          ))}
        </div>
      </section>
    </>
  );
}
