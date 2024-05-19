import { IFollows } from "../../@types/models";
import { PostView } from "./PostView";

export const FollowView = {
  render(user: IFollows): IFollows {
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
  renderMany(users: IFollows[]) {
    return users.map((user) => this.render(user));
  },
};
