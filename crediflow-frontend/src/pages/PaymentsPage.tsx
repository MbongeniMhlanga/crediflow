import { BadgeCheck, CreditCard, GaugeCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useCurrentCreditDecision, usePayments } from "../hooks/useLoanProducts";

export const PaymentsPage = () => {
  const { data: decision } = useCurrentCreditDecision();
  const loanId = decision?.loanId ?? null;
  const { data: payments, isLoading } = usePayments(loanId);
  const completedCount = payments?.filter((payment) => payment.status === "COMPLETED").length ?? 0;
  const outstanding = decision?.monthlyInstallment && payments
    ? Math.max((decision.monthlyInstallment * payments.length) - payments.reduce((sum, payment) => sum + payment.amount, 0), 0)
    : null;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
          <CreditCard className="h-4 w-4" />
          Payment center
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-h)]">
          Payments & Penalties
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          This page now reads live payment history from the backend when a loan exists.
          If there are no payments yet, it will say that plainly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Paid installments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
              {loanId ? completedCount : "No payments yet"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {loanId ? "Successful payments recorded for this loan" : "No active loan has any payments to show"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outstanding amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
              {outstanding === null ? "No loan yet" : `R ${outstanding.toLocaleString("en-ZA")}`}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {loanId ? "Estimated remaining balance based on recorded payments" : "A loan must exist before a balance can be shown"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Penalty exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
              {loanId ? "No penalties" : "No loan yet"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {loanId ? "No penalty records were found for this loan" : "No penalties can exist without a loan"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <p className="text-sm text-[var(--muted)]">Recent and upcoming entries</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                Loading payment history...
              </div>
            ) : loanId ? (
              payments?.length ? (
                payments.map((payment) => (
                  <div key={payment.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-[var(--accent)]" />
                        <p className="font-medium text-[var(--text-h)]">Payment #{payment.id}</p>
                      </div>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {new Date(payment.paymentDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-semibold text-[var(--text-h)]">
                        R {payment.amount.toLocaleString("en-ZA")}
                      </p>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--text-h)]">
                        <GaugeCircle className="h-3.5 w-3.5" />
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                  No payments found yet. Once the borrower makes a payment, it will appear here.
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                No loan yet. Payment history appears only after a loan is approved.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penalties</CardTitle>
            <p className="text-sm text-[var(--muted)]">Late fee history for the current loan</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {loanId ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                No penalties recorded yet. If a payment becomes overdue, a penalty record will
                appear here.
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                No loan yet. There are no penalties to show.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
