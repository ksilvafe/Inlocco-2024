import { Prisma } from "@prisma/client";
import { ParsedQs } from "qs";

import { ITrips } from "../../../../@types/models";
import { ITripsRepository } from "../ITripsRepository";

export class InMemoryTripsRepository implements ITripsRepository {
  private trips: ITrips[] = [];

  async findByCuid(cuid: string): Promise<ITrips | null> {
    return this.trips.find((trip) => trip.cuid === cuid);
  }

  async create(data: ITrips): Promise<ITrips> {
    const trip = {
      cuid: `${this.trips.length}`,
    };
    Object.assign(trip, data);
    this.trips.push(trip);
    return trip;
  }

  async update(
    cuid: string,
    data: Prisma.TripsUncheckedUpdateInput
  ): Promise<ITrips> {
    const updateTrip = await this.findByCuid(cuid);

    const updatedTrip = {
      ...updateTrip,
      ...data,
    };
    this.trips[updateTrip.cuid] = updatedTrip;

    return updatedTrip;
  }

  async findMany(query: ParsedQs): Promise<ITrips[]> {
    return this.trips;
  }
}
