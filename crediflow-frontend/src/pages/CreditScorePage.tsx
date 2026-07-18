import { ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useCurrentCreditDecision, useCurrentCreditScore } from "../hooks/useLoanProducts";

export const CreditScorePage = () => {
  const { data: score, isLoading: scoreLoading } = useCurrentCreditScore();
  const { data: decision, isLoading: decisionLoading } = useCurrentCreditDecision();
  const loading = scoreLoading || decisionLoading;

  const scoreValue = score?.score ?? decision?.score;
  const scoreColor =
    scoreValue === undefined
      ? "text-[var(--text-h)]"
      : scoreValue >= 700
      ? "text-emerald-600"
      : scoreValue >= 650
      ? "text-amber-600"
      : "text-rose-600";

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
          This screen uses the live backend score and eligibility decision. If no score has been
          generated yet, you will see a clear explanation instead of a placeholder number.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
            <p className="text-sm text-[var(--muted)]">
              {score?.calculatedAt
                ? `Last updated ${new Date(score.calculatedAt).toLocaleString()}`
                : "No credit history yet"}
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {loading ? (
              <p className="text-sm text-[var(--muted)]">Loading credit history...</p>
            ) : score ? (
              <>
                <div className="rounded-[28px] bg-[var(--surface-soft)] p-6 text-center">
                  <p className={`text-6xl font-semibold tracking-tight ${scoreColor}`}>{score.score}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{score.riskLevel} risk</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[var(--surface-soft)] p-3">
                    <p className="text-[var(--muted)]">Decision</p>
                    <p className="mt-1 font-semibold text-[var(--text-h)]">
                      {decision?.eligible ? "Eligible" : "Review required"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[var(--surface-soft)] p-3">
                    <p className="text-[var(--muted)]">Income</p>
                    <p className="mt-1 font-semibold text-[var(--text-h)]">
                      {decision?.monthlyIncome
                        ? `R ${decision.monthlyIncome.toLocaleString("en-ZA")}`
                        : "Not on file"}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-4 text-emerald-900">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-5 w-5" />
                    <div>
                      <p className="font-medium">
                        {decision?.reason ?? "Score available"}
                      </p>
                      <p className="mt-1 text-sm">
                        {decision
                          ? `Monthly income and affordability are being compared against the requested installment of R ${decision.monthlyInstallment.toLocaleString(
                              "en-ZA"
                            )}.`
                          : "A decision is not available yet because the borrower has not been evaluated."}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                No credit history yet. Once a loan is approved, the computed score will appear
                here.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility Notes</CardTitle>
            <p className="text-sm text-[var(--muted)]">What the backend uses for a live decision</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-[var(--muted)]">
            <p>
              The backend calculates eligibility from borrower income, employment status, loan
              amount, term, and the configured score thresholds.
            </p>
            <p>
              There is no fake breakdown here anymore. If the borrower has no history, the app
              says exactly that.
            </p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <p className="font-medium text-[var(--text-h)]">Current state</p>
              <p className="mt-2">
                {score
                  ? "A live score exists and was loaded from the backend."
                  : "No credit score has been generated yet for this user."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
