import { INotifications } from "../../../@types/models";

export interface INotificationsRepository {
  create: (data: INotifications) => Promise<INotifications>;
}
