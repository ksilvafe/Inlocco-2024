import { INotifications } from "../../../../@types/models";
import { IUsersRepository } from "../../users/IUsersRepository";
import { INotificationsRepository } from "../INotificationsRepository";

export class InMemoryNotificationsRepository
  implements INotificationsRepository
{
  constructor(private usersRepository: IUsersRepository) {}
  private notifications: INotifications[] = [];

  async create(data: INotifications): Promise<INotifications> {
    const notification = {
      cuid: `${this.notifications.length}`,
    };
    Object.assign(notification, data);
    this.notifications.push(notification);

    const user = await this.usersRepository.findByCuid(data.recipientId);
    if (user) {
      user.recipientNotifications.push(data);
    }

    return notification;
  }
}
