"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const InvalidTokenError_1 = require("../../errors/InvalidTokenError");
const TokenMissingError_1 = require("../../errors/TokenMissingError");
const jwtManager_1 = require("../jwtManager");
function ensureAuthenticated(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = new jwtManager_1.JwtManager();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new TokenMissingError_1.TokenMissingError();
        }
        const [, token] = authHeader.split(" ");
        try {
            const { cuid } = jwt.verify(token);
            request.user = { cuid };
            next();
        }
        catch (_a) {
            throw new InvalidTokenError_1.InvalidTokenError();
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
//# sourceMappingURL=ensureAuthenticated.js.map