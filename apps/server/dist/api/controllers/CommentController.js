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
exports.CommentController = void 0;
const CommentsRepository_1 = require("../repositories/comments/CommentsRepository");
const NotificationsRepository_1 = require("../repositories/notifications/NotificationsRepository");
const TripsRepository_1 = require("../repositories/trips/TripsRepository");
const CommentCreationService_1 = require("../services/comments/CommentCreationService");
class CommentController {
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = request.body;
            const { cuid: tripCuid } = request.params;
            const { cuid: userCuid } = request.user;
            const commentsRepository = new CommentsRepository_1.CommentsRepository();
            const tripsRepository = new TripsRepository_1.TripsRepository();
            const notificationsRepository = new NotificationsRepository_1.NotificationsRepository();
            const createComment = new CommentCreationService_1.CommentCreationService(commentsRepository, tripsRepository, notificationsRepository);
            const data = {
                text,
                tripCuid,
                userCuid,
            };
            yield createComment.execute(data);
            return response.status(201).send();
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map