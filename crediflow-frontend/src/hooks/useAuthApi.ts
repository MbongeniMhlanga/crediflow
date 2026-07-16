import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import type  { AuthResponse, LoginRequest, RegisterRequest } from "../types";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post<AuthResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
};

export const useRegister = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await api.post<AuthResponse>("/auth/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
};