import { ITrips } from "../../@types/models";
import { CommentView } from "./CommentView";
import { PostView } from "./PostView";
import { UserView } from "./UserView";

export const TripView = {
  render(trip: ITrips): ITrips {
    return {
      id: trip.id,
      cuid: trip.cuid,
      title: trip.title,
      description: trip.description,
      status: trip.status,
      user: trip.user && UserView.render(trip.user),
      comments: trip.comments && CommentView.renderMany(trip.comments),
      likes:
        trip.likes &&
        trip.likes.map((userLike: { userCuid: any }) => userLike.userCuid),
      saves:
        trip.saves &&
        trip.saves.map((userSave: { userCuid: any }) => userSave.userCuid),
      shares: trip.shares.toString(),
      posts:
        trip.posts &&
        trip.posts.map((post: { post: any }) => PostView.render(post)),
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt,
    };
  },
  renderMany(trips: ITrips[]) {
    return trips.map((trip) => this.render(trip));
  },
};
