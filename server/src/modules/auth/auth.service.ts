import { AppError } from "../../common/errors/AppError.js";
import { comparePassword, hashPassword } from "../../common/utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.js";
import { authRepository } from "./auth.repository.js";

const refreshExpiryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

export const authService = {
  async register(payload: { name: string; email: string; password: string }) {
    const existingUser = await authRepository.findUserByEmail(payload.email);

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await hashPassword(payload.password);
    const user = await authRepository.createUser({
      ...payload,
      password: hashedPassword,
    });

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = signRefreshToken({ userId: user.id });
    await authRepository.createRefreshToken(
      user.id,
      refreshToken,
      refreshExpiryDate()
    );

    return { user, accessToken, refreshToken };
  },

  async login(payload: { email: string; password: string }) {
    const user = await authRepository.findUserByEmail(payload.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(payload.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = signRefreshToken({ userId: user.id });

    await authRepository.createRefreshToken(
      user.id,
      refreshToken,
      refreshExpiryDate()
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken: string) {
    let payload: { userId: string };

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError("Invalid refresh token", 401);
    }

    const storedToken = await authRepository.findRefreshToken(refreshToken);

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      throw new AppError("Refresh token expired or revoked", 401);
    }

    await authRepository.revokeRefreshToken(refreshToken);

    const newRefreshToken = signRefreshToken({ userId: payload.userId });
    await authRepository.createRefreshToken(
      payload.userId,
      newRefreshToken,
      refreshExpiryDate()
    );

    const accessToken = signAccessToken({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(refreshToken: string) {
    await authRepository.revokeRefreshToken(refreshToken);
  },

  async me(userId: string) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },
};