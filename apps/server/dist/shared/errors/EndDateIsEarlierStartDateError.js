"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndDateIsEarlierStartDateError = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class EndDateIsEarlierStartDateError extends AppError_1.AppError {
    constructor() {
        super("Data final é anterior a Data inicial", 400);
    }
}
exports.EndDateIsEarlierStartDateError = EndDateIsEarlierStartDateError;
//# sourceMappingURL=EndDateIsEarlierStartDateError.js.map