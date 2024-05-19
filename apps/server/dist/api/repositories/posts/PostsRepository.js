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
exports.PostsRepository = void 0;
const database_1 = require("../../../config/database");
class PostsRepository {
    findByCuid(cuid, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield database_1.prisma.posts.findUnique({
                where: {
                    cuid: cuid,
                },
                include,
            });
            return post;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const travalersData = data.travelers.map((travaler) => {
                return {
                    userCuid: travaler,
                };
            });
            const post = yield database_1.prisma.posts.create({
                data: Object.assign(Object.assign({}, data), { travelers: {
                        createMany: {
                            data: travalersData,
                            skipDuplicates: true,
                        },
                    }, trip: data.trip && {
                        connect: {
                            cuid: data.trip,
                        },
                    }, location: data.location && {
                        connectOrCreate: {
                            where: {
                                coordinates: data.location.coordinates,
                            },
                            create: data.location,
                        },
                    } }),
            });
            return post;
        });
    }
    update(cuid, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const updatePost = yield database_1.prisma.posts.update({
                where: {
                    cuid,
                },
                data: Object.assign(Object.assign({}, data), { trip: (data === null || data === void 0 ? void 0 : data.trip) && { connect: { cuid: (_a = data === null || data === void 0 ? void 0 : data.trip) === null || _a === void 0 ? void 0 : _a.cuid } } }),
                include: {
                    travelers: true,
                },
            });
            return updatePost;
        });
    }
    findMany(cuids) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield database_1.prisma.posts.findMany({
                where: {
                    cuid: {
                        in: cuids,
                    },
                },
                include: {
                    travelers: {
                        include: {
                            user: {
                                include: {
                                    profile: {
                                        include: {
                                            address: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    location: true,
                },
            });
            return posts;
        });
    }
}
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=PostsRepository.js.map