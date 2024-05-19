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
exports.PostShowService = void 0;
const PostNotFoundError_1 = require("../../../shared/errors/PostNotFoundError");
class PostShowService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    execute({ cuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postsRepository.findByCuid(cuid, {
                saves: true,
                trip: true,
                location: true,
                travelers: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            });
            if (!post) {
                throw new PostNotFoundError_1.PostNotFoundError();
            }
            return post;
        });
    }
}
exports.PostShowService = PostShowService;
//# sourceMappingURL=PostShowService.js.map