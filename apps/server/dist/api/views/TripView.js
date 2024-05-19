"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripView = void 0;
const CommentView_1 = require("./CommentView");
const PostView_1 = require("./PostView");
const UserView_1 = require("./UserView");
exports.TripView = {
    render(trip) {
        return {
            id: trip.id,
            cuid: trip.cuid,
            title: trip.title,
            description: trip.description,
            status: trip.status,
            user: trip.user && UserView_1.UserView.render(trip.user),
            comments: trip.comments && CommentView_1.CommentView.renderMany(trip.comments),
            likes: trip.likes &&
                trip.likes.map((userLike) => userLike.userCuid),
            saves: trip.saves &&
                trip.saves.map((userSave) => userSave.userCuid),
            shares: trip.shares.toString(),
            posts: trip.posts &&
                trip.posts.map((post) => PostView_1.PostView.render(post)),
            createdAt: trip.createdAt,
            updatedAt: trip.updatedAt,
        };
    },
    renderMany(trips) {
        return trips.map((trip) => this.render(trip));
    },
};
//# sourceMappingURL=TripView.js.map