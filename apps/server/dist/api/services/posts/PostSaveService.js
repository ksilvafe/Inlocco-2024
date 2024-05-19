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
exports.PostSaveService = void 0;
const NotificationCreationService_1 = require("../notifications/NotificationCreationService");
const UserShowService_1 = require("../users/UserShowService");
const PostShowService_1 = require("./PostShowService");
class PostSaveService {
    constructor(postsRepository, usersRepository, notificationsRepository) {
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
        this.notificationsRepository = notificationsRepository;
    }
    execute({ postCuid, userCuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const postShowService = new PostShowService_1.PostShowService(this.postsRepository);
            const post = yield postShowService.execute({ cuid: postCuid });
            const userShowService = new UserShowService_1.UserShowService(this.usersRepository);
            const user = yield userShowService.execute({ cuid: userCuid });
            const notificationCreationService = new NotificationCreationService_1.NotificationCreationService(this.notificationsRepository);
            // Verifique se o usuário já deu "like" no post
            const userSavedPost = post.saves.some((likedUser) => likedUser.cuid === user.cuid);
            let postUpdated;
            if (userSavedPost) {
                postUpdated = yield this.postsRepository.update(postCuid, {
                    saves: { disconnect: { cuid: userCuid } },
                });
            }
            else {
                postUpdated = yield this.postsRepository.update(postCuid, {
                    saves: { connect: { cuid: userCuid } },
                });
                yield notificationCreationService.execute({
                    title: "Alguem adicionou a sua publicação aos favoritos",
                    message: "adicionou a sua publicação aos favoritos",
                    senderCuid: userCuid,
                    recipientCuid: post.travelers[0].cuid,
                });
            }
            return postUpdated;
        });
    }
}
exports.PostSaveService = PostSaveService;
//# sourceMappingURL=PostSaveService.js.map