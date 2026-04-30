import { env } from "./env.js";

export const refreshCookieOptions = {
  httpOnly: true,
  secure: true, // MUST be true for SameSite=None
  sameSite: "none" as const, // Required for cross-origin (Vercel -> Render)
  path: "/api/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};