import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LayoutDashboard, CreditCard, FileText, LogOut } from "lucide-react";

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">💳 CrediFlow</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Hello, {user?.name} {user?.surname}
            </span>
            <Button
              variant="secondary"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen border-r p-4">
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/products"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <CreditCard className="h-5 w-5" />
              Loan Products
            </Link>
            <Link
              to="/dashboard/applications"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <FileText className="h-5 w-5" />
              My Applications
            </Link>
            {user?.roles.some((r) => r.name === "ADMIN") && (
              <Link
                to="/dashboard/admin/applications"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <FileText className="h-5 w-5" />
                All Applications (Admin)
              </Link>
            )}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};