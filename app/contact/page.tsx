import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Villa V Collection sales team — Bali, Indonesia.",
};

export default function ContactPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — contact-hero
          Page hero. Dark foliage background — high contrast, intimate feel.
          ─────────────────────────────────────────────────────────────────────
          ASSET READY: /brand_assets_-008.jpg (dark lush foliage illustration)
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-hero"
        aria-label="Contact page hero"
        className="relative w-full flex items-end overflow-hidden"
        style={{
          backgroundImage: "url('/brand_assets_-008.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "55vh",
        }}
      >
        <div className="absolute inset-0 bg-brand-black/70" />
        <div className="relative section-wrapper text-cream pb-16">
          <p className="label-caps text-brand-green mb-3">Get in Touch</p>
          <h1 style={{ fontSize: "var(--text-h1)", letterSpacing: "var(--tracking-heading)" }}>
            Contact Us
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — contact-form  +  SECTION 3 — contact-info
          Two-column layout: form on left, contact details on right.
          ─────────────────────────────────────────────────────────────────────
          FORM BLOCKERS:
            E-01 — Form submission destination:
              Option A: Email via Next.js API route (app/api/contact/route.ts)
                        using Resend or SendGrid. Supply email address + API key.
              Option B: HubSpot / CRM webhook. Supply form ID + portal ID.
              Option C: Direct mailto fallback (least reliable for production).
            Confirm which option before implementing form action.

          CONTACT INFO BLOCKERS:
            E-02 — WhatsApp business number
            E-03 — Primary contact email address
            E-04 — Primary contact phone number
            C-03 — Sales office / showroom physical address
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-form-and-info"
        aria-label="Contact form and details"
        className="section-wrapper"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Left column: lead form ─────────────────────────────────────── */}
          <div id="contact-form">
            <h2
              className="font-display mb-8"
              style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-heading)" }}
            >
              Send an Enquiry
            </h2>

            {/*
             * PLACEHOLDER FORM — wire up action once E-01 is resolved.
             * Fields confirmed: Name, Email, Phone, Villa of Interest, Message.
             * Replace this form element's action with:
             *   action="/api/contact" method="POST"     (API route approach)
             *   or use a React Server Action (Next.js 16 preferred pattern).
             */}
            <form
              className="flex flex-col gap-5"
              aria-label="Lead enquiry form"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="label-caps text-brand-black">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="border border-gray-lt rounded-lg px-4 py-3 bg-surface text-brand-black focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="label-caps text-brand-black">
                  Email Address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="border border-gray-lt rounded-lg px-4 py-3 bg-surface text-brand-black focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="label-caps text-brand-black">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="border border-gray-lt rounded-lg px-4 py-3 bg-surface text-brand-black focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="+61 4XX XXX XXX"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="villa" className="label-caps text-brand-black">
                  Villa of Interest
                </label>
                <select
                  id="villa"
                  name="villa"
                  className="border border-gray-lt rounded-lg px-4 py-3 bg-surface text-brand-black focus:outline-none focus:border-brand-green transition-colors"
                >
                  <option value="">Select a villa…</option>
                  {/*
                   * PLACEHOLDER OPTIONS — replace values and labels with confirmed
                   * villa names (blocker B-06).
                   */}
                  <option value="villa-1">Villa 1 — [Name TBC]</option>
                  <option value="villa-2">Villa 2 — [Name TBC]</option>
                  <option value="villa-3">Villa 3 — [Name TBC]</option>
                  <option value="undecided">Undecided / General enquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="label-caps text-brand-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="border border-gray-lt rounded-lg px-4 py-3 bg-surface text-brand-black focus:outline-none focus:border-brand-green transition-colors resize-none"
                  placeholder="Tell us about your interest…"
                />
              </div>

              {/*
               * SUBMIT BUTTON — currently disabled with a visual indicator.
               * Enable once form action is wired up (blocker E-01).
               */}
              <button
                type="submit"
                disabled
                className="px-8 py-4 bg-brand-green text-cream font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-green-dk transition-colors"
                title="Form submission not yet configured — awaiting E-01"
              >
                Send Enquiry
              </button>
              <p className="text-xs text-gray-md">
                {/* BLOCKER NOTICE — remove before launch */}
                Form submission is disabled pending configuration of the email
                handler (blocker E-01 in project_architecture.md).
              </p>
            </form>
          </div>

          {/* ── Right column: contact info ─────────────────────────────────── */}
          <div id="contact-info" className="flex flex-col gap-8">
            <h2
              className="font-display mb-2"
              style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-heading)" }}
            >
              Sales Team
            </h2>

            {/*
             * All contact details below are placeholders.
             * Replace [values] once blockers E-02, E-03, E-04, C-03 are resolved.
             */}

            <div className="flex flex-col gap-2">
              <p className="label-caps text-brand-green">Phone</p>
              <a
                href="tel:[PHONE_NUMBER]"
                className="text-brand-black hover:text-brand-green transition-colors"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                {/* PLACEHOLDER — replace with confirmed number (E-04) */}
                [Phone number TBC]
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="label-caps text-brand-green">Email</p>
              <a
                href="mailto:[EMAIL_ADDRESS]"
                className="text-brand-black hover:text-brand-green transition-colors"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                {/* PLACEHOLDER — replace with confirmed email (E-03) */}
                [Email address TBC]
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="label-caps text-brand-green">WhatsApp</p>
              <a
                href="https://wa.me/[WHATSAPP_NUMBER]"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-green transition-colors"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                {/* PLACEHOLDER — replace with confirmed number (E-02) */}
                Chat on WhatsApp — [number TBC]
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="label-caps text-brand-green">Sales Office</p>
              <address
                className="not-italic text-brand-black"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                {/* PLACEHOLDER — replace with confirmed sales office address (C-03) */}
                [Sales office address TBC]
                <br />
                Bali, Indonesia
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — contact-map
          Embedded map showing the sales office or villa site location.
          ─────────────────────────────────────────────────────────────────────
          REQUIRED (blocker C-01): GPS coordinates of villa site.
          REQUIRED (blocker C-02): Maps API key → NEXT_PUBLIC_MAPS_API_KEY
          REQUIRED (blocker C-03): Sales office address for secondary pin.
          IMPLEMENTATION: This section requires a 'use client' child component
                          because Google Maps / Mapbox SDKs use browser APIs.
                          Create components/sections/OfficeMap.tsx as a Client
                          Component and import it here.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-map"
        data-placeholder
        aria-label="Location map"
        className="w-full"
        style={{ minHeight: "480px" }}
      >
        <h2>[ OFFICE / SITE MAP ]</h2>
        <p>
          GPS coordinates required (C-01).<br />
          Maps API key required (C-02) → NEXT_PUBLIC_MAPS_API_KEY in .env.local<br />
          Sales office address required (C-03).<br />
          Implement as a &apos;use client&apos; component: components/sections/OfficeMap.tsx
        </p>
      </section>
    </>
  );
}
