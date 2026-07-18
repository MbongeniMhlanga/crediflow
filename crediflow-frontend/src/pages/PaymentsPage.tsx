import { BadgeCheck, CreditCard, GaugeCircle, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { paymentHistoryMock, penaltyMock } from "../lib/lending-mocks";

export const PaymentsPage = () => {
  const completedCount = paymentHistoryMock.filter((payment) => payment.status === "Completed").length;

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
          The backend does not yet expose payment posting or penalty workflows, so this page
          acts as the intended experience for that future module.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Paid installments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">{completedCount}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Successful payments reflected in the mock ledger</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outstanding amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">R 27,360</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Estimated remaining balance on the example loan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Penalty exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">R 150</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Illustrative late fee already applied in the mock data</p>
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
            {paymentHistoryMock.map((payment) => (
              <div key={payment.reference} className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-[var(--accent)]" />
                    <p className="font-medium text-[var(--text-h)]">{payment.reference}</p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {payment.date} • {payment.channel}
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
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penalties</CardTitle>
            <p className="text-sm text-[var(--muted)]">Late fee history for the current loan</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {penaltyMock.map((penalty) => (
              <div key={penalty.appliedOn} className="rounded-2xl border border-rose-200/60 bg-rose-50/70 p-4 text-rose-900">
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-4 w-4" />
                  <p className="font-medium">{penalty.reason}</p>
                </div>
                <p className="mt-2 text-sm">
                  Applied on {penalty.appliedOn}
                </p>
                <p className="mt-1 text-sm font-semibold">R {penalty.amount.toLocaleString("en-ZA")}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
              <p className="font-medium text-[var(--text-h)]">Backend gap</p>
              <p className="mt-2">
                To make this screen live, the backend needs payment creation, penalty creation,
                payment status updates, and a loan balance recalculation service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
