import { Prisma } from "@prisma/client";

import { IFollows, IUsers } from "../../../@types/models";
import { prisma } from "../../../config/database";
import { IFollowsRepository } from "./IFollowsRepository";

export class FollowsRepository implements IFollowsRepository {
  async findByFollowers(
    follower: IUsers,
    following: IUsers
  ): Promise<IFollows | null> {
    const follow = await prisma.follows.findFirst({
      where: {
        followerCuid: {
          equals: follower.cuid,
        },
        followingCuid: {
          equals: following.cuid,
        },
      },
    });
    return follow;
  }

  async findByCuid(
    cuid: string,
    include?: Prisma.FollowsInclude
  ): Promise<IFollows | null> {
    const follow = await prisma.follows.findUnique({
      where: {
        cuid,
      },
      include,
    });
    return follow;
  }

  async create(data: IFollows): Promise<IFollows> {
    const follow = await prisma.follows.create({
      data: {
        follower: { connect: { cuid: data.follower.cuid } },
        following: { connect: { cuid: data.following.cuid } },
      },
    });
    return follow;
  }

  async update(
    cuid: string,
    data: Prisma.FollowsUncheckedUpdateInput
  ): Promise<IFollows> {
    const updatePost = await prisma.follows.update({
      where: {
        cuid,
      },
      data,
    });
    return updatePost;
  }
}
