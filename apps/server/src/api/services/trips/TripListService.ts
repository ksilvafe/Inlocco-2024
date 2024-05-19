import { ParsedQs } from "qs";

import { ITrips } from "../../../@types/models";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";

export class TripListService {
  constructor(private tripsRepository: ITripsRepository) {}

  async execute(query: ParsedQs): Promise<ITrips[]> {
    const trips = await this.tripsRepository.findMany(query);
    return trips;
  }
}
