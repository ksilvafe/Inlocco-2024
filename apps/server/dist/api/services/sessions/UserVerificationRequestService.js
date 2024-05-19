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
exports.UserVerificationRequestService = void 0;
const env_1 = __importDefault(require("../../../config/env"));
const UserNotFoundError_1 = require("../../../shared/errors/UserNotFoundError");
class UserVerificationRequestService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            const confirmationLink = `${env_1.default.baseUrl}/api/v1/auth/confirm/${user.confirmationCode}`;
            return {
                cuid: user.cuid,
                email: user.email,
                confirmationCode: user.confirmationCode,
                confirmationLink,
            };
        });
    }
}
exports.UserVerificationRequestService = UserVerificationRequestService;
//# sourceMappingURL=UserVerificationRequestService.js.map