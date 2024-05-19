import { IComments } from "../../../@types/models";

export interface ICommentsRepository {
  create: (data: IComments) => Promise<IComments>;
}
