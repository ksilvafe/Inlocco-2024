import { IComments } from "../../../../@types/models";
import { ICommentsRepository } from "../ICommentsRepository";

export class InMemoryCommentsRepository implements ICommentsRepository {
  private comments: IComments[] = [];

  async create(data: IComments): Promise<IComments> {
    const comment = {
      cuid: `${this.comments.length}`,
    };
    Object.assign(comment, data);
    this.comments.push(comment);
    return comment;
  }
}
