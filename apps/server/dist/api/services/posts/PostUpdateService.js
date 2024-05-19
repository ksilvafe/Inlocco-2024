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
exports.PostUpdateService = void 0;
class PostUpdateService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    execute({ tripCuid, description, travelers = [], purpose = [], location, photos, videos, cuid, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                tripCuid,
                description,
                travelers,
                purpose,
                location,
                photos,
                videos,
            };
            const post = yield this.postsRepository.update(cuid, data);
            return post;
        });
    }
}
exports.PostUpdateService = PostUpdateService;
//# sourceMappingURL=PostUpdateService.js.map