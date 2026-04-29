import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type AccessPayload = {
  userId: string;
  email: string;
  role: string;
};

type RefreshPayload = {
  userId: string;
};

export const signAccessToken = (payload: AccessPayload) => {
  const options: any = { expiresIn: env.accessTokenExpiresIn };
  return jwt.sign(payload as any, env.jwtAccessSecret as any, options);
};

export const signRefreshToken = (payload: RefreshPayload) => {
  const options: any = { expiresIn: env.refreshTokenExpiresIn };
  return jwt.sign(payload as any, env.jwtRefreshSecret as any, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtAccessSecret) as AccessPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.jwtRefreshSecret) as RefreshPayload;
};