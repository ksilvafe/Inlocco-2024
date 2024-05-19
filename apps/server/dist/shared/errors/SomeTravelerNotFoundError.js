"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeTravelerNotFoundError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class SomeTravelerNotFoundError extends AppError_1.AppError {
    constructor() {
        super("Algum viajante não foi encontrado!", 404);
    }
}
exports.SomeTravelerNotFoundError = SomeTravelerNotFoundError;
//# sourceMappingURL=SomeTravelerNotFoundError.js.map