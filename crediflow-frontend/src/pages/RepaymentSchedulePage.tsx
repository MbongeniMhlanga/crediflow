import { CalendarDays, CircleCheckBig, Clock3, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useCurrentCreditDecision, useRepaymentSchedule } from "../hooks/useLoanProducts";

export const RepaymentSchedulePage = () => {
  const { data: decision } = useCurrentCreditDecision();
  const loanId = decision?.loanId ?? null;
  const { data: schedule, isLoading } = useRepaymentSchedule(loanId);
  const totalDue = schedule?.reduce((sum, row) => sum + row.totalAmount, 0) ?? 0;
  const nextPayment = schedule?.find((row) => row.status === "PENDING");

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
          <CalendarDays className="h-4 w-4" />
          Repayment planning
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-h)]">
          Repayment Schedule
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          If there is no active loan yet, this page will tell you directly instead of showing a
          blank shell or a fake schedule.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
              {loanId ? `R ${totalDue.toLocaleString("en-ZA")}` : "No loan yet"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {loanId
                ? "Projected total over the remaining term"
                : "A repayment schedule appears after a loan is approved."}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
              {nextPayment ? `R ${nextPayment.totalAmount.toLocaleString("en-ZA")}` : "Nothing due"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {nextPayment ? `Due on ${new Date(nextPayment.dueDate).toLocaleDateString()}` : "No upcoming installment yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loanId ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                  <CircleCheckBig className="h-4 w-4" />
                  Active
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {isLoading ? "Loading repayment plan..." : "Repayment installments are loaded from the backend."}
                </p>
              </>
            ) : (
              <p className="text-sm text-[var(--muted)]">
                No active loan yet. Once a loan is approved, your repayment schedule will show up here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <p className="text-sm text-[var(--muted)]">
            Principal, interest, and total installment by month
          </p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loanId ? (
            schedule?.length ? (
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                    <th className="pb-3 font-medium">Due date</th>
                    <th className="pb-3 font-medium">Principal</th>
                    <th className="pb-3 font-medium">Interest</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.id} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="py-4 font-medium text-[var(--text-h)]">
                        {new Date(row.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-[var(--muted)]">R {row.principalAmount.toLocaleString("en-ZA")}</td>
                      <td className="py-4 text-[var(--muted)]">R {row.interestAmount.toLocaleString("en-ZA")}</td>
                      <td className="py-4 text-[var(--text-h)]">R {row.totalAmount.toLocaleString("en-ZA")}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--text-h)]">
                          <Clock3 className="h-3.5 w-3.5" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
                No repayment rows found yet. The schedule will appear once the backend generates it.
              </div>
            )
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]">
              No loan history yet. You’ll see the repayment plan after a loan is approved.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What the backend still needs</CardTitle>
          <p className="text-sm text-[var(--muted)]">
            This screen is fully live once at least one loan exists for the user
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-[var(--muted)]">
          <div className="flex items-start gap-3">
            <ReceiptText className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <p>If there is no loan yet, the message above is the expected user experience.</p>
          </div>
          <div className="flex items-start gap-3">
            <ReceiptText className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <p>Payment allocation logic still lives in the backend and will keep the schedule up to date.</p>
          </div>
          <div className="flex items-start gap-3">
            <ReceiptText className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <p>Penalty calculation is handled separately once late payments are created.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
