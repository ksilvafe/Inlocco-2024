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
exports.UserCreationService = void 0;
const bcrypt_1 = require("bcrypt");
const env_1 = __importDefault(require("../../../config/env"));
const UserAlreadyExistsError_1 = require("../../../shared/errors/UserAlreadyExistsError");
const jwtManager_1 = require("../../../shared/infra/jwtManager");
class UserCreationService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ username, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = new jwtManager_1.JwtManager();
            const userAlreadyExists = yield this.usersRepository.findByEmail(email);
            if (userAlreadyExists) {
                throw new UserAlreadyExistsError_1.UserAlreadyExistsError();
            }
            const passwordHash = yield (0, bcrypt_1.hash)(password, env_1.default.salt);
            const confirmationCode = jwt.generate({ email });
            const user = yield this.usersRepository.create({
                email,
                username,
                password: passwordHash,
                confirmationCode,
            });
            return user;
        });
    }
}
exports.UserCreationService = UserCreationService;
//# sourceMappingURL=UserCreationService.js.map