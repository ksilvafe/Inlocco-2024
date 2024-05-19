import { Request, Response } from "express";

import { OpenstreetmapRepository } from "../repositories/openstreetmap/OpenstreetmapRepository";
import { LocationReverseService } from "../services/locations/LocationReverseService";
import { LocationSearchService } from "../services/locations/LocationSearchService";

export class LocationController {
  async reverse(request: Request, response: Response) {
    const { lat, lng } = request.query;

    const openstreetmapRepository = new OpenstreetmapRepository();
    const showLocation = new LocationReverseService(openstreetmapRepository);

    const location = await showLocation.execute({
      lat,
      lng,
    } as { lat: string; lng: string });

    return response.json(location);
  }

  async search(request: Request, response: Response) {
    const { q } = request.query;

    const openstreetmapRepository = new OpenstreetmapRepository();
    const showLocation = new LocationSearchService(openstreetmapRepository);

    const location = await showLocation.execute({
      q,
    } as { q: string });

    return response.json(location);
  }
}
