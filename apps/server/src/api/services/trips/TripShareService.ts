import { ITrips } from "../../../@types/models";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";

interface IRequest {
  cuid: string;
}

export class TripShareService {
  constructor(private tripsRepository: ITripsRepository) {}

  async execute({ cuid }: IRequest): Promise<ITrips> {
    const trip = await this.tripsRepository.update(cuid, {
      shares: { increment: 1 },
    });

    return trip;
  }
}
