import { Prisma } from "@prisma/client";

import { IFollows, IUsers } from "../../../@types/models";

export interface IFollowsRepository {
  create: (data: IFollows) => Promise<IFollows>;
  update: (
    cuid: string,
    data: Prisma.FollowsUncheckedUpdateInput
  ) => Promise<IFollows>;
  findByCuid: (
    cuid: string,
    include?: Prisma.FollowsInclude
  ) => Promise<IFollows | null>;
  findByFollowers: (
    follower: IUsers,
    following: IUsers
  ) => Promise<IFollows | null>;
}
