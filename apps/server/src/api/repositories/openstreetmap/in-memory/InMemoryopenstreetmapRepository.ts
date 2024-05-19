import { IReverse, ISearch } from "../../../../@types/models";
import { IOpenstreetmapRepository } from "../IOpenstreetmapRepository";

export class InMemoryopenstreetmapRepository
  implements IOpenstreetmapRepository
{
  async reverse(lat: number, lng: number): Promise<IReverse | null> {
    try {
      return {
        displayName:
          "Ditsch, Lindower Straße, Sprengelkiez, Wedding, Mitte, Berlim, 13347, Alemanha",
        lat: "52.54274275",
        lng: "13.36690305710228",
        city: "Berlim",
        country: "Alemanha",
        countryCode: "ger",
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async search(query: string): Promise<ISearch[] | null> {
    try {
      return [
        {
          displayName:
            "Ditsch, Lindower Straße, Sprengelkiez, Wedding, Mitte, Berlim, 13347, Alemanha",
          lat: "52.54274275",
          lng: "13.36690305710228",
          city: "Berlim",
          country: "Alemanha",
          countryCode: "ger",
        },
      ];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
