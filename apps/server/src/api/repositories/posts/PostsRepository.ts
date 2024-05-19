import { Prisma } from "@prisma/client";

import { IPosts } from "../../../@types/models";
import { prisma } from "../../../config/database";
import { IPostsRepository } from "./IPostsRepository";

export class PostsRepository implements IPostsRepository {
  async findByCuid(
    cuid: string,
    include?: Prisma.PostsInclude
  ): Promise<IPosts | null> {
    const post = await prisma.posts.findUnique({
      where: {
        cuid: cuid,
      },
      include,
    });
    return post;
  }

  async create(data: IPosts): Promise<IPosts> {
    const travalersData = data.travelers.map((travaler: string) => {
      return {
        userCuid: travaler,
      };
    });
    const post = await prisma.posts.create({
      data: {
        ...data,
        travelers: {
          createMany: {
            data: travalersData,
            skipDuplicates: true,
          },
        },
        trip: data.trip && {
          connect: {
            cuid: data.trip,
          },
        },

        location: data.location && {
          connectOrCreate: {
            where: {
              coordinates: data.location.coordinates,
            },
            create: data.location,
          },
        },
      },
    });
    return post;
  }

  async update(cuid: string, data: IPosts): Promise<IPosts> {
    const updatePost = await prisma.posts.update({
      where: {
        cuid,
      },
      data: {
        ...data,
        trip: data?.trip && { connect: { cuid: data?.trip?.cuid } },
      },
      include: {
        travelers: true,
      },
    });
    return updatePost;
  }

  async findMany(cuids?: string[]): Promise<IPosts[]> {
    const posts = await prisma.posts.findMany({
      where: {
        cuid: {
          in: cuids,
        },
      },
      include: {
        travelers: {
          include: {
            user: {
              include: {
                profile: {
                  include: {
                    address: true,
                  },
                },
              },
            },
          },
        },
        location: true,
      },
    });
    return posts;
  }
}
