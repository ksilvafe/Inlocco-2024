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
exports.PostCreationService = void 0;
function removerItensIndefinidos(objeto) {
    for (const chave in objeto) {
        if (objeto[chave] === undefined) {
            delete objeto[chave];
        }
    }
}
class PostCreationService {
    constructor(postsRepository, openstreetmapRepository) {
        this.postsRepository = postsRepository;
        this.openstreetmapRepository = openstreetmapRepository;
    }
    execute({ tripCuid, description, travelers = [], purpose = [], location, photos, videos, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                description,
                travelers,
                purpose,
                photos,
                videos,
                trip: tripCuid,
                location: location && JSON.parse(location),
            };
            data.location.coordinates = (_a = data === null || data === void 0 ? void 0 : data.location) === null || _a === void 0 ? void 0 : _a.coordinates.map(parseFloat);
            removerItensIndefinidos(data);
            const post = yield this.postsRepository.create(data);
            return post;
        });
    }
}
exports.PostCreationService = PostCreationService;
//# sourceMappingURL=PostCreationService.js.map