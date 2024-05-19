import "express-async-errors";

import cors from "cors";
import express from "express";
import RateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import pinoHttp from "pino-http";

import routes from "./api/routes";
import env from "./config/env";
import logConfig from "./config/logger";
import { errorHandler } from "./shared/infra/middlwares/errorHandler";

const app = express();

const limiter = RateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: true,
    message: "Too many requests, please try again later.",
    status: 429,
  },
});

const logger = pinoHttp({
  logger: logConfig, // Define a custom logger level
  customLogLevel: function (req, res) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500) {
      return "error";
    }
    return "info";
  },
});

app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(logger);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;
