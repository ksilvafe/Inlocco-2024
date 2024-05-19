import { INotifications } from "../../../@types/models";
import { prisma } from "../../../config/database";
import { INotificationsRepository } from "./INotificationsRepository";

export class NotificationsRepository implements INotificationsRepository {
  async create(data: INotifications): Promise<INotifications> {
    const notification = await prisma.notifications.create({
      data,
    });
    return notification;
  }
}
