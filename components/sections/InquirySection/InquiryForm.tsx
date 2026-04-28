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

const FIELD_LABEL_CLS =
  "absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-cream/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cream/40 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]";

const INPUT_CLS =
  "w-full bg-transparent border-b border-cream/20 py-2 text-cream placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer";

const SELECT_CLS =
  "w-full bg-transparent border-b border-cream/20 py-2 text-cream focus:outline-none focus:border-[#C9A55A] transition-colors appearance-none cursor-pointer";

const SELECT_LABEL_CLS =
  "absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-[#C9A55A]";

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
          className="flex flex-col items-center justify-center py-16 text-center min-h-100"
        >
          <CheckCircle2 className="w-16 h-16 mb-6" strokeWidth={1.5} style={{ color: GOLD }} />
          <h3 className="font-display text-3xl text-cream mb-4">Package Request Received</h3>
          <p className="text-cream/60 max-w-sm">
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
          className="flex flex-col gap-8"
        >
          {/* Bot trap */}
          <input type="text" name="honeyPot" value={formData.honeyPot} onChange={handleChange}
            className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Header */}
          <div className="border-b border-cream/10 pb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: GOLD }}>Get Started</p>
            <h3 className="font-display text-2xl text-cream mb-3">Fill Your Informations</h3>
            <p className="text-cream/50 text-sm leading-relaxed">
              This phase is limited to a small number of buyers. Submit your details to receive availability, pricing, and unit selection.
            </p>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {(["firstName", "lastName"] as const).map((field) => (
              <div key={field} className="relative group">
                <input
                  type="text" name={field} id={field} required
                  value={formData[field]} onChange={handleChange}
                  className={INPUT_CLS}
                  placeholder={field === "firstName" ? "First Name" : "Last Name"}
                />
                <label htmlFor={field} className={FIELD_LABEL_CLS}>
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
              </div>
            ))}
          </div>

          {/* Email */}
          <div className="relative group">
            <input type="email" name="email" id="email" required
              value={formData.email} onChange={handleChange}
              className={INPUT_CLS} placeholder="Email Address" />
            <label htmlFor="email" className={FIELD_LABEL_CLS}>Email Address</label>
          </div>

          {/* Phone */}
          <div className="relative group">
            <input type="tel" name="phone" id="phone" required
              value={formData.phone} onChange={handleChange}
              className={INPUT_CLS} placeholder="Phone Number" />
            <label htmlFor="phone" className={FIELD_LABEL_CLS}>Phone Number</label>
          </div>

          {/* Budget */}
          <div className="relative">
            <select name="budget" id="budget" required
              value={formData.budget} onChange={handleChange}
              className={SELECT_CLS}
            >
              <option value="" disabled className="bg-[#001b51]">Select Budget Range</option>
              <option value="$0 – $150K"           className="bg-[#001b51]">$0 – $150K</option>
              <option value="$150K – $250K"         className="bg-[#001b51]">$150K – $250K</option>
              <option value="$250K – $300K"         className="bg-[#001b51]">$250K – $300K</option>
              <option value="$300K – $400K"         className="bg-[#001b51]">$300K – $400K (Most Popular)</option>
              <option value="$400K – $500K"         className="bg-[#001b51]">$400K – $500K</option>
              <option value="$500K+"                className="bg-[#001b51]">$500K+</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none text-cream/40">▼</div>
            <label htmlFor="budget" className={SELECT_LABEL_CLS}>Anticipated Budget</label>
          </div>

          {/* Investment Timeline */}
          <div className="relative">
            <select name="timeline" id="timeline" required
              value={formData.timeline} onChange={handleChange}
              className={SELECT_CLS}
            >
              <option value="" disabled className="bg-[#001b51]">Select Timeline</option>
              <option value="Ready now"    className="bg-[#001b51]">Ready now</option>
              <option value="1–3 months"   className="bg-[#001b51]">1–3 months</option>
              <option value="3–6 months"   className="bg-[#001b51]">3–6 months</option>
              <option value="Exploring"    className="bg-[#001b51]">Exploring</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none text-cream/40">▼</div>
            <label htmlFor="timeline" className={SELECT_LABEL_CLS}>Investment Timeline</label>
          </div>

          {/* Buyer type */}
          <div className="relative">
            <select name="buyerType" id="buyerType" required
              value={formData.buyerType} onChange={handleChange}
              className={SELECT_CLS}
            >
              <option value="" disabled className="bg-[#001b51]">Select Profile</option>
              <option value="Investor (rental income focus)" className="bg-[#001b51]">Investor (rental income focus)</option>
              <option value="End user (personal use)"        className="bg-[#001b51]">End user (personal use)</option>
              <option value="Both"                           className="bg-[#001b51]">Both</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none text-cream/40">▼</div>
            <label htmlFor="buyerType" className={SELECT_LABEL_CLS}>What Best Describes You?</label>
          </div>

          {/* Financing */}
          <div className="relative">
            <select name="financing" id="financing" required
              value={formData.financing} onChange={handleChange}
              className={SELECT_CLS}
            >
              <option value="" disabled className="bg-[#001b51]">Select Purchase Method</option>
              <option value="Cash purchase"       className="bg-[#001b51]">Cash purchase</option>
              <option value="Partial financing"    className="bg-[#001b51]">Partial financing</option>
              <option value="Exploring options"    className="bg-[#001b51]">Exploring options</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none text-cream/40">▼</div>
            <label htmlFor="financing" className={SELECT_LABEL_CLS}>Finance or Purchase Outright?</label>
          </div>

          {/* Message */}
          <div className="relative group">
            <textarea
              name="message" id="message" rows={3}
              value={formData.message} onChange={handleChange}
              className="w-full bg-transparent border-b border-cream/20 py-2 text-cream placeholder-cream/30 focus:outline-none focus:border-[#C9A55A] transition-colors resize-none peer"
              placeholder="Tell us what you're looking for or any questions…"
            />
            <label htmlFor="message" className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-[#C9A55A]">
              Message / Specific Interest
            </label>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm">Submission failed — please try again.</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full group flex items-center justify-center gap-4 py-4 uppercase tracking-[0.2em] text-[11px] font-semibold transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-brand-black"
              style={{ backgroundColor: GOLD }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
            >
              {status === "submitting" ? "Sending…" : (
                <>
                  Send Me the Investment Package
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
