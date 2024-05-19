import { ITrips } from "../../../@types/models";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  title?: string;
  description?: string;
  posts: string[];
  userCuid: string;
}

export class TripCreationService {
  constructor(private tripsRepository: ITripsRepository) {}

  async execute({
    title,
    description,
    userCuid,
    posts,
  }: IRequest): Promise<ITrips> {
    const data = {
      title,
      description,
      posts,
      userCuid,
    };

    const trip = await this.tripsRepository.create(data);

    return trip;
  }
}
