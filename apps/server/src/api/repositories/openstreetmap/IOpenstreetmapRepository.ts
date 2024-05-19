import { IReverse, ISearch } from "../../../@types/models";

export interface IOpenstreetmapRepository {
  reverse: (lat: number, lng: number) => Promise<IReverse | null>;
  search: (query: string) => Promise<ISearch[] | null>;
}
