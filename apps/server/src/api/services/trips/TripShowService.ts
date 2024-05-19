import { ITrips } from "../../../@types/models";
import { TripNotFoundError } from "../../../shared/errors/TripNotFoundError";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";

interface IRequest {
  cuid: string;
}

export class TripShowService {
  constructor(private tripsRepository: ITripsRepository) {}

  async execute({ cuid }: IRequest): Promise<ITrips> {
    const trip = await this.tripsRepository.findByCuid(cuid, {
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
          saves: true,
        },
      },
      user: {
        include: {
          profile: {
            include: {
              address: true,
            },
          },
        },
      },
      saves: true,
      comments: {
        include: {
          user: true,
        },
      },
      likes: true,
    });

    if (!trip) {
      throw new TripNotFoundError();
    }

    return trip;
  }
}
