"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const NotificationController_1 = require("../controllers/NotificationController");
const notificationController = new NotificationController_1.NotificationController();
const notificationsRouter = (0, express_1.Router)();
exports.notificationsRouter = notificationsRouter;
notificationsRouter.get("/", ensureAuthenticated_1.ensureAuthenticated, notificationController.index);
//# sourceMappingURL=notifications.routes.js.map