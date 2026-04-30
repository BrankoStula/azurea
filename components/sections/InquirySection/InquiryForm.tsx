// components/sections/InquirySection/InquiryForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbykMPTc70wBXm4RFjwxVdkVQKhhh_YYqHkkjC37RfvuSaI708lr-cPz72hB7INg9ltl/exec";

const GOLD = "#C9A55A";

type Status = "idle" | "submitting" | "success" | "error";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  buyerType: string;
  message: string;
  financing: string;
  honeyPot: string;
};

const LABEL = "absolute left-0 -top-5 text-[10px] tracking-widest uppercase text-[#C9A55A]";

const FLOAT_LABEL =
  "absolute left-0 -top-5 text-[10px] tracking-widest uppercase text-cream/40 transition-all " +
  "peer-placeholder-shown:text-sm peer-placeholder-shown:text-cream/30 peer-placeholder-shown:top-2.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal " +
  "peer-focus:-top-5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]";

const INPUT =
  "w-full bg-transparent border-b border-cream/20 py-3 text-cream text-sm placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer";

const SELECT =
  "w-full bg-transparent border-b border-cream/20 py-3 text-cream text-sm focus:outline-none focus:border-[#C9A55A] transition-colors appearance-none cursor-pointer";

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    budget: "", timeline: "", buyerType: "", message: "", financing: "",
    honeyPot: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeyPot !== "") { setStatus("success"); return; }
    setStatus("submitting");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <CheckCircle2 className="w-16 h-16 mb-6" strokeWidth={1.5} style={{ color: GOLD }} />
          <h3 className="font-display text-4xl text-cream mb-4">Package Request Received</h3>
          <p className="text-cream/60 max-w-sm text-sm leading-relaxed">
            Your request has been submitted. We will send you the full Azurea Investment Package shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-10"
        >
          {/* Honeypot */}
          <input type="text" name="honeyPot" value={formData.honeyPot} onChange={handleChange}
            className="hidden" tabIndex={-1} autoComplete="off" />

          {/* ── Header ── */}
          <div className="border-b border-cream/10 pb-8">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-5 flex items-center gap-4" style={{ color: GOLD }}>
              <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD }} />
              Get Started
            </p>
            <h3
              className="font-display text-cream leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "var(--tracking-heading)" }}
            >
              Request the Investment Package
            </h3>
            <p className="text-cream/50 text-sm leading-relaxed">
              Limited to a small number of buyers. Submit your details to receive availability, pricing, and unit selection.
            </p>
          </div>

          {/* ── First + Last Name ── */}
          <div className="grid grid-cols-2 gap-8">
            {(["firstName", "lastName"] as const).map((field) => (
              <div key={field} className="relative">
                <input
                  type="text" name={field} id={field} required
                  value={formData[field]} onChange={handleChange}
                  className={INPUT}
                  placeholder={field === "firstName" ? "First Name" : "Last Name"}
                />
                <label htmlFor={field} className={FLOAT_LABEL}>
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
              </div>
            ))}
          </div>

          {/* ── Email + Phone ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative">
              <input type="email" name="email" id="email" required
                value={formData.email} onChange={handleChange}
                className={INPUT} placeholder="Email Address" />
              <label htmlFor="email" className={FLOAT_LABEL}>Email Address</label>
            </div>
            <div className="relative">
              <input type="tel" name="phone" id="phone" required
                value={formData.phone} onChange={handleChange}
                className={INPUT} placeholder="Phone / WhatsApp" />
              <label htmlFor="phone" className={FLOAT_LABEL}>Phone / WhatsApp</label>
            </div>
          </div>

          {/* ── Budget + Timeline ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative">
              <label htmlFor="budget" className={LABEL}>Anticipated Budget</label>
              <select name="budget" id="budget" required value={formData.budget} onChange={handleChange} className={SELECT}>
                <option value="" disabled className="bg-[#F8F8F6]">Select range</option>
                <option value="$0 – $150K"     className="bg-[#F8F8F6]">$0 – $150K</option>
                <option value="$150K – $250K"   className="bg-[#F8F8F6]">$150K – $250K</option>
                <option value="$250K – $300K"   className="bg-[#F8F8F6]">$250K – $300K</option>
                <option value="$300K – $400K"   className="bg-[#F8F8F6]">$300K – $400K</option>
                <option value="$400K – $500K"   className="bg-[#F8F8F6]">$400K – $500K</option>
                <option value="$500K+"          className="bg-[#F8F8F6]">$500K+</option>
              </select>
              <div className="absolute right-0 top-3.5 pointer-events-none text-cream/40 text-xs">▼</div>
            </div>
            <div className="relative">
              <label htmlFor="timeline" className={LABEL}>Investment Timeline</label>
              <select name="timeline" id="timeline" required value={formData.timeline} onChange={handleChange} className={SELECT}>
                <option value="" disabled className="bg-[#F8F8F6]">Select timeline</option>
                <option value="Ready now"  className="bg-[#F8F8F6]">Ready now</option>
                <option value="1–3 months" className="bg-[#F8F8F6]">1–3 months</option>
                <option value="3–6 months" className="bg-[#F8F8F6]">3–6 months</option>
                <option value="Exploring"  className="bg-[#F8F8F6]">Exploring</option>
              </select>
              <div className="absolute right-0 top-3.5 pointer-events-none text-cream/40 text-xs">▼</div>
            </div>
          </div>

          {/* ── Buyer type + Financing ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative">
              <label htmlFor="buyerType" className={LABEL}>Buyer Profile</label>
              <select name="buyerType" id="buyerType" required value={formData.buyerType} onChange={handleChange} className={SELECT}>
                <option value="" disabled className="bg-[#F8F8F6]">Select profile</option>
                <option value="Investor (rental income focus)" className="bg-[#F8F8F6]">Investor</option>
                <option value="End user (personal use)"        className="bg-[#F8F8F6]">Personal use</option>
                <option value="Both"                           className="bg-[#F8F8F6]">Both</option>
              </select>
              <div className="absolute right-0 top-3.5 pointer-events-none text-cream/40 text-xs">▼</div>
            </div>
            <div className="relative">
              <label htmlFor="financing" className={LABEL}>Purchase Method</label>
              <select name="financing" id="financing" required value={formData.financing} onChange={handleChange} className={SELECT}>
                <option value="" disabled className="bg-[#F8F8F6]">Select method</option>
                <option value="Cash purchase"    className="bg-[#F8F8F6]">Cash purchase</option>
                <option value="Partial financing" className="bg-[#F8F8F6]">Partial financing</option>
                <option value="Exploring options" className="bg-[#F8F8F6]">Exploring options</option>
              </select>
              <div className="absolute right-0 top-3.5 pointer-events-none text-cream/40 text-xs">▼</div>
            </div>
          </div>

          {/* ── Message ── */}
          <div className="relative">
            <label htmlFor="message" className={LABEL}>Message / Specific Interest</label>
            <textarea
              name="message" id="message" rows={3}
              value={formData.message} onChange={handleChange}
              className="w-full bg-transparent border-b border-cream/20 pt-6 pb-2 text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-[#C9A55A] transition-colors resize-none"
              placeholder="Tell us what you're looking for or any questions…"
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm -mt-4">Submission failed — please try again.</p>
          )}

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full group flex items-center justify-center gap-3 py-4 uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-white whitespace-nowrap"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#b8924e"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = GOLD; }}
          >
            {status === "submitting" ? "Sending…" : (
              <>
                Send Me the Investment Package
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
