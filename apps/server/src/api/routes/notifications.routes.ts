import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { NotificationController } from "../controllers/NotificationController";

const notificationController = new NotificationController();

const notificationsRouter = Router();
notificationsRouter.get("/", ensureAuthenticated, notificationController.index);

export { notificationsRouter };
