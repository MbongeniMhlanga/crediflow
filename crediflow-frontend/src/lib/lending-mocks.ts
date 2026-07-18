export interface CreditFactor {
  label: string;
  value: string;
  impact: "positive" | "neutral" | "negative";
}

export interface RepaymentRow {
  dueDate: string;
  principal: number;
  interest: number;
  total: number;
  status: "Paid" | "Due" | "Overdue";
}

export interface PaymentRow {
  reference: string;
  date: string;
  amount: number;
  channel: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface PenaltyRow {
  reason: string;
  amount: number;
  appliedOn: string;
}

export const creditScoreMock = {
  score: 728,
  band: "Good",
  riskLevel: "LOW",
  updatedAt: "July 18, 2026",
  breakdown: [
    { label: "Payment history", value: 32 },
    { label: "Debt utilization", value: 24 },
    { label: "Income stability", value: 18 },
    { label: "Recent inquiries", value: 14 },
    { label: "Loan diversity", value: 10 },
  ],
  factors: [
    { label: "On-time repayments", value: "Strong", impact: "positive" },
    { label: "Low outstanding balance", value: "Healthy", impact: "positive" },
    { label: "One recent inquiry", value: "Minor impact", impact: "neutral" },
    { label: "No missed payments", value: "Clean", impact: "positive" },
  ] satisfies CreditFactor[],
};

export const repaymentScheduleMock: RepaymentRow[] = [
  { dueDate: "Aug 01, 2026", principal: 4200, interest: 360, total: 4560, status: "Due" },
  { dueDate: "Sep 01, 2026", principal: 4220, interest: 340, total: 4560, status: "Due" },
  { dueDate: "Oct 01, 2026", principal: 4241, interest: 319, total: 4560, status: "Due" },
  { dueDate: "Nov 01, 2026", principal: 4262, interest: 298, total: 4560, status: "Due" },
  { dueDate: "Dec 01, 2026", principal: 4283, interest: 277, total: 4560, status: "Due" },
  { dueDate: "Jan 01, 2027", principal: 4304, interest: 256, total: 4560, status: "Due" },
];

export const paymentHistoryMock: PaymentRow[] = [
  { reference: "PMT-88021", date: "Jul 01, 2026", amount: 4560, channel: "Bank transfer", status: "Completed" },
  { reference: "PMT-87974", date: "Jun 01, 2026", amount: 4560, channel: "Debit order", status: "Completed" },
  { reference: "PMT-87810", date: "May 01, 2026", amount: 4560, channel: "Bank transfer", status: "Completed" },
  { reference: "PMT-87683", date: "Apr 01, 2026", amount: 4560, channel: "Debit order", status: "Pending" },
];

export const penaltyMock: PenaltyRow[] = [
  { reason: "Late repayment grace period exceeded", amount: 150, appliedOn: "Jun 04, 2026" },
];
