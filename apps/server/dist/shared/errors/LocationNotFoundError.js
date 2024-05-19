"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationNotFoundError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class LocationNotFoundError extends AppError_1.AppError {
    constructor() {
        super("Localiza não encontrado!", 404);
    }
}
exports.LocationNotFoundError = LocationNotFoundError;
//# sourceMappingURL=LocationNotFoundError.js.map