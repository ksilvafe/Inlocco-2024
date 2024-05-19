"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyFollowingError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class AlreadyFollowingError extends AppError_1.AppError {
    constructor() {
        super("Você já está seguindo este usuário!", 400);
    }
}
exports.AlreadyFollowingError = AlreadyFollowingError;
//# sourceMappingURL=AlreadyFollowingError.js.map