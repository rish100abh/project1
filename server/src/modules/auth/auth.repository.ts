import { prisma } from "../../config/db.js";
import { hashToken } from "../../common/utils/hash.js";

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  createUser(data: { name: string; email: string; password: string }) {
    return prisma.user.create({
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  createRefreshToken(userId: string, refreshToken: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hashToken(refreshToken),
        expiresAt,
      },
    });
  },

  findRefreshToken(refreshToken: string) {
    return prisma.refreshToken.findUnique({
      where: {
        tokenHash: hashToken(refreshToken),
      },
      include: {
        user: true,
      },
    });
  },

  revokeRefreshToken(refreshToken: string) {
    return prisma.refreshToken.updateMany({
      where: {
        tokenHash: hashToken(refreshToken),
      },
      data: {
        revoked: true,
      },
    });
  },

  revokeAllUserRefreshTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  },
};