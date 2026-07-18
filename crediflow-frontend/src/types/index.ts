export interface UserDTO {
  id: number;
  name: string;
  surname: string;
  email: string;
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
