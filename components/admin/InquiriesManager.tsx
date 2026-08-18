"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaCalendarCheck,
  FaTrashAlt,
  FaUserTie,
  FaFileAlt,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

export type InquiryStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "CONVERTED" | "ARCHIVED";

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  estimatedBudget: string;
  timeline: string;
  details: string;
  status: InquiryStatus;
  createdAt: string | null;
}

const statusColors: Record<InquiryStatus, { bg: string; text: string; muiColor: "error" | "warning" | "info" | "success" | "default" }> = {
  NEW: { bg: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300", text: "text-rose-700", muiColor: "error" },
  IN_REVIEW: { bg: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300", text: "text-amber-700", muiColor: "warning" },
  CONTACTED: { bg: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300", text: "text-blue-700", muiColor: "info" },
  CONVERTED: { bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", text: "text-emerald-700", muiColor: "success" },
  ARCHIVED: { bg: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300", text: "text-slate-600", muiColor: "default" },
};

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "ALL") params.append("status", statusFilter);
      if (search.trim()) params.append("search", search.trim());

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project inquiry?")) return;

    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete inquiry error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const [testingWhatsApp, setTestingWhatsApp] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestWhatsApp = async () => {
    setTestingWhatsApp(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/whatsapp/test", { method: "POST" });
      const data = await res.json();
      setTestResult(data.message || "Test alert processed.");
    } catch (err: any) {
      setTestResult(err?.message || "Failed to trigger test.");
    } finally {
      setTestingWhatsApp(false);
    }
  };

  // Quick stats
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "NEW").length;
  const inReviewCount = inquiries.filter((i) => i.status === "IN_REVIEW").length;
  const convertedCount = inquiries.filter((i) => i.status === "CONVERTED").length;

  return (
    <Paper sx={{ p: { xs: 2.5, sm: 3.5 }, mb: 4, borderRadius: 3, border: "1px solid #e2e8f0" }} elevation={0}>
      {/* Header */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 3 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "inherit" }}>
              Project Inquiries &amp; Leads
            </Typography>
            {newCount > 0 && (
              <Chip
                label={`${newCount} New`}
                size="small"
                color="error"
                sx={{ fontWeight: "bold", height: 22, fontSize: "0.7rem" }}
              />
            )}
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.82rem" }}>
            Direct onboarding briefs submitted through the Pricing &amp; Onboarding page.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <button
            type="button"
            disabled={testingWhatsApp}
            onClick={handleTestWhatsApp}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-60 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <FaWhatsapp className="text-sm text-emerald-600" />
            <span>{testingWhatsApp ? "Testing..." : "Test WhatsApp Alert"}</span>
          </button>
          <IconButton onClick={() => fetchInquiries()} size="small" title="Refresh">
            <FaSyncAlt className={loading ? "animate-spin text-sm" : "text-sm"} />
          </IconButton>
        </Box>
      </Box>

      {testResult && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-200">
          <strong>WhatsApp Status:</strong> {testResult}
        </div>
      )}

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-slate-900">
          <div className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">Total Leads</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalCount}
          </div>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-3.5 dark:border-rose-900/40 dark:bg-rose-950/30">
          <div className="text-[0.7rem] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">Needs Response</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-rose-600 dark:text-rose-400">
            {newCount}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/30">
          <div className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">In Review</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            {inReviewCount}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <div className="text-[0.7rem] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Converted</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {convertedCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {["ALL", "NEW", "IN_REVIEW", "CONTACTED", "CONVERTED"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                statusFilter === status
                  ? "bg-violet-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {status === "ALL" ? "All Inquiries" : status.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, email, phone..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <CircularProgress size={32} sx={{ color: "#7c3aed" }} />
          <p className="mt-3 text-xs text-slate-400">Loading inquiries from database...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-400 dark:border-white/10">
          <FaFileAlt className="mx-auto text-3xl mb-2 text-slate-300 dark:text-slate-600" />
          No project inquiries found matching the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => {
            const cleanPhone = inquiry.phone.replace(/\D/g, "");
            const whatsappText = encodeURIComponent(
              `Hi ${inquiry.name}! I received your project inquiry for "${inquiry.projectType}" at Yuvidev. Let's schedule a discovery call to discuss your roadmap!`
            );

            return (
              <div
                key={inquiry.id}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80"
              >
                <div>
                  {/* Top Bar: Name, Status Dropdown, and Delete */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3.5 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 font-extrabold text-sm dark:bg-violet-950/70 dark:text-violet-300">
                        {inquiry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-slate-900 dark:text-white">
                          {inquiry.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <FaClock className="text-[0.65rem]" />
                          <span>
                            {inquiry.createdAt
                              ? new Date(inquiry.createdAt).toLocaleString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Just now"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FormControl size="small">
                        <Select
                          value={inquiry.status}
                          disabled={actionLoadingId === inquiry.id}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value as InquiryStatus)}
                          sx={{
                            height: 32,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            borderRadius: 2,
                            "& .MuiSelect-select": { py: 0.5, px: 1.5 },
                          }}
                        >
                          <MenuItem value="NEW">🔴 NEW</MenuItem>
                          <MenuItem value="IN_REVIEW">🟡 IN REVIEW</MenuItem>
                          <MenuItem value="CONTACTED">🔵 CONTACTED</MenuItem>
                          <MenuItem value="CONVERTED">🟢 CONVERTED</MenuItem>
                          <MenuItem value="ARCHIVED">⚪ ARCHIVED</MenuItem>
                        </Select>
                      </FormControl>

                      <IconButton
                        size="small"
                        onClick={() => handleDelete(inquiry.id)}
                        disabled={actionLoadingId === inquiry.id}
                        title="Delete inquiry"
                        sx={{ color: "text.disabled", "&:hover": { color: "error.main" } }}
                      >
                        <FaTrashAlt className="text-xs" />
                      </IconButton>
                    </div>
                  </div>

                  {/* Project Engagement & Specs */}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1 font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                      💼 {inquiry.projectType}
                    </span>
                    {inquiry.estimatedBudget && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        💰 {inquiry.estimatedBudget}
                      </span>
                    )}
                    {inquiry.timeline && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        ⏱️ {inquiry.timeline}
                      </span>
                    )}
                  </div>

                  {/* Client Brief / Note */}
                  {inquiry.details ? (
                    <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-950/50 dark:text-slate-300">
                      <strong>Client Note:</strong> &ldquo;{inquiry.details}&rdquo;
                    </div>
                  ) : (
                    <div className="mt-2 text-xs italic text-slate-400">No additional brief provided.</div>
                  )}
                </div>

                {/* Bottom Bar: Action Buttons (WhatsApp, Call, Email) */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-white/5">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                    {inquiry.email && (
                      <a
                        href={`mailto:${inquiry.email}?subject=Regarding%20Your%20Project%20Inquiry%20-%20Yuvidev`}
                        className="flex items-center gap-1.5 hover:text-violet-600 transition"
                      >
                        <FaEnvelope className="text-violet-500" />
                        <span>{inquiry.email}</span>
                      </a>
                    )}
                    {inquiry.phone && (
                      <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1.5 hover:text-violet-600 transition">
                        <FaPhoneAlt className="text-slate-400" />
                        <span>{inquiry.phone}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {inquiry.phone && (
                      <a
                        href={`https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
                      >
                        <FaWhatsapp className="text-sm" /> WhatsApp Client
                      </a>
                    )}
                    {inquiry.email && (
                      <a
                        href={`mailto:${inquiry.email}?subject=Regarding%20Your%20Project%20Inquiry%20-%20Yuvidev`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <FaEnvelope className="text-xs text-slate-400" /> Send Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Paper>
  );
}
