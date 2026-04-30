import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsOptions } from "./config/cors.js";
import "./config/env.js";
import routes from "./routes/index.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import { notFound } from "./common/middlewares/notFound.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors(corsOptions));
app.options("/{*splat}", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;