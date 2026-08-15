"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Chip,
  CssBaseline,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";

type UserRole = "admin" | "superuser" | "user";

type AdminUser = {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
  role: UserRole;
  createdAt: string | null;
};

type AuthUser = {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
  role: UserRole;
};

const roleColor: Record<UserRole, "error" | "warning" | "default"> = {
  admin: "error",
  superuser: "warning",
  user: "default",
};

const theme = createTheme({
  palette: {
    primary: { main: "#7c3aed" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "inherit",
  },
});

import AnalyticsChart from "@/components/admin/AnalyticsChart";

export default function AdminPage() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [canManageRoles, setCanManageRoles] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15,
  });

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (!data?.success) {
          router.replace("/auth");
          return;
        }

        if (data.user.role !== "admin" && data.user.role !== "superuser") {
          router.replace("/profile");
          return;
        }

        setAuthUser(data.user);
      })
      .catch(() => router.replace("/auth"))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setPaginationModel((current) => (current.page === 0 ? current : { ...current, page: 0 }));
  }, [search]);

  const loadUsers = useCallback(async () => {
    setTableLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(paginationModel.page + 1),
        search,
      });
      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        setError(data?.message || "Unable to load users.");
        setUsers([]);
        setTotal(0);
        return;
      }

      setUsers(data.users);
      setTotal(data.total);
      setCanManageRoles(Boolean(data.canManageRoles));
    } catch {
      setError("Unable to load users.");
      setUsers([]);
      setTotal(0);
    } finally {
      setTableLoading(false);
    }
  }, [paginationModel.page, search]);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    loadUsers();
  }, [authUser, loadUsers]);

  const handleRoleChange = useCallback(async (userId: string, role: UserRole) => {
    setMessage("");
    setError("");

    const response = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await response.json();

    if (!response.ok || !data?.success) {
      setError(data?.message || "Unable to update role.");
      return;
    }

    setUsers((current) =>
      current.map((user) => (user.id === userId ? { ...user, role } : user))
    );
    setMessage(`Updated @${data.user.username} to ${role}.`);
  }, []);

  const columns = useMemo<GridColDef<AdminUser>[]>(() => {
    return [
      {
        field: "avatar",
        headerName: "",
        width: 72,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<AdminUser>) => (
          <Avatar
            src={params.row.profileImage || undefined}
            alt={params.row.fullName}
            sx={{ width: 40, height: 40 }}
          >
            {(params.row.fullName || params.row.username).charAt(0).toUpperCase()}
          </Avatar>
        ),
      },
      {
        field: "fullName",
        headerName: "Name",
        flex: 1.2,
        minWidth: 180,
        sortable: false,
        align: "left",
        headerAlign: "left",
      },
      {
        field: "username",
        headerName: "Username",
        flex: 1,
        minWidth: 150,
        sortable: false,
        align: "left",
        headerAlign: "left",
        valueGetter: (_value, row) => `@${row.username}`,
      },
      {
        field: "role",
        headerName: "Role",
        width: 170,
        sortable: false,
        align: "left",
        headerAlign: "left",
        renderCell: (params: GridRenderCellParams<AdminUser>) => {
          if (!canManageRoles || params.row.id === authUser?.id) {
            return (
              <Chip
                size="small"
                label={params.row.role}
                color={roleColor[params.row.role]}
                sx={{ textTransform: "capitalize", height: 28 }}
              />
            );
          }

          return (
            <FormControl size="small" sx={{ width: 140 }}>
              <Select
                value={params.row.role}
                onChange={(event: SelectChangeEvent) =>
                  handleRoleChange(params.row.id, event.target.value as UserRole)
                }
                sx={{
                  height: 36,
                  "& .MuiSelect-select": {
                    py: 0.75,
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                  },
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="superuser">Superuser</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Joined",
        width: 140,
        sortable: false,
        align: "left",
        headerAlign: "left",
        valueGetter: (_value, row) =>
          row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
      },
    ];
  }, [authUser?.id, canManageRoles, handleRoleChange]);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 text-center text-slate-600">
        Loading admin panel...
      </section>
    );
  }

  if (!authUser) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        {/* Admin Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Admin Console</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Analytics &amp; Users</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Platform visitor telemetry, user management, and roles.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs"
            >
              Analytics &amp; Users
            </Link>
            <Link
              href="/admin/leads"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            >
              Project Leads &amp; Inquiries →
            </Link>
            <Link
              href="/profile"
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-white/10 dark:text-slate-300"
            >
              Profile
            </Link>
          </div>
        </div>

        <AnalyticsChart />

        {/* Quick Link Card to Leads */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-violet-200 bg-linear-to-r from-violet-50/90 to-indigo-50/90 p-6 dark:border-violet-900/40 dark:from-violet-950/40 dark:to-indigo-950/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                Project Inquiries &amp; Onboarding Briefs
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Manage client submissions, quotes, and direct WhatsApp handoffs in the dedicated Table view.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-violet-700 hover:-translate-y-0.5 shrink-0"
          >
            Open Project Leads Table →
          </Link>
        </div>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e2e8f0",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
            <TextField
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by username, name, or role"
              fullWidth
              size="small"
            />

            {(error || message) && (
              <Typography
                variant="body2"
                color={error ? "error" : "success.main"}
                sx={{ mt: 1.5 }}
              >
                {error || message}
              </Typography>
            )}
          </Box>

          <Box sx={{ width: "100%", height: 620 }}>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.id}
              rowCount={total}
              loading={tableLoading}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[15]}
              disableRowSelectionOnClick
              disableColumnMenu
              rowHeight={64}
              columnHeaderHeight={52}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                },
                "& .MuiDataGrid-columnHeader": {
                  px: 2,
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 700,
                  color: "#0f172a",
                },
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: "0.95rem",
                  color: "#334155",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f8fafc",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #e2e8f0",
                  px: 1,
                },
                "& .MuiDataGrid-virtualScroller": {
                  minHeight: 420,
                },
              }}
            />
          </Box>
        </Paper>
      </section>
    </ThemeProvider>
  );
}
