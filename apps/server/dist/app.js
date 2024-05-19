"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const pino_http_1 = __importDefault(require("pino-http"));
const routes_1 = __importDefault(require("./api/routes"));
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./config/logger"));
const errorHandler_1 = require("./shared/infra/middlwares/errorHandler");
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: env_1.default.rateLimit.windowMs,
    max: env_1.default.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: true,
        message: "Too many requests, please try again later.",
        status: 429,
    },
});
const logger = (0, pino_http_1.default)({
    logger: logger_1.default,
    customLogLevel: function (req, res) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return "warn";
        }
        else if (res.statusCode >= 500) {
            return "error";
        }
        return "info";
    },
});
app.use((0, helmet_1.default)());
app.use(limiter);
app.use((0, cors_1.default)());
app.use(logger);
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "..", "assets")));
app.use("/api/v1", routes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map