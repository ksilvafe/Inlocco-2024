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
exports.UsersRepository = void 0;
const database_1 = require("../../../config/database");
class UsersRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prisma.users.findUnique({
                where: {
                    email,
                },
            });
            return user;
        });
    }
    findByCuid(cuid, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prisma.users.findUnique({
                where: {
                    cuid: cuid,
                },
                include,
            });
            return user;
        });
    }
    findMany(query, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.prisma.users.findMany({
                where: query,
                include,
            });
            return users;
        });
    }
    findManyByCuids(cuids) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.prisma.users.findMany({
                where: {
                    cuid: {
                        in: cuids,
                    },
                },
            });
            return users;
        });
    }
    findByConfirmationCode(confirmationCode, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prisma.users.findUnique({
                where: {
                    confirmationCode,
                },
                include,
            });
            return user;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prisma.users.create({
                data: Object.assign(Object.assign({}, data), { profile: {
                        create: {
                            address: {
                                create: {},
                            },
                        },
                    } }),
            });
            return user;
        });
    }
    update(cuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield database_1.prisma.users.update({
                where: {
                    cuid,
                },
                data,
            });
            return updateUser;
        });
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map