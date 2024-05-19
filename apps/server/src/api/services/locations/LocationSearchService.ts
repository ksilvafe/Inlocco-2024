import { ISearch } from "../../../@types/models";
import { LocationNotFoundError } from "../../../shared/errors/LocationNotFoundError";
import { IOpenstreetmapRepository } from "../../repositories/openstreetmap/IOpenstreetmapRepository";

interface IRequest {
  q?: string;
}

export class LocationSearchService {
  constructor(private openstreetmapRepository: IOpenstreetmapRepository) {}

  async execute({ q }: IRequest): Promise<ISearch[]> {
    if (!q) {
      throw new LocationNotFoundError();
    }

    const search = await this.openstreetmapRepository.search(q);

    if (!search) {
      throw new LocationNotFoundError();
    }

    return search;
  }
}
