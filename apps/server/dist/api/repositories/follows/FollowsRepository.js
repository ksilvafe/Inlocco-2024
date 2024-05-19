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
exports.FollowsRepository = void 0;
const database_1 = require("../../../config/database");
class FollowsRepository {
    findByFollowers(follower, following) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield database_1.prisma.follows.findFirst({
                where: {
                    followerCuid: {
                        equals: follower.cuid,
                    },
                    followingCuid: {
                        equals: following.cuid,
                    },
                },
            });
            return follow;
        });
    }
    findByCuid(cuid, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield database_1.prisma.follows.findUnique({
                where: {
                    cuid,
                },
                include,
            });
            return follow;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield database_1.prisma.follows.create({
                data: {
                    follower: { connect: { cuid: data.follower.cuid } },
                    following: { connect: { cuid: data.following.cuid } },
                },
            });
            return follow;
        });
    }
    update(cuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePost = yield database_1.prisma.follows.update({
                where: {
                    cuid,
                },
                data,
            });
            return updatePost;
        });
    }
}
exports.FollowsRepository = FollowsRepository;
//# sourceMappingURL=FollowsRepository.js.map