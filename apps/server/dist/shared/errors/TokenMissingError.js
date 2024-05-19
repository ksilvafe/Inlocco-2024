"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMissingError = void 0;
const AppError_1 = require("./AppError");
class TokenMissingError extends AppError_1.AppError {
    constructor() {
        super("Nenhum token enviado!", 401);
    }
}
exports.TokenMissingError = TokenMissingError;
//# sourceMappingURL=TokenMissingError.js.map