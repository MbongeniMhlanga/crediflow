export interface UserDTO {
  id: number;
  name: string;
  surname: string;
  email: string;
  monthlyIncome?: number | null;
  employmentStatus?: string | null;
  roles: RoleDTO[];
}

export interface RoleDTO {
  id: number;
  roleName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: UserDTO;
}

export interface LoanProductDTO {
  id: number;
  name: string;
  interestRate: number;
  maxAmount: number;
  termMonths: number;
}

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LoanApplicationRequestDTO {
  productId: number;
  amountRequested: number;
  termMonths: number;
}

export interface LoanApplicationResponseDTO {
  id: number;
  userId: number;
  productId: number;
  productName: string;
  amountRequested: number;
  termMonths: number;
  status: ApplicationStatus;
  rejectionMessage: string | null;
  createdAt: string;
}

export interface CreditScoreDTO {
  id: number;
  userId: number;
  score: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  calculatedAt: string;
}

export interface CreditDecisionDTO {
  userId: number;
  applicationId: number;
  loanId: number | null;
  score: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  eligible: boolean;
  reason: string;
  monthlyIncome: number;
  monthlyInstallment: number;
}

export interface RepaymentScheduleDTO {
  id: number;
  loanId: number;
  installmentNumber: number;
  dueDate: string;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  status: "PENDING" | "PAID" | "OVERDUE";
}

export interface PaymentDTO {
  id: number;
  loanId: number;
  amount: number;
  paymentDate: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}

export interface PenaltyDTO {
  id: number;
  loanId: number;
  amount: number;
  reason: string;
  appliedDate: string;
}
