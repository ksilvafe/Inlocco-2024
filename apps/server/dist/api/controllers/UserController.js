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
exports.UserController = void 0;
const UsersRepository_1 = require("../repositories/users/UsersRepository");
const UserCreationService_1 = require("../services/users/UserCreationService");
const UserListService_1 = require("../services/users/UserListService");
const UserShowService_1 = require("../services/users/UserShowService");
const UserShowTripsSavedService_1 = require("../services/users/UserShowTripsSavedService");
const UserUpdateService_1 = require("../services/users/UserUpdateService");
const TripView_1 = require("../views/TripView");
const UserView_1 = require("../views/UserView");
class UserController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = request.body;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const createUser = new UserCreationService_1.UserCreationService(usersRepository);
            yield createUser.execute({
                username,
                email,
                password,
            });
            return response.status(201).send();
        });
    }
    update(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.user;
            const filename = (_a = request.file) === null || _a === void 0 ? void 0 : _a.key;
            const { username, email, name, biography, phone, gender, link, zipcode, country, state, city, neighborhood, street, number, complement, } = request.body;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const updateUser = new UserUpdateService_1.UserUpdateService(usersRepository);
            const data = {
                username,
                email,
                profile: {
                    update: {
                        name,
                        biography,
                        picture: filename && filename,
                        phone,
                        link,
                        gender,
                        address: {
                            update: {
                                zipcode,
                                country,
                                state,
                                city,
                                neighborhood,
                                street,
                                number,
                                complement,
                            },
                        },
                    },
                },
            };
            yield updateUser.execute({ cuid, data });
            return response.status(204).send();
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = new UsersRepository_1.UsersRepository();
            const listUserProfile = new UserListService_1.UserListService(usersRepository);
            const users = yield listUserProfile.execute(request.query);
            const profileView = UserView_1.UserView.renderMany(users);
            return response.json(profileView);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid: paramsCuid } = request.params;
            const { cuid: userCuid } = request.user;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const showUserProfile = new UserShowService_1.UserShowService(usersRepository);
            const user = yield showUserProfile.execute({
                cuid: paramsCuid !== null && paramsCuid !== void 0 ? paramsCuid : userCuid,
            });
            const isFollowing = user.following.some((following) => following.follower.cuid === userCuid);
            user.isFollowing = isFollowing;
            const profileView = UserView_1.UserView.render(user);
            return response.json(profileView);
        });
    }
    showTripsSaved(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.user;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const showUserProfile = new UserShowTripsSavedService_1.UserShowTripsSavedService(usersRepository);
            const user = yield showUserProfile.execute({
                cuid,
            });
            const trips = user.tripSaves.map((tripSaves) => tripSaves.trip);
            const tripsView = TripView_1.TripView.renderMany(trips);
            return response.json(tripsView);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map