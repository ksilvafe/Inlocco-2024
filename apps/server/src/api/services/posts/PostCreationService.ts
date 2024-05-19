import { ILocations, IPosts } from "../../../@types/models";
import { IOpenstreetmapRepository } from "../../repositories/openstreetmap/IOpenstreetmapRepository";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
interface IRequest {
  description?: string;
  travelers: string[];
  purpose?: string[];
  photos: string[];
  videos: string[];
  tripCuid?: string;
  location: ILocations;
}
function removerItensIndefinidos(objeto: any) {
  for (const chave in objeto) {
    if (objeto[chave] === undefined) {
      delete objeto[chave];
    }
  }
}

export class PostCreationService {
  constructor(
    private postsRepository: IPostsRepository,
    private openstreetmapRepository: IOpenstreetmapRepository
  ) {}

  async execute({
    tripCuid,
    description,
    travelers = [],
    purpose = [],
    location,
    photos,
    videos,
  }: IRequest): Promise<IPosts> {
    const data = {
      description,
      travelers,
      purpose,
      photos,
      videos,
      trip: tripCuid,
      location: location && JSON.parse(location),
    };

    data.location.coordinates = data?.location?.coordinates.map(parseFloat);
    removerItensIndefinidos(data);

    const post = await this.postsRepository.create(data);

    return post;
  }
}
