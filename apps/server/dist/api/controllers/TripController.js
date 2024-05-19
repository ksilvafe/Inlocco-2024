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
exports.TripController = void 0;
const NotificationsRepository_1 = require("../repositories/notifications/NotificationsRepository");
const PostsRepository_1 = require("../repositories/posts/PostsRepository");
const TripsRepository_1 = require("../repositories/trips/TripsRepository");
const UsersRepository_1 = require("../repositories/users/UsersRepository");
const TripCreationService_1 = require("../services/trips/TripCreationService");
const TripLikeService_1 = require("../services/trips/TripLikeService");
const TripListService_1 = require("../services/trips/TripListService");
const TripSaveService_1 = require("../services/trips/TripSaveService");
const TripShareService_1 = require("../services/trips/TripShareService");
const TripShowService_1 = require("../services/trips/TripShowService");
const TripUpdateService_1 = require("../services/trips/TripUpdateService");
const TripView_1 = require("../views/TripView");
class TripController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, posts } = request.body;
            const { cuid } = request.user;
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const createTrip = new TripCreationService_1.TripCreationService(tripsRepository);
            const data = {
                title,
                description,
                userCuid: cuid,
                posts,
            };
            yield createTrip.execute(data);
            return response.status(201).send();
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const showTrip = new TripShowService_1.TripShowService(tripsRepository);
            const trip = yield showTrip.execute({ cuid });
            const tripsView = TripView_1.TripView.render(trip);
            return response.json(tripsView);
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const listTrip = new TripListService_1.TripListService(tripsRepository);
            const trips = yield listTrip.execute(request.query);
            const tripsView = TripView_1.TripView.renderMany(trips);
            return response.json(tripsView);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const { name, description, travelers, purpose, startDate, endDate, posts } = request.body;
            const { cuid: userCuid } = request.user;
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const usersRepository = new UsersRepository_1.UsersRepository();
            const postsRepository = new PostsRepository_1.PostsRepository();
            const updateTrip = new TripUpdateService_1.TripUpdateService(tripsRepository, usersRepository, postsRepository);
            const data = {
                name,
                description,
                travelers: [userCuid, ...travelers],
                purpose,
                startDate,
                endDate,
                posts,
                cuid,
            };
            yield updateTrip.execute(data);
            return response.status(200).send();
        });
    }
    save(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid: tripCuid } = request.params;
            const { cuid: userCuid } = request.user;
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const usersRepository = new UsersRepository_1.UsersRepository();
            const notificationsRepository = new NotificationsRepository_1.NotificationsRepository();
            const saveTrip = new TripSaveService_1.TripSaveService(tripsRepository, usersRepository, notificationsRepository);
            yield saveTrip.execute({ tripCuid, userCuid });
            return response.status(201).send();
        });
    }
    like(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid: tripCuid } = request.params;
            const { cuid: userCuid } = request.user;
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const usersRepository = new UsersRepository_1.UsersRepository();
            const notificationsRepository = new NotificationsRepository_1.NotificationsRepository();
            const likeTrip = new TripLikeService_1.TripLikeService(tripsRepository, usersRepository, notificationsRepository);
            yield likeTrip.execute({ tripCuid, userCuid });
            return response.status(201).send();
        });
    }
    share(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.params;
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const shareTrip = new TripShareService_1.TripShareService(tripsRepository);
            yield shareTrip.execute({ cuid });
            return response.status(201).send();
        });
    }
}
exports.TripController = TripController;
//# sourceMappingURL=TripController.js.map