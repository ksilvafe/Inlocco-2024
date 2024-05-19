import { Prisma } from "@prisma/client";

import { IPosts } from "../../../@types/models";

export interface IPostsRepository {
  create: (data: IPosts) => Promise<IPosts>;
  update: (cuid: string, data: IPosts) => Promise<IPosts>;
  findByCuid: (
    cuid: string,
    include?: Prisma.PostsInclude
  ) => Promise<IPosts | null>;
  findMany: (cuids?: string[]) => Promise<IPosts[]>;
}
