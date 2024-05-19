"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostView = void 0;
const UserView_1 = require("./UserView");
exports.PostView = {
    render(post) {
        return {
            id: post.id,
            cuid: post.cuid,
            title: post.title,
            description: post.description,
            photos: post.photos,
            videos: post.videos,
            tripId: post.tripId,
            purposes: post.purpose,
            saves: post.saves,
            travelers: post.travelers &&
                post.travelers.map((traveler) => UserView_1.UserView.render(traveler.user)),
            location: post.location,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    },
    renderMany(posts) {
        return posts.map((post) => this.render(post));
    },
};
//# sourceMappingURL=PostView.js.map