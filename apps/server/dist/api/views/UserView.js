"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
const TripView_1 = require("./TripView");
exports.UserView = {
    render(user) {
        var _a, _b;
        return {
            id: user.id,
            cuid: user.cuid,
            email: user.email,
            username: user.username,
            twoFactorAuth: user.twoFactorAuth,
            acceptedTerms: user.acceptedTerms,
            status: user.status,
            profile: user.profile && {
                name: user.profile.name,
                biography: user.profile.biography,
                picture: (_a = user.profile.picture) !== null && _a !== void 0 ? _a : "profile.png",
                birthday: user.profile.birthday,
                phone: user.profile.phone,
                link: user.profile.link,
                gender: user.profile.gender,
                updatedAt: user.profile.updatedAt,
            },
            address: ((_b = user.profile) === null || _b === void 0 ? void 0 : _b.address) && {
                zipcode: user.profile.address.zipcode,
                country: user.profile.address.country,
                state: user.profile.address.state,
                city: user.profile.address.city,
                neighborhood: user.profile.address.neighborhood,
                street: user.profile.address.street,
                number: user.profile.address.number,
                complement: user.profile.address.complement,
                updatedAt: user.profile.address.updatedAt,
            },
            likes: user.likes && user.likes.length,
            followers: user.followers && user.followers.length,
            following: user.following && user.following.length,
            isFollowing: user.isFollowing && user.isFollowing,
            trips: user.trips &&
                user.trips.map((trip) => TripView_1.TripView.render(trip)),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },
    renderMany(users) {
        return users.map((user) => this.render(user));
    },
};
//# sourceMappingURL=UserView.js.map