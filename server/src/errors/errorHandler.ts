import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Log full error in development to aid debugging
  // eslint-disable-next-line no-console
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}