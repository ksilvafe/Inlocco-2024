import { Prisma } from "@prisma/client";
import { ParsedQs } from "qs";

import { ITrips } from "../../../@types/models";
import { prisma } from "../../../config/database";
import { ITripsRepository } from "./ITripsRepository";

export class TripsRepository implements ITripsRepository {
  async findByCuid(
    cuid: string,
    include?: Prisma.TripsInclude
  ): Promise<ITrips | null> {
    const trip = await prisma.trips.findUnique({
      where: {
        cuid: cuid,
      },
      include,
    });
    return trip;
  }

  async create(data: ITrips): Promise<ITrips> {
    const trip = await prisma.trips.create({
      data: {
        ...data,
        posts: data.posts && {
          connect: data.posts.map((item: string) => ({ cuid: item })),
        },
      },
    });
    return trip;
  }

  async update(cuid: string, data: ITrips): Promise<ITrips> {
    const updateTrip = await prisma.trips.update({
      where: {
        cuid,
      },
      data: {
        ...data,
        posts: data.posts && {
          connect: data.posts?.map((item: string) => ({ cuid: item })),
        },
      },
    });
    return updateTrip;
  }
  async findMany(query: ParsedQs): Promise<ITrips[]> {
    const trips = await prisma.trips.findMany({
      where: {
        ...query,
        user: {
          cuid: query.userCuid as string,
        },
        /*         posts: {
          some: {},
        }, */
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        posts: {
          include: {
            location: true,
            travelers: {
              include: {
                user: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
        likes: true,
        comments: true,
      },
    });
    return trips;
  }
}
