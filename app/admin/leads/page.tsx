"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaTrashAlt,
  FaEye,
  FaSyncAlt,
  FaTimes,
  FaCheckCircle,
  FaUserTie,
  FaBullhorn,
  FaLayerGroup,
  FaChartLine,
  FaUsers,
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

type SortField = "name" | "projectType" | "estimatedBudget" | "createdAt" | "status";
type SortOrder = "asc" | "desc";

const statusConfig: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  NEW: {
    label: "NEW",
    bg: "bg-rose-50 dark:bg-rose-950/50",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800/50",
    dot: "bg-rose-500",
  },
  IN_REVIEW: {
    label: "IN REVIEW",
    bg: "bg-amber-50 dark:bg-amber-950/50",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/50",
    dot: "bg-amber-500",
  },
  CONTACTED: {
    label: "CONTACTED",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800/50",
    dot: "bg-blue-500",
  },
  CONVERTED: {
    label: "CONVERTED",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
  },
  ARCHIVED: {
    label: "ARCHIVED",
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
  },
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "PROJECTS" | "ADS">("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [testingWhatsApp, setTestingWhatsApp] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const handleTestWhatsApp = async () => {
    setTestingWhatsApp(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/whatsapp/test", { method: "POST" });
      const data = await res.json();
      setTestResult({
        success: data.success,
        message: data.message || (data.success ? "WhatsApp alert sent!" : "Failed to send alert."),
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Failed to trigger test WhatsApp notification.",
      });
    } finally {
      setTestingWhatsApp(false);
    }
  };

  // Check Admin Authorization
  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success || (data.user.role !== "admin" && data.user.role !== "superuser")) {
          router.replace("/auth");
        } else {
          setAuthLoading(false);
        }
      })
      .catch(() => router.replace("/auth"));
  }, [router]);

  // Fetch Inquiries
  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      fetchInquiries();
    }
  }, [authLoading, fetchInquiries]);

  // Status Change Handler
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
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project inquiry?")) return;

    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Sorting Toggle
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filtered & Sorted Data
  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];

    // Category filter (Projects vs Advertisement Slots)
    if (categoryFilter === "ADS") {
      result = result.filter((item) => item.projectType.toLowerCase().includes("advertisement"));
    } else if (categoryFilter === "PROJECTS") {
      result = result.filter((item) => !item.projectType.toLowerCase().includes("advertisement"));
    }

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.phone.toLowerCase().includes(query) ||
          item.projectType.toLowerCase().includes(query) ||
          item.details.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let aVal = a[sortField] || "";
      let bVal = b[sortField] || "";

      if (sortField === "createdAt") {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return result;
  }, [inquiries, search, categoryFilter, statusFilter, sortField, sortOrder]);

  // Paginated Slices
  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / pageSize));
  const paginatedInquiries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInquiries.slice(start, start + pageSize);
  }, [filteredInquiries, currentPage, pageSize]);

  // KPI Stats
  const totalLeads = inquiries.length;
  const adInquiriesCount = inquiries.filter((i) => i.projectType.toLowerCase().includes("advertisement")).length;
  const projectInquiriesCount = totalLeads - adInquiriesCount;
  const newLeads = inquiries.filter((i) => i.status === "NEW").length;
  const inReviewLeads = inquiries.filter((i) => i.status === "IN_REVIEW").length;
  const convertedLeads = inquiries.filter((i) => i.status === "CONVERTED").length;

  if (authLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="text-[0.65rem] opacity-40 ml-1 inline" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="text-xs text-violet-600 dark:text-violet-400 ml-1 inline" />
    ) : (
      <FaSortDown className="text-xs text-violet-600 dark:text-violet-400 ml-1 inline" />
    );
  };

  return (
    <div className="relative min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb / Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Admin Console
              </p>
            </div>
            <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Project Leads &amp; Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Live submissions, budget scoping, and onboarding briefs from prospective clients.
            </p>
          </div>

          {/* Tab Switcher & Test Action */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleTestWhatsApp}
              disabled={testingWhatsApp}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
            >
              <FaWhatsapp className={testingWhatsApp ? "animate-spin text-base" : "text-base"} />
              <span>{testingWhatsApp ? "Sending Test..." : "Test WhatsApp Alert"}</span>
            </button>

            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            >
              <FaChartLine className="text-violet-500" />
              <span>Analytics &amp; Users</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700"
            >
              <FaLayerGroup />
              <span>Project Leads ({totalLeads})</span>
            </Link>
          </div>
        </div>

        {/* Test Result Toast/Banner */}
        {testResult && (
          <div
            className={`flex items-start justify-between rounded-2xl border p-4 text-xs font-medium ${
              testResult.success
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FaWhatsapp className="text-base shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{testResult.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setTestResult(null)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        )}

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-slate-900/80">
            <div className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-400">
              Total Inquiries
            </div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalLeads}
            </div>
          </div>

          <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-5 shadow-xs dark:border-rose-900/40 dark:bg-rose-950/30">
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Needs Response
              </span>
              {newLeads > 0 && <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />}
            </div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-rose-600 dark:text-rose-400">
              {newLeads}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-xs dark:border-amber-900/40 dark:bg-amber-950/30">
            <div className="text-[0.7rem] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              In Review
            </div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {inReviewLeads}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-xs dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <div className="text-[0.7rem] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Converted Clients
            </div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {convertedLeads}
            </div>
          </div>
        </div>

        {/* Primary Type / Category Switcher (All vs Projects vs Ad Slots) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setCategoryFilter("ALL");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === "ALL"
                ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <FaLayerGroup />
            <span>All Submissions ({totalLeads})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCategoryFilter("PROJECTS");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === "PROJECTS"
                ? "bg-violet-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <FaUserTie className="text-violet-500" />
            <span>Client Projects ({projectInquiriesCount})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCategoryFilter("ADS");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === "ADS"
                ? "bg-amber-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <FaBullhorn className="text-amber-500" />
            <span>Ad Slot Inquiries ({adInquiriesCount})</span>
          </button>
        </div>

        {/* Toolbar: Status Filter Buttons + Search Input */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {["ALL", "NEW", "IN_REVIEW", "CONTACTED", "CONVERTED", "ARCHIVED"].map((status) => {
              const baseList =
                categoryFilter === "ADS"
                  ? inquiries.filter((i) => i.projectType.toLowerCase().includes("advertisement"))
                  : categoryFilter === "PROJECTS"
                  ? inquiries.filter((i) => !i.projectType.toLowerCase().includes("advertisement"))
                  : inquiries;

              const count =
                status === "ALL"
                  ? baseList.length
                  : baseList.filter((i) => i.status === status).length;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`rounded-2xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-violet-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {status === "ALL" ? "All Status" : status.replace("_", " ")} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by client, email, phone, brief..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 shadow-2xs focus:border-violet-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={fetchInquiries}
              title="Refresh table"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            >
              <FaSyncAlt className={loading ? "animate-spin text-xs" : "text-xs"} />
            </button>
          </div>
        </div>

        {/* shadcn Table Container */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden dark:border-white/10 dark:bg-slate-900/90">
          <Table>
            <TableHeader className="bg-slate-50/90 dark:bg-slate-950/60">
              <TableRow>
                <TableHead
                  onClick={() => toggleSort("name")}
                  className="cursor-pointer select-none py-4 text-xs uppercase tracking-wider"
                >
                  Client Name {renderSortIcon("name")}
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("projectType")}
                  className="cursor-pointer select-none py-4 text-xs uppercase tracking-wider"
                >
                  Engagement {renderSortIcon("projectType")}
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("estimatedBudget")}
                  className="cursor-pointer select-none py-4 text-xs uppercase tracking-wider"
                >
                  Budget &amp; Timeline {renderSortIcon("estimatedBudget")}
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("createdAt")}
                  className="cursor-pointer select-none py-4 text-xs uppercase tracking-wider"
                >
                  Date Received {renderSortIcon("createdAt")}
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("status")}
                  className="cursor-pointer select-none py-4 text-xs uppercase tracking-wider"
                >
                  Status {renderSortIcon("status")}
                </TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider pr-6">
                  Quick Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center text-xs text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
                      <span>Loading project inquiries...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center text-xs text-slate-400">
                    No inquiries found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedInquiries.map((inquiry) => {
                  const cfg = statusConfig[inquiry.status] || statusConfig.NEW;
                  const cleanPhone = inquiry.phone.replace(/\D/g, "");
                  const whatsappUrl = `https://wa.me/${
                    cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`
                  }?text=${encodeURIComponent(
                    `Hi ${inquiry.name}! I received your project inquiry for "${inquiry.projectType}" at Yuvidev. Let's schedule a discovery call to discuss your roadmap!`
                  )}`;

                  return (
                    <TableRow key={inquiry.id} className="group transition-colors">
                      {/* Client Info */}
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 font-extrabold text-sm text-violet-700 dark:bg-violet-950/70 dark:text-violet-300">
                            {inquiry.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {inquiry.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {inquiry.email || inquiry.phone || "No direct contact"}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Engagement Type */}
                      <TableCell className="py-4">
                        {inquiry.projectType.toLowerCase().includes("advertisement") ? (
                          <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/60 dark:text-amber-300 shadow-2xs">
                            <FaBullhorn size={10} className="text-amber-500" />
                            {inquiry.projectType}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40">
                            <FaUserTie size={10} className="text-violet-500" />
                            {inquiry.projectType}
                          </span>
                        )}
                      </TableCell>

                      {/* Budget & Timeline */}
                      <TableCell className="py-4">
                        <div className="text-xs">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {inquiry.estimatedBudget || "Custom"}
                          </div>
                          <div className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                            {inquiry.timeline}
                          </div>
                        </div>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="py-4 text-xs text-slate-600 dark:text-slate-300">
                        {inquiry.createdAt
                          ? new Date(inquiry.createdAt).toLocaleString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </TableCell>

                      {/* Status Selector */}
                      <TableCell className="py-4">
                        <div className="inline-flex items-center gap-1.5">
                          <select
                            value={inquiry.status}
                            disabled={actionLoadingId === inquiry.id}
                            onChange={(e) =>
                              handleStatusChange(inquiry.id, e.target.value as InquiryStatus)
                            }
                            className={`rounded-xl border px-2.5 py-1 text-xs font-extrabold outline-none transition cursor-pointer ${cfg.bg} ${cfg.text} ${cfg.border}`}
                          >
                            <option value="NEW">🔴 NEW</option>
                            <option value="IN_REVIEW">🟡 IN REVIEW</option>
                            <option value="CONTACTED">🔵 CONTACTED</option>
                            <option value="CONVERTED">🟢 CONVERTED</option>
                            <option value="ARCHIVED">⚪ ARCHIVED</option>
                          </select>
                        </div>
                      </TableCell>

                      {/* Quick Actions */}
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Full Brief Modal Trigger */}
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inquiry)}
                            title="View Full Project Brief"
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                          >
                            <FaEye className="text-xs" />
                          </button>

                          {/* WhatsApp Client Direct */}
                          {inquiry.phone && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700"
                            >
                              <FaWhatsapp className="text-sm" />
                            </a>
                          )}

                          {/* Send Email */}
                          {inquiry.email && (
                            <a
                              href={`mailto:${inquiry.email}?subject=Regarding%20Your%20Project%20Inquiry%20-%20Yuvidev`}
                              title="Send Email"
                              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                            >
                              <FaEnvelope className="text-xs" />
                            </a>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(inquiry.id)}
                            title="Delete Inquiry"
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-rose-400 hover:text-rose-600 dark:border-white/10 dark:bg-slate-900"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-white/10 dark:bg-slate-950/40">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing{" "}
              <strong>
                {filteredInquiries.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              </strong>{" "}
              to <strong>{Math.min(currentPage * pageSize, filteredInquiries.length)}</strong> of{" "}
              <strong>{filteredInquiries.length}</strong> inquiries
            </div>

            <div className="mt-3 sm:mt-0 flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
              >
                Previous
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Project Brief Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8">
            <button
              type="button"
              onClick={() => setSelectedInquiry(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <FaTimes className="text-base" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-lg font-extrabold text-violet-700 dark:bg-violet-950/70 dark:text-violet-300">
                {selectedInquiry.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
                  {selectedInquiry.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Submitted on{" "}
                  {selectedInquiry.createdAt
                    ? new Date(selectedInquiry.createdAt).toLocaleString("en-IN")
                    : "Recently"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3.5 divide-y divide-slate-100 text-xs dark:divide-white/5">
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Engagement Tier:</span>
                <span className="font-bold text-violet-600 dark:text-violet-400">
                  {selectedInquiry.projectType}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Target Budget:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedInquiry.estimatedBudget || "Custom Scope"}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Timeline:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedInquiry.timeline}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Email:</span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {selectedInquiry.email || "N/A"}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Phone:</span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {selectedInquiry.phone || "N/A"}
                </span>
              </div>
            </div>

            {/* Client Project Brief Note */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Client Project Brief:
              </label>
              <div className="max-h-48 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 dark:border-white/5 dark:bg-slate-950/60 dark:text-slate-300">
                {selectedInquiry.details || "No additional brief text provided."}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              {selectedInquiry.phone && (
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hi ${selectedInquiry.name}! I received your project inquiry for "${selectedInquiry.projectType}" at Yuvidev.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
                >
                  <FaWhatsapp className="text-base" /> Chat on WhatsApp
                </a>
              )}
              {selectedInquiry.email && (
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding%20Your%20Project%20Inquiry%20-%20Yuvidev`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
                >
                  <FaEnvelope /> Send Email
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
