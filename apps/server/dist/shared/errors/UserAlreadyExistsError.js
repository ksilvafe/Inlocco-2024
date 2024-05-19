"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class UserAlreadyExistsError extends AppError_1.AppError {
    constructor() {
        super("Usuário já existe");
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
//# sourceMappingURL=UserAlreadyExistsError.js.map