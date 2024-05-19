import { Request, Response } from "express";

import { UsersRepository } from "../repositories/users/UsersRepository";
import { NotificationListService } from "../services/notifications/NotificationListService";
import { NotificationView } from "../views/NotificationView";

export class NotificationController {
  async index(request: Request, response: Response) {
    const { cuid } = request.user;
    const usersRepository = new UsersRepository();
    const listNotification = new NotificationListService(usersRepository);

    const notifications = await listNotification.execute({ cuid });

    const notificationView = NotificationView.renderMany(notifications);
    return response.json(notificationView);
  }
}
