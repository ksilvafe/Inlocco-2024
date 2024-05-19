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
exports.InMemoryUsersRepository = void 0;
const client_1 = require("@prisma/client");
class InMemoryUsersRepository {
    constructor() {
        this.users = [];
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.email === email);
        });
    }
    findByCuid(cuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.cuid === cuid);
        });
    }
    findMany(query, include) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    findManyByCuids(cuids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.filter((user) => cuids.includes(user.cuid));
        });
    }
    findByConfirmationCode(confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.confirmationCode === confirmationCode);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                cuid: `${this.users.length}`,
                confirmationCode: this.users.length,
                status: client_1.UserStatus.PENDING,
                followers: [],
                following: [],
                recipientNotifications: [],
            };
            Object.assign(user, data);
            this.users.push(user);
            return user;
        });
    }
    update(cuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield this.findByCuid(cuid);
            const updatedUser = Object.assign(Object.assign({}, updateUser), data);
            this.users[updateUser.cuid] = updatedUser;
            return updatedUser;
        });
    }
}
exports.InMemoryUsersRepository = InMemoryUsersRepository;
//# sourceMappingURL=InMemoryUsersRepository.js.map