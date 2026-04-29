import { api } from "../../../lib/axios";
import type { ApiResponse } from "../../../types/api";
import type { Project } from "../../../types";

export const projectApi = {
  getProjects: async () => {
    const { data } = await api.get<ApiResponse<Project[]>>("/projects");
    return data;
  },

  createProject: async (payload: {
    title: string;
    description?: string;
  }) => {
    const { data } = await api.post<ApiResponse<Project>>("/projects", payload);
    return data;
  },

  updateProject: async (
    id: string,
    payload: { title?: string; description?: string }
  ) => {
    const { data } = await api.patch<ApiResponse<Project>>(
      `/projects/${id}`,
      payload
    );
    return data;
  },

  deleteProject: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/projects/${id}`);
    return data;
  },
};