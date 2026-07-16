import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { LoanProductDTO, LoanApplicationRequestDTO, LoanApplicationResponseDTO } from "../types";

export const useLoanProducts = () => {
  return useQuery({
    queryKey: ["loanProducts"],
    queryFn: async () => {
      const response = await api.get<LoanProductDTO[]>("/products");
      return response.data;
    },
  });
};

export const useCreateLoanProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<LoanProductDTO, "id">) => {
      const response = await api.post<LoanProductDTO>("/products", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanProducts"] });
    },
  });
};

export const useMyLoanApplications = () => {
  return useQuery({
    queryKey: ["myLoanApplications"],
    queryFn: async () => {
      const response = await api.get<LoanApplicationResponseDTO[]>("/applications/my");
      return response.data;
    },
  });
};

export const useAllLoanApplications = () => {
  return useQuery({
    queryKey: ["allLoanApplications"],
    queryFn: async () => {
      const response = await api.get<LoanApplicationResponseDTO[]>("/applications");
      return response.data;
    },
  });
};

export const useCreateLoanApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoanApplicationRequestDTO) => {
      const response = await api.post<LoanApplicationResponseDTO>("/applications", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLoanApplications"] });
    },
  });
};

export const useApproveApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.put<LoanApplicationResponseDTO>(`/applications/${id}/approve`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLoanApplications"] });
      queryClient.invalidateQueries({ queryKey: ["myLoanApplications"] });
    },
  });
};

export const useRejectApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
      const response = await api.put<LoanApplicationResponseDTO>(`/applications/${id}/reject`, { reason });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLoanApplications"] });
      queryClient.invalidateQueries({ queryKey: ["myLoanApplications"] });
    },
  });
};