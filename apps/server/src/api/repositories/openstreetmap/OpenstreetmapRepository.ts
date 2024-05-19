import { IReverse, ISearch } from "../../../@types/models";
import { openstreetmap } from "../../../shared/services/openstreetmap";
import { IOpenstreetmapRepository } from "./IOpenstreetmapRepository";

export class OpenstreetmapRepository implements IOpenstreetmapRepository {
  async reverse(lat: number, lng: number): Promise<IReverse | null> {
    try {
      const url = `/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
      const response = await openstreetmap.get(url);

      const data = {
        lat: response.data.lat,
        lng: response.data.lon,
        displayName: response.data.display_name,
        country: response.data.address.country,
        countryCode: response.data.address.country_code,
        city: response.data.address.city,
      };
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async search(query: string): Promise<ISearch[] | null> {
    try {
      const url = `/search?format=json&q=${query}&limit=2&addressdetails=1`;
      const response = await openstreetmap.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
