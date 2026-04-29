import { env } from "./env.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://project1-client-pq4r.vercel.app",
];

export const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};