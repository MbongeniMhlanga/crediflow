import { CalendarDays, CircleCheckBig, Clock3, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { repaymentScheduleMock } from "../lib/lending-mocks";

export const RepaymentSchedulePage = () => {
  const totalDue = repaymentScheduleMock.reduce((sum, row) => sum + row.total, 0);

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
          This is the screen the backend should power once a schedule generator exists.
          Right now it is a polished front-end view using the same EMI logic your loan model already implies.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
              R {totalDue.toLocaleString("en-ZA")}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">Projected total over the remaining term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">R 4,560</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Due on Aug 01, 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
              <CircleCheckBig className="h-4 w-4" />
              On track
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              No missed installments are reflected in the current mock schedule.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <p className="text-sm text-[var(--muted)]">Principal, interest, and total installment by month</p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
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
              {repaymentScheduleMock.map((row) => (
                <tr key={row.dueDate} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="py-4 font-medium text-[var(--text-h)]">{row.dueDate}</td>
                  <td className="py-4 text-[var(--muted)]">R {row.principal.toLocaleString("en-ZA")}</td>
                  <td className="py-4 text-[var(--muted)]">R {row.interest.toLocaleString("en-ZA")}</td>
                  <td className="py-4 text-[var(--text-h)]">R {row.total.toLocaleString("en-ZA")}</td>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What the backend still needs</CardTitle>
          <p className="text-sm text-[var(--muted)]">This screen becomes real once the schedule API exists</p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-[var(--muted)]">
          <div className="flex items-start gap-3">
            <ReceiptText className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <p>Loan service endpoint for repayment schedule generation.</p>
          </div>
          <div className="flex items-start gap-3">
            <ReceiptText className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <p>Payment allocation logic for splitting each installment into principal and interest.</p>
          </div>
          <div className="flex items-start gap-3">
            <ReceiptText className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <p>Penalty calculation for overdue or partial payments.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
