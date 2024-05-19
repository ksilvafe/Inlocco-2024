"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowView = void 0;
exports.FollowView = {
    render(user) {
        return {
            id: user.id,
            cuid: user.cuid,
            follower: {
                cuid: user.follower.cuid,
                email: user.follower.email,
                username: user.follower.username,
            },
            following: {
                cuid: user.following.cuid,
                email: user.following.email,
                username: user.following.username,
                picture: user.following.profile.picture,
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },
    renderMany(users) {
        return users.map((user) => this.render(user));
    },
};
//# sourceMappingURL=FollowView.js.map