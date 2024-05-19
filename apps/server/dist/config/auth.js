"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = __importDefault(require("./env"));
dotenv_1.default.config();
exports.default = {
    jwt: {
        secret: env_1.default.secretKey,
        expiresIn: env_1.default.expiresIn,
    },
};
//# sourceMappingURL=auth.js.map