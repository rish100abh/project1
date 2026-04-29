import type { Request, Response } from "express";
import { refreshCookieOptions } from "../../config/cookie.js";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../common/utils/response.js";
import { AppError } from "../../common/errors/AppError.js";
import { authService } from "./auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

  return sendSuccess(
    res,
    "User registered successfully",
    {
      user: result.user,
      accessToken: result.accessToken,
    },
    201
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

  return sendSuccess(res, "Login successful", {
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token not found", 401);
  }

  try {
    const result = await authService.refresh(refreshToken);
    res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

    return sendSuccess(res, "Token refreshed successfully", {
      accessToken: result.accessToken,
    });
  } catch (err) {
    // Clear refresh cookie on any refresh failure so the client stops retrying
    res.clearCookie("refreshToken", {
      ...refreshCookieOptions,
      maxAge: undefined,
    });

    throw err;
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("refreshToken", {
    ...refreshCookieOptions,
    maxAge: undefined,
  });

  return sendSuccess(res, "Logout successful");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await authService.me(req.user.userId);

  return sendSuccess(res, "User fetched successfully", user);
});