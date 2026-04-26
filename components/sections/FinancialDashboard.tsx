"use client";

import { motion } from "framer-motion";
import { Clock, Wallet } from "lucide-react";

export default function FinancialDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col justify-center h-full pt-20 lg:pt-0"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A55A] animate-pulse" />
          <p className="text-[#C9A55A] text-[10px] uppercase tracking-[0.2em] font-semibold">Live Projections</p>
        </div>
        <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em]">Seseh, Bali · Leasehold (25 Yrs)</p>
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Purchase Price</p>
          <p className="font-display text-2xl text-cream">$400,000</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Est. Year 1 Net Rent</p>
          <p className="font-display text-2xl text-cream">$59,400</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Projected ROI</p>
          <p className="font-display text-2xl text-[#C9A55A]">14.85%</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Break-Even</p>
          <p className="font-display text-2xl text-cream">6.7 Yrs</p>
        </div>
        <div>
          <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">Leasehold</p>
          <p className="font-display text-2xl text-cream">25 Years</p>
        </div>
      </div>

      {/* Middle Section: Operations & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        {/* Year 1 Breakdown Table */}
        <div className="lg:col-span-5">
          <h4 className="text-white text-[11px] uppercase tracking-widest mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
            <Wallet size={14} className="text-[#C9A55A]"/> Year 1 Operations
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between"><span className="text-white/40">Gross Rev (81% Occ):</span> <span className="text-white font-medium">$74,249</span></div>
            <div className="flex justify-between"><span className="text-white/40">Management & Utilities (20%):</span> <span className="text-white font-medium">-$14,850</span></div>
            <div className="flex justify-between pt-3 border-t border-white/5">
              <span className="text-[#C9A55A] font-semibold">Net Rental Revenue:</span> 
              <span className="text-[#C9A55A] font-semibold">$59,400</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-white/40">Postbuild Value Apprec:</span> 
              <span className="text-white font-medium">+$40,000 <span className="text-[#C9A55A] text-[10px] ml-1">(10%)</span></span>
            </div>
          </div>
        </div>

        {/* Animated Area Chart */}
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-4">
            <span>Net Rent Accumulation</span>
            <span>$1,713,378 (25 Yrs)</span>
          </div>
          <div className="relative w-full h-32 border-b border-l border-white/20">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A55A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C9A55A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
                d="M 0 100 L 0 90 Q 25 70 50 45 T 100 5 L 100 100 Z" fill="url(#chartGrad)"
              />
              <motion.path
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                d="M 0 90 Q 25 70 50 45 T 100 5" fill="none" stroke="#C9A55A" strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Section: Three Scenarios side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 5 Year */}
        <div className="border border-white/10 p-5 bg-white/[0.02]">
          <h5 className="text-[#C9A55A] text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={12} /> 5-Year Scenario
          </h5>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between"><span className="text-white/40">Net Rent:</span> <span className="text-white">$309,115</span></div>
            <div className="flex justify-between"><span className="text-white/40">Property Residual:</span> <span className="text-white">$388,636</span></div>
            <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/60">Total Return:</span> <span className="text-white font-medium">$337,754</span></div>
            <div className="flex justify-between mt-1"><span className="text-[#C9A55A] font-semibold">Yearly ROI:</span> <span className="text-[#C9A55A] font-semibold">16.89%</span></div>
          </div>
        </div>

        {/* 10 Year */}
        <div className="border border-white/10 p-5 bg-white/[0.02]">
          <h5 className="text-[#C9A55A] text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={12} /> 10-Year Scenario
          </h5>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between"><span className="text-white/40">Net Rent:</span> <span className="text-white">$650,409</span></div>
            <div className="flex justify-between"><span className="text-white/40">Property Residual:</span> <span className="text-white">$321,814</span></div>
            <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/60">Total Return:</span> <span className="text-white font-medium">$612,223</span></div>
            <div className="flex justify-between mt-1"><span className="text-[#C9A55A] font-semibold">Yearly ROI:</span> <span className="text-[#C9A55A] font-semibold">15.31%</span></div>
          </div>
        </div>

        {/* Long Term */}
        <div className="border border-white/10 p-5 bg-white/[0.02]">
          <h5 className="text-[#C9A55A] text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock size={12} /> Long Term (25 Yrs)
          </h5>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between"><span className="text-white/40">Net Rent:</span> <span className="text-white">$1,713,378</span></div>
            <div className="flex justify-between"><span className="text-white/40">Property Residual:</span> <span className="text-white">$0</span></div>
            <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/60">Total Profit:</span> <span className="text-white font-medium">$1,313,378</span></div>
            <div className="flex justify-between mt-1"><span className="text-[#C9A55A] font-semibold">Yearly ROI:</span> <span className="text-[#C9A55A] font-semibold">12.98%</span></div>
          </div>
        </div>

      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-cream/25 text-[10px] leading-relaxed border-t border-white/5 pt-6">
        Projections are based on operating assumptions and are provided for investor review, not guaranteed returns.
      </p>
    </motion.div>
  );
}