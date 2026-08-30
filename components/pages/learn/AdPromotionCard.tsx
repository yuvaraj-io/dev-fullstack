"use client";

import { useState } from "react";
import { FaBullhorn, FaRocket, FaArrowRight } from "react-icons/fa";
import AdBannerModal from "./AdBannerModal";

interface AdPromotionCardProps {
  className?: string;
}

export default function AdPromotionCard({ className = "" }: AdPromotionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AdBannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <section
        aria-label="Promote Your Tech Product"
        className={`group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] p-4.5 shadow-2xs transition-all duration-300 hover:border-[var(--signal)]/40 hover:shadow-md ${className}`}
      >
        {/* Subtle background glow effect */}
        <div
          className="absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
          style={{ backgroundColor: "var(--signal)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full blur-2xl opacity-10 pointer-events-none"
          style={{ backgroundColor: "var(--signal)" }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top Badges */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[var(--line)]">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--signal-soft)",
                borderColor: "var(--line)",
                color: "var(--signal)",
              }}
            >
              <FaBullhorn size={9} />
              Sponsored Space
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[var(--ink-soft)] bg-[var(--surface)] border border-[var(--line)] px-2 py-0.5 rounded-full">
              <FaRocket size={8} style={{ color: "var(--signal)" }} /> 10k+ readers
            </span>
          </div>

          {/* Content Body */}
          <div className="pt-3 pb-1">
            <h3 className="font-[family-name:var(--font-display)] text-[13px] font-bold text-[var(--ink)] leading-snug">
              Promote Your Tech Product Here
            </h3>
            <p className="mt-1.5 text-[11px] text-[var(--ink-soft)] leading-relaxed">
              Reach thousands of full-stack developers, engineers, and tech builders actively reading this series.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 px-4 text-xs font-bold text-white transition-all duration-200 hover:opacity-95 hover:shadow-sm active:scale-[0.98] cursor-pointer"
            style={{ backgroundColor: "var(--signal)" }}
          >
            <span>Inquire for Ad Slot</span>
            <FaArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>
    </>
  );
}
