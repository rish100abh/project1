import type { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../common/utils/response.js";

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  return sendSuccess(res, "Users endpoint working", []);
});