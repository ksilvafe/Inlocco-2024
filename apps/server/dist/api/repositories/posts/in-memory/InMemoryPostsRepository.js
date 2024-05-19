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
exports.InMemoryPostsRepository = void 0;
class InMemoryPostsRepository {
    constructor() {
        this.posts = [];
    }
    findByCuid(cuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.posts.find((post) => post.cuid === cuid);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = {
                cuid: `${this.posts.length}`,
                likes: [],
                users: [{ cuid: data.users }],
            };
            Object.assign(data, post);
            this.posts.push(data);
            return post;
        });
    }
    update(cuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePost = yield this.findByCuid(cuid);
            const updatedPost = Object.assign(Object.assign({}, updatePost), data);
            this.posts[updatePost.cuid] = updatedPost;
            return updatedPost;
        });
    }
    findMany(cuids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cuids) {
                return this.posts.filter((post) => cuids === null || cuids === void 0 ? void 0 : cuids.includes(post.cuid));
            }
            return this.posts;
        });
    }
}
exports.InMemoryPostsRepository = InMemoryPostsRepository;
//# sourceMappingURL=InMemoryPostsRepository.js.map