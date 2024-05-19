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
exports.FollowController = void 0;
const FollowsRepository_1 = require("../repositories/follows/FollowsRepository");
const NotificationsRepository_1 = require("../repositories/notifications/NotificationsRepository");
const UsersRepository_1 = require("../repositories/users/UsersRepository");
const FollowCreationService_1 = require("../services/follows/FollowCreationService");
const FollowersShowService_1 = require("../services/follows/FollowersShowService");
const FollowingShowService_1 = require("../services/follows/FollowingShowService");
const FollowView_1 = require("../views/FollowView");
class FollowController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { following } = request.body;
            const { cuid } = request.user;
            const followsRepository = new FollowsRepository_1.FollowsRepository();
            const usersRepository = new UsersRepository_1.UsersRepository();
            const notificationsRepository = new NotificationsRepository_1.NotificationsRepository();
            const createFollow = new FollowCreationService_1.FollowCreationService(followsRepository, usersRepository, notificationsRepository);
            const data = {
                followerCuid: cuid,
                followingCuid: following,
            };
            yield createFollow.execute(data);
            return response.status(201).send();
        });
    }
    followers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const followersShowService = new FollowersShowService_1.FollowersShowService(usersRepository);
            const followers = yield followersShowService.execute({ cuid });
            return response.json(followers);
        });
    }
    following(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const followingShowService = new FollowingShowService_1.FollowingShowService(usersRepository);
            const following = yield followingShowService.execute({ cuid });
            const followView = FollowView_1.FollowView.renderMany(following);
            return response.json(followView);
        });
    }
}
exports.FollowController = FollowController;
//# sourceMappingURL=FollowController.js.map