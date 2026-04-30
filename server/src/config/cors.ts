import { env } from "./env.js";

const allowedOrigins = [
  env.clientUrl,                 // production
  "http://localhost:5173",       // dev (vite)
  "https://project1-client-59pj-705aisjet-rishabh-yadavs-projects-02177f0b.vercel.app"       // optional
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};