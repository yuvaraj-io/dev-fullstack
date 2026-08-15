"use client";

import { useState } from "react";
import { FaCalculator, FaCheckCircle, FaArrowRight, FaBolt } from "react-icons/fa";

interface CostCalculatorProps {
  onApplyEstimate?: (estimate: {
    type: string;
    hoursPerDay: number;
    days: number;
    totalHours: number;
    totalCost: number;
  }) => void;
}

export default function CostCalculator({ onApplyEstimate }: CostCalculatorProps) {
  const [serviceType, setServiceType] = useState<"new_dev" | "migration">("new_dev");
  const [hoursPerDay, setHoursPerDay] = useState<number>(4);
  const [workingDays, setWorkingDays] = useState<number>(20);

  const hourlyRate = serviceType === "new_dev" ? 250 : 300;
  const totalHours = hoursPerDay * workingDays;
  const totalCost = totalHours * hourlyRate;

  const minRange = Math.round(totalCost * 0.95);
  const maxRange = Math.round(totalCost * 1.15);

  const handleApply = () => {
    if (onApplyEstimate) {
      onApplyEstimate({
        type: serviceType === "new_dev" ? "New Development (Full Stack)" : "Frontend Project Migration",
        hoursPerDay,
        days: workingDays,
        totalHours,
        totalCost,
      });
    }
    const el = document.getElementById("onboarding-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-900/90 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/70 dark:text-violet-400">
            <FaCalculator className="text-xl" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
              Instant Quote &amp; Sprint Estimator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize daily hours and timeline to calculate your project budget
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 self-start rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950/80 dark:text-violet-300">
          <FaBolt className="text-[0.65rem]" /> Transparent Pricing
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Controls */}
        <div className="space-y-6 lg:col-span-7">
          {/* Service Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              1. Project Focus
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceType("new_dev")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  serviceType === "new_dev"
                    ? "border-violet-500 bg-violet-50/70 ring-2 ring-violet-400/30 dark:border-violet-500 dark:bg-violet-950/40"
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/40"
                }`}
              >
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 dark:text-white">
                  New Development
                </div>
                <div className="mt-0.5 text-xs text-violet-600 dark:text-violet-400 font-semibold">
                  ₹250 / hour · Fullstack
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("migration")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  serviceType === "migration"
                    ? "border-teal-500 bg-teal-50/70 ring-2 ring-teal-400/30 dark:border-teal-500 dark:bg-teal-950/40"
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/40"
                }`}
              >
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 dark:text-white">
                  Frontend Migration
                </div>
                <div className="mt-0.5 text-xs text-teal-600 dark:text-teal-400 font-semibold">
                  ₹300 / hour · Modernization
                </div>
              </button>
            </div>
          </div>

          {/* Daily Hours Commitment */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                2. Daily Bandwidth Commitment
              </label>
              <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                {hoursPerDay} Hours / Day
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {[2, 4, 6, 8].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHoursPerDay(h)}
                  className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                    hoursPerDay === h
                      ? "border-violet-500 bg-violet-600 text-white shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300"
                  }`}
                >
                  {h} hrs {h === 4 ? "⭐" : ""}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[0.7rem] text-slate-400">
              * 4 hours/day is the standard focused deep-work sprint model.
            </p>
          </div>

          {/* Working Days Duration */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                3. Engagement Duration
              </label>
              <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                {workingDays} Days ({Math.round(workingDays / 20 * 10) / 10} mo)
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {[
                { days: 10, label: "2 Wks (10d)" },
                { days: 20, label: "1 Mo (20d)" },
                { days: 40, label: "2 Mo (40d)" },
                { days: 60, label: "3 Mo (60d)" },
              ].map((item) => (
                <button
                  key={item.days}
                  type="button"
                  onClick={() => setWorkingDays(item.days)}
                  className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                    workingDays === item.days
                      ? "border-violet-500 bg-violet-600 text-white shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Quote Card */}
        <div className="rounded-2xl border border-slate-200 bg-linear-to-b from-slate-50 to-white p-6 shadow-md dark:border-white/10 dark:from-slate-950 dark:to-slate-900 lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Project Quote</p>
          
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              ₹{minRange.toLocaleString("en-IN")} – ₹{maxRange.toLocaleString("en-IN")}
            </span>
          </div>
          
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Based on <strong className="text-slate-800 dark:text-slate-200">{totalHours} total dedicated hours</strong> @ ₹{hourlyRate}/hr
          </p>

          <div className="mt-6 space-y-2.5 border-t border-slate-200 pt-4 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Daily Delivery:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{hoursPerDay} hours / workday</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sprint Duration:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{workingDays} working days</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Code Reviews &amp; PRs:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Included Daily</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Code Ownership:</span>
              <span className="font-semibold text-slate-900 dark:text-white">100% Client Owned</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleApply}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700 hover:shadow-violet-500/35"
            >
              <span>Lock Quote &amp; Onboard</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
