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
exports.InMemoryFollowsRepository = void 0;
class InMemoryFollowsRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.follows = [];
    }
    findByFollowers(follower, following) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = this.follows.find((follow) => follow.followerId === follower.cuid &&
                follow.followingId === following.cuid);
            return follow;
        });
    }
    findByCuid(cuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.follows.find((follow) => follow.cuid === cuid);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = {
                cuid: `${this.follows.length}`,
            };
            Object.assign(follow, data);
            this.follows.push(follow);
            const followerUser = yield this.usersRepository.findByCuid(data.follower.cuid);
            if (followerUser) {
                followerUser.following.push(data.following);
            }
            return follow;
        });
    }
    update(cuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePost = yield this.findByCuid(cuid);
            const updatedPost = Object.assign(Object.assign({}, updatePost), data);
            this.follows[updatePost.cuid] = updatedPost;
            return updatedPost;
        });
    }
}
exports.InMemoryFollowsRepository = InMemoryFollowsRepository;
//# sourceMappingURL=InMemoryFollowsRepository.js.map