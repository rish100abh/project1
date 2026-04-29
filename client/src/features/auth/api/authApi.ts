import { api } from "../../../lib/axios";
import type { ApiResponse } from "../../../types/api";
import type { User } from "../../../types";
import type { LoginFormData, SignupFormData } from "../schemas/authSchema";

export const authApi = {
  signup: async (payload: SignupFormData) => {
    const { data } = await api.post<
      ApiResponse<{ user: User; accessToken: string }>
    >("/auth/register", payload);
    return data;
  },

  login: async (payload: LoginFormData) => {
    const { data } = await api.post<
      ApiResponse<{ user: User; accessToken: string }>
    >("/auth/login", payload);
    return data;
  },

  me: async () => {
    const { data } = await api.get<ApiResponse<User>>("/auth/me");
    return data;
  },

  refresh: async () => {
    const { data } = await api.post<ApiResponse<{ accessToken: string }>>(
      "/auth/refresh"
    );
    return data;
  },

  logout: async () => {
    const { data } = await api.post<ApiResponse<null>>("/auth/logout");
    return data;
  },
};