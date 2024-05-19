import { IUsers } from "../../@types/models";
import { TripView } from "./TripView";

export const UserView = {
  render(user: IUsers): IUsers {
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
        picture: user.profile.picture ?? "profile.png",
        birthday: user.profile.birthday,
        phone: user.profile.phone,
        link: user.profile.link,
        gender: user.profile.gender,
        updatedAt: user.profile.updatedAt,
      },
      address: user.profile?.address && {
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
      trips:
        user.trips &&
        user.trips.map((trip: { trip: any }) => TripView.render(trip)),

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
  renderMany(users: IUsers[]) {
    return users.map((user) => this.render(user));
  },
};
