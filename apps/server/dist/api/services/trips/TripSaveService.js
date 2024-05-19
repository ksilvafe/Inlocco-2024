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
exports.TripSaveService = void 0;
const NotificationCreationService_1 = require("../notifications/NotificationCreationService");
const UserShowService_1 = require("../users/UserShowService");
const TripShowService_1 = require("./TripShowService");
class TripSaveService {
    constructor(tripsRepository, usersRepository, notificationsRepository) {
        this.tripsRepository = tripsRepository;
        this.usersRepository = usersRepository;
        this.notificationsRepository = notificationsRepository;
    }
    execute({ tripCuid, userCuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tripShowService = new TripShowService_1.TripShowService(this.tripsRepository);
            const trip = yield tripShowService.execute({ cuid: tripCuid });
            const userShowService = new UserShowService_1.UserShowService(this.usersRepository);
            const user = yield userShowService.execute({ cuid: userCuid });
            const notificationCreationService = new NotificationCreationService_1.NotificationCreationService(this.notificationsRepository);
            // Verifique se o usuário já "savlou" a trip
            const userSavedTrip = trip.saves.find((savedUser) => savedUser.userCuid === user.cuid);
            let tripUpdated;
            if (userSavedTrip) {
                tripUpdated = yield this.tripsRepository.update(tripCuid, {
                    saves: {
                        delete: {
                            cuid: userSavedTrip.cuid,
                        },
                    },
                });
            }
            else {
                tripUpdated = yield this.tripsRepository.update(tripCuid, {
                    saves: {
                        connectOrCreate: {
                            where: {
                                tripCuid_userCuid: {
                                    tripCuid,
                                    userCuid,
                                },
                            },
                            create: {
                                userCuid,
                            },
                        },
                    },
                });
            }
            yield notificationCreationService.execute({
                title: "Você tem uma nova notificação",
                message: "salvou a sua viagem",
                senderCuid: userCuid,
                recipientCuid: tripUpdated.userCuid,
                tripCuid,
            });
            return tripUpdated;
        });
    }
}
exports.TripSaveService = TripSaveService;
//# sourceMappingURL=TripSaveService.js.map