import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
    isActive
      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

export const DashboardShell = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase">
                CrediFlow
              </p>
              <p className="text-sm text-slate-500">
                Lending workspace
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">
                Hello, {user?.name} {user?.surname}
              </p>
              <p className="text-xs text-slate-500">Manage your applications</p>
            </div>
            <Button variant="secondary" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="grid w-full gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10 lg:py-8">
        <aside className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
          <nav className="space-y-2">
            <NavLink to="/dashboard" end className={navLinkClass}>
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </NavLink>
            <NavLink to="/dashboard/products" className={navLinkClass}>
              <CreditCard className="h-4 w-4" />
              Loan Products
            </NavLink>
            <NavLink to="/dashboard/applications" className={navLinkClass}>
              <FileText className="h-4 w-4" />
              My Applications
            </NavLink>
            {user?.roles.some((r) => r.name === "ADMIN") && (
              <NavLink to="/dashboard/admin/applications" className={navLinkClass}>
                <FileText className="h-4 w-4" />
                Admin Review
              </NavLink>
            )}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
