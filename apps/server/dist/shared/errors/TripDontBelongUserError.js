"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripDontBelongUserError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class TripDontBelongUserError extends AppError_1.AppError {
    constructor() {
        super("Viagem não pertence ao usuario!", 400);
    }
}
exports.TripDontBelongUserError = TripDontBelongUserError;
//# sourceMappingURL=TripDontBelongUserError.js.map