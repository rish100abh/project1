import cors from "cors";
import { env } from "./env";

export const corsOptions = {
  origin: env.clientUrl,
  credentials: true,
};