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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordRecoveryService = void 0;
const bcrypt_1 = require("bcrypt");
const env_1 = __importDefault(require("../../../config/env"));
const InvalidTokenError_1 = require("../../../shared/errors/InvalidTokenError");
const UserNotFoundError_1 = require("../../../shared/errors/UserNotFoundError");
class UserPasswordRecoveryService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ cuid, token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByCuid(cuid);
            if (!user) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            if (!user.resetToken) {
                throw new InvalidTokenError_1.InvalidTokenError();
            }
            const tokenIsValid = yield (0, bcrypt_1.compare)(token, user.resetToken);
            if (!tokenIsValid) {
                throw new InvalidTokenError_1.InvalidTokenError();
            }
            const passwordHash = yield (0, bcrypt_1.hash)(password, env_1.default.salt);
            const data = { password: passwordHash, resetToken: "" };
            const userUpdated = yield this.usersRepository.update(user.cuid, data);
            return userUpdated;
        });
    }
}
exports.UserPasswordRecoveryService = UserPasswordRecoveryService;
//# sourceMappingURL=UserPasswordRecoveryService.js.map