import { Prisma } from "@prisma/client";

import { IFollows, IUsers } from "../../../../@types/models";
import { IUsersRepository } from "../../users/IUsersRepository";
import { IFollowsRepository } from "../IFollowsRepository";

export class InMemoryFollowsRepository implements IFollowsRepository {
  private follows: IFollows[] = [];

  constructor(private usersRepository: IUsersRepository) {}

  async findByFollowers(
    follower: IUsers,
    following: IUsers
  ): Promise<IFollows | null> {
    const follow = this.follows.find(
      (follow: IFollows) =>
        follow.followerId === follower.cuid &&
        follow.followingId === following.cuid
    );
    return follow;
  }

  async findByCuid(cuid: string): Promise<IFollows | null> {
    return this.follows.find((follow) => follow.cuid === cuid);
  }

  async create(data: IFollows): Promise<IFollows> {
    const follow = {
      cuid: `${this.follows.length}`,
    };
    Object.assign(follow, data);
    this.follows.push(follow);
    const followerUser = await this.usersRepository.findByCuid(
      data.follower.cuid
    );
    if (followerUser) {
      followerUser.following.push(data.following);
    }

    return follow;
  }

  async update(
    cuid: string,
    data: Prisma.FollowsUncheckedUpdateInput
  ): Promise<IFollows> {
    const updatePost = await this.findByCuid(cuid);

    const updatedPost = {
      ...updatePost,
      ...data,
    };
    this.follows[updatePost.cuid] = updatedPost;

    return updatedPost;
  }
}
