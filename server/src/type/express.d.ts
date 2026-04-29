import type { Role } from "../../../../../packages/shared/src/constants/roles.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: Role;
      };
    }
  }
}

export {};