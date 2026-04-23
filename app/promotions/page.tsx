import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions",
  description: "Current promotions and offers for The Villa V Collection — Bali, Indonesia.",
};

export default function PromotionsPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — promotions-hero
          Page hero with title "Current Promotions".
          ─────────────────────────────────────────────────────────────────────
          ASSET: /brand_assets_-002.jpg (aerial waterfall) — confirmed available.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="promotions-hero"
        aria-label="Promotions page hero"
        className="relative w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: "url('/brand_assets_-002.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          minHeight: "50vh",
        }}
      >
        <div className="absolute inset-0 bg-brand-black/55" />
        <div className="relative section-wrapper text-cream pb-16">
          <p className="label-caps text-brand-green mb-3">Limited Availability</p>
          <h1 style={{ fontSize: "var(--text-h1)", letterSpacing: "var(--tracking-heading)" }}>
            Current Promotions
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — promoter-profile
          Developer / promoter identity card. Photo, name, credentials, contact.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-10):
            Promoter name, short bio (100–150 words), credentials,
            professional license number (if applicable).
          ASSET REQUIRED (blocker D-06):
            Promoter headshot: /public/promoter/headshot.jpg
            Or company logo: /public/promoter/company-logo.svg
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="promoter-profile"
        data-placeholder
        aria-label="Promoter profile"
        className="section-wrapper"
      >
        <h2>[ PROMOTER PROFILE ]</h2>
        <p>
          Promoter name, bio (100–150 words), credentials (B-10).<br />
          Headshot or company logo required (D-06).<br />
          Path: /public/promoter/headshot.jpg or /public/promoter/company-logo.svg
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — promotion-cards
          Card list of individual promotions. Each card: offer title, description,
          terms summary, expiry date badge, CTA to /contact.
          ─────────────────────────────────────────────────────────────────────
          COPY REQUIRED (blocker B-11):
            - Number of distinct promotions (early-bird, referral, payment plan?)
            - Per-promotion: title, description, terms, expiry date.
            - Pricing tiers if multiple are offered simultaneously.
          Example promotion types for reference (confirm actual offers):
            1. Early-bird pricing — reserved units at reduced price before [date]
            2. Flexible payment plan — [X]% deposit + staged drawdowns
            3. Furniture/fitout package inclusion — valued at [amount]
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="promotion-cards"
        data-placeholder
        aria-label="Promotion cards"
        className="section-wrapper bg-surface"
      >
        <h2>[ PROMOTION CARDS ]</h2>
        <p>
          Individual promotion items required (B-11).<br />
          For each: title, description, terms summary, expiry date, CTA.
        </p>
        {/* Placeholder cards — remove and replace with real PromotionCard components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
          {["Promotion A", "Promotion B", "Promotion C"].map((p) => (
            <div
              key={p}
              className="border border-gray-lt rounded-xl p-6 bg-cream flex flex-col gap-3"
            >
              <span className="label-caps text-brand-green">Offer</span>
              <h3
                className="font-display"
                style={{ fontSize: "var(--text-h3)", fontWeight: 600 }}
              >
                {p} — [Title TBC]
              </h3>
              <p className="text-sm text-gray-md flex-1">
                Description, terms, and expiry date required (B-11).
              </p>
              <a href="/contact" className="label-caps text-brand-green mt-2">
                Enquire →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — promotions-cta
          Closing CTA. Enquire button + optional terms-sheet download.
          ─────────────────────────────────────────────────────────────────────
          REQUIRED (blocker E-02): WhatsApp number for direct-link button.
          OPTIONAL (blocker E-07): Terms sheet PDF download.
            Path: /public/downloads/promotion-terms.pdf
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="promotions-cta"
        aria-label="Promotions call to action"
        className="section-wrapper bg-brand-green text-cream text-center"
      >
        <h2
          className="font-display mb-4"
          style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-heading)" }}
        >
          Secure Your Villa Today
        </h2>
        <p className="mb-8 max-w-xl mx-auto" style={{ fontSize: "var(--text-body-lg)" }}>
          {/* PLACEHOLDER — replace with confirmed CTA copy once available */}
          Speak directly with our sales team to confirm availability and
          discuss the current offer in detail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-cream text-brand-black font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Contact Sales
          </a>
          {/*
           * OPTIONAL — download button for terms sheet PDF.
           * Only render when /public/downloads/promotion-terms.pdf exists (E-07).
           * Remove this element if no terms sheet is produced.
           */}
          <a
            href="/downloads/promotion-terms.pdf"
            className="inline-flex items-center justify-center px-8 py-4 border border-cream text-cream font-semibold rounded-full hover:opacity-80 transition-opacity"
            download
          >
            Download Terms Sheet
          </a>
        </div>
      </section>
    </>
  );
}
