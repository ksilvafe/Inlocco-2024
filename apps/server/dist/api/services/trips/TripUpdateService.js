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
exports.TripUpdateService = void 0;
const EndDateIsEarlierStartDateError_1 = require("../../../shared/errors/EndDateIsEarlierStartDateError");
const PostDontBelongUserError_1 = require("../../../shared/errors/PostDontBelongUserError");
const SomeTravelerNotFoundError_1 = require("../../../shared/errors/SomeTravelerNotFoundError");
const PostListService_1 = require("../posts/PostListService");
class TripUpdateService {
    constructor(tripsRepository, usersRepository, postsRepository) {
        this.tripsRepository = tripsRepository;
        this.usersRepository = usersRepository;
        this.postsRepository = postsRepository;
    }
    execute({ name, description, travelers, purpose, startDate, endDate, posts, cuid, }) {
        return __awaiter(this, void 0, void 0, function* () {
            //todo os travelers devem existir
            const travelersUsers = yield this.usersRepository.findManyByCuids(travelers);
            const someTravelerDoesntExist = travelers.length !== travelersUsers.length;
            if (someTravelerDoesntExist) {
                throw new SomeTravelerNotFoundError_1.SomeTravelerNotFoundError();
            }
            //startDate deve ser anterior a endDate
            if (startDate && endDate) {
                const diffDates = new Date(endDate).getTime() - new Date(startDate).getTime();
                const endDateIsEarlierStartDate = diffDates < 0;
                if (endDateIsEarlierStartDate) {
                    throw new EndDateIsEarlierStartDateError_1.EndDateIsEarlierStartDateError();
                }
            }
            // postagem deve ser do usuario
            const postListService = new PostListService_1.PostListService(this.postsRepository);
            const postsList = yield postListService.execute({ postCuids: posts });
            const postsDontBelongUser = postsList.find((post) => post.users[0].cuid !== travelers[0]);
            if (postsDontBelongUser) {
                throw new PostDontBelongUserError_1.PostDontBelongUserError();
            }
            const data = {
                name,
                description,
                travelers,
                purpose,
                startDate,
                endDate,
                posts,
            };
            const trip = yield this.tripsRepository.update(cuid, data);
            return trip;
        });
    }
}
exports.TripUpdateService = TripUpdateService;
//# sourceMappingURL=TripUpdateService.js.map