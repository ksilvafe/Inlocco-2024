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
exports.NotificationController = void 0;
const UsersRepository_1 = require("../repositories/users/UsersRepository");
const NotificationListService_1 = require("../services/notifications/NotificationListService");
const NotificationView_1 = require("../views/NotificationView");
class NotificationController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuid } = request.user;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const listNotification = new NotificationListService_1.NotificationListService(usersRepository);
            const notifications = yield listNotification.execute({ cuid });
            const notificationView = NotificationView_1.NotificationView.renderMany(notifications);
            return response.json(notificationView);
        });
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=NotificationController.js.map