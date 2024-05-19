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
exports.UserPasswordRecoveryRequestService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = __importDefault(require("../../../config/env"));
const UserNotFoundError_1 = require("../../../shared/errors/UserNotFoundError");
class UserPasswordRecoveryRequestService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            const resetToken = crypto_1.default.randomBytes(32).toString("hex");
            const hash = yield bcrypt_1.default.hash(resetToken, env_1.default.salt);
            yield this.usersRepository.update(user.cuid, {
                resetToken: hash,
            });
            const recoveryLink = `${env_1.default.baseUrl}/login/redefinir-senha/?token=${resetToken}&id=${user.cuid}`;
            return {
                cuid: user.cuid,
                email: email,
                resetToken,
                recoveryLink,
            };
        });
    }
}
exports.UserPasswordRecoveryRequestService = UserPasswordRecoveryRequestService;
//# sourceMappingURL=UserPasswordRecoveryRequestService.js.map