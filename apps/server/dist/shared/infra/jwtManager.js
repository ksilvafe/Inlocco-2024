"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../config/auth"));
class JwtManager {
    constructor() {
        const { secret, expiresIn } = auth_1.default.jwt;
        this.SECRET_KEY = secret;
        this.EXPIRES_IN = expiresIn;
    }
    generate(params = {}) {
        return jsonwebtoken_1.default.sign(params, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN });
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, this.SECRET_KEY);
    }
}
exports.JwtManager = JwtManager;
//# sourceMappingURL=jwtManager.js.map