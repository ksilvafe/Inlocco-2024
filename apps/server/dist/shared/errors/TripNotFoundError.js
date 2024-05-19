"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripNotFoundError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class TripNotFoundError extends AppError_1.AppError {
    constructor() {
        super("Viagem não encontrada!", 404);
    }
}
exports.TripNotFoundError = TripNotFoundError;
//# sourceMappingURL=TripNotFoundError.js.map