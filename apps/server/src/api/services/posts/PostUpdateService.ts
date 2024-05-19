import { ILocations, IPosts } from "../../../@types/models";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";
interface IRequest {
  description?: string;
  travelers: string[];
  purpose?: string[];
  photos: string[];
  videos: string[];
  tripCuid?: string;
  location: ILocations;
  cuid: string;
}

export class PostUpdateService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({
    tripCuid,
    description,
    travelers = [],
    purpose = [],
    location,
    photos,
    videos,
    cuid,
  }: IRequest): Promise<IPosts> {
    const data = {
      tripCuid,
      description,
      travelers,
      purpose,
      location,
      photos,
      videos,
    };

    const post = await this.postsRepository.update(cuid, data);

    return post;
  }
}
