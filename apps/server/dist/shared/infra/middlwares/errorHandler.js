"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../errors/AppError");
function errorHandler(err, request, response, next) {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 500,
        message: err.stack,
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map