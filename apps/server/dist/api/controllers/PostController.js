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
exports.PostController = void 0;
const NotificationsRepository_1 = require("../repositories/notifications/NotificationsRepository");
const OpenstreetmapRepository_1 = require("../repositories/openstreetmap/OpenstreetmapRepository");
const PostsRepository_1 = require("../repositories/posts/PostsRepository");
const UsersRepository_1 = require("../repositories/users/UsersRepository");
const PostCreationService_1 = require("../services/posts/PostCreationService");
const PostListService_1 = require("../services/posts/PostListService");
const PostSaveService_1 = require("../services/posts/PostSaveService");
const PostShowService_1 = require("../services/posts/PostShowService");
const PostUpdateService_1 = require("../services/posts/PostUpdateService");
const PostView_1 = require("../views/PostView");
class PostController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tripCuid, description, travelers = [], purpose, location, } = request.body;
            const photos = request.files.filter((file) => file.fieldname === "photos");
            //const videos = request.files?.videos;
            const { cuid: userCuid } = request.user;
            const postsRepository = new PostsRepository_1.PostsRepository();
            const openstreetmapRepository = new OpenstreetmapRepository_1.OpenstreetmapRepository();
            const createPost = new PostCreationService_1.PostCreationService(postsRepository, openstreetmapRepository);
            const data = {
                tripCuid,
                description,
                travelers: [...travelers, userCuid],
                purpose,
                location,
                photos: photos === null || photos === void 0 ? void 0 : photos.map((file) => file.key),
                videos: [], //videos?.map((file) => file.filename),
            };
            yield createPost.execute(data);
            return response.status(201).send();
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const postsRepository = new PostsRepository_1.PostsRepository();
            const showPost = new PostShowService_1.PostShowService(postsRepository);
            const post = yield showPost.execute({ cuid });
            const postView = PostView_1.PostView.render(post);
            return response.json(postView);
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const postsRepository = new PostsRepository_1.PostsRepository();
            const listPost = new PostListService_1.PostListService(postsRepository);
            const post = yield listPost.execute({});
            const postView = PostView_1.PostView.renderMany(post);
            return response.json(postView);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const { tripCuid, description, travelers = [], purpose, location, } = request.body;
            const photos = request.files &&
                request.files.filter((file) => file.fieldname === "photos");
            //const videos = request.files?.videos;
            const { cuid: userCuid } = request.user;
            const postsRepository = new PostsRepository_1.PostsRepository();
            const updatePost = new PostUpdateService_1.PostUpdateService(postsRepository);
            const data = {
                cuid,
                tripCuid,
                description,
                travelers: [...travelers, userCuid],
                purpose,
                location,
                photos: photos === null || photos === void 0 ? void 0 : photos.map((file) => file.filename),
                videos: [], //videos?.map((file) => file.filename),
            };
            yield updatePost.execute(data);
            return response.status(200).send();
        });
    }
    save(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid: postCuid } = request.params;
            const { cuid: userCuid } = request.user;
            const postsRepository = new PostsRepository_1.PostsRepository();
            const usersRepository = new UsersRepository_1.UsersRepository();
            const notificationsRepository = new NotificationsRepository_1.NotificationsRepository();
            const savePost = new PostSaveService_1.PostSaveService(postsRepository, usersRepository, notificationsRepository);
            yield savePost.execute({ postCuid, userCuid });
            return response.status(201).send();
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map