import { AppError } from "../../common/errors/AppError.js";
import { projectRepository } from "./project.repository.js";

export const projectService = {
  async create(userId: string, data: { title: string; description?: string }) {
    return projectRepository.create({
      ...data,
      ownerId: userId,
    });
  },

  async getAll(userId: string) {
    return projectRepository.findAllByOwner(userId);
  },

  async update(
    userId: string,
    projectId: string,
    data: { title?: string; description?: string }
  ) {
    const project = await projectRepository.findById(projectId);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    if (project.ownerId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return projectRepository.update(projectId, data);
  },

  async remove(userId: string, projectId: string) {
    const project = await projectRepository.findById(projectId);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    if (project.ownerId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    await projectRepository.remove(projectId);
  },
};