"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRocket, FaExchangeAlt, FaCogs, FaClock, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

interface PricingCardsProps {
  onSelectTier?: (tierName: string) => void;
}

export default function PricingCards({ onSelectTier }: PricingCardsProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "hourly">("monthly");

  const handleSelect = (tier: string) => {
    if (onSelectTier) {
      onSelectTier(tier);
    } else {
      const el = document.getElementById("onboarding-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Billing Switch Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              billingCycle === "monthly"
                ? "bg-violet-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Monthly Sprint Package (20 Days)
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("hourly")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              billingCycle === "hourly"
                ? "bg-violet-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Hourly Rates Breakdown
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
        
        {/* Tier 1: Full Stack New Development */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-col justify-between rounded-3xl border-2 border-violet-500/40 bg-white p-7 shadow-xl dark:border-violet-500/30 dark:bg-slate-900/90 sm:p-8"
        >
          {/* Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-4 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-white shadow-md">
            Most Popular for MVPs
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/70 dark:text-violet-400">
                <FaRocket className="text-xl" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
                  New Development
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Frontend + Backend Full-Stack</p>
              </div>
            </div>

            {/* Price Header */}
            <div className="mt-6 border-b border-slate-100 pb-6 dark:border-white/10">
              {billingCycle === "monthly" ? (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      ₹20,000 – ₹30,000
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ month</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-violet-600 dark:text-violet-400">
                    Average monthly sprint investment · 80+ committed hours
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      ₹250
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ hour</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-violet-600 dark:text-violet-400">
                    Daily 4 Hours · 20 Working Days/month
                  </p>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 p-2 dark:bg-slate-950/60">
                  <FaClock className="text-violet-500" />
                  <span>4 hrs / day</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 p-2 dark:bg-slate-950/60">
                  <FaCalendarAlt className="text-violet-500" />
                  <span>20 Days / mo</span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                What&apos;s Included:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Full-Stack Architecture (React, Next.js, Node.js, Express, MongoDB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>REST API design, auth pipelines, JWT &amp; DB Schema modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>95% responsive UI implementation and follow alignments from Figma</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Development with more of Edge cases that avoid application mislead</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Commitment to weekly demo's for the progress and clarifications</span>
                </li>
                
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => handleSelect("New Development (₹250/hr - ₹20k to ₹30k/mo)")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-700 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              <span>Onboard New Project</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>

        {/* Tier 2: Frontend & Existing Project Migration */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-col justify-between rounded-3xl border-2 border-teal-500/40 bg-white p-7 shadow-xl dark:border-teal-500/30 dark:bg-slate-900/90 sm:p-8"
        >
          {/* Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-teal-600 to-emerald-600 px-4 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-white shadow-md">
            For Scale &amp; Performance
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 dark:bg-teal-950/70 dark:text-teal-400">
                <FaExchangeAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
                  Frontend Migration
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Modernization &amp; Performance</p>
              </div>
            </div>

            {/* Price Header */}
            <div className="mt-6 border-b border-slate-100 pb-6 dark:border-white/10">
              {billingCycle === "monthly" ? (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      ₹25,000 – ₹35,000
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ month</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400">
                    Average monthly engagement · Depends on legacy scope
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      ₹300
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ hour</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400">
                    Daily 4 Hours · Specialized Migration &amp; Optimization
                  </p>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 p-2 dark:bg-slate-950/60">
                  <FaClock className="text-teal-500" />
                  <span>4 hrs / day</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 p-2 dark:bg-slate-950/60">
                  <FaCalendarAlt className="text-teal-500" />
                  <span>20 Days / mo</span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                What&apos;s Included:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Angular / Vue / React migration</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Component based Architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Refactoring code and state management (Redux / NGRX )</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Code Optimization with SonarQube and Using best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Develop with more of Edge cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Commitment to weekly demo's for the progress and clarifications</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => handleSelect("Frontend Migration (₹300/hr - ₹25k to ₹35k/mo)")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-700 hover:shadow-teal-500/40 hover:-translate-y-0.5"
            >
              <span>Plan Migration Sprint</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>

        {/* Tier 3: Custom Scope / Retainer */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-lg dark:border-white/10 dark:bg-slate-900/80 sm:p-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <FaCogs className="text-xl" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
                  Custom &amp; Retainer
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Milestone or Dedicated Sprint</p>
              </div>
            </div>

            {/* Price Header */}
            <div className="mt-6 border-b border-slate-100 pb-6 dark:border-white/10">
              <div className="flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Custom Quote
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                Tailored scoping based on your exact product requirements
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 p-2 dark:bg-slate-950/60">
                  <FaClock className="text-slate-500" />
                  <span>Flexible Hours</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 p-2 dark:bg-slate-950/60">
                  <FaCalendarAlt className="text-slate-500" />
                  <span>Custom Timeline</span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                What&apos;s Included:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Specific feature modules (Payments, Auth, Dashboards, 3D)</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Architecture review &amp; code auditing sprints</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Dedicated weekly or bi-weekly developer retainer</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Fast-turnaround rescue sprints for urgent deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0" />
                  <span>Direct Slack/WhatsApp/Discord communication channel</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => handleSelect("Custom Scope / Retainer")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-100 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <span>Get Custom Quote</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
