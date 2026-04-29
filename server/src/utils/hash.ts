import bcrypt from "bcryptjs";
import crypto from "crypto";
import { env } from "../config/env.js";

export const hashPassword = async (value: string) => {
  return bcrypt.hash(value, env.bcryptSaltRounds);
};

export const comparePassword = async (value: string, hashed: string) => {
  return bcrypt.compare(value, hashed);
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};