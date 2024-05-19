import { INotifications } from "../../../@types/models";
import { INotificationsRepository } from "../../repositories/notifications/INotificationsRepository";

interface IRequest {
  title: string;
  message: string;
  senderCuid: string;
  recipientCuid: string;
  tripCuid?: string;
}

export class NotificationCreationService {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    title,
    message,
    senderCuid,
    recipientCuid,
    tripCuid,
  }: IRequest): Promise<INotifications> {
    const data = {
      title,
      message,
      senderCuid,
      recipientCuid,
      tripCuid,
    };
    const notification = await this.notificationsRepository.create(data);

    return notification;
  }
}
