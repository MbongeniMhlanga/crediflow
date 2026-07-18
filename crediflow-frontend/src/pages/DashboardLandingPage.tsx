import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { isAdminUser } from "../lib/roles";
import { CreditCard, FileText, ShieldCheck, Sparkles } from "lucide-react";

export const DashboardLandingPage = () => {
  const { user } = useAuth();
  const isAdmin = isAdminUser(user);

  const adminCards = [
    {
      title: "Review applications",
      description: "See every application, approve, or reject with a single workflow.",
      href: "/dashboard/admin/applications",
      icon: FileText,
    },
    {
      title: "Manage products",
      description: "Create and update loan products that the whole platform uses.",
      href: "/dashboard/products",
      icon: CreditCard,
    },
  ];

  const borrowerCards = [
    {
      title: "Browse products",
      description: "Compare loan options before starting a new application.",
      href: "/dashboard/products",
      icon: CreditCard,
    },
    {
      title: "Track applications",
      description: "Check the status of your pending, approved, and rejected applications.",
      href: "/dashboard/applications",
      icon: FileText,
    },
  ];

  const cards = isAdmin ? adminCards : borrowerCards;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
          <Sparkles className="h-4 w-4" />
          {isAdmin ? "Admin workspace" : "Borrower workspace"}
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-h)]">
          {isAdmin ? "Admin control center" : "Welcome back to CrediFlow"}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {isAdmin
            ? "This workspace is focused on reviewing applications and managing lending products."
            : "This workspace is focused on browsing products, submitting applications, and tracking your loan journey."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{card.title}</CardTitle>
                    <p className="mt-2 text-sm text-[var(--muted)]">{card.description}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-accent)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={card.href}>
                  <Button className="gap-2">Open</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isAdmin && (
        <div className="rounded-3xl border border-amber-100 bg-amber-50/70 p-6 text-amber-900">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5" />
            <p className="font-medium">Admin-only actions are now protected at the backend and the UI.</p>
          </div>
        </div>
      )}
    </div>
  );
};
