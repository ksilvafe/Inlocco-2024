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
exports.SessionController = void 0;
const UsersRepository_1 = require("../repositories/users/UsersRepository");
const UserAuthenticationService_1 = require("../services/sessions/UserAuthenticationService");
const UserPasswordRecoveryRequestService_1 = require("../services/sessions/UserPasswordRecoveryRequestService");
const UserPasswordRecoveryService_1 = require("../services/sessions/UserPasswordRecoveryService");
const UserVerificationRequestService_1 = require("../services/sessions/UserVerificationRequestService");
const UserVerificationService_1 = require("../services/sessions/UserVerificationService");
class SessionController {
    authenticate(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = request.headers.authorization;
            const [, hash] = authorization.split(" ");
            const [email, password] = Buffer.from(hash, "base64").toString().split(":");
            const usersRepository = new UsersRepository_1.UsersRepository();
            const authenticateUser = new UserAuthenticationService_1.UserAuthenticationService(usersRepository);
            const { user, token } = yield authenticateUser.execute({
                email,
                password,
            });
            return response.json({ user, token });
        });
    }
    requestUserVerification(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = request.body;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const userVerificationRequestService = new UserVerificationRequestService_1.UserVerificationRequestService(usersRepository);
            const userConfirmCode = yield userVerificationRequestService.execute({
                email,
            });
            return response.json(userConfirmCode);
        });
    }
    verifyUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { confirmationCode } = request.params;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const userVerificationService = new UserVerificationService_1.UserVerificationService(usersRepository);
            yield userVerificationService.execute({
                confirmationCode,
            });
            return response.status(204).send();
        });
    }
    requestUserPasswordRecovery(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = request.body;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const userPasswordRecoveryRequestService = new UserPasswordRecoveryRequestService_1.UserPasswordRecoveryRequestService(usersRepository);
            const userPasswordRecoveryRequest = yield userPasswordRecoveryRequestService.execute({
                email,
            });
            return response.json(userPasswordRecoveryRequest);
        });
    }
    recoverUserPassword(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid, token, password } = request.body;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const userPasswordRecoveryService = new UserPasswordRecoveryService_1.UserPasswordRecoveryService(usersRepository);
            yield userPasswordRecoveryService.execute({ cuid, token, password });
            return response.status(204).send();
        });
    }
}
exports.SessionController = SessionController;
//# sourceMappingURL=SessionController.js.map