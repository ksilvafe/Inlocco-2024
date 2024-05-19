"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostNotFoundError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class PostNotFoundError extends AppError_1.AppError {
    constructor() {
        super("Post não encontrado!", 404);
    }
}
exports.PostNotFoundError = PostNotFoundError;
//# sourceMappingURL=PostNotFoundError.js.map