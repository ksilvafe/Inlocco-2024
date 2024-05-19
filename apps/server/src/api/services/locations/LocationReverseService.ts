import { IReverse } from "../../../@types/models";
import { LocationNotFoundError } from "../../../shared/errors/LocationNotFoundError";
import { IOpenstreetmapRepository } from "../../repositories/openstreetmap/IOpenstreetmapRepository";

interface IRequest {
  lat?: string;
  lng?: string;
}

export class LocationReverseService {
  constructor(private openstreetmapRepository: IOpenstreetmapRepository) {}

  async execute({ lat, lng }: IRequest): Promise<IReverse> {
    if (!lat || !lng) {
      throw new LocationNotFoundError();
    }

    const reverse = await this.openstreetmapRepository.reverse(
      parseFloat(lat as string),
      parseFloat(lng as string)
    );

    if (!reverse) {
      throw new LocationNotFoundError();
    }

    return reverse;
  }
}
