"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectEmailOrPasswordError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class IncorrectEmailOrPasswordError extends AppError_1.AppError {
    constructor() {
        super("Email ou Senha inválido", 401);
    }
}
exports.IncorrectEmailOrPasswordError = IncorrectEmailOrPasswordError;
//# sourceMappingURL=IncorrectEmailOrPasswordError.js.map