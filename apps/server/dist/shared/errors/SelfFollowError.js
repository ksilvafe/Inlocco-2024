"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfFollowError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class SelfFollowError extends AppError_1.AppError {
    constructor() {
        super("Não é permitido seguir a si mesmo!", 400);
    }
}
exports.SelfFollowError = SelfFollowError;
//# sourceMappingURL=SelfFollowError.js.map