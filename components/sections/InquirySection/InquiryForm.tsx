// components/sections/InquirySection/InquiryForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbykMPTc70wBXm4RFjwxVdkVQKhhh_YYqHkkjC37RfvuSaI708lr-cPz72hB7INg9ltl/exec";

type Status = "idle" | "submitting" | "success" | "error";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget: string;
  honeyPot: string;
};

const FIELD_LABEL_CLS =
  "absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-cream/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cream/40 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]";

const INPUT_CLS =
  "w-full bg-transparent border-b border-white/20 py-2 text-cream placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer";

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", budget: "", honeyPot: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
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
          <CheckCircle2 className="text-[#C9A55A] w-16 h-16 mb-6" strokeWidth={1.5} />
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
          className="flex flex-col gap-10"
        >
          {/* Bot trap */}
          <input type="text" name="honeyPot" value={formData.honeyPot} onChange={handleChange}
            className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {(["firstName", "lastName"] as const).map((field) => (
              <div key={field} className="relative group">
                <input
                  type="text" name={field} id={field} required
                  value={formData[field]} onChange={handleChange}
                  className={INPUT_CLS} placeholder={field === "firstName" ? "First Name" : "Last Name"}
                />
                <label htmlFor={field} className={FIELD_LABEL_CLS}>
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
              </div>
            ))}
          </div>

          <div className="relative group">
            <input type="email" name="email" id="email" required
              value={formData.email} onChange={handleChange}
              className={INPUT_CLS} placeholder="Email Address" />
            <label htmlFor="email" className={FIELD_LABEL_CLS}>Email Address</label>
          </div>

          <div className="relative group">
            <input type="tel" name="phone" id="phone" required
              value={formData.phone} onChange={handleChange}
              className={INPUT_CLS} placeholder="Phone Number" />
            <label htmlFor="phone" className={FIELD_LABEL_CLS}>Phone Number</label>
          </div>

          <div className="relative group">
            <select name="budget" id="budget" required
              value={formData.budget} onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-2 text-cream focus:outline-none focus:border-[#C9A55A] transition-colors appearance-none cursor-pointer peer"
            >
              <option value="" disabled className="bg-brand-black text-cream/50">Select Budget Range</option>
              <option value="$250k - $500k" className="bg-brand-black">$250k — $500k</option>
              <option value="$500k - $1M"   className="bg-brand-black">$500k — $1M</option>
              <option value="$1M - $2.5M"   className="bg-brand-black">$1M — $2.5M</option>
              <option value="$2.5M+"        className="bg-brand-black">$2.5M+</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none text-cream/40">▼</div>
            <label htmlFor="budget" className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-[#C9A55A]">
              Anticipated Budget
            </label>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm">Submission failed — please try again.</p>
          )}

          <div className="mt-4 pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full group flex items-center justify-center gap-4 bg-[#C9A55A] text-brand-black py-4 uppercase tracking-[0.2em] text-[11px] font-semibold transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
