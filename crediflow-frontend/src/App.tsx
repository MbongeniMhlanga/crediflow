import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DashboardLandingPage } from "./pages/DashboardLandingPage";
import { CreditScorePage } from "./pages/CreditScorePage";
import { RepaymentSchedulePage } from "./pages/RepaymentSchedulePage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { LoanProductsPage } from "./pages/LoanProductsPage";
import { MyApplicationsPage } from "./pages/MyApplicationsPage";
import { AdminApplicationsPage } from "./pages/AdminApplicationsPage";
import { isAdminUser } from "./lib/roles";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = isAdminUser(user);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardLandingPage />} />
        <Route
          path="admin"
          element={
            <Navigate
              to={isAdmin ? "/dashboard/admin/applications" : "/dashboard/products"}
              replace
            />
          }
        />
        <Route path="products" element={<LoanProductsPage />} />
        <Route path="applications" element={<MyApplicationsPage />} />
        <Route path="credit-score" element={<CreditScorePage />} />
        <Route path="repayment-schedule" element={<RepaymentSchedulePage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="admin/applications" element={<AdminApplicationsPage />} />
      </Route>
    </Routes>
  );
}

export default App
