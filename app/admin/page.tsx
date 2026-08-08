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
  Stack,
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
});

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
        field: "user",
        headerName: "User",
        flex: 1.4,
        minWidth: 220,
        sortable: false,
        renderCell: (params: GridRenderCellParams<AdminUser>) => (
          <Stack direction="row" spacing={1.5} sx={{ py: 1, alignItems: "center" }}>
            <Avatar src={params.row.profileImage || undefined} alt={params.row.fullName}>
              {(params.row.fullName || params.row.username).charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {params.row.fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{params.row.username}
              </Typography>
            </Box>
          </Stack>
        ),
        valueGetter: (_value, row) => `${row.fullName} ${row.username}`,
      },
      {
        field: "role",
        headerName: "Role",
        width: 180,
        sortable: false,
        renderCell: (params: GridRenderCellParams<AdminUser>) => {
          if (!canManageRoles || params.row.id === authUser?.id) {
            return (
              <Chip
                size="small"
                label={params.row.role}
                color={roleColor[params.row.role]}
                sx={{ textTransform: "capitalize" }}
              />
            );
          }

          return (
            <FormControl size="small" fullWidth>
              <Select
                value={params.row.role}
                onChange={(event: SelectChangeEvent) =>
                  handleRoleChange(params.row.id, event.target.value as UserRole)
                }
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
        width: 160,
        sortable: false,
        valueGetter: (_value, row) =>
          row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
      },
    ];
  }, [authUser?.id, canManageRoles, handleRoleChange]);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl py-16 text-center text-slate-600">
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
      <section className="mx-auto flex max-w-6xl flex-col gap-8 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Admin</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">Users</h1>
            <p className="mt-3 text-lg text-slate-600">
              {canManageRoles
                ? "Search users and manage roles across the platform."
                : "Search and view users. Role changes require an admin."}
            </p>
          </div>
          <Link
            href="/profile"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Back to profile
          </Link>
        </div>

        <Paper elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 4, p: 2.5 }}>
          <Stack spacing={2}>
            <TextField
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by username, name, or role"
              fullWidth
              size="small"
            />

            {(error || message) && (
              <Typography variant="body2" color={error ? "error" : "success.main"}>
                {error || message}
              </Typography>
            )}

            <Box sx={{ width: "100%", minHeight: 520 }}>
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
                getRowHeight={() => 72}
                sx={{
                  border: "none",
                  "& .MuiDataGrid-cell": { alignItems: "center", display: "flex" },
                  "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f8fafc" },
                }}
              />
            </Box>
          </Stack>
        </Paper>
      </section>
    </ThemeProvider>
  );
}
