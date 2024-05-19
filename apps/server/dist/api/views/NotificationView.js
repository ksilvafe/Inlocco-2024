"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationView = void 0;
const TripView_1 = require("./TripView");
const UserView_1 = require("./UserView");
exports.NotificationView = {
    render(notification) {
        return {
            id: notification.id,
            cuid: notification.cuid,
            title: notification.title,
            message: notification.message,
            sender: notification.sender && UserView_1.UserView.render(notification.sender),
            trip: notification.trip && TripView_1.TripView.render(notification.trip),
            createdAt: notification.createdAt,
            updatedAt: notification.updatedAt,
        };
    },
    renderMany(notifications) {
        return notifications.map((notification) => this.render(notification));
    },
};
//# sourceMappingURL=NotificationView.js.map