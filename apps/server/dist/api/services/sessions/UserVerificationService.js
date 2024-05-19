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
exports.UserVerificationService = void 0;
const client_1 = require("@prisma/client");
const UserNotFoundError_1 = require("../../../shared/errors/UserNotFoundError");
class UserVerificationService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ confirmationCode }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByConfirmationCode(confirmationCode);
            if (!user) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            const data = { status: client_1.UserStatus.ACTIVE };
            const userUpdated = yield this.usersRepository.update(user.cuid, data);
            return userUpdated;
        });
    }
}
exports.UserVerificationService = UserVerificationService;
//# sourceMappingURL=UserVerificationService.js.map