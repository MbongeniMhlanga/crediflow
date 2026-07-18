import { ShieldCheck, TrendingUp, AlertTriangle, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { creditScoreMock } from "../lib/lending-mocks";

export const CreditScorePage = () => {
  const score = creditScoreMock.score;
  const color =
    score >= 700 ? "text-emerald-600" : score >= 650 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
          <ShieldCheck className="h-4 w-4" />
          Credit intelligence
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-h)]">
          Credit Score Overview
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          This screen is designed to show what the backend will eventually need to calculate
          for real eligibility decisions: score, band, and the key factors affecting approval.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
            <p className="text-sm text-[var(--muted)]">Last updated {creditScoreMock.updatedAt}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-[28px] bg-[var(--surface-soft)] p-6 text-center">
              <p className={`text-6xl font-semibold tracking-tight ${color}`}>{score}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{creditScoreMock.band} risk</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-[var(--surface-soft)] p-3">
                <p className="text-[var(--muted)]">Risk level</p>
                <p className="mt-1 font-semibold text-[var(--text-h)]">{creditScoreMock.riskLevel}</p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-soft)] p-3">
                <p className="text-[var(--muted)]">Decision</p>
                <p className="mt-1 font-semibold text-[var(--text-h)]">Eligible</p>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-4 text-emerald-900">
              <div className="flex items-start gap-3">
                <TrendingUp className="mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">Strong repayment behavior</p>
                  <p className="mt-1 text-sm">
                    The current mock score is healthy, but the real backend still needs a
                    scoring engine that uses income, employment, debt, and repayment history.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <p className="text-sm text-[var(--muted)]">Illustrative weighting for the future scoring engine</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {creditScoreMock.breakdown.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text-h)]">{item.label}</span>
                  <span className="text-[var(--muted)]">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-soft)]">
                  <div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}

            <div className="grid gap-3 pt-2 md:grid-cols-2">
              {creditScoreMock.factors.map((factor) => (
                <div key={factor.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <div className="flex items-center gap-2">
                    {factor.impact === "positive" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : factor.impact === "negative" ? (
                      <AlertTriangle className="h-4 w-4 text-rose-600" />
                    ) : (
                      <MinusCircle className="h-4 w-4 text-amber-600" />
                    )}
                    <p className="text-sm font-medium text-[var(--text-h)]">{factor.label}</p>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{factor.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
