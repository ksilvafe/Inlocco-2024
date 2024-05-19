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
exports.FollowCreationService = void 0;
const AlreadyFollowingError_1 = require("../../../shared/errors/AlreadyFollowingError");
const SelfFollowError_1 = require("../../../shared/errors/SelfFollowError");
const NotificationCreationService_1 = require("../notifications/NotificationCreationService");
const UserShowService_1 = require("../users/UserShowService");
class FollowCreationService {
    constructor(followsRepository, usersRepository, notificationsRepository) {
        this.followsRepository = followsRepository;
        this.usersRepository = usersRepository;
        this.notificationsRepository = notificationsRepository;
    }
    execute({ followerCuid, followingCuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const showUserProfile = new UserShowService_1.UserShowService(this.usersRepository);
            if (followerCuid === followingCuid) {
                throw new SelfFollowError_1.SelfFollowError();
            }
            const userFollower = yield showUserProfile.execute({ cuid: followerCuid });
            const userFollowing = yield showUserProfile.execute({
                cuid: followingCuid,
            });
            const isAlreadyFollowing = yield this.followsRepository.findByFollowers(userFollower, userFollowing);
            if (isAlreadyFollowing) {
                throw new AlreadyFollowingError_1.AlreadyFollowingError();
            }
            const follow = yield this.followsRepository.create({
                follower: userFollower,
                following: userFollowing,
            });
            const notificationCreationService = new NotificationCreationService_1.NotificationCreationService(this.notificationsRepository);
            const notificationData = {
                title: "Você tem um novo seguidor",
                message: `começou a seguir você.`,
                senderCuid: userFollower.cuid,
                recipientCuid: userFollowing.cuid,
            };
            yield notificationCreationService.execute(notificationData);
            return follow;
        });
    }
}
exports.FollowCreationService = FollowCreationService;
//# sourceMappingURL=FollowCreationService.js.map