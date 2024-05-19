import { INotifications } from "../../@types/models";
import { TripView } from "./TripView";
import { UserView } from "./UserView";

export const NotificationView = {
  render(notification: INotifications): INotifications {
    return {
      id: notification.id,
      cuid: notification.cuid,
      title: notification.title,
      message: notification.message,
      sender: notification.sender && UserView.render(notification.sender),
      trip: notification.trip && TripView.render(notification.trip),
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  },
  renderMany(notifications: INotifications[]) {
    return notifications.map((notification) => this.render(notification));
  },
};
