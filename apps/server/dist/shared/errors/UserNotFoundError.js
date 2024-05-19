"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class UserNotFoundError extends AppError_1.AppError {
    constructor() {
        super("Usuário não encontrado!", 404);
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=UserNotFoundError.js.map