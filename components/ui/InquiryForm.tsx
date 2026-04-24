// components/sections/InquirySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

export default function InquirySection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: "",
    honeyPot: "", // Hidden field to catch bots
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If a bot filled out the hidden honeypot field, pretend it was successful but do nothing
    if (formData.honeyPot !== "") {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykMPTc70wBXm4RFjwxVdkVQKhhh_YYqHkkjC37RfvuSaI708lr-cPz72hB7INg9ltl/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        body: JSON.stringify(formData),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });

      // Since "no-cors" hides response details, reaching here means success!
      setStatus("success");
      
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section id="inquiry" className="relative w-full min-h-screen flex flex-col lg:flex-row bg-brand-black text-cream overflow-hidden">
      
      {/* ════════════════════════════════════════════════════════════════════
          ARCHITECTURAL ANIMATED LINES (Grid Overlay)
      ════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
        {/* Vertical Split Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 bottom-0 left-[41.666%] w-px bg-white/10"
        />
        {/* Horizontal Accent Line (Top) */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-24 left-0 right-0 h-px bg-white/10"
        />
        {/* Horizontal Accent Line (Bottom) */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-24 left-0 right-0 h-px bg-white/10"
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          LEFT COLUMN — Image & Typography (Centered)
      ════════════════════════════════════════════════════════════════════ */}
      {/* Changed justify-end to justify-center to center the content vertically */}
      <div className="relative w-full lg:w-5/12 min-h-[60vh] lg:min-h-screen flex flex-col justify-center p-8 sm:p-12 lg:p-24 overflow-hidden">
        
        {/* Cinematic Animated Background Image */}
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp" 
            alt="Luxury Villa" 
            fill 
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/20" />
        </motion.div>

        {/* Content (Removed mt-auto to allow centering) */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-caps text-[#C9A55A] mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#C9A55A]/40 inline-block" />
              Private Advisory
            </p>
            
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 tracking-tight leading-[1.1]">
              Begin Your <br />
              Azurea Journey.
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-sm">
              Whether you are seeking a primary residence, a portfolio addition, or a seasonal retreat, our advisory team is available for a private consultation.
            </p>
          </motion.div>

          {/* Contact Details List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-[#C9A55A] group-hover:bg-[#C9A55A] group-hover:text-brand-black transition-colors duration-300">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">Email</p>
                <a href="mailto:advisory@azureabali.com" className="text-white/80 hover:text-white transition-colors">
                  advisory@azureabali.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-[#C9A55A] group-hover:bg-[#C9A55A] group-hover:text-brand-black transition-colors duration-300">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">Direct Line</p>
                <a href="tel:+628113988222" className="text-white/80 hover:text-white transition-colors">
                  +62 811 3988 222
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-[#C9A55A] group-hover:bg-[#C9A55A] group-hover:text-brand-black transition-colors duration-300">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">Project Site</p>
                <p className="text-white/80">Munggu, Bali · Indonesia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          RIGHT COLUMN — Seamless Form Background
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-24 z-10">
        
        {/* Subtle Background Glow behind the form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[120%] bg-[#C9A55A]/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          // Removed background, border, shadow, and backdrop-blur. 
          // Adjusted max-width slightly for better proportions without a bounding box.
          className="w-full max-w-xl relative z-10"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center min-h-[400px]"
              >
                <CheckCircle2 className="text-[#C9A55A] w-16 h-16 mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-3xl text-cream mb-4">Inquiry Received</h3>
                <p className="text-cream/60 max-w-sm">
                  Thank you for your interest. A member of our advisory team will review your details and be in touch shortly.
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
                {/* BOT TRAP */}
                <input
                  type="text"
                  name="honeyPot"
                  value={formData.honeyPot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-cream placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer"
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-cream/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cream/40 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-cream placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer"
                      placeholder="Last Name"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-cream/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cream/40 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]"
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-cream placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-cream/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cream/40 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-cream placeholder-transparent focus:outline-none focus:border-[#C9A55A] transition-colors peer"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-cream/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cream/40 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#C9A55A]"
                  >
                    Phone Number
                  </label>
                </div>

                <div className="relative group">
                  <select
                    name="budget"
                    id="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-cream focus:outline-none focus:border-[#C9A55A] transition-colors appearance-none cursor-pointer peer"
                  >
                    <option value="" disabled className="bg-brand-black text-cream/50">Select Budget Range</option>
                    <option value="$250k - $500k" className="bg-brand-black">$250k — $500k</option>
                    <option value="$500k - $1M" className="bg-brand-black">$500k — $1M</option>
                    <option value="$1M - $2.5M" className="bg-brand-black">$1M — $2.5M</option>
                    <option value="$2.5M+" className="bg-brand-black">$2.5M+</option>
                  </select>
                  <div className="absolute right-0 top-3 pointer-events-none text-cream/40 peer-focus:text-[#C9A55A]">▼</div>
                  <label
                    htmlFor="budget"
                    className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-[#C9A55A]"
                  >
                    Anticipated Budget
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">There was an issue submitting your inquiry. Please try again.</p>
                )}

                <div className="mt-4 pt-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full group flex items-center justify-center gap-4 bg-[#C9A55A] text-brand-black py-4 uppercase tracking-[0.2em] text-[11px] font-semibold transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      "Transmitting..."
                    ) : (
                      <>
                        Submit Inquiry
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}