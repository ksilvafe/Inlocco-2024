"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDontBelongUserError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class PostDontBelongUserError extends AppError_1.AppError {
    constructor() {
        super("Post não pertence ao usuario!", 400);
    }
}
exports.PostDontBelongUserError = PostDontBelongUserError;
//# sourceMappingURL=PostDontBelongUserError.js.map