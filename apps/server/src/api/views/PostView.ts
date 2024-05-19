import { IPosts } from "../../@types/models";
import { CommentView } from "./CommentView";
import { UserView } from "./UserView";

export const PostView = {
  render(post: IPosts): IPosts {
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
      travelers:
        post.travelers &&
        post.travelers.map((traveler: { user: any }) =>
          UserView.render(traveler.user)
        ),
      location: post.location,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  },
  renderMany(posts: IPosts[]) {
    return posts.map((post) => this.render(post));
  },
};
