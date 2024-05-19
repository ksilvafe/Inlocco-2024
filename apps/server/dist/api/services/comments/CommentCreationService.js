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
exports.CommentCreationService = void 0;
const NotificationCreationService_1 = require("../notifications/NotificationCreationService");
const TripShowService_1 = require("../trips/TripShowService");
class CommentCreationService {
    constructor(commentsRepository, tripsRepository, notificationsRepository) {
        this.commentsRepository = commentsRepository;
        this.tripsRepository = tripsRepository;
        this.notificationsRepository = notificationsRepository;
    }
    execute({ text, userCuid, tripCuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tripShowService = new TripShowService_1.TripShowService(this.tripsRepository);
            const trip = yield tripShowService.execute({ cuid: tripCuid });
            const notificationCreationService = new NotificationCreationService_1.NotificationCreationService(this.notificationsRepository);
            const comment = yield this.commentsRepository.create({
                text,
                user: { connect: { cuid: userCuid } },
                trip: { connect: { cuid: tripCuid } },
            });
            yield notificationCreationService.execute({
                title: "Você tem um novo comentario",
                message: "comentou a sua viagem",
                senderCuid: userCuid,
                recipientCuid: trip.userCuid,
                tripCuid,
            });
            return comment;
        });
    }
}
exports.CommentCreationService = CommentCreationService;
//# sourceMappingURL=CommentCreationService.js.map