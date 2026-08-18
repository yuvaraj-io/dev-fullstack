"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQS = [
  {
    question: "Why the 4-hour daily commitment model?",
    answer:
      "4 hours of uninterrupted, deep-work engineering yields higher quality output than a distracted 8-hour day full of meetings. You get predictable, daily progress with clear Git pull requests and zero wasted hours.",
  },
  {
    question: "How do we track daily progress and deliverables?",
    answer:
      "Every working day, code is committed directly to your private GitHub/GitLab repository. We provide staging preview URLs for every feature branch along with daily sprint notes.",
  },
  {
    question: "What if my project requires more or fewer hours?",
    answer:
      "Our sprint model is flexible. You can adjust bandwidth (e.g., 2h, 4h, or 6h/day) or contract for a 2-week quick sprint. You only pay for agreed-upon milestone hours.",
  },
  {
    question: "Who owns the code, assets, and intellectual property?",
    answer:
      "You retain 100% ownership of all source code, design assets, database schemas, and documentation from Day 1.",
  },
  {
    question: "What payment methods are supported for invoices?",
    answer:
      "We support direct Bank Transfers (NEFT/IMPS), UPI (GPay, PhonePe, Paytm), and online checkout via Cashfree PG for Indian and international clients.",
  },
  {
    question: "How quickly can we start onboarding?",
    answer:
      "After our initial discovery call and scope agreement, we can typically kick off sprint Day 1 within 48 to 72 hours.",
  },
];

export default function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-400">
          Clarity &amp; Terms
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          Everything you need to know about our engagement models, billing, and onboarding process.
        </p>
      </div>

      <div className="mt-10 mx-auto max-w-3xl space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition dark:border-white/10 dark:bg-slate-900/80"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-white"
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`text-xs text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                    isOpen ? "rotate-180 text-violet-600 dark:text-violet-400" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:border-white/5 dark:text-slate-300">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
