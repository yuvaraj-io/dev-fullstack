"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaShieldAlt, FaLaptopCode, FaCheckCircle, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import PricingCards from "@/components/pricing/PricingCards";
import CostCalculator from "@/components/pricing/CostCalculator";
import OnboardingWorkflow from "@/components/pricing/OnboardingWorkflow";
import OnboardingForm from "@/components/pricing/OnboardingForm";
import PricingFAQ from "@/components/pricing/PricingFAQ";

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string>("New Development (₹250/hr - ₹20k to ₹30k/mo)");
  const [selectedBudget, setSelectedBudget] = useState<string>("₹20,000 – ₹30,000 / month");

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    if (tier.includes("Migration")) {
      setSelectedBudget("₹25,000 – ₹35,000 / month");
    } else if (tier.includes("New Development")) {
      setSelectedBudget("₹20,000 – ₹30,000 / month");
    } else {
      setSelectedBudget("Custom Milestone Scope");
    }
    const el = document.getElementById("onboarding-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyEstimate = (est: {
    type: string;
    hoursPerDay: number;
    days: number;
    totalHours: number;
    totalCost: number;
  }) => {
    setSelectedTier(`${est.type} (${est.hoursPerDay}h/day for ${est.days} days)`);
    setSelectedBudget(`₹${Math.round(est.totalCost * 0.95).toLocaleString("en-IN")} – ₹${Math.round(est.totalCost * 1.15).toLocaleString("en-IN")}`);
  };

  return (
    <div className="relative min-h-screen py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-full max-w-5xl bg-gradient-to-b from-violet-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 dark:border-violet-700/50 dark:bg-violet-950/60 dark:text-violet-300">
            <FaCode className="text-xs" /> Engineering Bandwidth &amp; Retainers
          </div>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Transparent Pricing.{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Dedicated Output.
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Direct, senior-level full-stack development with a predictable sprint model. No agency overheads or hidden markups — just 4 hours of focused deep-work every business day.
          </p>

          {/* Trust Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs dark:border-white/10 dark:bg-slate-900/80">
              <FaLaptopCode className="text-violet-600 dark:text-violet-400" />
              <span>4h Daily Deep-Work Sprints</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs dark:border-white/10 dark:bg-slate-900/80">
              <FaShieldAlt className="text-teal-600 dark:text-teal-400" />
              <span>100% Client Code Ownership</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs dark:border-white/10 dark:bg-slate-900/80">
              <FaRocket className="text-amber-500" />
              <span>Daily Git PRs &amp; Staging URLs</span>
            </div>
          </div>
        </div>

        {/* Section 2: Core Pricing Cards */}
        <section>
          <PricingCards onSelectTier={handleSelectTier} />
        </section>

        {/* Section 3: Interactive Cost Estimator */}
        <section>
          <CostCalculator onApplyEstimate={handleApplyEstimate} />
        </section>

        {/* Section 4: 4-Step Onboarding Workflow */}
        <section>
          <OnboardingWorkflow />
        </section>

        {/* Section 5: Onboarding Intake Form */}
        <section>
          <OnboardingForm
            initialProjectType={selectedTier}
            initialBudget={selectedBudget}
          />
        </section>

        {/* Section 6: Pricing FAQ */}
        <section>
          <PricingFAQ />
        </section>

        {/* Section 7: Bottom Direct Banner */}
        <section className="rounded-3xl border border-slate-200 bg-linear-to-r from-violet-900 via-slate-900 to-indigo-950 p-8 sm:p-12 text-center text-white shadow-2xl">
          <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Accelerate Your Product?
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Book a discovery session or start with a 2-week trial sprint. We can typically kick off within 48 hours.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/917204447908?text=Hi%20Yuvaraj%2C%20I%20saw%20your%20pricing%20page%20and%20want%20to%20discuss%20a%20project%20sprint."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-lg transition hover:bg-emerald-600 hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-lg" /> Chat on WhatsApp
            </a>
            <a
              href="mailto:developer@yuvidev.in?subject=New%20Project%20Engagement"
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:-translate-y-0.5"
            >
              <FaEnvelope /> Email: developer@yuvidev.in
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
