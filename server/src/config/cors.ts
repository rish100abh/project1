import { env } from "./env.js";

const allowedOrigins = [
  "http://localhost:5173",
  env.clientUrl,
  "https://project1-client-59jp.vercel.app",
   "http://localhost:3000",
  "https://project1-client-59pj-3knz1u0ou-rishabh-yadavs-projects-02177f0b.vercel.app",
].filter(Boolean);

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};