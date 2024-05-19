"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const AppError_1 = require("./AppError");
class InvalidTokenError extends AppError_1.AppError {
    constructor() {
        super("Token inválido ou expirado!", 401);
    }
}
exports.InvalidTokenError = InvalidTokenError;
//# sourceMappingURL=InvalidTokenError.js.map