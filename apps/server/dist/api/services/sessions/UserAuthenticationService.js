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
exports.UserAuthenticationService = void 0;
const bcrypt_1 = require("bcrypt");
const IncorrectEmailOrPasswordError_1 = require("../../../shared/errors/IncorrectEmailOrPasswordError");
const jwtManager_1 = require("../../../shared/infra/jwtManager");
class UserAuthenticationService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = new jwtManager_1.JwtManager();
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new IncorrectEmailOrPasswordError_1.IncorrectEmailOrPasswordError();
            }
            const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new IncorrectEmailOrPasswordError_1.IncorrectEmailOrPasswordError();
            }
            const token = jwt.generate({ cuid: user.cuid });
            return {
                user: {
                    cuid: user.cuid,
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        });
    }
}
exports.UserAuthenticationService = UserAuthenticationService;
//# sourceMappingURL=UserAuthenticationService.js.map