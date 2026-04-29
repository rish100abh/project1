import type { Request, Response } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../common/utils/response.js";
import { projectService } from "./project.service.js";

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const project = await projectService.create(req.user.userId, req.body);

  return sendSuccess(res, "Project created successfully", project, 201);
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const projects = await projectService.getAll(req.user.userId);

  return sendSuccess(res, "Projects fetched successfully", projects);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const id = String(req.params.id);
  const project = await projectService.update(req.user.userId, id, req.body);

  return sendSuccess(res, "Project updated successfully", project);
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const id = String(req.params.id);
  await projectService.remove(req.user.userId, id);

  return sendSuccess(res, "Project deleted successfully");
});