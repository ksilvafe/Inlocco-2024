import { Prisma } from "@prisma/client";
import { ParsedQs } from "qs";

import { ITrips } from "../../../@types/models";

export interface ITripsRepository {
  create: (data: ITrips) => Promise<ITrips>;
  update: (cuid: string, data: ITrips) => Promise<ITrips>;
  findByCuid: (
    cuid: string,
    include?: Prisma.TripsInclude
  ) => Promise<ITrips | null>;
  findMany: (query: ParsedQs) => Promise<ITrips[]>;
}
