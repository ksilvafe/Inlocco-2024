import { IComments } from "../../../@types/models";
import { prisma } from "../../../config/database";
import { ICommentsRepository } from "./ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  async create(data: IComments): Promise<IComments> {
    const comments = await prisma.comments.create({
      data,
    });
    return comments;
  }
}
